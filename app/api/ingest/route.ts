import { NextResponse } from "next/server";
import slugify from "slugify";
import path from "node:path";
import fs from "node:fs/promises";

import { unsplashSearch } from "@/lib/sources/unsplash";
import { pexelsSearch } from "@/lib/sources/pexels";
import { fetchFromWikimedia } from "@/lib/sources/wikimedia";
import { toWebP } from "@/lib/image/optimizer";
import { getImageHash } from "@/lib/image/hash";

import { detectIntent } from "@/lib/intent/detectIntent";
import { buildQueries } from "@/lib/intent/queryBuilder";

const WIKI_MAX_IMAGES = 2;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
    try {
        const { city, place, count } = await req.json();

        if (
            !city ||
            !place ||
            !count ||
            typeof count !== "number" ||
            count < 1 ||
            count > 50
        ) {
            return NextResponse.json(
                { status: "ERROR", message: "Invalid input" },
                { status: 400 }
            );
        }

        const intent = detectIntent(place);
        const queryVariants = buildQueries(place, city, intent);

        let rawImages: { url: string }[] = [];

        //Wikimedia first (place-specific)
        try {
            const wikiImages = await fetchFromWikimedia(place, city, WIKI_MAX_IMAGES);

            for (const img of wikiImages) {
                rawImages.push({
                    url: wikimediaFilePath(img.fileName)
                });
            }
        } catch (e) {
            console.warn("Wikimedia skipped (error or rate limit)");
        }

        // If still not enough, fallback to stock APIs
        if (rawImages.length < count) {
            for (const q of queryVariants) {
                rawImages.push(
                    ...(await unsplashSearch(q, 5)),
                    ...(await pexelsSearch(q, 5))
                );

                if (rawImages.length >= count * 2) break;
            }
        }

        if (rawImages.length === 0) {
            return NextResponse.json(
                {
                    status: "ERROR",
                    uploaded: 0,
                    message: "No images found for this place",
                },
                { status: 404 }
            );
        }

        const citySlug = slugify(city, { lower: true, strict: true });
        const placeSlug = slugify(place, { lower: true, strict: true });

        const downloadDir = path.join(
            process.cwd(),
            "downloads",
            citySlug,
            placeSlug
        );

        await fs.mkdir(downloadDir, { recursive: true });

        let uploaded = 0;
        const seenHashes = new Set<string>();

        for (let i = 0; i < rawImages.length && uploaded < count; i++) {
            try {
                const buffer = await toWebP(rawImages[i].url);

                const hash = await getImageHash(buffer);
                if (seenHashes.has(hash)) continue;

                seenHashes.add(hash);

                const filePath = path.join(downloadDir, `${uploaded + 1}.webp`);
                await fs.writeFile(filePath, buffer);

                uploaded++;

                // polite delay for ALL sources
                await sleep(1000);
            } catch (err: any) {
                // IMPORTANT: no retry here
                console.warn("Image skipped:", err?.response?.status || err.message);
                continue;
            }
        }

        return NextResponse.json({
            status: uploaded === count ? "SUCCESS" : "PARTIAL",
            uploaded,
        });
    } catch (err: any) {
        console.error("Ingest failed:", err?.message, err);
        return NextResponse.json(
            {
                status: "ERROR",
                message: err?.message || "Internal server error",
            },
            { status: 500 }
        );
    }
}

export function wikimediaFilePath(fileName: string) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
}
