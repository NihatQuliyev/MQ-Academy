"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password, csrfToken: await getCsrfToken(), redirect: "false", callbackUrl: "/admin", json: "true" }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.url && !data?.error) {
      router.push("/admin");
    } else {
      setError("İstifadəçi adı və ya şifrə yanlışdır");
    }
    setLoading(false);
  };

  async function getCsrfToken() {
    const r = await fetch("/api/auth/csrf");
    const d = await r.json();
    return d.csrfToken ?? "";
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="MQ" className="w-20 h-20 mx-auto mb-4 object-contain" style={{ filter: "drop-shadow(0 4px 12px rgba(232,102,15,0.3))" }} />
          <h1 className="text-2xl font-semibold text-ink tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted mt-1">MQ Akademiyası</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-ink/[0.08] rounded-3xl p-8 shadow-md">
          {error && (
            <div className="bg-brand-red-soft text-brand-red text-sm rounded-xl px-4 py-3 mb-5 font-medium">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="field-label">İstifadəçi adı</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}
              className="field-input" placeholder="admin" required autoFocus />
          </div>
          <div className="mb-6">
            <label className="field-label">Şifrə</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="field-input" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading}
            className="btn btn-orange w-full justify-center disabled:opacity-50">
            {loading ? "Yüklənir..." : "Daxil ol"}
          </button>
        </form>
      </div>
    </div>
  );
}
