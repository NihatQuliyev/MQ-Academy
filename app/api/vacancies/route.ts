import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { deleteCv } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all");
  const where = all === "1" ? {} : { active: true };
  const vacancies = await prisma.vacancy.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(vacancies);
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    const body = await req.json();
    const v = await prisma.vacancy.create({ data: body });
    return NextResponse.json(v, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const v = await prisma.vacancy.update({ where: { id }, data });
    return NextResponse.json(v);
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "ID tələb olunur" }, { status: 400 });

    // Bu vakansiyaya aid bütün CV-ləri Cloudinary-dən sil
    const applications = await prisma.vacancyApplication.findMany({
      where: { vacancyId: id },
      select: { cvPath: true },
    });

    for (const app of applications) {
      if (app.cvPath) await deleteCv(app.cvPath);
    }

    await prisma.vacancy.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
