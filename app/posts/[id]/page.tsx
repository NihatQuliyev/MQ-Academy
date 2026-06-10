import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || !post.active) notFound();

  return (
    <section className="px-6 md:px-12 pt-16 pb-24 max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-orange transition-colors no-underline mb-8">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Ana səhifəyə qayıt
      </Link>

      {/* Şəkil */}
      {post.image && (
        <div className="w-full rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-bold text-orange uppercase tracking-widest bg-orange-tint px-3 py-1 rounded-full">
          {post.category}
        </span>
        <span className="text-sm text-muted">
          {new Date(post.date).toLocaleDateString("az-AZ", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-ink leading-tight tracking-tight mb-8">
        {post.title}
      </h1>

      <div className="bg-white border border-ink/[0.08] rounded-2xl p-8">
        <p className="text-base text-ink leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
    </section>
  );
}
