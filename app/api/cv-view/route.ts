import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

const MIME: Record<string, { type: string; inline: boolean }> = {
  pdf:  { type: "application/pdf", inline: true },
  doc:  { type: "application/msword", inline: false },
  docx: { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", inline: false },
};

export async function GET(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "URL tələb olunur" }, { status: 400 });

  try {
    const ext = url.split(".").pop()?.toLowerCase() || "pdf";
    const mime = MIME[ext] ?? { type: "application/octet-stream", inline: false };

    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Fayl tapılmadı", status: res.status }, { status: 404 });
    }

    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mime.type,
        "Content-Disposition": mime.inline ? 'inline; filename="cv.pdf"' : 'attachment; filename="cv.' + ext + '"',
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("CV view error:", err);
    return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
  }
}
