import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

// Public — send contact message
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Ad və mesaj tələb olunur" }, { status: 400 });
    }

    if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Düzgün email daxil edin" }, { status: 400 });
    }

    if (message.trim().length < 5) {
      return NextResponse.json({ error: "Mesaj çox qısadır" }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: (email || "").trim(),
        phone: (phone || "").trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}

// Admin — list messages
export async function GET() {
  const deny = await requireAdmin();
  if (deny) return deny;

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(messages);
}

// Admin — mark as read
export async function PATCH(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const { id } = await req.json();
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  return NextResponse.json({ ok: true });
}

// Admin — delete message
export async function DELETE(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const id = Number(req.nextUrl.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID tələb olunur" }, { status: 400 });
  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
