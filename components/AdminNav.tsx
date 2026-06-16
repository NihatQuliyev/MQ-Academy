"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin",              label: "Dashboard",            exact: true },
  { href: "/admin/posts",        label: "Postlar" },
  { href: "/admin/vacancies",    label: "Vakansiyalar" },
  { href: "/admin/applications", label: "Müraciətlər" },
  { href: "/admin/exams",        label: "İmtahanlar" },
  { href: "/admin/topics",       label: "Mövzular" },
  { href: "/admin/results",      label: "Nəticələr" },
  { href: "/admin/messages",     label: "Mesajlar" },
  { href: "/admin/settings",     label: "Tənzimləmə" },
];

async function signOut() {
  try {
    const csrf = await fetch("/api/auth/csrf").then(r => r.json()).then(d => d.csrfToken);
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ csrfToken: csrf }),
    });
  } catch {}
  window.location.href = "/admin-login";
}

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeLabel = links.find(l =>
    l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href !== "/admin"
  )?.label ?? "Dashboard";

  return (
    <>
      {/* Top bar */}
      <div className="bg-ink text-white px-4 md:px-8 h-14 flex items-center justify-between gap-3 sticky top-0 z-50 shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <img src="/logo.svg" alt="MQ" className="w-7 h-7 rounded-full bg-white object-contain p-0.5" />
          <span className="text-sm font-semibold hidden sm:block">MQ Admin</span>
          <span className="bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide hidden sm:block">Panel</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center flex-wrap">
          {links.map((l) => {
            const active = l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href !== "/admin";
            return (
              <Link key={l.href} href={l.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium no-underline transition-colors whitespace-nowrap ${
                  active ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                }`}>
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Active page label on mobile */}
          <span className="lg:hidden text-xs font-semibold text-white/70 bg-white/10 px-3 py-1.5 rounded-lg">
            {activeLabel}
          </span>

          {/* Sign out — desktop */}
          <button onClick={signOut}
            className="hidden lg:flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10">
            Çıxış ↗
          </button>

          {/* Hamburger — mobile */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed top-14 left-0 right-0 bottom-0 z-40 overflow-y-auto" style={{ background: "#1a1a2e" }}>
          <div className="p-3 flex flex-col gap-1">
            {links.map((l) => {
              const active = l.exact ? pathname === l.href : pathname.startsWith(l.href) && l.href !== "/admin";
              return (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold no-underline transition-colors ${
                    active
                      ? "bg-orange text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}>
                  {l.label}
                </Link>
              );
            })}
            <div className="h-px bg-white/10 my-2" />
            <button onClick={signOut}
              className="flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-white/10 transition-colors text-left">
              Çıxış ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
}
