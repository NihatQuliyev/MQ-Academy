import ExamsList from "@/components/ExamsList";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ExamsPage({
  searchParams,
}: {
  searchParams: { category?: string; type?: string };
}) {
  const where: { category?: string; active: boolean } = { active: true };
  if (searchParams.category) where.category = searchParams.category;

  const exams = await prisma.examDate.findMany({
    where,
    orderBy: { date: "asc" },
    include: { topicSections: { select: { id: true } } },
  });

  const serialized = exams.map((e) => ({
    ...e,
    topics: (() => { try { return JSON.parse(e.topics) as string[]; } catch { return []; } })(),
    createdAt: e.createdAt.toISOString(),
    hasTopics: e.topicSections.length > 0,
    topicSections: undefined,
  }));

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">İmtahan təqvimi</div>
        <h1 className="text-4xl md:text-5xl font-medium leading-none tracking-tighter text-ink max-w-4xl">
          Sınaq tarixləri və <span className="text-orange">mövzuları.</span>
        </h1>
        <p className="text-lg text-ink-3 mt-6 max-w-2xl leading-relaxed">
          İmtahan növünü seçin — tarixlər, mövzular və qaydalar avtomatik göstərilsin.
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <ExamsList
          exams={serialized}
          currentCategory={searchParams.category || ""}
          currentType={searchParams.type || ""}
        />
      </section>
    </>
  );
}
