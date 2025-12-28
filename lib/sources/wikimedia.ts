import axios from "axios";

/**
 * Fetch Wikimedia Commons image filenames (NOT direct URLs).
 * These filenames must later be downloaded using Special:FilePath.
 */
export async function fetchFromWikimedia(
    place: string,
    city: string,
    limit: number
): Promise<{ fileName: string }[]> {

    const query = `${place} ${city}`;

    const res = await axios.get(
        "https://commons.wikimedia.org/w/api.php",
        {
            params: {
                action: "query",
                format: "json",
                list: "search",
                srsearch: query,
                srnamespace: 6, // File namespace only
                srlimit: limit,
                origin: "*"
            },
            headers: {
                // Wikimedia requires a valid User-Agent for bots
                "User-Agent": "TravelpediaImageBot/1.0 (contact@example.com)"
            }
        }
    );

    const results = res.data?.query?.search;
    if (!results || results.length === 0) {
        return [];
    }

    return results
        .map((r: any) => {
            if (!r.title || !r.title.startsWith("File:")) return null;

            return {
                fileName: r.title.replace("File:", "")
            };
        })
        .filter(Boolean);
}
