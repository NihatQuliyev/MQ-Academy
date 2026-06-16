"use client";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

const GradIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="7" r="4"/><path d="M5.5 20H4a2 2 0 01-2-2v-1a6 6 0 016-6h8a6 6 0 016 6v1a2 2 0 01-2 2h-1.5"/><polyline points="9 20 12 23 15 20"/></svg>;
const TargetIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const ChartIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const BookIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
const KidIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg>;
const StarIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;
const GlobeIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
const SunIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;

const audienceIcons = [KidIcon, BookIcon, StarIcon, GlobeIcon, GradIcon, SunIcon];
const whyIcons = [GradIcon, TargetIcon, ChartIcon, BookIcon];

export default function AboutPage() {
  const { lang } = useLang();
  const tr = t[lang].about;

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-20 pb-14">
        <div className="section-num">{tr.sectionNum}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink max-w-3xl">
          {tr.h1a} <span className="text-orange">{tr.h1b}</span> {tr.h1c}
        </h1>
      </section>

      {/* Main: left text + right image */}
      <section className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — text */}
          <div className="space-y-5 text-base leading-relaxed text-ink-2">
            <p>{tr.p1}</p>
            <p>{tr.p2}</p>
            <p>
              {tr.p3a}{" "}
              <strong className="font-semibold text-ink">{tr.p3b}</strong>{" "}
              {tr.p3c}
            </p>

            {/* Blockquote */}
            <div className="border-l-4 border-orange pl-5 py-1">
              <p className="text-xl font-medium text-ink leading-snug tracking-tight italic">
                {tr.quote}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {tr.stats.map((s) => (
                <div key={s.label} className="bg-paper border border-ink/[0.08] rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange tracking-tight leading-none mb-1">{s.num}</div>
                  <div className="text-xs font-semibold text-ink">{s.label}</div>
                  <div className="text-[10px] text-muted mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl overflow-hidden w-full relative shadow-xl" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop"
                alt={tr.imgAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg">
                  <img src="/logo.svg" alt="MQ" className="w-8 h-8 rounded-full bg-orange-tint object-contain p-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-ink">MQ {lang === "en" ? "Academy" : "Akademiyası"}</div>
                    <div className="text-xs text-muted">{tr.imgSub}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="px-6 md:px-12 pb-16">
        <div className="section-num">{tr.audienceNum}</div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-ink mb-8">
          {tr.audienceTitle} <span className="text-orange">{tr.audienceTitleSpan}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tr.audience.map((a, i) => {
            const Icon = audienceIcons[i] || KidIcon;
            return (
              <div key={a.label} className="bg-white border border-ink/[0.08] rounded-2xl p-6 flex items-start gap-4 hover:border-orange hover:shadow-md transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-orange-tint flex items-center justify-center text-orange flex-shrink-0">
                  <Icon />
                </div>
                <div>
                  <div className="font-semibold text-ink text-sm mb-1">{a.label}</div>
                  <div className="text-xs text-muted leading-relaxed">{a.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-5 bg-orange-tint border border-orange-soft rounded-2xl px-7 py-5 text-sm font-medium text-ink-2 text-center">
          {tr.audienceFooter}{" "}
          <strong className="text-orange font-semibold">{tr.audienceFooterSpan}</strong>
        </div>
      </section>

      {/* Why MQ */}
      <section className="px-6 md:px-12 pb-24">
        <div className="section-num">{tr.whyNum}</div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-ink mb-8">
          {tr.whyTitle} <span className="text-orange">{tr.whyTitleSpan}</span> {tr.whyTitleEnd}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tr.why.map((w, i) => {
            const Icon = whyIcons[i] || GradIcon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={w.title} className="bg-white border border-ink/[0.08] rounded-2xl p-7 flex items-start gap-5 hover:border-orange hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-tint flex items-center justify-center text-orange flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <Icon />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-orange tracking-widest mb-1">— {num} —</div>
                  <h4 className="text-lg font-bold text-ink mb-2 leading-tight">{w.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{w.body}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-semibold text-ink-2 mt-8 max-w-lg mx-auto">
          {tr.whyFooter}
        </p>
      </section>
    </>
  );
}
