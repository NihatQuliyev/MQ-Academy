"use client";
import Link from "next/link";
import { IconWhatsApp, IconInstagram, IconTikTok, IconLinkedIn } from "./SocialIcons";
import { useLang } from "@/context/LangContext";
import t from "@/lib/translations";

const socials = [
  { href: "https://wa.me/994103861524",              Icon: IconWhatsApp,  label: "WhatsApp",  color: "#25D366" },
  { href: "https://www.instagram.com/mq_academy.az?igsh=MTE5c2p2Y205c2thZA==", Icon: IconInstagram, label: "Instagram", color: "#E1306C" },
  { href: "https://tiktok.com/@mqakademiya",          Icon: IconTikTok,    label: "TikTok",    color: "#69C9D0" },
  { href: "https://www.linkedin.com/in/mq-academy/", Icon: IconLinkedIn,  label: "LinkedIn",  color: "#0077B5" },
];

const academyHrefs = ["/about", "/vision", "/careers"];
const educationHrefs = ["/programs", "/exams", "/results"];

const LINK   = "#7A2E00";
const LINK_H = "white";
const SOFT   = "rgba(255,255,255,0.55)";

export default function Footer() {
  const { lang } = useLang();
  const tr = t[lang].footer;

  return (
    <footer style={{ background: "#EE6A1A" }}>
      <div className="px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b mb-8"
          style={{ borderColor: "rgba(0,0,0,0.12)" }}>

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.svg" alt="MQ" className="w-10 h-10 rounded-full bg-white object-contain p-0.5 flex-shrink-0" />
              <span className="font-extrabold text-lg tracking-tight text-white">MQ Akademiyası</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: LINK }}>{tr.desc}</p>
            <div className="flex gap-1.5">
              {socials.map(({ href, Icon, label, color }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "white" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.color = color; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.2)"; el.style.color = "white"; }}>
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Academy */}
          <div>
            <h5 className="text-lg font-extrabold tracking-tight mb-5 text-white">{tr.academy}</h5>
            <ul className="space-y-3">
              {tr.academyLinks.map((label, i) => (
                <li key={academyHrefs[i]}>
                  <Link href={academyHrefs[i]} className="text-sm font-semibold no-underline transition-colors"
                    style={{ color: LINK }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LINK_H; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = LINK; }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h5 className="text-lg font-extrabold tracking-tight mb-5 text-white">{tr.education}</h5>
            <ul className="space-y-3">
              {tr.educationLinks.map((label, i) => (
                <li key={educationHrefs[i]}>
                  <Link href={educationHrefs[i]} className="text-sm font-semibold no-underline transition-colors"
                    style={{ color: LINK }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LINK_H; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = LINK; }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-lg font-extrabold tracking-tight mb-5 text-white">{tr.contact}</h5>
            <ul className="space-y-3">
              {[
                { href: "tel:+994124348576",          label: "012 434 85 76" },
                { href: "https://wa.me/994103861524", label: "010 386 15 24" },
                { href: "https://wa.me/994558716368", label: "055 871 63 68" },
                { href: "mailto:info@mqakademiya.az", label: "info@mqakademiya.az" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm font-semibold no-underline transition-colors"
                    style={{ color: LINK }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = LINK_H; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = LINK; }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3">
          <p className="text-xs font-medium" style={{ color: SOFT }}>{tr.copy}</p>
          <p className="text-xs font-medium" style={{ color: SOFT }}>{tr.branches}</p>
        </div>
      </div>
    </footer>
  );
}
