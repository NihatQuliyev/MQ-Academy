import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import prisma from "@/lib/db";
import { gradeAnswers } from "@/lib/excel";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: NextRequest) {
  const deny = await requireAdmin();
  if (deny) return deny;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const examName = formData.get("examName") as string;
    const examDate = formData.get("examDate") as string;
    const examType = formData.get("examType") as string;
    const correctAnswersStr = formData.get("correctAnswers") as string;
    const questionTextsStr = formData.get("questionTexts") as string;

    if (!file) return NextResponse.json({ error: "Fayl seçilməyib" }, { status: 400 });
    if (!examName || !examDate) return NextResponse.json({ error: "İmtahan adı və tarixi tələb olunur" }, { status: 400 });

    // Validate file type
    const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"];
    const allowedExts = [".xlsx", ".xls", ".csv"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!allowedExts.includes(ext)) {
      return NextResponse.json({ error: "Yalnız .xlsx, .xls, .csv faylları qəbul edilir" }, { status: 400 });
    }

    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Fayl ölçüsü 10MB-dan çox ola bilməz" }, { status: 400 });
    }

    const correctAnswers: string[] = JSON.parse(correctAnswersStr || "[]");
    const questionTexts: string[] = JSON.parse(questionTextsStr || "[]");

    const bytes = await file.arrayBuffer();
    const workbook = XLSX.read(bytes, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });

    const results = rows
      .filter((row) => row["Tələbə kodu"] || row["studentCode"])
      .map((row) => {
        const studentCode = String(row["Tələbə kodu"] || row["studentCode"] || "").trim().toUpperCase();
        const studentName = String(row["Ad Soyad"] || row["studentName"] || "").trim();
        const branch = String(row["Filial"] || row["branch"] || "").trim();

        const answerKeys = Object.keys(row)
          .filter((k) => /^[CQ]\d+$/i.test(k))
          .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
        const answers = answerKeys.map((k) => (row[k] || "").trim());

        const graded = gradeAnswers(answers, correctAnswers);

        return {
          studentCode,
          studentName,
          branch,
          examName,
          examDate,
          examType,
          score: graded.score,
          correct: graded.correct,
          wrong: graded.wrong,
          empty: graded.empty,
          total: correctAnswers.length,
          answers: JSON.stringify(answers),
          correctAnswers: JSON.stringify(correctAnswers),
          questions: JSON.stringify(questionTexts),
        };
      });

    if (results.length === 0) {
      return NextResponse.json({ error: "Faylda heç bir məlumat tapılmadı" }, { status: 400 });
    }

    await prisma.result.createMany({ data: results });

    return NextResponse.json({ success: true, count: results.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fayl emalı zamanı xəta baş verdi" }, { status: 500 });
  }
}
