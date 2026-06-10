import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/requireAdmin";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "Fayl tapılmadı" }, { status: 400 });

  const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!allowedExts.includes(ext)) {
    return NextResponse.json({ error: "Yalnız şəkil faylları qəbul edilir" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Fayl ölçüsü 5MB-dan çox ola bilməz" }, { status: 400 });
  }

  const filename = `${Date.now()}${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Production — Vercel Blob
    const blob = await put(`images/${filename}`, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } else {
    // Lokal development — filesystem
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, filename), buffer);
    return NextResponse.json({ url: `/uploads/${filename}` });
  }
}
