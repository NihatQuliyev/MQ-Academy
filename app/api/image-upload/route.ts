import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "Fayl tapılmadı" }, { status: 400 });

  const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!allowedExts.includes(ext))
    return NextResponse.json({ error: "Yalnız şəkil faylları qəbul edilir" }, { status: 400 });

  if (file.size > 5 * 1024 * 1024)
    return NextResponse.json({ error: "Fayl ölçüsü 5MB-dan çox ola bilməz" }, { status: 400 });

  try {
    const { url } = await uploadImage(file, "mq-posts");
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Cloudinary upload xətası:", err);
    return NextResponse.json({ error: "Şəkil yüklənmədi" }, { status: 500 });
  }
}
