import axios from "axios";

export async function pexelsSearch(query: string, limit: number) {
    const res = await axios.get(
        "https://api.pexels.com/v1/search",
        {
            params: {
                query,
                per_page: limit,
                orientation: "landscape",
            },
            headers: {
                Authorization: process.env.PEXELS_KEY!
            }
        }
    );

    return res.data.photos.map((photo: any) => ({
        url: photo.src.original,
        source: "pexels",
    }));
}
