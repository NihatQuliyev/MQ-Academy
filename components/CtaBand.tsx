"use client";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

export default function CtaBand() {
  const { lang } = useLang();
  const tr = t[lang].cta;

  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("+994 ");
  const [program, setProgram] = useState("");
  const [sent,    setSent]    = useState(false);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "");
    const local = digits.startsWith("994") ? digits.slice(3) : digits;
    const d = local.slice(0, 9);
    let result = "+994";
    if (d.length > 0) result += " " + d.slice(0, 2);
    if (d.length > 2) result += " " + d.slice(2, 5);
    if (d.length > 5) result += " " + d.slice(5, 7);
    if (d.length > 7) result += " " + d.slice(7, 9);
    return result;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: program ? `Program: ${program}` : "Callback request",
        }),
      });
    } catch { /* şəbəkə xətası olsa belə UI bloklanmasın */ }
    setSent(true);
    setName(""); setPhone("+994 "); setProgram("");
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls = "w-full bg-white/[0.06] border border-white/10 text-white placeholder-white/35 px-4 py-3.5 rounded-xl text-sm font-medium outline-none focus:border-orange/60 transition-colors";

  return (
    <section id="muraciet" className="px-6 md:px-12 py-20" style={{ background: "#2C1A0E" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange/15 border border-orange/25 text-orange text-xs font-semibold rounded-full px-4 py-2 mb-5 tracking-wide">
            {tr.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {tr.title1}{" "}
            <span className="text-orange">{tr.title2}</span>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed mt-4 max-w-md mx-auto">{tr.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left — contact info */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 flex flex-col gap-4">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">{tr.directContact}</p>

            <a href="tel:+994124348576"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 hover:border-white/20 transition-all no-underline group flex-1">
              <div className="w-11 h-11 rounded-xl bg-orange flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">Telefon</p>
                <p className="text-white font-semibold">012 434 85 76</p>
                <p className="text-white/50 text-xs mt-0.5">010 386 15 24</p>
              </div>
            </a>

            <a href="https://wa.me/994103861524" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 hover:border-white/20 transition-all no-underline group flex-1">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-orange flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">WhatsApp</p>
                <p className="text-white font-semibold">010 386 15 24</p>
                <p className="text-white/50 text-xs mt-0.5">055 871 63 68</p>
              </div>
            </a>

            <a href="mailto:info@mqakademiya.az"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 hover:border-white/20 transition-all no-underline group flex-1">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-orange flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">E-mail</p>
                <p className="text-white font-semibold">info@mqakademiya.az</p>
              </div>
            </a>
          </div>

          {/* Right — Form */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 flex flex-col">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">{tr.callbackLabel}</p>
            {sent ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <div className="w-14 h-14 rounded-full bg-orange mx-auto flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">{tr.successTitle}</p>
                <p className="text-white/50 text-sm mt-2">{tr.successSub}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 flex-1">
                <input value={name} onChange={(e) => setName(e.target.value)} required
                  placeholder={tr.namePlaceholder} className={inputCls} />
                <input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} required
                  placeholder={tr.phonePlaceholder} className={inputCls} />
                <select value={program} onChange={(e) => setProgram(e.target.value)}
                  className={inputCls + " cursor-pointer"} style={{ colorScheme: "dark" }}>
                  <option value="">{tr.directionPlaceholder}</option>
                  {tr.programs.map((p) => <option key={p} value={p} className="bg-[#2C1A0E]">{p}</option>)}
                </select>
                <div className="flex-1" />
                <button type="submit"
                  className="w-full bg-orange text-white font-bold text-sm py-3.5 rounded-xl hover:bg-orange-deep transition-colors flex items-center justify-center gap-2 mt-2">
                  {tr.submit}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
