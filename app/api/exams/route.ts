import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const type = req.nextUrl.searchParams.get("type");
  const active = req.nextUrl.searchParams.get("active");
  const where: { active?: boolean; category?: string; type?: string } = {};
  // "all" göndərilibsə admin bütün imtahanları görür, əks halda yalnız aktiv
  if (active !== "all") where.active = true;
  if (category) where.category = category;
  if (type) where.type = type;
  const exams = await prisma.examDate.findMany({ where, orderBy: { date: "asc" } });
  return NextResponse.json(
    exams.map((e) => {
      let topics = [];
      try { topics = JSON.parse(e.topics); } catch { topics = []; }
      return { ...e, topics };
    })
  );
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    const body = await req.json();
    const exam = await prisma.examDate.create({
      data: { ...body, topics: JSON.stringify(body.topics || []) },
    });
    return NextResponse.json(exam, { status: 201 });
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
    if (data.topics) data.topics = JSON.stringify(data.topics);
    const exam = await prisma.examDate.update({ where: { id }, data });
    return NextResponse.json(exam);
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
    await prisma.examDate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
