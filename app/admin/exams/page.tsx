"use client";
import { useEffect, useState } from "react";

interface Exam {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  branch: string;
  grade: string;
  note: string;
  active: boolean;
}

const empty: Omit<Exam, "id" | "active"> = {
  name: "", category: "abituriyent", date: "", time: "",
  duration: "180 dəq", branch: "Bütün filiallar", grade: "", note: "",
};

export default function AdminExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await fetch("/api/exams?active=all");
    const data = await res.json();
    setExams(data);
  };

  useEffect(() => { load(); }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, type: "blok", topics: [] };
    const method = editId ? "PUT" : "POST";
    const body = editId ? JSON.stringify({ id: editId, ...payload }) : JSON.stringify(payload);
    await fetch("/api/exams", { method, headers: { "Content-Type": "application/json" }, body });
    setForm({ ...empty });
    setEditId(null);
    flash(editId ? "Yeniləndi ✓" : "Əlavə olundu ✓");
    load();
  };

  const startEdit = (exam: Exam) => {
    setEditId(exam.id);
    setForm({
      name: exam.name, category: exam.category, date: exam.date,
      time: exam.time, duration: exam.duration, branch: exam.branch,
      grade: exam.grade, note: exam.note,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await fetch(`/api/exams?id=${id}`, { method: "DELETE" });
    flash("Silindi ✓");
    load();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-ink mb-7 tracking-tight">İmtahan təqvimi idarəetməsi</h1>
      {msg && <div className="bg-brand-green-soft text-brand-green text-sm font-semibold px-4 py-3 rounded-xl mb-5">{msg}</div>}

      {/* Form */}
      <div className="bg-white border border-ink/[0.08] rounded-2xl mb-7 overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">
          {editId ? "İmtahanı redaktə et" : "Yeni imtahan tarixi əlavə et"}
        </div>
        <form onSubmit={save} className="p-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="field-label">İmtahan adı</label>
            <input className="field-input" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Riyaziyyat — Blok sınaq #1" required />
          </div>
          <div>
            <label className="field-label">Kateqoriya</label>
            <select className="field-input" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="ibtidai">İbtidai sinif</option>
              <option value="tekmillesme">Təkmilləşdirmə</option>
              <option value="abituriyent">Abituriyent</option>
              <option value="dil">Xarici dil</option>
            </select>
          </div>
          <div>
            <label className="field-label">Tarix</label>
            <input type="date" className="field-input" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div>
            <label className="field-label">Saat</label>
            <input className="field-input" value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="10:00 – 13:00" required />
          </div>
          <div>
            <label className="field-label">Müddət</label>
            <input className="field-input" value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="180 dəq" />
          </div>
          <div>
            <label className="field-label">Filial</label>
            <select className="field-input" value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}>
              <option>Bütün filiallar</option>
              <option>İnşaatçılar</option>
              <option>Xalqlar</option>
              <option>Xırdalan</option>
              <option>Binəqədi</option>
            </select>
          </div>
          <div>
            <label className="field-label">Sinif aralığı</label>
            <input className="field-input" value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              placeholder="9–11 siniflər" required />
          </div>
          <div className="md:col-span-2">
            <label className="field-label">Qeyd (isteğe bağlı)</label>
            <textarea className="field-input" rows={2} value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Əlavə məlumat..." />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="btn btn-orange">
              {editId ? "Yadda saxla" : "+ Əlavə et"}
            </button>
            {editId && (
              <button type="button" className="btn btn-ghost"
                onClick={() => { setEditId(null); setForm({ ...empty }); }}>
                Ləğv et
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">
          Mövcud imtahan tarixləri · {exams.length}
        </div>
        <div className="divide-y divide-ink/[0.06]">
          {exams.map((exam) => (
            <div key={exam.id} className="px-7 py-5 flex items-center gap-4 hover:bg-paper transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-tint flex items-center justify-center text-orange-deep font-semibold text-base flex-shrink-0">
                {exam.date.split("-")[2]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink text-sm">{exam.name}</div>
                <div className="text-xs text-muted mt-0.5">{exam.date} · {exam.branch} · {exam.grade}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(exam)}
                  className="w-9 h-9 rounded-xl bg-paper border border-ink/[0.08] text-ink-3 hover:bg-orange-tint hover:text-orange-deep hover:border-orange-soft transition-colors flex items-center justify-center text-sm">✎</button>
                <button onClick={() => del(exam.id)}
                  className="w-9 h-9 rounded-xl bg-paper border border-ink/[0.08] text-ink-3 hover:bg-brand-red-soft hover:text-brand-red hover:border-brand-red/20 transition-colors flex items-center justify-center text-sm">✕</button>
              </div>
            </div>
          ))}
          {exams.length === 0 && (
            <div className="px-7 py-10 text-center text-muted text-sm">Hələ heç bir imtahan yoxdur</div>
          )}
        </div>
      </div>
    </div>
  );
}
