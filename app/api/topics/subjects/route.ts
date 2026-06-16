import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const { sectionId, name, order } = await req.json();
    if (!sectionId || !name)
      return NextResponse.json({ error: "sectionId və name tələb olunur" }, { status: 400 });

    const subject = await prisma.topicSubject.create({
      data: { sectionId: Number(sectionId), name, order: order ?? 0 },
      include: { items: true },
    });
    return NextResponse.json(subject, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
