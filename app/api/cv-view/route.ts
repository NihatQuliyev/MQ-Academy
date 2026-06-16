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
    if (url.includes("/image/upload/")) {
      // public_id-ni çıxar (extensionsiz — image type üçün Cloudinary extension saxlamır)
      const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+)$/);
      if (!match) return NextResponse.json({ error: "URL formatı yanlışdır" }, { status: 400 });
      const withExt = match[1];
      const publicId = withExt.replace(/\.[^./]+$/, ""); // extensionu sil
      const ext = withExt.split(".").pop()?.toLowerCase() || "pdf";

      const signedUrl = cloudinary.url(publicId, {
        resource_type: "image",
        sign_url: true,
        secure: true,
        type: "upload",
        format: ext,
      });
      return NextResponse.redirect(signedUrl);
    }

    if (url.includes("/raw/upload/")) {
      const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
      if (!match) return NextResponse.json({ error: "URL formatı yanlışdır" }, { status: 400 });
      const signedUrl = cloudinary.url(match[1], {
        resource_type: "raw",
        sign_url: true,
        secure: true,
        type: "upload",
      });
      return NextResponse.redirect(signedUrl);
    }

    return NextResponse.json({ error: "URL formatı yanlışdır" }, { status: 400 });
  } catch (err) {
    console.error("CV view error:", err);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}
