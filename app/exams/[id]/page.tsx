import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ExamDetailContent from "@/components/ExamDetailContent";

export const dynamic = "force-dynamic";

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

  const examData = {
    id: exam.id,
    name: exam.name,
    category: exam.category,
    branch: exam.branch,
    grade: exam.grade,
    duration: exam.duration,
    time: exam.time,
    date: exam.date,
    note: exam.note,
  };

  return <ExamDetailContent exam={examData} hasTopics={hasTopics} topics={topics} />;
}
