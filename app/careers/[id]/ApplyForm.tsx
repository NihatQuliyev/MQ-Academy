"use client";
import { useState, useRef } from "react";

interface Props {
  vacancyId: number;
  vacancyTitle: string;
}

export default function ApplyForm({ vacancyId, vacancyTitle }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "+994 " });

  const formatPhone = (val: string) => {
    // Rəqəmləri çıxar, +994 prefiksi ilə formatla
    const digits = val.replace(/\D/g, "");
    // 994 ilə başlayırsa, artıq prefiksi var
    const local = digits.startsWith("994") ? digits.slice(3) : digits;
    const d = local.slice(0, 9); // max 9 rəqəm (XX XXX XX XX)
    let result = "+994";
    if (d.length > 0) result += " " + d.slice(0, 2);
    if (d.length > 2) result += " " + d.slice(2, 5);
    if (d.length > 5) result += " " + d.slice(5, 7);
    if (d.length > 7) result += " " + d.slice(7, 9);
    return result;
  };
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const allowedExts = ["pdf", "doc", "docx"];
    const ext = f.name.split(".").pop()?.toLowerCase() || "";
    if (!allowed.includes(f.type) && !allowedExts.includes(ext)) {
      setErrorMsg("Yalnız PDF, DOC və ya DOCX faylları qəbul edilir");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrorMsg("Faylın ölçüsü 5 MB-dan çox ola bilməz");
      return;
    }
    setErrorMsg("");
    setCv(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const data = new FormData();
    data.append("vacancyId", String(vacancyId));
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    if (cv) data.append("cv", cv);

    const res = await fetch("/api/applications", { method: "POST", body: data });
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "" });
      setCv(null);
      if (fileRef.current) fileRef.current.value = "";
    } else {
      try {
        const body = await res.json();
        setErrorMsg(body.error || "Xəta baş verdi");
      } catch {
        setErrorMsg("Server xətası baş verdi, yenidən cəhd edin");
      }
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border border-ink/[0.08] rounded-2xl p-8 text-center sticky top-24">
        <div className="w-16 h-16 rounded-full bg-brand-green-soft flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
        <h3 className="text-xl font-semibold text-ink mb-2">Müraciətiniz göndərildi!</h3>
        <p className="text-sm text-ink-3 mb-6">Komandamız sizinlə əlaqə saxlayacaq. Uğurlar!</p>
        <button onClick={() => setStatus("idle")} className="btn btn-ghost w-full justify-center">
          Yenidən müraciət et
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden sticky top-24">
      <div className="px-7 py-5 border-b border-ink/[0.08] bg-paper">
        <h2 className="text-lg font-semibold text-ink tracking-tight">Müraciət et</h2>
        <p className="text-xs text-muted mt-0.5">{vacancyTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-7 space-y-4">
        {errorMsg && (
          <div className="bg-brand-red-soft text-brand-red text-sm rounded-xl px-4 py-3 font-medium">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="field-label">Ad və Soyad *</label>
          <input
            className="field-input"
            placeholder="Əli Həsənov"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="field-label">Email *</label>
          <input
            type="email"
            className="field-input"
            placeholder="ali@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="field-label">Telefon nömrəsi *</label>
          <input
            type="tel"
            className="field-input"
            placeholder="+994 50 000 00 00"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="field-label">CV (PDF, DOC, DOCX — maks. 5 MB)</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-ink/[0.12] rounded-xl p-5 text-center cursor-pointer hover:border-orange hover:bg-orange-tint/30 transition-all"
          >
            {cv ? (
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-orange">
                <span>📎</span>
                <span className="truncate max-w-[200px]">{cv.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setCv(null); if (fileRef.current) fileRef.current.value = ""; }}
                  className="text-muted hover:text-brand-red ml-1"
                >✕</button>
              </div>
            ) : (
              <div>
                <div className="text-2xl mb-1">📄</div>
                <div className="text-sm font-medium text-ink-3">CV yükləmək üçün klikləyin</div>
                <div className="text-xs text-muted mt-0.5">PDF, DOC, DOCX</div>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-orange w-full justify-center disabled:opacity-50"
        >
          {status === "loading" ? "Göndərilir..." : "Müraciəti göndər →"}
        </button>
      </form>
    </div>
  );
}
