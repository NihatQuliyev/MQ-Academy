import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "İcazəsiz" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json(
      { error: "Yeni şifrə ən azı 6 simvol olmalıdır" },
      { status: 400 }
    );
  }

  // Session-dakı username ilə düzgün admini tap
  const username = session.user?.name;
  if (!username) return NextResponse.json({ error: "Session xətası" }, { status: 401 });

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) return NextResponse.json({ error: "İstifadəçi tapılmadı" }, { status: 404 });

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Cari şifrə yanlışdır" }, { status: 400 });

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash } });

  return NextResponse.json({ ok: true });
}
