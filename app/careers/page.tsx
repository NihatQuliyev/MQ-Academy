import prisma from "@/lib/db";
import CareersContent from "@/components/CareersContent";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const vacancies = await prisma.vacancy.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });

  const serialized = vacancies.map((v) => ({
    id: v.id,
    title: v.title,
    branch: v.branch,
    type: v.type,
    publishDate: v.publishDate,
    requirements: v.requirements,
  }));

  return <CareersContent vacancies={serialized} />;
}
