"use client";
import { getProgramBySlug, programs } from "@/lib/programs";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProgramIcon from "@/components/ProgramIcon";
import SubjectIcon from "@/components/SubjectIcon";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";
export default function ProgramDetail({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const { lang } = useLang();
  const tr = t[lang].programDetail;
  const isEn = lang === "en";

  const title    = isEn ? program.title_en    : program.title;
  const hero     = isEn ? program.hero_en     : program.hero;
  const badges   = isEn ? program.badges_en   : program.badges;
  const about    = isEn ? program.about_en    : program.about;
  const subjects = isEn ? program.subjects_en : program.subjects;
  const features = isEn ? program.features_en : program.features;
  const targets  = isEn ? program.targets_en  : program.targets;

  return (
    <>
      {/* Header */}
      <section className="px-6 md:px-12 pt-20 pb-10">
        <Link href="/programs" className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors mb-6 no-underline">
          {tr.back}
        </Link>
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-5">
            {badges.map((b) => (
              <span key={b} className="bg-orange-tint text-orange-deep text-xs font-semibold px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-tint flex items-center justify-center flex-shrink-0">
              <ProgramIcon iconKey={program.icon} className="scale-125" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink">
              {title}
            </h1>
          </div>
          <p className="text-xl text-ink-3 leading-relaxed font-medium">
            {hero}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl space-y-6">

          {/* Row 1: About + CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-stretch">
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-ink mb-5 tracking-tight">{tr.about}</h2>
              <div className="space-y-3">
                {about.map((para, i) => (
                  <p key={i} className="text-sm text-ink-3 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-6 flex flex-col justify-center">
              <Link href="/#muraciet" className="btn btn-orange w-full justify-center no-underline">
                {tr.applyBtn}
              </Link>
              <p className="text-xs text-muted text-center mt-3">{tr.applyNote}</p>
            </div>
          </div>

          {/* Row 2: Subjects + Other programs */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-stretch">
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-ink mb-5 tracking-tight">{tr.subjects}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {subjects.map((s) => (
                  <div key={s.name} className="bg-paper border border-ink/[0.06] rounded-xl px-4 py-3 flex items-center gap-3">
                    <SubjectIcon name={s.name} />
                    <span className="text-sm font-medium text-ink">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">{tr.otherPrograms}</h3>
              <div className="space-y-2">
                {programs
                  .filter((p) => p.slug !== program.slug)
                  .slice(0, 4)
                  .map((p) => (
                    <Link key={p.slug} href={`/programs/${p.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-paper transition-colors no-underline group">
                      <span className="text-orange"><ProgramIcon iconKey={p.icon} /></span>
                      <span className="text-sm font-medium text-ink group-hover:text-orange transition-colors">{isEn ? p.title_en : p.title}</span>
                    </Link>
                  ))}
                <Link href="/programs"
                  className="flex items-center gap-2 p-2.5 text-xs font-semibold text-orange hover:underline no-underline">
                  {tr.viewAll}
                </Link>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white border border-ink/[0.08] rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-ink mb-5 tracking-tight">{tr.features}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-tint flex items-center justify-center text-orange text-base flex-shrink-0 mt-0.5">✓</div>
                  <div>
                    <div className="text-sm font-semibold text-ink mb-1">{f.title}</div>
                    <div className="text-xs text-ink-3 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Targets */}
          <div className="bg-orange-tint border border-orange-soft rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-ink mb-5 tracking-tight">{tr.targets}</h2>
            <div className="space-y-3">
              {targets.map((target) => (
                <div key={target} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange flex items-center justify-center text-white text-xs flex-shrink-0">→</div>
                  <span className="text-sm font-medium text-ink">{target}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
