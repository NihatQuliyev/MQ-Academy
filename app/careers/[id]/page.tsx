import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ApplyForm from "./ApplyForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function VacancyDetail({ params }: { params: { id: string } }) {
  const vacancy = await prisma.vacancy.findUnique({
    where: { id: Number(params.id), active: true },
  });

  if (!vacancy) notFound();

  return (
    <>
      {/* Header */}
      <section className="px-6 md:px-12 pt-20 pb-10">
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors mb-6 no-underline">
          ← Vakansiyalara qayıt
        </Link>
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-orange-tint text-orange-deep text-xs font-semibold px-3 py-1 rounded-full">💼 {vacancy.type}</span>
            <span className="bg-paper text-ink-3 text-xs font-semibold px-3 py-1 rounded-full border border-ink/[0.08]">📍 {vacancy.branch}</span>
            <span className="bg-paper text-ink-3 text-xs font-semibold px-3 py-1 rounded-full border border-ink/[0.08]">📅 {vacancy.publishDate}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-none tracking-tighter text-ink mb-4">
            {vacancy.title}
          </h1>
          <p className="text-base text-ink-3">
            MQ Akademiyası komandası sizi gözləyir. Aşağıdakı tələbləri ödəyirsinizsə, müraciət edin.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 max-w-6xl">

          {/* Left — vacancy details */}
          <div className="space-y-6">
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-8">
              <h2 className="text-xl font-semibold text-ink mb-5 tracking-tight">Vəzifə haqqında</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-paper rounded-xl p-4">
                  <div className="text-xs text-muted mb-1 font-medium">VƏZİFƏ</div>
                  <div className="text-sm font-semibold text-ink">{vacancy.title}</div>
                </div>
                <div className="bg-paper rounded-xl p-4">
                  <div className="text-xs text-muted mb-1 font-medium">FİLİAL</div>
                  <div className="text-sm font-semibold text-ink">{vacancy.branch}</div>
                </div>
                <div className="bg-paper rounded-xl p-4">
                  <div className="text-xs text-muted mb-1 font-medium">İŞ NÖVÜ</div>
                  <div className="text-sm font-semibold text-ink">{vacancy.type}</div>
                </div>
                <div className="bg-paper rounded-xl p-4">
                  <div className="text-xs text-muted mb-1 font-medium">YAYIM TARİXİ</div>
                  <div className="text-sm font-semibold text-ink">{vacancy.publishDate}</div>
                </div>
              </div>

              <h3 className="text-base font-semibold text-ink mb-3">Tələblər və şərtlər</h3>
              <div className="text-sm text-ink-3 leading-relaxed whitespace-pre-line">
                {vacancy.requirements}
              </div>
            </div>

            <div className="bg-orange-tint border border-orange-soft rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange text-white flex items-center justify-center text-xl flex-shrink-0">💡</div>
              <div>
                <div className="text-sm font-semibold text-ink mb-1">Peşəkar inkişaf</div>
                <div className="text-sm text-ink-3">MQ Akademiyasında çalışmaq peşəkar inkişaf və güclü komanda mühiti deməkdir.</div>
              </div>
            </div>
          </div>

          {/* Right — apply form */}
          <div>
            <ApplyForm vacancyId={vacancy.id} vacancyTitle={vacancy.title} />
          </div>
        </div>
      </section>
    </>
  );
}
