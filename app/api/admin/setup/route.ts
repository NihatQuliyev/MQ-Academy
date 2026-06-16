import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

// POST /api/admin/setup
// Yalnız heç bir admin yoxdursa işləyir — ilk admini yaradır
export async function POST(req: NextRequest) {
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    return NextResponse.json({ error: "Admin artıq mövcuddur" }, { status: 403 });
  }

  const { username, password } = await req.json();
  if (!username || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Username və ən azı 6 simvollu şifrə tələb olunur" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.adminUser.create({ data: { username, passwordHash } });

  return NextResponse.json({ ok: true, username: user.username }, { status: 201 });
}
