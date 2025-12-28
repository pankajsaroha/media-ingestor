import axios from "axios";

export async function unsplashSearch(query: string, limit: number) {
    const res = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
            params: {
                query,
                per_page: limit,
                orientation: "landscape",
            },
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`,
            }
        }
    );

    return res.data.results.map((result: any) => ({
        url: result.urls.raw + "&w=2000",
        source: "unsplash",
    }));
}