import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { gradeAnswers } from "@/lib/excel";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest) {
  // Admin: list all results
  if (req.nextUrl.searchParams.get("all") === "true") {
    const deny = await requireAdmin();
    if (deny) return deny;
    const results = await prisma.result.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json(results);
  }

  // Public: look up by student code
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Kod tələb olunur" }, { status: 400 });

  const row = await prisma.result.findFirst({
    where: { studentCode: code.trim().toUpperCase() },
    orderBy: { createdAt: "desc" },
  });

  if (!row) return NextResponse.json({ error: "Bu kod bazada tapılmadı" }, { status: 404 });

  let answers: (string | null)[] = [];
  let correctAnswers: string[] = [];
  let questionTexts: string[] = [];

  try {
    answers = JSON.parse(row.answers);
    correctAnswers = JSON.parse(row.correctAnswers);
    questionTexts = JSON.parse(row.questions);
  } catch {
    return NextResponse.json({ error: "Məlumat oxunarkən xəta baş verdi" }, { status: 500 });
  }

  let subjectsConfig: { name: string; from: number; to: number; coeff: number }[] | null = null;
  let examGroup = "";
  let variant = "";
  let examTypeName = row.examType;

  try {
    const parsed = JSON.parse(row.examType);
    if (parsed && Array.isArray(parsed.subjects)) {
      subjectsConfig = parsed.subjects;
      examGroup = parsed.group || "";
      variant = parsed.variant || "";
      examTypeName = parsed.type || row.examType;
    }
  } catch {
    // plain string examType
  }

  const questions = correctAnswers.map((correct, i) => {
    const student = answers[i] || null;
    const status: "ok" | "err" | "empty" = !student
      ? "empty"
      : student.toUpperCase() === correct.toUpperCase()
      ? "ok"
      : "err";
    return {
      num: i + 1,
      text: questionTexts[i] || `Sual ${i + 1}`,
      studentAnswer: student,
      correctAnswer: correct,
      status,
    };
  });

  const subjects = subjectsConfig
    ? subjectsConfig.map((sub) => {
        const subQuestions = questions.slice(sub.from, sub.to + 1);
        const correct = subQuestions.filter((q) => q.status === "ok").length;
        const wrong = subQuestions.filter((q) => q.status === "err").length;
        const empty = subQuestions.filter((q) => q.status === "empty").length;
        const nisbibal = correct * sub.coeff;
        return { name: sub.name, coeff: sub.coeff, from: sub.from, to: sub.to, correct, wrong, empty, nisbibal, questions: subQuestions };
      })
    : null;

  return NextResponse.json({
    studentCode: row.studentCode,
    studentName: row.studentName,
    branch: row.branch,
    examName: row.examName,
    examDate: row.examDate,
    examType: examTypeName,
    examGroup,
    variant,
    score: row.score,
    correct: row.correct,
    wrong: row.wrong,
    empty: row.empty,
    total: row.total,
    questions,
    subjects,
  });
}

// Admin: bulk upload results via JSON
export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const body = await req.json();
    const { examName, examDate, examType, correctAnswers, questionTexts, students } = body as {
      examName: string;
      examDate: string;
      examType: string;
      correctAnswers: string[];
      questionTexts: string[];
      students: { code: string; name: string; branch: string; answers: (string | null)[] }[];
    };

    const results = students.map((s) => {
      // Cavab sayını düzəlt — çatışmayan cavabları boş say
      const normalizedAnswers = correctAnswers.map((_, i) => s.answers[i] || "");
      const graded = gradeAnswers(normalizedAnswers, correctAnswers);
      return {
        studentCode: s.code.trim().toUpperCase(),
        studentName: s.name,
        branch: s.branch,
        examName,
        examDate,
        examType,
        score: graded.score,
        correct: graded.correct,
        wrong: graded.wrong,
        empty: graded.empty,
        total: correctAnswers.length,
        answers: JSON.stringify(normalizedAnswers),
        correctAnswers: JSON.stringify(correctAnswers),
        questions: JSON.stringify(questionTexts),
      };
    });

    await prisma.result.createMany({ data: results });
    return NextResponse.json({ success: true, count: results.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }
}
