import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const { subjectId, content, order } = await req.json();
    if (!subjectId || !content)
      return NextResponse.json({ error: "subjectId və content tələb olunur" }, { status: 400 });

    const item = await prisma.topicItem.create({
      data: { subjectId: Number(subjectId), content, order: order ?? 0 },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
