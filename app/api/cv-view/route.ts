import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "URL tələb olunur" }, { status: 400 });

  // Birbaşa Cloudinary URL-inə yönləndir — proxy fetch Cloudinary-dən 401 alır
  return NextResponse.redirect(url);
}
