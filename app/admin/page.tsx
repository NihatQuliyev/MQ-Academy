import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [postCount, vacancyCount, examCount, resultCount, applicationCount, unreadMessages] = await Promise.all([
    prisma.post.count({ where: { active: true } }),
    prisma.vacancy.count({ where: { active: true } }),
    prisma.examDate.count({ where: { active: true } }),
    prisma.result.count(),
    prisma.vacancyApplication.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const recentPosts = await prisma.post.findMany({ orderBy: { createdAt: "desc" }, take: 3 });
  const recentExams = await prisma.examDate.findMany({ orderBy: { date: "asc" }, take: 3, where: { active: true } });

  const stats = [
    { label: "Aktiv postlar",      num: postCount,       icon: "📰", href: "/admin/posts" },
    { label: "Açıq vakansiyalar",  num: vacancyCount,    icon: "💼", href: "/admin/vacancies" },
    { label: "İmtahan tarixləri",      num: examCount,       icon: "📅", href: "/admin/exams" },
    { label: "Tələbə nəticəsi",        num: resultCount,     icon: "📊", href: "/admin/results" },
    { label: "Vakansiya müraciətləri", num: applicationCount,icon: "📨", href: "/admin/applications", hint: "Vakansiyalara göndərilən CV-lər" },
    { label: "Əlaqə mesajları",        num: unreadMessages,  icon: "✉️", href: "/admin/messages",      hint: "Saytdan göndərilən ümumi suallar" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-ink tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted mt-1">MQ Akademiyası admin idarəetmə paneli</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
        {stats.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-ink/[0.08] rounded-2xl p-6 no-underline hover:border-orange hover:shadow-md transition-all duration-200 relative">
            <div className="absolute top-5 right-5 text-2xl">{s.icon}</div>
            <div className="text-xs font-semibold text-muted mb-1">{s.label}</div>
            {"hint" in s && s.hint && <div className="text-[10px] text-muted/70 mb-2 leading-snug">{s.hint}</div>}
            <div className="text-5xl font-semibold text-orange tracking-tighter leading-none mt-1">{s.num}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Link href="/admin/posts" className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-orange-deep transition-colors no-underline">
          + Post yarat
        </Link>
        <Link href="/admin/vacancies" className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-orange-deep transition-colors no-underline">
          + Vakansiya yarat
        </Link>
        <Link href="/admin/exams" className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-orange-deep transition-colors no-underline">
          + İmtahan yarat
        </Link>
      </div>

      {/* Legend */}
      <div className="bg-orange-tint border border-orange-soft rounded-xl px-5 py-3 mb-6 flex flex-col md:flex-row md:items-center gap-2 text-xs text-ink-3">
        <span className="font-bold text-orange-deep">📋 Qısa izahat:</span>
        <span><strong className="text-ink">İş müraciətləri</strong> — vakansiyalara CV göndərənlər (iş axtaranlar)</span>
        <span className="hidden md:inline text-muted">·</span>
        <span><strong className="text-ink">Əlaqə mesajları</strong> — saytın əlaqə/müraciət formasından sual soruşanlar</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent posts */}
        <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-ink/[0.08] flex justify-between items-center bg-paper">
            <h2 className="text-lg font-semibold text-ink">Son postlar</h2>
            <Link href="/admin/posts" className="text-xs text-orange font-semibold hover:underline">Hamısı →</Link>
          </div>
          <div className="divide-y divide-ink/[0.06]">
            {recentPosts.map((p) => (
              <div key={p.id} className="px-6 py-4 hover:bg-paper transition-colors">
                <div className="text-sm font-semibold text-ink mb-1">{p.title}</div>
                <div className="flex gap-2 text-xs text-muted">
                  <span className="bg-orange-tint text-orange-deep px-2 py-0.5 rounded-full font-medium">{p.category}</span>
                  <span>{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming exams */}
        <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-ink/[0.08] flex justify-between items-center bg-paper">
            <h2 className="text-lg font-semibold text-ink">Yaxın imtahanlar</h2>
            <Link href="/admin/exams" className="text-xs text-orange font-semibold hover:underline">Hamısı →</Link>
          </div>
          <div className="divide-y divide-ink/[0.06]">
            {recentExams.map((e) => (
              <div key={e.id} className="px-6 py-4 hover:bg-paper transition-colors flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-tint flex items-center justify-center text-orange-deep font-semibold text-sm flex-shrink-0">
                  {e.date.split("-")[2]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{e.name}</div>
                  <div className="text-xs text-muted">{e.date} · {e.branch}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
