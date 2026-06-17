"use client";
import Link from "next/link";
import { programs } from "@/lib/programs";
import ProgramIcon from "@/components/ProgramIcon";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

export default function ProgramsPage() {
  const { lang } = useLang();
  const tr = t[lang].programs;

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">{tr.sectionNum}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink max-w-4xl">
          {tr.h1a} <span className="text-orange">{tr.h1b}</span> →
        </h1>
        <p className="text-lg text-ink-3 mt-6 max-w-2xl leading-relaxed">
          {tr.sub}
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="card p-5 md:p-9 flex items-start gap-4 md:gap-6 group relative overflow-hidden no-underline"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-tint flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                <ProgramIcon iconKey={p.icon} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-ink mb-2 leading-tight tracking-tight group-hover:text-orange transition-colors duration-200">
                  {lang === "en" ? p.title_en : lang === "ru" ? p.title_ru : p.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{lang === "en" ? p.desc_en : lang === "ru" ? p.desc_ru : p.desc}</p>
                {p.age && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-paper border border-ink/[0.08] text-xs font-medium text-ink-3 px-2.5 py-1 rounded-full">
                      {lang === "en" ? p.age_en : lang === "ru" ? p.age_ru : p.age}
                    </span>
                  </div>
                )}
              </div>
              <span className="absolute top-8 right-8 text-ink/20 text-xl group-hover:text-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
