import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const months: Record<string, string> = {
  "01": "Yanvar", "02": "Fevral", "03": "Mart", "04": "Aprel",
  "05": "May", "06": "İyun", "07": "İyul", "08": "Avqust",
  "09": "Sentyabr", "10": "Oktyabr", "11": "Noyabr", "12": "Dekabr",
};

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d} ${months[m] || m} ${y}`;
}

const categoryLabels: Record<string, string> = {
  abituriyent: "Abituriyent",
  ibtidai: "İbtidai sinif",
  tekmillesme: "Təkmilləşdirmə",
  dil: "Xarici dil",
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

export default async function ExamDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const exam = await prisma.examDate.findUnique({
    where: { id },
    include: { topicSections: { select: { id: true } } },
  });

  if (!exam || !exam.active) notFound();

  const hasTopics = exam.topicSections.length > 0;
  let topics: string[] = [];
  try { topics = JSON.parse(exam.topics) as string[]; } catch { topics = []; }

  const details = [
    {
      label: "Kateqoriya",
      value: categoryLabels[exam.category] || exam.category,
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    },
    {
      label: "Filial",
      value: exam.branch || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    },
    {
      label: "Sinif / Qrup",
      value: exam.grade || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg>,
    },
    {
      label: "Müddət",
      value: exam.duration || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    },
    {
      label: "Başlama saatı",
      value: exam.time || "—",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>,
    },
    {
      label: "Tarix",
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
          Bütün imtahanlara qayıt
        </Link>
        <div className="section-num">İmtahan məlumatı</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter text-ink max-w-3xl mt-2">
          {exam.name}
        </h1>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* LEFT — tam bir kart */}
          <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden flex flex-col">

            {/* Tarix banner */}
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
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">İmtahan tarixi</p>
                  <p className="text-white text-2xl font-bold leading-tight">{formatDate(exam.date)}</p>
                  {exam.time && (
                    <p className="text-orange font-semibold mt-1">Saat {exam.time}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-7 flex-1">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-5">Ətraflı məlumat</p>
              <div className="grid grid-cols-2 gap-4">
                {details.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-paper rounded-xl px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-tint text-orange flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider leading-none mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-ink truncate">{item.value}</p>
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

          {/* RIGHT — eyni hündürlüklü kart */}
          <div className="flex flex-col gap-5">

            {/* Mövzular (varsa) */}
            {hasTopics && (
              <div className="bg-white border border-ink/[0.08] rounded-2xl p-7">
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-1">Mövzu proqramı</p>
                <p className="text-sm text-ink-3 mb-5">Bu imtahana aid mövzu proqramı mövcuddur</p>
                <Link
                  href={`/topics?examId=${exam.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange text-white text-sm font-bold rounded-xl hover:bg-orange-deep transition-colors no-underline"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
                  </svg>
                  Mövzulara bax
                </Link>
              </div>
            )}

            {/* CTA kart — flex-1 ilə sol kartla eyni hündürlük */}
            <div className="rounded-2xl p-7 relative overflow-hidden flex flex-col flex-1" style={{ background: "#2C1A0E" }}>
              <div className="absolute top-0 right-0 w-48 h-48 opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(238,106,26,0.6), transparent 70%)" }} />
              <div className="relative flex flex-col h-full">
                <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-4">Qeydiyyat</p>
                <h3 className="text-white font-extrabold text-xl leading-tight mb-2">
                  Bu imtahana qatılmaq istəyirsiniz?
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-6">
                  Qeydiyyat və ətraflı məlumat üçün bizimlə əlaqə saxlayın. 24 saat ərzində cavab veririk.
                </p>

                <div className="flex flex-col gap-3 mt-auto">
                  <a href="https://wa.me/994103861524" target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 transition-all no-underline group">
                    <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">WhatsApp</p>
                      <p className="text-white font-semibold text-sm">010 386 15 24</p>
                    </div>
                  </a>

                  <a href="https://wa.me/994558716368" target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/10 transition-all no-underline group">
                    <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-0.5">WhatsApp</p>
                      <p className="text-white font-semibold text-sm">055 871 63 68</p>
                    </div>
                  </a>

                </div>
              </div>
            </div>

            {/* Geri qayıt */}
            <Link href="/exams"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-ink/[0.1] text-ink text-sm font-semibold rounded-xl hover:border-orange hover:text-orange transition-all no-underline">
              ← Bütün imtahanlar
            </Link>
          </div>

        </div>

        {/* Legacy topics */}
        {topics.length > 0 && (
          <div className="bg-white border border-ink/[0.08] rounded-2xl p-7 mt-5">
            <h2 className="text-lg font-bold text-ink mb-4">Mövzular</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {topics.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink">
                  <span className="w-6 h-6 rounded-lg bg-orange-tint text-orange text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
