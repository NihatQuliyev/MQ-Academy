"use client";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

const months_az: Record<string, string> = {
  "01": "Yanvar", "02": "Fevral", "03": "Mart", "04": "Aprel",
  "05": "May", "06": "İyun", "07": "İyul", "08": "Avqust",
  "09": "Sentyabr", "10": "Oktyabr", "11": "Noyabr", "12": "Dekabr",
};

const months_en: Record<string, string> = {
  "01": "January", "02": "February", "03": "March", "04": "April",
  "05": "May", "06": "June", "07": "July", "08": "August",
  "09": "September", "10": "October", "11": "November", "12": "December",
};

const months_ru: Record<string, string> = {
  "01": "Январь", "02": "Февраль", "03": "Март", "04": "Апрель",
  "05": "Май", "06": "Июнь", "07": "Июль", "08": "Август",
  "09": "Сентябрь", "10": "Октябрь", "11": "Ноябрь", "12": "Декабрь",
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

type ExamDetailProps = {
  exam: {
    id: number;
    name: string;
    category: string;
    branch: string | null;
    grade: string | null;
    duration: string | null;
    time: string | null;
    date: string;
    note: string | null;
  };
  hasTopics: boolean;
  topics: string[];
};

export default function ExamDetailContent({ exam, hasTopics, topics }: ExamDetailProps) {
  const { lang } = useLang();
  const tr = t[lang].examDetail;

  const months = lang === "en" ? months_en : lang === "ru" ? months_ru : months_az;

  function formatDate(dateStr: string) {
    const [y, m, d] = dateStr.split("-");
    return `${d} ${months[m] || m} ${y}`;
  }

  const categoryLabel = tr.categoryLabels[exam.category as keyof typeof tr.categoryLabels] || exam.category;

  const details = [
    {
      label: tr.detailFields.category,
      value: categoryLabel,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    },
    {
      label: tr.detailFields.branch,
      value: exam.branch || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    },
    {
      label: tr.detailFields.grade,
      value: exam.grade || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg>,
    },
    {
      label: tr.detailFields.duration,
      value: exam.duration || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    },
    {
      label: tr.detailFields.time,
      value: exam.time || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>,
    },
    {
      label: tr.detailFields.date,
      value: formatDate(exam.date),
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    },
  ];

  return (
    <>
      <section className="px-6 md:px-12 pt-16 pb-10">
        <Link href="/exams" className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors no-underline mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {tr.back}
        </Link>
        <div className="section-num">{tr.sectionNum}</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter text-ink max-w-3xl mt-2">
          {exam.name}
        </h1>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* LEFT */}
          <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden flex flex-col">

            {/* Date banner */}
            <div className="p-7 relative overflow-hidden" style={{ background: "#2C1A0E" }}>
              <div className="absolute top-0 right-0 w-48 h-48 opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(238,106,26,0.6), transparent 70%)" }} />
              <div className="relative flex items-center gap-6">
                <div className="flex flex-col items-center bg-orange rounded-2xl w-20 py-4 text-white flex-shrink-0 text-center">
                  <span className="text-4xl font-extrabold leading-none tracking-tighter">
                    {exam.date.split("-")[2]}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest mt-1 opacity-90">
                    {months[exam.date.split("-")[1]] || ""}
                  </span>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">{tr.dateLabel}</p>
                  <p className="text-white text-2xl font-bold leading-tight">{formatDate(exam.date)}</p>
                  {exam.time && (
                    <p className="text-orange font-semibold mt-1">{lang === "en" ? "At" : lang === "ru" ? "В" : "Saat"} {exam.time}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-7 flex-1">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-5">{tr.detailLabel}</p>
              <div className="grid grid-cols-2 gap-4">
                {details.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-paper rounded-xl px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-tint text-orange flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider leading-none mb-1">{item.label}</p>
                      {item.label === tr.detailFields.grade && item.value.includes("/") ? (
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm font-semibold text-ink leading-tight">{item.value.split("/")[0].trim()}</p>
                          <p className="text-sm font-semibold text-ink leading-tight">{item.value.split("/")[1].trim()}</p>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold text-ink truncate">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Note */}
              {exam.note && (
                <div className="mt-4 bg-orange-tint border border-orange-soft rounded-xl px-4 py-3 flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-orange flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-sm text-ink leading-relaxed">{exam.note}</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">

            {/* CTA card */}
            <div className="rounded-2xl p-7 relative overflow-hidden flex flex-col flex-1" style={{ background: "#2C1A0E" }}>
              <div className="absolute top-0 right-0 w-48 h-48 opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(238,106,26,0.6), transparent 70%)" }} />
              <div className="relative flex flex-col h-full">
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">{tr.regLabel}</p>
                <h3 className="text-white font-extrabold text-xl leading-tight mb-2">
                  {tr.regTitle}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  {tr.regSub}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                  <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-3">{tr.waLabel}</p>
                  <div className="flex flex-col gap-2">
                    <a href="https://wa.me/994103861524" target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 no-underline group">
                      <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                        <PhoneIcon />
                      </div>
                      <p className="text-white font-semibold text-sm group-hover:text-orange transition-colors">010 386 15 24</p>
                    </a>
                    <a href="https://wa.me/994558716368" target="_blank" rel="noreferrer"
                      className="flex items-center gap-3 no-underline group">
                      <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                        <PhoneIcon />
                      </div>
                      <p className="text-white font-semibold text-sm group-hover:text-orange transition-colors">055 871 63 68</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics (if available) */}
            {hasTopics && (
              <div className="bg-white border border-ink/[0.08] rounded-2xl p-7">
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-1">{tr.topicsLabel}</p>
                <p className="text-sm text-ink-3 mb-5">{tr.topicsSub}</p>
                <Link
                  href={`/topics?examId=${exam.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange text-white text-sm font-bold rounded-xl hover:bg-orange-deep transition-colors no-underline"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
                  </svg>
                  {tr.topicsBtn}
                </Link>
              </div>
            )}

            {/* Back button */}
            <Link href="/exams"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-ink/[0.1] text-ink text-sm font-semibold rounded-xl hover:border-orange hover:text-orange transition-all no-underline">
              {tr.backBtn}
            </Link>
          </div>

        </div>

        {/* Legacy topics */}
        {topics.length > 0 && (
          <div className="bg-white border border-ink/[0.08] rounded-2xl p-7 mt-5">
            <h2 className="text-lg font-bold text-ink mb-4">{tr.legacyTopics}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink">
                  <span className="w-6 h-6 rounded-lg bg-orange-tint text-orange text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
