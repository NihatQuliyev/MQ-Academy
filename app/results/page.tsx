"use client";
import { useState } from "react";

interface Q {
  num: number;
  text: string;
  studentAnswer: string | null;
  correctAnswer: string;
  status: "ok" | "err" | "empty";
}

interface SubjectResult {
  name: string;
  coeff: number;
  from: number;
  to: number;
  correct: number;
  wrong: number;
  empty: number;
  nisbibal: number;
  questions: Q[];
}

interface ResultData {
  studentCode: string;
  studentName: string;
  branch: string;
  examName: string;
  examDate: string;
  examType: string;
  examGroup: string;
  variant: string;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
  total: number;
  questions: Q[];
  subjects: SubjectResult[] | null;
}

export default function ResultsPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async (searchCode?: string) => {
    const c = (searchCode || code).trim().toUpperCase();
    if (!c) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/results?code=${encodeURIComponent(c)}`);
      const data = await res.json();
      if (!res.ok || data.error) setError(data.error || "Tələbə tapılmadı");
      else setResult(data);
    } catch {
      setError("Xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">Nəticələrim</div>
        <h1 className="text-4xl md:text-5xl font-medium leading-none tracking-tighter text-ink max-w-4xl">
          Tələbə kodunuzla <span className="text-orange">nəticənizə</span> baxın.
        </h1>
      </section>

      <section className="px-6 md:px-12 pb-24">
        {/* Search box */}
        <div className="rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden" style={{ background: "#2C1A0E" }}>
          <div className="absolute top-0 right-0 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(238,106,26,0.5), transparent 70%)" }} />
          <div className="relative max-w-2xl">
            <h3 className="text-xl md:text-3xl font-medium text-white mb-3 tracking-tight">
              Sınaq imtahanının <span className="text-orange-2">tam nəticəsi.</span>
            </h3>
            <p className="text-sm text-white/60 mb-7">
              Hər fənn üzrə cavab cədvəlinizi, düzgün/səhv statistikanızı və ümumi balınızı görün.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && lookup()}
                placeholder="Tələbə kodunuz — məs: MQ-2026-0001"
                className="flex-1 bg-white/[0.06] border border-white/12 text-white placeholder-white/40 px-5 py-3.5 rounded-xl text-sm font-medium outline-none focus:border-orange transition-colors"
              />
              <button onClick={() => lookup()} disabled={loading}
                className="btn btn-orange px-7 disabled:opacity-50">
                {loading ? "..." : "Axtar"}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-brand-red-soft border border-brand-red/20 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold text-ink mb-2">Tələbə tapılmadı</h3>
            <p className="text-sm text-muted">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-5">
            {/* Header card */}
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-7">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">Tələbə məlumatları</div>
                  <h2 className="text-2xl font-semibold text-ink tracking-tight mb-1">{result.studentName}</h2>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-3 mt-2">
                    <span>🆔 {result.studentCode}</span>
                    <span>📍 {result.branch} filialı</span>
                    <span>📅 {result.examDate}</span>
                    {result.examGroup && <span>📋 İxtisas qrupu: {result.examGroup}</span>}
                    {result.variant && <span>🅰 Variant: {result.variant}</span>}
                  </div>
                  <div className="mt-2 text-sm font-medium text-ink">{result.examName}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-1">Ümumi bal</div>
                  <div className="text-6xl font-semibold text-orange leading-none tracking-tighter">{result.score}</div>
                  {result.subjects && (
                    <div className="text-xs text-muted mt-2 max-w-[220px] text-right">
                      {result.subjects.map((s, i) => (
                        <span key={s.name}>{i > 0 && " + "}{s.coeff}×{s.correct}</span>
                      ))} = {result.score}
                    </div>
                  )}
                </div>
              </div>

              {/* Global stats bar */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-ink/[0.06]">
                {[
                  { label: "Düzgün", val: result.correct, color: "text-brand-green", bg: "bg-brand-green-soft" },
                  { label: "Səhv",   val: result.wrong,   color: "text-brand-red",   bg: "bg-brand-red-soft" },
                  { label: "Boş",    val: result.empty,   color: "text-muted",       bg: "bg-paper" },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
                    <div className={`text-3xl font-semibold ${s.color} tracking-tight`}>{s.val}</div>
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject blocks */}
            {result.subjects
              ? result.subjects.map((sub) => (
                  <SubjectBlock key={sub.name} subject={sub} />
                ))
              : (
                <SingleBlock questions={result.questions} examName={result.examName} />
              )}
          </div>
        )}
      </section>
    </>
  );
}

function SubjectBlock({ subject }: { subject: SubjectResult }) {
  return (
    <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
      {/* Subject header */}
      <div className="px-6 py-4 bg-paper border-b border-ink/[0.08] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="font-semibold text-ink">{subject.name}</div>
          {subject.coeff > 1 && (
            <span className="bg-orange-tint text-orange-deep text-xs font-bold px-2 py-0.5 rounded-full">
              ×{subject.coeff} əmsal
            </span>
          )}
          <span className="text-xs text-muted">
            Sual {subject.from + 1}–{subject.to + 1}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-brand-green font-semibold">✓ {subject.correct}</span>
          <span className="text-brand-red font-semibold">✗ {subject.wrong}</span>
          <span className="text-muted">— {subject.empty}</span>
          <span className="bg-orange-tint text-orange-deep font-bold px-3 py-1 rounded-lg text-sm">
            {subject.nisbibal} bal
          </span>
        </div>
      </div>

      {/* Answer grid */}
      <div className="p-5 overflow-x-auto">
        <AnswerGrid questions={subject.questions} offset={subject.from} />
      </div>
    </div>
  );
}

function SingleBlock({ questions, examName }: { questions: Q[]; examName: string }) {
  const correct = questions.filter((q) => q.status === "ok").length;
  const wrong = questions.filter((q) => q.status === "err").length;
  const empty = questions.filter((q) => q.status === "empty").length;

  return (
    <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 bg-paper border-b border-ink/[0.08] flex items-center justify-between flex-wrap gap-3">
        <div className="font-semibold text-ink">{examName}</div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-brand-green font-semibold">✓ {correct}</span>
          <span className="text-brand-red font-semibold">✗ {wrong}</span>
          <span className="text-muted">— {empty}</span>
        </div>
      </div>
      <div className="p-5 overflow-x-auto">
        <AnswerGrid questions={questions} offset={0} />
      </div>
    </div>
  );
}

function AnswerGrid({ questions, offset }: { questions: Q[]; offset: number }) {
  // Split into rows of 25
  const ROW_SIZE = 25;
  const rows: Q[][] = [];
  for (let i = 0; i < questions.length; i += ROW_SIZE) {
    rows.push(questions.slice(i, i + ROW_SIZE));
  }

  return (
    <div className="space-y-4">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx}>
          <table className="w-full border-collapse text-center text-sm" style={{ minWidth: row.length * 40 }}>
            <thead>
              <tr>
                {/* Label column */}
                <td className="w-24 text-left pr-3 text-xs text-muted font-semibold py-1">Sual №</td>
                {row.map((q) => (
                  <td key={q.num} className="w-10 text-xs text-muted font-medium py-1">
                    {q.num}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Correct answers row */}
              <tr>
                <td className="text-left pr-3 text-xs font-semibold text-ink-3 py-1 whitespace-nowrap">Düzgün cavab</td>
                {row.map((q) => (
                  <td key={q.num} className="py-0.5 px-0.5">
                    <div className="w-9 h-9 mx-auto rounded-lg bg-paper border border-ink/[0.1] flex items-center justify-center text-xs font-bold text-ink">
                      {q.correctAnswer}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Student answers row */}
              <tr>
                <td className="text-left pr-3 text-xs font-semibold text-ink-3 py-1 whitespace-nowrap">Sizin cavab</td>
                {row.map((q) => {
                  const bg =
                    q.status === "ok"
                      ? "bg-brand-green text-white border-brand-green"
                      : q.status === "err"
                      ? "bg-brand-red text-white border-brand-red"
                      : "bg-paper text-muted border-ink/[0.1]";
                  return (
                    <td key={q.num} className="py-0.5 px-0.5">
                      <div className={`w-9 h-9 mx-auto rounded-lg border flex items-center justify-center text-xs font-bold ${bg}`}>
                        {q.studentAnswer || "–"}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Status indicator row */}
              <tr>
                <td className="text-left pr-3 text-xs text-muted py-1">Status</td>
                {row.map((q) => (
                  <td key={q.num} className="py-0.5 px-0.5">
                    <div className="w-9 mx-auto text-center text-base">
                      {q.status === "ok" ? (
                        <span className="text-brand-green">+</span>
                      ) : q.status === "err" ? (
                        <span className="text-brand-red">–</span>
                      ) : (
                        <span className="text-muted">·</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted pt-2 border-t border-ink/[0.06]">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-brand-green inline-block" />Düzgün
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-brand-red inline-block" />Səhv
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-paper border border-ink/[0.1] inline-block" />Boş
        </span>
      </div>
    </div>
  );
}
