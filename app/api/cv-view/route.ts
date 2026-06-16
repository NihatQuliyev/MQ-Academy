import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "URL tələb olunur" }, { status: 400 });

  try {
    // public_id-ni URL-dən çıxar (extension daxil)
    const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) return NextResponse.json({ error: "URL formatı yanlışdır" }, { status: 400 });

    const publicId = match[1];

    // Format boş — raw fayllar üçün extension public_id-nin içindədir
    const downloadUrl = cloudinary.utils.private_download_url(publicId, "", {
      resource_type: "raw",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      attachment: false,
    });

    return NextResponse.redirect(downloadUrl);
  } catch (err) {
    console.error("CV view error:", err);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}
