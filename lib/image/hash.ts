import sharp from "sharp";

/**
 * Simple perceptual hash using grayscale + resize
 * Good enough for duplicate detection
 */
export async function getImageHash(buffer: Buffer): Promise<string> {
  const resized = await sharp(buffer)
    .resize(32, 32)
    .grayscale()
    .raw()
    .toBuffer();

  // Average pixel value
  const avg =
    resized.reduce((sum, val) => sum + val, 0) / resized.length;

  // Build binary hash
  return Array.from(resized)
    .map(v => (v > avg ? "1" : "0"))
    .join("");
}
