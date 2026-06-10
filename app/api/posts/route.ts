import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get("all");
  const where = all === "1" ? {} : { active: true };
  const posts = await prisma.post.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;
  try {
    const body = await req.json();
    const post = await prisma.post.create({ data: body });
    return NextResponse.json(post, { status: 201 });
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
    const post = await prisma.post.update({ where: { id }, data });
    return NextResponse.json(post);
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
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
