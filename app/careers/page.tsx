import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const vacancies = await prisma.vacancy.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">Vakansiyalar</div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink max-w-4xl">
          Komandamıza <span className="text-orange">qoşulun</span> →
        </h1>
        <p className="text-lg text-ink-3 mt-6 max-w-2xl leading-relaxed">
          Peşəkarlardan ibarət ailəmizə qoşulun. Açıq vakansiyalarımıza müraciəti aşağıdakı email ünvanına göndərin.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24">
        {vacancies.length === 0 ? (
          <div className="bg-white border border-ink/[0.08] rounded-2xl p-16 text-center">
            <div className="flex justify-center mb-4 text-muted"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg></div>
            <h3 className="text-xl font-semibold text-ink mb-2">Hazırda açıq vakansiya yoxdur</h3>
            <p className="text-sm text-muted">Yeni vakansiyalar üçün saytı izləyin.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-12">
            {vacancies.map((v) => (
              <div key={v.id} className="bg-white border border-ink/[0.08] rounded-2xl px-8 py-7 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center hover:border-orange hover:shadow-md transition-all duration-200">
                <Link href={`/careers/${v.id}`} className="no-underline flex-1 min-w-0">
                  <h2 className="text-2xl font-semibold text-ink mb-3 tracking-tight hover:text-orange transition-colors">{v.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-muted mb-3">
                    <span className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>{v.branch}</span>
                    <span className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{v.type}</span>
                    <span className="flex items-center gap-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{v.publishDate}</span>
                  </div>
                  <p className="text-sm text-ink-3 leading-relaxed line-clamp-2">{v.requirements}</p>
                </Link>
                <Link href={`/careers/${v.id}`}
                  className="btn btn-orange whitespace-nowrap no-underline">
                  Müraciət et →
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="bg-orange-tint border border-orange-soft rounded-2xl p-8 flex flex-wrap items-center gap-7">
          <div className="w-14 h-14 rounded-xl bg-orange text-white flex items-center justify-center flex-shrink-0"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg></div>
          <div className="flex-1 min-w-64">
            <h3 className="text-xl font-semibold text-ink mb-1 tracking-tight">Vakansiyaya klikləyib müraciət edin</h3>
            <p className="text-sm text-ink-3">Hər vakansiya üçün ayrı müraciət formu mövcuddur. CV-nizi birbaşa sayt vasitəsilə göndərə bilərsiniz.</p>
          </div>
        </div>
      </section>
    </>
  );
}
