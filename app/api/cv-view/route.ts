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

  // URL-dən public_id çıxar (extension daxil — raw fayllar üçün lazımdır)
  const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return NextResponse.redirect(url);

  const publicId = match[1];

  // İmzalı URL yarat — 1 saat keçərli
  const signedUrl = cloudinary.url(publicId, {
    resource_type: "raw",
    sign_url: true,
    secure: true,
    type: "upload",
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  });

  return NextResponse.redirect(signedUrl);
}
