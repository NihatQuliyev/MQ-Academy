import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Admin only — list all applications
export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const vacancyId = req.nextUrl.searchParams.get("vacancyId");
  const apps = await prisma.vacancyApplication.findMany({
    where: vacancyId ? { vacancyId: Number(vacancyId) } : undefined,
    include: { vacancy: { select: { title: true, branch: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(apps);
}

// Public — submit a job application
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const vacancyId = Number(formData.get("vacancyId"));
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const cv = formData.get("cv") as File | null;

    if (!vacancyId || isNaN(vacancyId) || !name || !email || !phone) {
      return NextResponse.json({ error: "Bütün sahələr tələb olunur" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Düzgün e-poçt daxil edin" }, { status: 400 });
    }

    let cvPath = "";
    if (cv && cv.size > 0) {
      const ext = cv.name.split(".").pop()?.toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext || "")) {
        return NextResponse.json({ error: "CV yalnız PDF, DOC, DOCX formatında ola bilər" }, { status: 400 });
      }
      if (cv.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "CV ölçüsü 5MB-dan çox ola bilməz" }, { status: 400 });
      }

      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      if (process.env.BLOB_READ_WRITE_TOKEN) {
        // Production — Vercel Blob
        try {
          const blob = await put(`cv/${filename}`, cv, { access: "public" });
          cvPath = blob.url;
        } catch (blobErr) {
          console.error("Blob upload xətası:", blobErr);
        }
      } else {
        // Lokal development — filesystem-ə yaz, public/uploads/cv/ qovluğuna
        try {
          const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
          await mkdir(uploadDir, { recursive: true });
          const buffer = Buffer.from(await cv.arrayBuffer());
          await writeFile(path.join(uploadDir, filename), buffer);
          cvPath = `/uploads/cv/${filename}`;
        } catch (fsErr) {
          console.error("Fayl yazma xətası:", fsErr);
        }
      }
    }

    const app = await prisma.vacancyApplication.create({
      data: { vacancyId, name, email, phone, cvPath },
    });

    return NextResponse.json(app, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}

// Admin only — delete application
export async function DELETE(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "ID tələb olunur" }, { status: 400 });
    await prisma.vacancyApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
