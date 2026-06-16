"use client";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

const branches = [
  {
    name: "İnşaatçılar",
    address: "Mirzə Cabbar Məmmədzadə 197, Bakı",
    embedUrl: "https://maps.google.com/maps?q=Mirzə+Cabbar+Məmmədzadə+197,Bakı,Azerbaijan&output=embed&z=17",
    mapsUrl: "https://www.google.com/maps/search/Mirzə+Cabbar+Məmmədzadə+197+Bakı+Azerbaijan",
  },
  {
    name: "Xalqlar",
    address: "Nizami r. Babək pr. 2390, Bakı",
    embedUrl: "https://maps.google.com/maps?q=40.3967163,49.9500691&output=embed&z=17",
    mapsUrl: "https://www.google.com/maps/search/Nizami+r+Babək+pr+2390+Bakı+Azerbaijan",
  },
  {
    name: "Xırdalan",
    address: "Xırdalan şəhəri, Abşeron",
    embedUrl: "https://maps.google.com/maps?q=Xırdalan,Abşeron,Azerbaijan&output=embed&z=15",
    mapsUrl: "https://www.google.com/maps/search/Xırdalan+Abşeron+Azerbaijan",
  },
  {
    name: "Binəqədi",
    address: "Binəqədi qəsəbəsi, Bakı",
    embedUrl: "https://maps.google.com/maps?q=Binəqədi,Bakı,Azerbaijan&output=embed&z=15",
    mapsUrl: "https://www.google.com/maps/search/Binəqədi+Bakı+Azerbaijan",
  },
];

const PhoneIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>;
const WhatsAppIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>;
const EmailIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PinIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;

const DEFAULT_EMBED = "https://maps.google.com/maps?q=Bakı,Azerbaijan&output=embed&z=12";

export default function ContactPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { lang } = useLang();
  const tr = t[lang].contact;
  const isEn = lang === "en";

  const contacts = [
    { icon: <PhoneIcon />,    label: isEn ? "Phone" : "Telefon",          links: [{ value: "012 434 85 76", href: "tel:0124348576" }, { value: "010 386 15 24", href: "tel:0103861524" }, { value: "055 871 63 68", href: "tel:0558716368" }] },
    { icon: <WhatsAppIcon />, label: "WhatsApp",                           links: [{ value: "010 386 15 24", href: "https://wa.me/994103861524" }, { value: "055 871 63 68", href: "https://wa.me/994558716368" }] },
    { icon: <EmailIcon />,    label: "Email",                              value: "info@mqakademiya.az", href: "mailto:info@mqakademiya.az" },
    { icon: <PinIcon />,      label: isEn ? "Central address" : "Mərkəzi ünvan", value: "Mirzə Cabbar Məmmədzadə 197, Bakı" },
  ];

  const currentEmbed = activeIdx !== null ? branches[activeIdx].embedUrl : DEFAULT_EMBED;

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">{tr.sectionNum}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink max-w-4xl">
          {tr.h1a} <span className="text-orange">{tr.h1b}</span>
        </h1>
        <p className="text-lg text-ink-3 mt-6 max-w-2xl leading-relaxed">
          {tr.sub}
        </p>
      </section>

      <section className="px-6 md:px-12 pb-12">

        {/* Top row: 2×2 branch cards + contact block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* 2×2 branch grid */}
          <div className="grid grid-cols-2 gap-4">
            {branches.map((b) => (
              <div key={b.name} className="card p-6 flex flex-col gap-4 hover:border-orange hover:bg-orange-tint transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-ink mb-1 tracking-tight">{b.name}</h3>
                  <p className="text-sm text-muted mb-4">{b.address}</p>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange no-underline hover:underline"
                  >
                    {tr.mapsBtn}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="rounded-2xl p-9 flex flex-col relative overflow-hidden" style={{ background: "#2C1A0E" }}>
            <div className="absolute top-0 right-0 w-72 h-72 opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(238,106,26,0.5), transparent 70%)" }} />
            <div className="relative flex flex-col h-full">
              <h2 className="text-2xl font-semibold text-white mb-1 tracking-tight">
                {tr.contactTitle} <span className="text-orange-2">{tr.contactTitleSpan}</span>
              </h2>
              <p className="text-sm text-white/55 mb-2">{tr.contactSub}</p>
              <p className="text-sm text-white/40">Mirzə Cabbar Məmmədzadə 197, Bakı</p>
              <div className="flex-1 flex flex-col justify-center">
                {contacts.map((c) => (
                  <div key={c.label} className="flex items-start gap-3 py-4 border-t border-white/[0.1]">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center text-orange-2 text-base flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-1">{c.label}</div>
                      {c.links ? (
                        <div className="flex items-center gap-1 flex-wrap">
                          {c.links.map((l: { value: string; href: string }, i: number) => (
                            <span key={l.href} className="flex items-center gap-1">
                              {i > 0 && <span className="text-white/50 text-sm">·</span>}
                              <a href={l.href} target="_blank" rel="noreferrer"
                                className="text-sm font-medium text-white no-underline hover:text-orange-2 transition-colors">
                                {l.value}
                              </a>
                            </span>
                          ))}
                        </div>
                      ) : c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                          className="text-sm font-medium text-white no-underline hover:text-orange-2 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-white">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width map */}
        <div className="rounded-2xl overflow-hidden border border-ink/[0.08] w-full" style={{ height: 500 }}>
          <iframe
            key={currentEmbed}
            src={currentEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Branch selector buttons under map */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {branches.map((b, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={b.name}
                onClick={() => setActiveIdx(isActive ? null : i)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all border ${
                  isActive
                    ? "bg-orange border-orange text-white shadow-md"
                    : "bg-white border-ink/[0.08] hover:border-orange hover:bg-orange-tint"
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-orange"}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-ink"}`}>
                    {b.name}
                  </div>
                  <div className={`text-xs truncate ${isActive ? "text-white/80" : "text-muted"}`}>
                    {b.address}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {activeIdx !== null && (
          <p className="text-xs text-center text-muted mt-3">
            {tr.mapNote} <strong>{branches[activeIdx].name}</strong>{" "}
            <a href={branches[activeIdx].mapsUrl} target="_blank" rel="noreferrer"
              className="text-orange hover:underline">
              {tr.mapLink}
            </a>
          </p>
        )}

        {/* Müraciət formu hər səhifənin altında mövcuddur (CtaBand) */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted mb-3">{tr.applyNote}</p>
          <a
            href="#muraciet"
            className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-orange-deep transition-colors no-underline"
          >
            {tr.applyBtn}
          </a>
        </div>
      </section>
    </>
  );
}
