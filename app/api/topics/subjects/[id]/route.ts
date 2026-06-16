import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const { name, order } = await req.json();
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: "ID tələb olunur" }, { status: 400 });

    const subject = await prisma.topicSubject.update({
      where: { id },
      data: { ...(name !== undefined && { name }), ...(order !== undefined && { order }) },
    });
    return NextResponse.json(subject);
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: "ID tələb olunur" }, { status: 400 });
    await prisma.topicSubject.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Silinərkən xəta baş verdi" }, { status: 500 });
  }
}
