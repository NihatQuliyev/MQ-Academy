"use client";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [cur, setCur]       = useState("");
  const [next, setNext]     = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg]       = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setMsg(null);
    if (next !== confirm) { setMsg({ ok: false, text: "Yeni şifrələr uyğun deyil" }); return; }
    if (next.length < 6)  { setMsg({ ok: false, text: "Şifrə ən azı 6 simvol olmalıdır" }); return; }

    setLoading(true);
    const r = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: cur, newPassword: next }),
    });
    const d = await r.json();
    if (r.ok) {
      setMsg({ ok: true, text: "Şifrə uğurla dəyişdirildi" });
      setCur(""); setNext(""); setConfirm("");
    } else {
      setMsg({ ok: false, text: d.error || "Xəta baş verdi" });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-lg">
      <h1 className="text-2xl font-bold text-ink mb-1">Tənzimləmələr</h1>
      <p className="text-sm text-muted mb-8">Admin şifrəsini dəyişdirin</p>

      <div className="bg-white border border-ink/[0.08] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-ink uppercase tracking-widest mb-2">Şifrəni dəyiş</h2>

        <div>
          <label className="block text-xs text-muted mb-1">Cari şifrə</label>
          <input type="password" value={cur} onChange={(e) => setCur(e.target.value)}
            className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Yeni şifrə</label>
          <input type="password" value={next} onChange={(e) => setNext(e.target.value)}
            className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Yeni şifrəni təsdiqlə</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange" />
        </div>

        {msg && (
          <div className={`text-sm font-medium px-4 py-3 rounded-xl ${
            msg.ok ? "bg-brand-green-soft text-brand-green" : "bg-brand-red-soft text-brand-red"
          }`}>
            {msg.ok ? "✓ " : "✗ "}{msg.text}
          </div>
        )}

        <button onClick={submit} disabled={loading || !cur || !next || !confirm}
          className="w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange-deep transition-colors disabled:opacity-40 text-sm">
          {loading ? "Dəyişdirilir..." : "Şifrəni dəyiş"}
        </button>
      </div>

      <div className="mt-6 bg-paper border border-ink/[0.08] rounded-2xl p-5">
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Təhlükəsizlik məlumatı</h3>
        <ul className="text-xs text-muted space-y-1.5">
          <li>✓ Şifrə bcrypt ilə hash-lənərək bazada saxlanılır</li>
          <li>✓ Düz mətn heç vaxt saxlanılmır</li>
          <li>✓ Şifrə .env faylında artıq yoxdur</li>
        </ul>
      </div>
    </div>
  );
}
