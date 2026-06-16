"use client";
import { useEffect, useState } from "react";

interface Vacancy { id: number; title: string; branch: string; type: string; requirements: string; publishDate: string; active: boolean; }
const empty: Omit<Vacancy, "id"> = { title: "", branch: "İnşaatçılar", type: "Tam ştat", requirements: "", publishDate: new Date().toISOString().split("T")[0], active: true };

export default function AdminVacancies() {
  const [items, setItems] = useState<Vacancy[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  const load = async () => { const res = await fetch("/api/vacancies?all=1"); setItems(await res.json()); };
  useEffect(() => { load(); }, []);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? JSON.stringify({ id: editId, ...form }) : JSON.stringify(form);
    await fetch("/api/vacancies", { method, headers: { "Content-Type": "application/json" }, body });
    setForm({ ...empty }); setEditId(null);
    flash(editId ? "Yeniləndi ✓" : "Yayımlandı ✓");
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await fetch(`/api/vacancies?id=${id}`, { method: "DELETE" });
    flash("Silindi ✓"); load();
  };

  const edit = (v: Vacancy) => {
    setEditId(v.id); setForm({ title: v.title, branch: v.branch, type: v.type, requirements: v.requirements, publishDate: v.publishDate, active: v.active });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-ink mb-7 tracking-tight">Vakansiyalar</h1>
      {msg && <div className="bg-brand-green-soft text-brand-green text-sm font-semibold px-4 py-3 rounded-xl mb-5">{msg}</div>}

      <div className="bg-white border border-ink/[0.08] rounded-2xl mb-7 overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">
          {editId ? "Vakansiyayı redaktə et" : "Yeni vakansiya əlavə et"}
        </div>
        <form onSubmit={save} className="p-7 space-y-4">
          <div>
            <label className="field-label">Vəzifə</label>
            <input className="field-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Riyaziyyat müəllimi" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="field-label">Filial</label>
              <select className="field-input" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                {["İnşaatçılar", "Xalqlar", "Xırdalan", "Binəqədi"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">İş növü</label>
              <select className="field-input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {["Tam ştat", "Yarım ştat", "Müqavilə"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Yayım tarixi</label>
              <input type="date" className="field-input" value={form.publishDate} onChange={(e) => setForm({ ...form, publishDate: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="field-label">Tələblər və şərtlər</label>
            <textarea className="field-input" rows={4} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} placeholder="Təcrübə, sertifikat, öhdəliklər..." required />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn btn-orange">{editId ? "Yadda saxla" : "+ Yayımla"}</button>
            {editId && <button type="button" className="btn btn-ghost" onClick={() => { setEditId(null); setForm({ ...empty }); }}>Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">Aktiv vakansiyalar · {items.length}</div>
        <div className="divide-y divide-ink/[0.06]">
          {items.map((v) => (
            <div key={v.id} className="px-7 py-4 flex items-start gap-4 hover:bg-paper transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-tint flex items-center justify-center text-orange-deep text-xl flex-shrink-0">💼</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink text-sm">{v.title}</div>
                <div className="flex gap-2 mt-1 text-xs text-muted flex-wrap">
                  <span>📍 {v.branch}</span>
                  <span>⏱ {v.type}</span>
                  <span>📅 {v.publishDate}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => edit(v)} className="w-9 h-9 rounded-xl bg-paper border border-ink/[0.08] text-ink-3 hover:bg-orange-tint hover:text-orange-deep hover:border-orange-soft transition-colors flex items-center justify-center text-sm">✎</button>
                <button onClick={() => del(v.id)} className="w-9 h-9 rounded-xl bg-paper border border-ink/[0.08] text-ink-3 hover:bg-brand-red-soft hover:text-brand-red transition-colors flex items-center justify-center text-sm">✕</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="px-7 py-10 text-center text-muted text-sm">Hələ heç bir vakansiya yoxdur</div>}
        </div>
      </div>
    </div>
  );
}
