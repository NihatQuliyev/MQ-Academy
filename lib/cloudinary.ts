import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: File,
  folder = "mq-posts"
): Promise<{ url: string; publicId: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image" }, (err, result) => {
        if (err || !result) return reject(err ?? new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      })
      .end(buffer);
  });
}

export async function uploadRaw(
  file: File,
  folder = "mq-cvs"
): Promise<{ url: string; publicId: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
  // PDF üçün Cloudinary /image/upload/-də extension özü əlavə edir, doc/docx üçün əlavə etmir
  const publicId = ext === "pdf"
    ? `${Date.now()}-${Math.random().toString(36).slice(2)}`
    : `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: "auto", public_id: publicId },
        (err, result) => {
          if (err || !result) return reject(err ?? new Error("Upload failed"));
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      )
      .end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch {/* ignore */}
}

export async function deleteRaw(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch {/* ignore */}
}

/** CV URL-dən resource_type-ı təyin edib Cloudinary-dən silir */
export async function deleteCv(url: string): Promise<void> {
  if (!url || !url.includes("cloudinary.com")) return;
  try {
    const isImage = url.includes("/image/upload/");
    const resourceType = isImage ? "image" : "raw";
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) return;
    // image type-da Cloudinary publicId extensionsiz saxlayır; raw-da extension daxildir
    let publicId = match[1];
    if (isImage) publicId = publicId.replace(/\.[^./]+$/, "");
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch {/* ignore */}
}

/** Cloudinary URL-dən public_id çıxarır */
export function extractPublicId(url: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return null;
  const publicId = match[1];
  // image type-da publicId extensionsiz, raw-da extension daxildir
  if (url.includes("/image/upload/")) return publicId.replace(/\.[^./]+$/, "");
  return publicId;
}
