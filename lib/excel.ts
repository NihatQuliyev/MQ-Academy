import * as XLSX from "xlsx";

export interface ExamResultRow {
  studentCode: string;
  studentName: string;
  branch: string;
  answers: string[]; // per-question student answers
}

export function parseResultsExcel(buffer: ArrayBuffer): ExamResultRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });

  return rows.map((row) => {
    // Expected columns: Tələbə kodu, Ad Soyad, Filial, C1, C2, ... CN
    const answerKeys = Object.keys(row).filter((k) => /^C\d+$/i.test(k));
    const answers = answerKeys.map((k) => row[k] || "");
    return {
      studentCode: String(row["Tələbə kodu"] || row["studentCode"] || "").trim(),
      studentName: String(row["Ad Soyad"] || row["studentName"] || "").trim(),
      branch: String(row["Filial"] || row["branch"] || "").trim(),
      answers,
    };
  }).filter((r) => r.studentCode);
}

export function gradeAnswers(
  studentAnswers: string[],
  correctAnswers: string[]
): { correct: number; wrong: number; empty: number; score: number } {
  let correct = 0, wrong = 0, empty = 0;
  const total = correctAnswers.length;

  for (let i = 0; i < total; i++) {
    const s = (studentAnswers[i] || "").trim().toUpperCase();
    const c = (correctAnswers[i] || "").trim().toUpperCase();
    if (!s) empty++;
    else if (s === c) correct++;
    else wrong++;
  }

  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { correct, wrong, empty, score };
}
