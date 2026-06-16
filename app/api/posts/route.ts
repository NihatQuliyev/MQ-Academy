import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { deleteImage, extractPublicId } from "@/lib/cloudinary";

const MAX_POSTS = 8;

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

    // 8-dən çox post varsa ən köhnəsini sil
    const allPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, image: true },
    });

    if (allPosts.length > MAX_POSTS) {
      const toDelete = allPosts.slice(MAX_POSTS);
      for (const old of toDelete) {
        if (old.image) {
          const pid = extractPublicId(old.image);
          if (pid) await deleteImage(pid);
        }
        await prisma.post.delete({ where: { id: old.id } });
      }
    }

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

    const post = await prisma.post.findUnique({ where: { id }, select: { image: true } });
    if (post?.image) {
      const pid = extractPublicId(post.image);
      if (pid) await deleteImage(pid);
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
