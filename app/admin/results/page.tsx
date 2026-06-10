"use client";
import { useEffect, useRef, useState } from "react";

interface Result {
  id: number;
  studentCode: string;
  studentName: string;
  branch: string;
  examName: string;
  examDate: string;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
  total: number;
}

export default function AdminResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    examName: "", examDate: "", examType: "blok",
    correctAnswers: "", questionTexts: "",
  });
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch("/api/results?all=true");
    if (res.ok) {
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    }
  };

  useEffect(() => { load(); }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 4000); };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return flash("Fayl seçin");

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("examName", form.examName);
    fd.append("examDate", form.examDate);
    fd.append("examType", form.examType);
    fd.append("correctAnswers", JSON.stringify(form.correctAnswers.split(",").map((s) => s.trim()).filter(Boolean)));
    fd.append("questionTexts", JSON.stringify(form.questionTexts.split("\n").map((s) => s.trim()).filter(Boolean)));

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      flash(`✓ ${data.count} tələbə nəticəsi yükləndi`);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      load();
    } else {
      flash(`Xəta: ${data.error}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-ink mb-7 tracking-tight">Nəticə yükləmə</h1>
      {msg && <div className={`text-sm font-semibold px-4 py-3 rounded-xl mb-5 ${msg.startsWith("Xəta") ? "bg-brand-red-soft text-brand-red" : "bg-brand-green-soft text-brand-green"}`}>{msg}</div>}

      {/* Upload form */}
      <div className="bg-white border border-ink/[0.08] rounded-2xl mb-7 overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">
          Scanner nəticəsini yüklə (Excel / CSV)
        </div>
        <form onSubmit={handleUpload} className="p-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="field-label">İmtahan adı</label>
              <input className="field-input" value={form.examName} onChange={(e) => setForm({ ...form, examName: e.target.value })} placeholder="Riyaziyyat Blok — İyun 2026" required />
            </div>
            <div>
              <label className="field-label">Tarix</label>
              <input type="date" className="field-input" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} required />
            </div>
          </div>

          <div>
            <label className="field-label">Düzgün cavablar (vergüllə, məs: A,B,C,D,A,B,C,D,A,B)</label>
            <input className="field-input" value={form.correctAnswers} onChange={(e) => setForm({ ...form, correctAnswers: e.target.value })} placeholder="A,B,C,D,A,B,C,D,A,B" required />
          </div>

          <div>
            <label className="field-label">Sual mətnləri (hər sətirdə bir sual — isteğe bağlı)</label>
            <textarea className="field-input" rows={4} value={form.questionTexts} onChange={(e) => setForm({ ...form, questionTexts: e.target.value })} placeholder={"f(x) = 2x + 3, x = 5 olduqda f(x) = ?\nlog₂(8) = ?"} />
          </div>

          <div>
            <label className="field-label">Excel faylı (.xlsx / .csv)</label>
            <div className="border-2 border-dashed border-ink/[0.12] rounded-xl p-8 text-center bg-paper hover:border-orange hover:bg-orange-tint transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}>
              <div className="w-12 h-12 rounded-xl bg-orange text-white flex items-center justify-center text-2xl mx-auto mb-3">⬆</div>
              <p className="font-semibold text-ink text-sm mb-1">{file ? file.name : "Faylı seçin və ya bura atın"}</p>
              <p className="text-xs text-muted">Sütunlar: <code className="bg-white px-1.5 py-0.5 rounded text-ink-2 font-medium border border-ink/[0.08]">Tələbə kodu</code>, <code className="bg-white px-1.5 py-0.5 rounded text-ink-2 font-medium border border-ink/[0.08]">Ad Soyad</code>, <code className="bg-white px-1.5 py-0.5 rounded text-ink-2 font-medium border border-ink/[0.08]">Filial</code>, <code className="bg-white px-1.5 py-0.5 rounded text-ink-2 font-medium border border-ink/[0.08]">C1</code>, <code className="bg-white px-1.5 py-0.5 rounded text-ink-2 font-medium border border-ink/[0.08]">C2</code>...</p>
            </div>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          <button type="submit" disabled={uploading} className="btn btn-orange disabled:opacity-50">
            {uploading ? "Yüklənir..." : "Emal et və yüklə"}
          </button>
        </form>
      </div>

      {/* Results table */}
      <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink flex justify-between items-center">
          <span>Yüklənmiş nəticələr · {results.length} tələbə</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/[0.08] bg-paper">
                {["Tələbə kodu", "Ad Soyad", "Filial", "İmtahan", "Düzgün", "Səhv", "Bal"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/[0.06]">
              {results.slice(0, 20).map((r) => (
                <tr key={r.id} className="hover:bg-paper transition-colors">
                  <td className="px-5 py-3.5 font-medium text-ink">{r.studentCode}</td>
                  <td className="px-5 py-3.5 text-ink-2">{r.studentName}</td>
                  <td className="px-5 py-3.5 text-muted">{r.branch}</td>
                  <td className="px-5 py-3.5 text-muted text-xs">{r.examName}</td>
                  <td className="px-5 py-3.5 text-brand-green font-semibold">{r.correct}</td>
                  <td className="px-5 py-3.5 text-brand-red font-semibold">{r.wrong}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-lg font-semibold text-orange-deep">{r.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {results.length === 0 && (
            <div className="px-7 py-12 text-center text-muted text-sm">Hələ heç bir nəticə yüklənməyib</div>
          )}
        </div>
      </div>
    </div>
  );
}
