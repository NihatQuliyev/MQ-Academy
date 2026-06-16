"use client";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

export default function ExamsHeader() {
  const { lang } = useLang();
  const tr = t[lang].exams;

  return (
    <section className="px-6 md:px-12 pt-20 pb-16">
      <div className="section-num">{tr.sectionNum}</div>
      <h1 className="text-4xl md:text-5xl font-medium leading-none tracking-tighter text-ink max-w-4xl">
        {tr.h1a} <span className="text-orange">{tr.h1b}</span>
      </h1>
    </section>
  );
}
