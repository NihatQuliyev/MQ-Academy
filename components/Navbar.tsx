"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { IconWhatsApp, IconInstagram, IconTikTok, IconLinkedIn } from "./SocialIcons";
import ProgramIcon from "./ProgramIcon";
import { ProgramIconKey } from "@/lib/programs";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

const programHrefs = [
  "/programs/ibtidai-sinif",
  "/programs/tekmillesdirme",
  "/programs/abituriyent",
  "/programs/xarici-dil",
  "/programs/magistr",
  "/programs/miq",
  "/programs/ofis-proqramlari",
  "/programs/yay-mektepleri",
];
const programIcons: ProgramIconKey[] = ["pen","trend","award","globe","book","clip","monitor","sun"];

const akademiyaHrefs = ["/about", "/vision", "/careers"];
const examHrefs = ["/exams", "/results"];

const socials = [
  { href: "https://wa.me/994103861524",              Icon: IconWhatsApp,  label: "WhatsApp",  color: "#25D366" },
  { href: "https://www.instagram.com/mq_academy.az?igsh=MTE5c2p2Y205c2thZA==", Icon: IconInstagram, label: "Instagram", color: "#E1306C" },
  { href: "https://www.tiktok.com/@mq_academy.az?_r=1&_t=ZS-97GWweFRSCa", Icon: IconTikTok,    label: "TikTok",    color: "#69C9D0" },
  { href: "https://www.linkedin.com/in/mq-academy/", Icon: IconLinkedIn,  label: "LinkedIn",  color: "#0077B5" },
];

const AZ_FLAG = () => (
  <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="30" height="6.67" fill="#0092BC"/>
    <rect y="6.67" width="30" height="6.67" fill="#E8192C"/>
    <rect y="13.33" width="30" height="6.67" fill="#00AF66"/>
    <text x="15" y="13" textAnchor="middle" fontSize="8" fill="white">☽★</text>
  </svg>
);

const EN_FLAG = () => (
  <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="30" height="20" fill="#012169"/>
    <path d="M0,0 L30,20 M30,0 L0,20" stroke="white" strokeWidth="3.5"/>
    <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2"/>
    <path d="M15,0 V20 M0,10 H30" stroke="white" strokeWidth="5"/>
    <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3"/>
  </svg>
);

const RU_FLAG = () => (
  <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0">
    <rect width="30" height="6.67" fill="white"/>
    <rect y="6.67" width="30" height="6.67" fill="#0039A6"/>
    <rect y="13.33" width="30" height="6.67" fill="#D52B1E"/>
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const tr = t[lang];

  const [drop, setDrop]         = useState(false);
  const [progDrop, setProgDrop] = useState(false);
  const [examDrop, setExamDrop] = useState(false);
  const [langDrop, setLangDrop] = useState(false);
  const [mobile, setMobile]     = useState(false);
  const timer     = useRef<ReturnType<typeof setTimeout>>();
  const progTimer = useRef<ReturnType<typeof setTimeout>>();
  const examTimer = useRef<ReturnType<typeof setTimeout>>();
  const langTimer = useRef<ReturnType<typeof setTimeout>>();

  if (pathname.startsWith("/admin") || pathname === "/admin-login") return null;

  const openDrop   = () => { clearTimeout(timer.current); setDrop(true); };
  const closeDrop  = () => { timer.current = setTimeout(() => setDrop(false), 150); };
  const openProg   = () => { clearTimeout(progTimer.current); setProgDrop(true); };
  const closeProg  = () => { progTimer.current = setTimeout(() => setProgDrop(false), 150); };
  const openExam   = () => { clearTimeout(examTimer.current); setExamDrop(true); };
  const closeExam  = () => { examTimer.current = setTimeout(() => setExamDrop(false), 150); };
  const openLang   = () => { clearTimeout(langTimer.current); setLangDrop(true); };
  const closeLang  = () => { langTimer.current = setTimeout(() => setLangDrop(false), 150); };

  return (
    <nav className="sticky top-0 z-50" style={{ background: "#EE6A1A" }}>
      <div className="px-6 md:px-12 h-[60px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <img src="/logo.svg" alt="MQ Akademiyası" className="w-8 h-8 rounded-full bg-white object-contain p-0.5" />
          <span className="font-extrabold text-white text-[17px] tracking-tight">
            MQ <span className="font-semibold opacity-90">{lang === "en" ? "Academy" : lang === "ru" ? "Академия" : "Akademiyası"}</span>
          </span>
        </Link>

        {/* Desktop center nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">

          {/* Akademiya dropdown */}
          <div className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
            <button className="h-9 px-4 rounded-lg text-sm font-bold text-white/90 hover:text-white hover:bg-white/15 transition-all flex items-center gap-1.5">
              {tr.nav.academy}
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${drop ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {drop && (
              <>
                <div className="absolute top-full left-0 w-56 h-3" onMouseEnter={openDrop} onMouseLeave={closeDrop} />
                <div className="absolute top-[calc(100%+4px)] left-0 w-56 bg-white rounded-2xl shadow-lg overflow-hidden z-50 border border-black/[0.06]"
                  onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                  {tr.nav.akademiyaItems.map((item, i) => (
                    <Link key={akademiyaHrefs[i]} href={akademiyaHrefs[i]} onClick={() => setDrop(false)}
                      className="flex flex-col px-4 py-3.5 hover:bg-orange-tint transition-colors no-underline border-b border-black/[0.05] last:border-0">
                      <span className="text-sm font-semibold text-ink">{item.label}</span>
                      <span className="text-[11px] text-muted mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Tədris mega-menu */}
          <div className="relative" onMouseEnter={openProg} onMouseLeave={closeProg}>
            <button className={`h-9 px-4 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
              pathname.startsWith("/programs") ? "bg-white/25 text-white" : "text-white/90 hover:text-white hover:bg-white/15"
            }`}>
              {tr.nav.education}
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${progDrop ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {progDrop && (
              <>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-3" onMouseEnter={openProg} onMouseLeave={closeProg} />
                <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-black/[0.06] z-50 overflow-hidden"
                  style={{ width: 480 }} onMouseEnter={openProg} onMouseLeave={closeProg}>
                  <div className="px-5 py-3.5 border-b border-black/[0.06] flex items-center justify-between bg-paper">
                    <span className="text-xs font-semibold text-muted uppercase tracking-widest">{tr.nav.educationPrograms}</span>
                    <Link href="/programs" onClick={() => setProgDrop(false)}
                      className="text-xs font-semibold text-orange hover:underline no-underline">
                      {tr.nav.allPrograms}
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 p-2 gap-0.5">
                    {tr.nav.programItems.map((p, i) => (
                      <Link key={programHrefs[i]} href={programHrefs[i]} onClick={() => setProgDrop(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-tint transition-colors no-underline group">
                        <div className="w-9 h-9 rounded-xl bg-orange-tint group-hover:bg-orange/20 flex items-center justify-center flex-shrink-0 transition-colors">
                          <ProgramIcon iconKey={programIcons[i]} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-ink group-hover:text-orange transition-colors leading-tight truncate">{p.label}</div>
                          <div className="text-[11px] text-muted mt-0.5">{p.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* İmtahanlar dropdown */}
          <div className="relative" onMouseEnter={openExam} onMouseLeave={closeExam}>
            <button className={`h-9 px-4 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
              ["/exams","/topics","/results"].some(p => pathname.startsWith(p)) ? "bg-white/25 text-white" : "text-white/90 hover:text-white hover:bg-white/15"
            }`}>
              {tr.nav.exams}
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${examDrop ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {examDrop && (
              <>
                <div className="absolute top-full left-0 w-52 h-3" onMouseEnter={openExam} onMouseLeave={closeExam} />
                <div className="absolute top-[calc(100%+4px)] left-0 w-52 bg-white rounded-2xl shadow-lg overflow-hidden z-50 border border-black/[0.06]"
                  onMouseEnter={openExam} onMouseLeave={closeExam}>
                  {tr.nav.examItems.map((item, i) => (
                    <Link key={examHrefs[i]} href={examHrefs[i]} onClick={() => setExamDrop(false)}
                      className="flex flex-col px-4 py-3.5 hover:bg-orange-tint transition-colors no-underline border-b border-black/[0.05] last:border-0">
                      <span className="text-sm font-semibold text-ink">{item.label}</span>
                      <span className="text-[11px] text-muted mt-0.5">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link href="/contact"
            className={`h-9 px-4 rounded-lg text-sm font-bold transition-all no-underline flex items-center ${
              pathname === "/contact" ? "bg-white/25 text-white" : "text-white/90 hover:text-white hover:bg-white/15"
            }`}>
            {tr.nav.contact}
          </Link>
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          {/* Social icons */}
          <div className="flex items-center gap-0.5 bg-white/10 border border-white/20 rounded-xl p-1">
            {socials.map(({ href, Icon, label, color }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" title={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ color: "rgba(255,255,255,0.75)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Dil switcher */}
          <div className="relative" onMouseEnter={openLang} onMouseLeave={closeLang}>
            <button className="h-9 px-3 rounded-xl bg-white/10 border border-white/20 text-white flex items-center gap-2 text-sm font-bold hover:bg-white/20 transition-colors">
              {lang === "az" ? <AZ_FLAG /> : lang === "ru" ? <RU_FLAG /> : <EN_FLAG />}
              {lang === "az" ? "AZ" : lang === "ru" ? "RU" : "EN"}
              <svg className={`w-3 h-3 transition-transform ${langDrop ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {langDrop && (
              <>
                <div className="absolute top-full left-0 w-full h-3" onMouseEnter={openLang} onMouseLeave={closeLang} />
                <div className="absolute top-[calc(100%+4px)] right-0 w-40 bg-white rounded-2xl shadow-lg overflow-hidden z-50 border border-black/[0.06]"
                  onMouseEnter={openLang} onMouseLeave={closeLang}>
                  {([["az", "Azərbaycan"], ["en", "English"], ["ru", "Русский"]] as [string, string][]).map(([code, name]) => (
                    <button key={code} onClick={() => { setLang(code as "az" | "en" | "ru"); setLangDrop(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-tint transition-colors text-sm font-semibold border-b border-black/[0.05] last:border-0 ${lang === code ? "text-orange" : "text-ink"}`}>
                      {code === "az" ? <AZ_FLAG /> : code === "ru" ? <RU_FLAG /> : <EN_FLAG />}
                      {name}
                      {lang === code && <span className="ml-auto text-orange">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link href="/#muraciet"
            className="h-9 px-5 bg-white text-orange text-sm font-bold rounded-xl hover:bg-orange-tint transition-colors no-underline flex items-center">
            {tr.nav.apply}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/15 text-white"
          onClick={() => setMobile(!mobile)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobile
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="lg:hidden border-t border-white/15 fixed top-[60px] left-0 right-0 bottom-0 overflow-y-auto z-50" style={{ background: "#C44E0C" }}>
          <div className="px-4 py-3 flex flex-col gap-0.5">
            {tr.nav.akademiyaItems.map((l, i) => (
              <Link key={akademiyaHrefs[i]} href={akademiyaHrefs[i]}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 no-underline transition-colors"
                onClick={() => setMobile(false)}>{l.label}</Link>
            ))}
            <div className="h-px bg-white/15 my-1" />
            <div className="px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-widest">{tr.nav.educationPrograms}</div>
            <div className="grid grid-cols-2 gap-1 mb-1">
              {tr.nav.programItems.map((p, i) => (
                <Link key={programHrefs[i]} href={programHrefs[i]}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 no-underline transition-colors"
                  onClick={() => setMobile(false)}>
                  <span className="text-white/80"><ProgramIcon iconKey={programIcons[i]} /></span>
                  <span className="truncate text-xs">{p.label}</span>
                </Link>
              ))}
            </div>
            <div className="h-px bg-white/15 my-1" />
            <div className="px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-widest">{tr.nav.exams}</div>
            {tr.nav.examItems.map((l, i) => (
              <Link key={examHrefs[i]} href={examHrefs[i]}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 no-underline transition-colors"
                onClick={() => setMobile(false)}>{l.label}</Link>
            ))}
            <div className="h-px bg-white/15 my-1" />
            <Link href="/contact"
              className="px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 no-underline transition-colors"
              onClick={() => setMobile(false)}>{tr.nav.contact}</Link>
            {/* Dil seçimi (mobil) */}
            <div className="h-px bg-white/15 my-1" />
            <div className="flex gap-2 px-2">
              {([["az", "Azərbaycan"], ["en", "English"], ["ru", "Русский"]] as [string, string][]).map(([code, name]) => (
                <button key={code} onClick={() => { setLang(code as "az" | "en" | "ru"); setMobile(false); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors ${lang === code ? "bg-white text-orange" : "bg-white/10 text-white"}`}>
                  {code === "az" ? <AZ_FLAG /> : code === "ru" ? <RU_FLAG /> : <EN_FLAG />}
                  {code === "az" ? "AZ" : code === "ru" ? "RU" : "EN"}
                </button>
              ))}
            </div>
            <Link href="/#muraciet" className="mt-2 bg-white text-orange font-bold text-sm text-center py-3 rounded-xl no-underline" onClick={() => setMobile(false)}>{tr.nav.apply}</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
