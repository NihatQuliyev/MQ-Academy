import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/topics?examId=X          → all language sections for that exam (public)
// GET /api/topics?examId=X&dil=az   → subjects for one specific language (public)
// GET /api/topics?bolme=X&sinif=Y&qrup=Z → legacy section lookup
// GET /api/topics?meta=1            → legacy meta
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // --- Exam-based topics ---
  const examId = searchParams.get("examId");
  if (examId) {
    const dil = searchParams.get("dil");

    const sections = await prisma.topicSection.findMany({
      where: { examId: Number(examId) },
      include: {
        subjects: {
          orderBy: { order: "asc" },
          include: { items: { orderBy: { order: "asc" } } },
        },
      },
      orderBy: { dil: "asc" },
    });

    if (sections.length === 0) return NextResponse.json({ sections: [] });

    // If specific dil requested, return subjects for that section
    if (dil) {
      const sec = sections.find((s) => s.dil === dil);
      return NextResponse.json({ subjects: sec?.subjects ?? [] });
    }

    // Return all sections (with dil + subjects)
    return NextResponse.json({
      sections: sections.map((s) => ({
        dil: s.dil,
        subjects: s.subjects,
      })),
    });
  }

  // --- Legacy: meta ---
  if (searchParams.get("meta") === "1") {
    const sections = await prisma.topicSection.findMany({
      where: { bolme: { not: "" } },
      select: { bolme: true, sinif: true, qrup: true },
      orderBy: [{ bolme: "asc" }, { sinif: "asc" }, { qrup: "asc" }],
    });
    const bolmeler = Array.from(new Set(sections.map((s) => s.bolme)));
    return NextResponse.json({ sections, bolmeler });
  }

  // --- Legacy: bolme/sinif/qrup ---
  const bolme = searchParams.get("bolme");
  const sinif = searchParams.get("sinif");
  const qrup  = searchParams.get("qrup");

  if (!bolme || !sinif || !qrup) {
    return NextResponse.json({ error: "bolme, sinif, qrup tələb olunur" }, { status: 400 });
  }

  const section = await prisma.topicSection.findFirst({
    where: { bolme, sinif, qrup },
    include: {
      subjects: {
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!section) return NextResponse.json({ error: "Tapılmadı" }, { status: 404 });
  return NextResponse.json(section);
}
