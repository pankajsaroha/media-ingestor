import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
    }
});

export async function uploadImage(buffer: Buffer, key: string) {
    await client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: "image/webp",
    }));
}
