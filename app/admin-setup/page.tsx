"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [msg, setMsg]           = useState<{ ok: boolean; text: string } | null>(null);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  const submit = async () => {
    setMsg(null);
    if (password !== confirm)   { setMsg({ ok: false, text: "Şifrələr uyğun deyil" }); return; }
    if (password.length < 6)    { setMsg({ ok: false, text: "Şifrə ən azı 6 simvol olmalıdır" }); return; }
    if (!username.trim())       { setMsg({ ok: false, text: "İstifadəçi adı boş ola bilməz" }); return; }

    setLoading(true);
    const r = await fetch("/api/admin/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password }),
    });
    const d = await r.json();
    if (r.ok) {
      setDone(true);
    } else {
      setMsg({ ok: false, text: d.error || "Xəta baş verdi" });
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-ink/[0.08] p-10 max-w-sm w-full text-center shadow-xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-ink mb-2">Admin yaradıldı!</h2>
          <p className="text-sm text-muted mb-6">
            İstifadəçi adı: <strong className="text-ink">{username}</strong><br />
            Bu səhifəni artıq silə bilərsiniz.
          </p>
          <button onClick={() => router.push("/admin-login")}
            className="w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange-deep transition-colors text-sm">
            Girişə keç →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-ink/[0.08] p-8 max-w-sm w-full shadow-xl">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="MQ" className="w-14 h-14" />
        </div>
        <h1 className="text-xl font-bold text-ink text-center mb-1">İlk admin quraşdırması</h1>
        <p className="text-xs text-muted text-center mb-6">Bu səhifə yalnız bir dəfə işləyir</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1">İstifadəçi adı</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange" />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">Şifrə (min. 6 simvol)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange" />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">Şifrəni təsdiqlə</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange" />
          </div>

          {msg && (
            <div className={`text-sm font-medium px-4 py-3 rounded-xl ${
              msg.ok ? "bg-brand-green-soft text-brand-green" : "bg-brand-red-soft text-brand-red"
            }`}>
              {msg.text}
            </div>
          )}

          <button onClick={submit} disabled={loading}
            className="w-full bg-orange text-white font-bold py-3 rounded-xl hover:bg-orange-deep transition-colors disabled:opacity-40 text-sm">
            {loading ? "Yaradılır..." : "Admin yarat"}
          </button>
        </div>
      </div>
    </div>
  );
}
