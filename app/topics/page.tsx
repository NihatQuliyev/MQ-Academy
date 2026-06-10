"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface TopicItem { id: number; content: string; order: number; }
interface TopicSubject { id: number; name: string; order: number; items: TopicItem[]; }
interface TopicSection { dil: string; subjects: TopicSubject[]; }
interface Section { bolme: string; sinif: string; qrup: string; }

type DilKey = "az" | "en" | "ru";

const DIL_META: Record<DilKey, { label: string; flag: string; activeClass: string }> = {
  az: { label: "Azərbaycan dili", flag: "🇦🇿", activeClass: "bg-orange text-white" },
  en: { label: "İngilis dili",    flag: "🇬🇧", activeClass: "bg-sky-500 text-white" },
  ru: { label: "Rus dili",        flag: "🇷🇺", activeClass: "bg-blue-600 text-white" },
};

const SUBJECT_ICONS: Record<string, JSX.Element> = {
  Riyaziyyat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
  Fizika:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  Kimya:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 3h6v11l3.5 6.5a1 1 0 01-.9 1.5H6.4a1 1 0 01-.9-1.5L9 14V3z"/><line x1="9" y1="3" x2="15" y2="3"/></svg>,
  Biologiya:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/><path d="M12 2c3 4 3 16 0 20M3 12h18"/></svg>,
  Tarix:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Coğrafiya:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Ədəbiyyat:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  "Azərbaycan dili": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 7h16M4 12h10M4 17h6"/></svg>,
  İngilis:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20"/></svg>,
};
const defaultSubjectIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/></svg>;
function subjectIcon(name: string): JSX.Element {
  for (const [key, icon] of Object.entries(SUBJECT_ICONS)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return defaultSubjectIcon;
}

function TopicsContent() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("examId");

  // Exam-based mode
  const [examName, setExamName]           = useState("");
  const [examSections, setExamSections]   = useState<TopicSection[]>([]);
  const [examLoading, setExamLoading]     = useState(false);
  const [activeDil, setActiveDil]         = useState<DilKey | null>(null);
  const [expanded, setExpanded]           = useState<Set<number>>(new Set());

  // Legacy selector mode
  const [sections, setSections]   = useState<Section[]>([]);
  const [bolmeler, setBolmeler]   = useState<string[]>([]);
  const [bolme, setBolme]         = useState("");
  const [sinif, setSinif]         = useState("");
  const [qrup, setQrup]           = useState("");
  const [subjects, setSubjects]   = useState<TopicSubject[] | null>(null);
  const [legacyExpanded, setLegacyExpanded] = useState<Set<number>>(new Set());
  const [loading, setLoading]     = useState(false);
  const [fetched, setFetched]     = useState(false);

  // Load exam sections
  useEffect(() => {
    if (!examId) return;
    setExamLoading(true);
    fetch(`/api/topics?examId=${examId}`)
      .then((r) => r.json())
      .then((d: { sections?: TopicSection[] }) => {
        const secs = d.sections || [];
        setExamSections(secs);
        // Auto-select first available dil
        if (secs.length > 0) {
          setActiveDil(secs[0].dil as DilKey);
        }
      })
      .catch(() => setExamSections([]))
      .finally(() => setExamLoading(false));

    // Get exam name
    fetch("/api/exams")
      .then((r) => r.json())
      .then((exams: { id: number; name: string }[]) => {
        const found = exams.find((e) => e.id === Number(examId));
        if (found) setExamName(found.name);
      });
  }, [examId]);

  // Legacy: load meta
  useEffect(() => {
    if (examId) return;
    fetch("/api/topics?meta=1")
      .then((r) => r.json())
      .then((d) => { setSections(d.sections || []); setBolmeler(d.bolmeler || []); });
  }, [examId]);

  const sinifler = bolme ? Array.from(new Set(sections.filter((s) => s.bolme === bolme).map((s) => s.sinif))) : [];
  const qruplar  = bolme && sinif ? Array.from(new Set(sections.filter((s) => s.bolme === bolme && s.sinif === sinif).map((s) => s.qrup))) : [];

  const handleBolme = (v: string) => { setBolme(v); setSinif(""); setQrup(""); setSubjects(null); setFetched(false); };
  const handleSinif = (v: string) => { setSinif(v); setQrup(""); setSubjects(null); setFetched(false); };
  const handleQrup  = (v: string) => { setQrup(v);  setSubjects(null); setFetched(false); };

  useEffect(() => {
    if (!bolme || !sinif || !qrup) return;
    setLoading(true); setFetched(false);
    fetch(`/api/topics?bolme=${encodeURIComponent(bolme)}&sinif=${encodeURIComponent(sinif)}&qrup=${encodeURIComponent(qrup)}`)
      .then((r) => r.json())
      .then((d) => { setSubjects(d.subjects || null); setLegacyExpanded(new Set()); })
      .catch(() => setSubjects(null))
      .finally(() => { setLoading(false); setFetched(true); });
  }, [bolme, sinif, qrup]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };
  const toggleLegacyExpand = (id: number) => {
    setLegacyExpanded((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  };

  const renderSubjectList = (subs: TopicSubject[], expandSet: Set<number>, onToggle: (id: number) => void) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subs.map((sub) => {
        const open = expandSet.has(sub.id);
        return (
          <div key={sub.id} className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <button onClick={() => onToggle(sub.id)} className="w-full flex items-center gap-4 px-5 py-4 text-left">
              <div className="w-11 h-11 rounded-xl bg-orange-tint flex items-center justify-center text-orange flex-shrink-0">{subjectIcon(sub.name)}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-ink text-base leading-tight">{sub.name}</div>
                <div className="text-xs text-muted mt-0.5">{sub.items.length} mövzu</div>
              </div>
              <div className={`w-8 h-8 rounded-full bg-paper border border-ink/[0.08] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
                <svg className="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14"/></svg>
              </div>
            </button>
            {open && (
              <div className="border-t border-ink/[0.06]">
                {sub.items.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-muted">Mövzu əlavə edilməyib</p>
                ) : (
                  <ul className="divide-y divide-ink/[0.05]">
                    {sub.items.map((item, idx) => (
                      <li key={item.id} className="flex items-start gap-3 px-5 py-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md bg-orange-tint text-orange text-[10px] font-bold flex items-center justify-center">{idx + 1}</span>
                        <span className="text-sm text-ink leading-relaxed">{item.content}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Active section for exam mode
  const activeSection = examSections.find((s) => s.dil === activeDil);

  return (
    <>
      <section className="px-6 md:px-12 pt-20 pb-16">
        <div className="section-num">Mövzular</div>
        {examId && examName ? (
          <>
            <h1 className="text-4xl md:text-5xl font-medium leading-none tracking-tighter text-ink max-w-4xl">
              {examName}
            </h1>
            <p className="text-lg text-ink-3 mt-4 max-w-2xl">Bu imtahana aid mövzular aşağıda göstərilib.</p>
            <Link href="/exams" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-orange hover:underline no-underline">
              ← İmtahan təqviminə qayıt
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-medium leading-none tracking-tighter text-ink max-w-4xl">
              İmtahan mövzuları <span className="text-orange">bir yerdə.</span>
            </h1>
            <p className="text-lg text-ink-3 mt-6 max-w-2xl leading-relaxed">
              Bölmə, sinif və qrupu seçin — o qrupa aid bütün fənn mövzuları göstərilsin.
            </p>
          </>
        )}
        <div className="flex gap-2 mt-8">
          <Link href="/exams" className="h-10 px-5 bg-paper border border-ink/[0.1] text-ink text-sm font-semibold rounded-xl flex items-center gap-2 hover:border-orange hover:text-orange transition-all no-underline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Sınaqlar
          </Link>
          <span className="h-10 px-5 bg-orange text-white text-sm font-bold rounded-xl flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            Mövzular
          </span>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        {/* EXAM-BASED MODE */}
        {examId ? (
          examLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
            </div>
          ) : examSections.length === 0 ? (
            <div className="text-center py-20 text-muted">
              <div className="text-5xl mb-4">📚</div>
              <p className="font-semibold text-ink text-lg">Bu imtahan üçün mövzu tapılmadı</p>
              <p className="text-sm mt-2">Admin paneldən mövzular əlavə edilə bilər</p>
              <Link href="/exams" className="inline-flex mt-6 text-sm font-semibold text-orange hover:underline no-underline">← Geri qayıt</Link>
            </div>
          ) : (
            <>
              {/* Language tabs — only show available ones */}
              <div className="flex flex-wrap gap-2 mb-8">
                {examSections.map((sec) => {
                  const meta = DIL_META[sec.dil as DilKey];
                  if (!meta) return null;
                  const isActive = activeDil === sec.dil;
                  return (
                    <button
                      key={sec.dil}
                      onClick={() => { setActiveDil(sec.dil as DilKey); setExpanded(new Set()); }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                        isActive
                          ? `${meta.activeClass} border-transparent shadow-sm`
                          : "bg-white border-ink/[0.1] text-muted hover:text-ink"
                      }`}
                    >
                      <span>{meta.flag}</span>
                      <span>{meta.label}</span>
                      <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20" : "bg-paper text-muted"}`}>
                        {sec.subjects.reduce((a, s) => a + s.items.length, 0)} mövzu
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeSection && activeSection.subjects.length > 0 ? (
                <>
                  <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                    {activeSection.subjects.length} fənn · {activeSection.subjects.reduce((a, s) => a + s.items.length, 0)} mövzu
                  </div>
                  {renderSubjectList(activeSection.subjects, expanded, toggleExpand)}
                </>
              ) : (
                <div className="text-center py-16 text-muted">
                  <div className="text-4xl mb-3">{activeDil ? DIL_META[activeDil]?.flag : "📚"}</div>
                  <p className="font-medium text-ink">Bu bölmə üçün mövzu əlavə edilməyib</p>
                </div>
              )}
            </>
          )
        ) : (
          /* LEGACY SELECTOR MODE */
          <>
            <div className="bg-white border border-ink/[0.08] rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">Bölmə</label>
                  <select value={bolme} onChange={(e) => handleBolme(e.target.value)}
                    className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm text-ink bg-paper focus:outline-none focus:border-orange">
                    <option value="">Seçin</option>
                    {bolmeler.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">Sinif</label>
                  <select value={sinif} onChange={(e) => handleSinif(e.target.value)} disabled={!bolme}
                    className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm text-ink bg-paper focus:outline-none focus:border-orange disabled:opacity-40">
                    <option value="">Seçin</option>
                    {sinifler.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-widest mb-2">Qrup</label>
                  <select value={qrup} onChange={(e) => handleQrup(e.target.value)} disabled={!sinif}
                    className="w-full border border-ink/[0.12] rounded-xl px-4 py-3 text-sm text-ink bg-paper focus:outline-none focus:border-orange disabled:opacity-40">
                    <option value="">Seçin</option>
                    {qruplar.map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {loading && <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" /></div>}
            {!loading && fetched && (!subjects || subjects.length === 0) && (
              <div className="text-center py-16 text-muted">
                <p className="font-medium text-ink">Bu qrup üçün mövzu tapılmadı</p>
              </div>
            )}
            {!loading && subjects && subjects.length > 0 && (
              <>
                <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                  {subjects.length} fənn · {subjects.reduce((a, s) => a + s.items.length, 0)} mövzu
                </div>
                {renderSubjectList(subjects, legacyExpanded, toggleLegacyExpand)}
              </>
            )}
            {!loading && !fetched && !subjects && (
              <div className="text-center py-20 text-muted">
                <div className="text-5xl mb-4">📚</div>
                <p className="font-semibold text-ink text-lg">Bölmə, sinif və qrupu seçin</p>
                <p className="text-sm mt-2">Mövzular avtomatik göstəriləcək</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default function TopicsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" /></div>}>
      <TopicsContent />
    </Suspense>
  );
}
