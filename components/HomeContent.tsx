"use client";
import Link from "next/link";
import ProgramIcon from "@/components/ProgramIcon";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";
import PostCard from "@/components/PostCard";

const programHrefs = [
  "/programs/ibtidai-sinif",
  "/programs/tekmillesdirme",
  "/programs/abituriyent",
  "/programs/xarici-dil",
  "/programs/magistr",
  "/programs/miq",
  "/programs/ofis-proqramlari",
  "/programs/yay-mektepleri",
];

const programTags = [
  "2–4-cü sinif", "5–8-ci sinif", "9–11-ci sinif", "General / IELTS",
  "Ali təhsil", "Müəllimlər", "Karyera", "İyul–Avqust",
];
const programTagsEn = [
  "Grades 2–4", "Grades 5–8", "Grades 9–11", "General / IELTS",
  "Higher education", "Teachers", "Career", "July–August",
];

const programDescs = [
  "Dünyagörüş, məntiqi təfəkkür, məktəb bazasının möhkəmləndirilməsi.",
  "Zəif fənlərin gücləndirilməsi, baza biliklərin formalaşdırılması.",
  "DİM proqramına tam uyğun, yüksək nəticə hədəfli hazırlıq.",
  "Danışıq, yazı, dinləmə bacarıqları. Mock imtahanlar.",
  "Magistratura qəbul imtahanlarına peşəkar hazırlıq.",
  "Müəllimlərin işə qəbul imtahanına sistemli hazırlıq.",
  "Excel, Word, PowerPoint — sıfırdan peşəkara.",
  "Yay tətilini faydalı və maraqlı keçirmək üçün proqramlar.",
];
const programDescsEn = [
  "Worldview, logical thinking, strengthening school foundations.",
  "Strengthening weak subjects, forming basic knowledge.",
  "Fully aligned with university entrance exam, high-result focused preparation.",
  "Speaking, writing, listening skills. Mock exams.",
  "Professional preparation for master's admission exams.",
  "Systematic preparation for teacher recruitment exam.",
  "Excel, Word, PowerPoint — from scratch to professional.",
  "Programs for a productive and enjoyable summer holiday.",
];

import { ProgramIconKey } from "@/lib/programs";
const programIcons: ProgramIconKey[] = ["pen","trend","award","globe","book","clip","monitor","sun"];

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    <line x1="9" y1="11" x2="9" y2="11.01"/><line x1="15" y1="11" x2="15" y2="11.01"/>
    <line x1="9" y1="15" x2="9" y2="15.01"/><line x1="15" y1="15" x2="15" y2="15.01"/>
  </svg>
);
const whyIcons = [UserIcon, TargetIcon, ChartIcon, BuildingIcon];

interface Post {
  id: number; title: string; content: string; category: string;
  date: string; image?: string | null;
}

export default function HomeContent({ posts }: { posts: Post[] }) {
  const { lang } = useLang();
  const tr = t[lang];
  const isEn = lang === "en";

  const tags   = isEn ? programTagsEn   : programTags;
  const descs  = isEn ? programDescsEn  : programDescs;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFF0DC 100%)" }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 text-orange text-xs font-semibold rounded-full px-4 py-2 mb-7 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              {tr.home.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-ink leading-[1.15] tracking-tight mb-5">
              {tr.home.hero1}{" "}
              <span className="relative inline-block text-orange">
                {tr.home.hero2}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange/40 rounded-full" />
              </span>{" "}
              {tr.home.hero3}
            </h1>
            <p className="text-ink/60 text-base leading-relaxed mb-8 max-w-md">{tr.home.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/programs" className="bg-orange text-white font-bold px-6 py-3.5 rounded-xl hover:bg-orange-deep transition-colors text-sm no-underline">
                {tr.home.btnPrograms}
              </Link>
              <Link href="/contact" className="bg-white border border-ink/10 text-ink font-semibold px-6 py-3.5 rounded-xl hover:border-orange hover:text-orange transition-colors text-sm no-underline">
                {tr.home.btnContact}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {tr.stats.map((s) => (
                <div key={s.label} className="flex flex-col bg-white rounded-2xl px-5 py-5 gap-1 shadow-sm">
                  <span className="text-4xl font-extrabold text-orange tracking-tight leading-none">{s.num}</span>
                  <span className="text-sm font-semibold text-ink mt-1">{s.label}</span>
                  <span className="text-xs text-muted">{s.sub}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-orange-tint flex items-center justify-center text-orange text-base flex-shrink-0 mt-0.5">◎</div>
              <div>
                <p className="text-[10px] font-bold text-muted uppercase tracking-[0.1em] mb-1">{tr.home.missionLabel}</p>
                <p className="text-sm text-ink leading-snug">{tr.home.missionText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─────────────────────────────────────────── */}
      <section className="section bg-paper">
        <div className="section-label">{tr.home.programsLabel}</div>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="section-title">{tr.home.programsTitle}</h2>
          <Link href="/programs" className="btn btn-secondary text-sm">{tr.home.programsMore}</Link>
        </div>
        <p className="section-sub -mt-6 mb-10">{tr.home.programsSub}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tr.nav.programItems.map((p, i) => (
            <Link key={programHrefs[i]} href={programHrefs[i]}
              className="card p-6 flex flex-col gap-3 group no-underline text-current relative overflow-hidden">
              <span className="w-11 h-11 rounded-xl bg-orange-tint flex items-center justify-center">
                <ProgramIcon iconKey={programIcons[i]} />
              </span>
              <div>
                <span className="text-[10px] font-bold text-orange uppercase tracking-widest">{tags[i]}</span>
                <h3 className="text-base font-bold text-ink mt-0.5 leading-tight">{p.label}</h3>
              </div>
              <p className="text-xs text-muted leading-relaxed">{descs[i]}</p>
              <span className="absolute top-4 right-4 text-ink/15 group-hover:text-orange text-lg transition-colors">↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── WHY MQ ───────────────────────────────────────────── */}
      <section className="section bg-cream-2">
        <div className="section-label">{tr.home.whyLabel}</div>
        <h2 className="section-title mb-3">{tr.home.whyTitle} <span className="text-orange">{tr.home.whyTitle2}</span></h2>
        <p className="section-sub mb-10">{tr.home.whySub}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tr.home.whyItems.map((w, i) => {
            const Icon = whyIcons[i];
            return (
              <div key={w.title} className="card p-7 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-tint flex items-center justify-center text-orange flex-shrink-0">
                  <Icon />
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink mb-1.5">{w.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{w.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── POSTS ────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="section bg-paper">
          <div className="section-label">{tr.home.postsLabel}</div>
          <h2 className="section-title mb-3">{tr.home.postsTitle} <span className="text-orange">{tr.home.postsTitle2}</span></h2>
          <p className="section-sub mb-10">{tr.home.postsSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {posts.map((p) => (
              <PostCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
