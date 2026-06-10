import prisma from "@/lib/db";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return <HomeContent posts={posts} />;
}
