import axios from "axios";
import sharp from "sharp";

export async function toWebP(url: string) {
    const res = await axios.get(url, {
        responseType: "arraybuffer",
        maxRedirects: 5,
        headers: {
            // Wikimedia requires browser-like headers
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://commons.wikimedia.org/",
        },
        validateStatus: status => status >= 200 && status < 400
    });

    return sharp(res.data)
        .resize({ width: 1600 })
        .webp({ quality: 78 })
        .toBuffer();
}
