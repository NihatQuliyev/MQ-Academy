import ExamsList from "@/components/ExamsList";
import ExamsHeader from "@/components/ExamsHeader";
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
      <ExamsHeader />

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
