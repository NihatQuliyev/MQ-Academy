"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Post { id: number; title: string; content: string; category: string; date: string; active: boolean; image?: string; }
const emptyPost: Omit<Post, "id" | "active"> = { title: "", content: "", category: "Sınaq elanı", date: new Date().toISOString().split("T")[0], image: "" };
const cats = ["Sınaq elanı", "Yeni qrup", "Yay məktəbi", "Endirim / Promo", "Digər"];

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ ...emptyPost });
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch("/api/posts?all=1");
    setPosts(await res.json());
  };

  useEffect(() => { load(); }, []);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/image-upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) setForm((f) => ({ ...f, image: data.url }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? JSON.stringify({ id: editId, ...form }) : JSON.stringify(form);
    await fetch("/api/posts", { method, headers: { "Content-Type": "application/json" }, body });
    setForm({ ...emptyPost }); setEditId(null);
    flash(editId ? "Yeniləndi ✓" : "Əlavə olundu ✓");
    load();
  };

  const del = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    flash("Silindi ✓"); load();
  };

  const edit = (p: Post) => {
    setEditId(p.id);
    setForm({ title: p.title, content: p.content, category: p.category, date: p.date, image: p.image || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-ink mb-7 tracking-tight">Postlar / Xəbərlər</h1>
      {msg && <div className="bg-brand-green-soft text-brand-green text-sm font-semibold px-4 py-3 rounded-xl mb-5">{msg}</div>}

      <div className="bg-white border border-ink/[0.08] rounded-2xl mb-7 overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">
          {editId ? "Postu redaktə et" : "Yeni post əlavə et"}
        </div>
        <form onSubmit={save} className="p-7 space-y-4">
          <div>
            <label className="field-label">Başlıq</label>
            <input className="field-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="20 İyun Riyaziyyat sınağı" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Kateqoriya</label>
              <select className="field-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {cats.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Tarix</label>
              <input type="date" className="field-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </div>
          </div>

          {/* Şəkil yükləmə */}
          <div>
            <label className="field-label">Üz şəkli (üstünlük: 16:9)</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-ink/[0.15] rounded-xl p-5 cursor-pointer hover:border-orange transition-colors flex items-center gap-4"
            >
              {form.image ? (
                <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-20 rounded-lg bg-paper flex items-center justify-center text-muted text-xs flex-shrink-0">
                  Şəkil yox
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-ink">{uploading ? "Yüklənir..." : "Şəkil seç"}</p>
                <p className="text-xs text-muted mt-0.5">JPG, PNG, WEBP · Maks 5MB</p>
                {form.image && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, image: "" })); }}
                    className="text-xs text-brand-red mt-1 hover:underline">Sil</button>
                )}
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} />
          </div>

          <div>
            <label className="field-label">Mətn</label>
            <textarea className="field-input" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Post məzmunu..." required />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={uploading} className="btn btn-orange">{editId ? "Yadda saxla" : "+ Əlavə et"}</button>
            {editId && <button type="button" className="btn btn-ghost" onClick={() => { setEditId(null); setForm({ ...emptyPost }); }}>Ləğv et</button>}
          </div>
        </form>
      </div>

      <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
        <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper text-lg font-semibold text-ink">Mövcud postlar · {posts.length}</div>
        <div className="divide-y divide-ink/[0.06]">
          {posts.map((p) => (
            <div key={p.id} className="px-7 py-4 flex items-center gap-4 hover:bg-paper transition-colors">
              {p.image
                ? <img src={p.image} alt="" className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                : <div className="w-14 h-10 rounded-lg bg-paper border border-ink/[0.08] flex-shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink text-sm">{p.title}</div>
                <div className="flex gap-2 mt-1 text-xs text-muted">
                  <span className="bg-orange-tint text-orange-deep px-2 py-0.5 rounded-full font-medium">{p.category}</span>
                  <span>{p.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(p)} className="w-9 h-9 rounded-xl bg-paper border border-ink/[0.08] text-ink-3 hover:bg-orange-tint hover:text-orange-deep hover:border-orange-soft transition-colors flex items-center justify-center text-sm">✎</button>
                <button onClick={() => del(p.id)} className="w-9 h-9 rounded-xl bg-paper border border-ink/[0.08] text-ink-3 hover:bg-brand-red-soft hover:text-brand-red transition-colors flex items-center justify-center text-sm">✕</button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <div className="px-7 py-10 text-center text-muted text-sm">Hələ heç bir post yoxdur</div>}
        </div>
      </div>
    </div>
  );
}
