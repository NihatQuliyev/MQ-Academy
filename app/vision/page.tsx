"use client";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

export default function VisionPage() {
  const { lang } = useLang();
  const tr = t[lang].vision;

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">{tr.sectionNum}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink max-w-4xl">
          {tr.h1a} <span className="text-orange">{tr.h1b}</span> {tr.h1c}
        </h1>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mission */}
          <div className="bg-white border border-ink/[0.08] rounded-3xl p-6 md:p-11 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="MQ" className="w-7 h-7 rounded-full bg-orange-tint object-contain p-0.5" />
              <span className="text-xs font-semibold text-orange uppercase tracking-widest">{tr.missionLabel}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-5 leading-tight tracking-tight">
              {tr.missionTitle} <span className="text-orange">{tr.missionTitleSpan}</span> {tr.missionTitleEnd}
            </h2>
            <p className="text-base text-ink-3 leading-relaxed">
              {tr.missionBody}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl p-6 md:p-11 relative overflow-hidden" style={{ background: "#2C1A0E" }}>
            <div className="absolute top-0 right-0 w-72 h-72 opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(238,106,26,0.5), transparent 70%)" }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-7 h-7 rounded-full bg-orange text-white flex items-center justify-center text-xs font-bold">V</div>
                <span className="text-xs font-semibold text-orange-2 uppercase tracking-widest">{tr.visionLabel}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
                {tr.visionTitle} <span className="text-orange-2">{tr.visionTitleSpan}</span> {tr.visionTitleEnd}
              </h2>
              <p className="text-base text-white/75 leading-relaxed">
                {tr.visionBody}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
