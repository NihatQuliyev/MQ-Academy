"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/posts", label: "Postlar" },
  { href: "/admin/vacancies", label: "Vakansiyalar" },
  { href: "/admin/applications", label: "Vakansiya müraciətləri" },
  { href: "/admin/exams", label: "İmtahanlar" },
  { href: "/admin/topics", label: "Mövzular" },
  { href: "/admin/results", label: "Nəticələr" },
  { href: "/admin/messages", label: "Mesajlar" },
  { href: "/admin/settings", label: "⚙ Tənzimləmə" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="bg-ink text-white px-6 md:px-12 py-4 flex items-center justify-between gap-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="MQ" className="w-7 h-7 rounded-full bg-white object-contain p-0.5" />
          <span className="text-base font-medium">MQ Admin</span>
        </div>
        <span className="bg-orange text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Panel</span>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href !== "/admin";
          return (
            <Link key={l.href} href={l.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                active ? "bg-white/15 text-white" : "text-white/65 hover:text-white hover:bg-white/10"
              }`}>
              {l.label}
            </Link>
          );
        })}
      </div>

      <button onClick={async () => {
          await fetch("/api/auth/signout", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ csrfToken: await fetch("/api/auth/csrf").then(r => r.json()).then(d => d.csrfToken) }) });
          window.location.href = "/admin-login";
        }}
        className="text-white/65 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
        Çıxış ↗
      </button>
    </div>
  );
}
