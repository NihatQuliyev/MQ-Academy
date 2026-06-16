import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MIME: Record<string, { type: string; inline: boolean }> = {
  pdf:  { type: "application/pdf",                                                          inline: true  },
  doc:  { type: "application/msword",                                                       inline: false },
  docx: { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  inline: false },
};

export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "URL tələb olunur" }, { status: 400 });

  try {
    const ext = url.split(".").pop()?.toLowerCase().split("?")[0] || "pdf";
    const mime = MIME[ext] ?? { type: "application/octet-stream", inline: false };
    const filename = `cv.${ext}`;
    const disposition = mime.inline
      ? `inline; filename="${filename}"`
      : `attachment; filename="${filename}"`;

    // image/upload URL-lər public — birbaşa redirect et
    if (url.includes("/image/upload/")) {
      return NextResponse.redirect(url);
    }

    if (url.includes("/raw/upload/")) {
      const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
      if (match) {
        const publicId = match[1];
        const signedUrl = cloudinary.url(publicId, {
          resource_type: "raw",
          sign_url: true,
          secure: true,
          type: "upload",
        });
        return NextResponse.redirect(signedUrl);
      }
    }

    console.error("URL pattern tapılmadı:", url);
    return NextResponse.json({ error: "URL formatı yanlışdır", url }, { status: 400 });
  } catch (err) {
    console.error("CV view error:", err);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}
