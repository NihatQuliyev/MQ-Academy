import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const examId = req.nextUrl.searchParams.get("examId");

  const sections = await prisma.topicSection.findMany({
    where: examId ? { examId: Number(examId) } : undefined,
    include: {
      subjects: {
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
    },
    orderBy: { dil: "asc" },
  });
  return NextResponse.json(sections);
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const body = await req.json();
    const { examId, bolme, sinif, qrup, dil } = body;

    const section = await prisma.topicSection.create({
      data: {
        examId: examId ? Number(examId) : null,
        bolme: bolme || "",
        sinif: sinif || "",
        qrup: qrup || "",
        dil: dil || "az",
      },
    });
    return NextResponse.json(section, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
