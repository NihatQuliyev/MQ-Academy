"use client";
import { useEffect, useState, useRef } from "react";

interface TopicItem {
  id: number;
  content: string;
  order: number;
}

interface TopicSubject {
  id: number;
  name: string;
  order: number;
  items: TopicItem[];
}

interface Section {
  id: number;
  examId: number | null;
  dil: string;
  subjects: TopicSubject[];
}

interface ExamOption {
  id: number;
  name: string;
  date: string;
  category: string;
}

type DilKey = "az" | "ru";

const DIL_OPTIONS: { key: DilKey; label: string; flag: string; color: string }[] = [
  { key: "az", label: "Azərbaycan bölməsi", flag: "🇦🇿", color: "bg-orange" },
  { key: "ru", label: "Rus bölməsi",        flag: "🇷🇺", color: "bg-blue-600" },
];

export default function AdminTopicsPage() {
  const [exams, setExams]                   = useState<ExamOption[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [sections, setSections]             = useState<Record<DilKey, Section | null>>({ az: null, ru: null });
  const [activeDil, setActiveDil]           = useState<DilKey>("az");
  const [loading, setLoading]               = useState(false);
  const [creating, setCreating]             = useState(false);

  const [newSubjectName, setNewSubjectName] = useState("");
  const [addingSubject, setAddingSubject]   = useState(false);

  const [newItem, setNewItem]       = useState<Record<number, string>>({});
  const [addingItem, setAddingItem] = useState<Record<number, boolean>>({});
  const [expandedSub, setExpandedSub] = useState<Set<number>>(new Set());
  const [editingItem, setEditingItem] = useState<{ id: number; content: string } | null>(null);
  const [bulkMode, setBulkMode]     = useState<Record<number, boolean>>({});
  const [bulkText, setBulkText]     = useState<Record<number, string>>({});
  const [bulkAdding, setBulkAdding] = useState<Record<number, boolean>>({});

  const itemInputRef = useRef<Record<number, HTMLTextAreaElement | null>>({});

  // Load all exams on mount
  useEffect(() => {
    fetch("/api/exams?active=all")
      .then((r) => r.json())
      .then((data: ExamOption[]) => setExams(data))
      .catch(() => {});
  }, []);

  // Load all sections for selected exam
  const loadSections = async (examId: number) => {
    setLoading(true);
    setSections({ az: null, ru: null });
    const r = await fetch(`/api/topics/sections?examId=${examId}`);
    if (r.ok) {
      const data: Section[] = await r.json();
      const map: Record<DilKey, Section | null> = { az: null, ru: null };
      for (const sec of data) {
        if (sec.dil === "az" || sec.dil === "ru") {
          map[sec.dil] = sec;
        }
      }
      setSections(map);
    }
    setLoading(false);
  };

  const handleSelectExam = (id: number) => {
    setSelectedExamId(id);
    setExpandedSub(new Set());
    loadSections(id);
  };

  const createSection = async () => {
    if (!selectedExamId) return;
    setCreating(true);
    const r = await fetch("/api/topics/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId: selectedExamId, dil: activeDil }),
    });
    if (r.ok) { await loadSections(selectedExamId); }
    else { const d = await r.json(); alert(d.error || "Xəta"); }
    setCreating(false);
  };

  const deleteSection = async (id: number) => {
    if (!confirm("Bu bölməni silmək istəyirsiniz? Bütün fənlər və mövzular da silinəcək.")) return;
    await fetch(`/api/topics/sections/${id}`, { method: "DELETE" });
    if (selectedExamId) await loadSections(selectedExamId);
  };

  const activeSection = sections[activeDil];

  const addSubject = async () => {
    if (!activeSection || !newSubjectName.trim()) return;
    setAddingSubject(true);
    const r = await fetch("/api/topics/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sectionId: activeSection.id, name: newSubjectName.trim(), order: activeSection.subjects.length }),
    });
    if (r.ok) { setNewSubjectName(""); if (selectedExamId) await loadSections(selectedExamId); }
    setAddingSubject(false);
  };

  const deleteSubject = async (id: number) => {
    if (!confirm("Bu fənni silmək istəyirsiniz?")) return;
    await fetch(`/api/topics/subjects/${id}`, { method: "DELETE" });
    if (selectedExamId) await loadSections(selectedExamId);
  };

  const addItem = async (subjectId: number) => {
    const content = (newItem[subjectId] || "").trim();
    if (!content) return;
    setAddingItem((p) => ({ ...p, [subjectId]: true }));
    const subj = activeSection?.subjects.find((s) => s.id === subjectId);
    await fetch("/api/topics/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectId, content, order: subj?.items.length ?? 0 }),
    });
    setNewItem((p) => ({ ...p, [subjectId]: "" }));
    if (selectedExamId) await loadSections(selectedExamId);
    setAddingItem((p) => ({ ...p, [subjectId]: false }));
  };

  const addBulkItems = async (subjectId: number) => {
    const text = (bulkText[subjectId] || "").trim();
    if (!text) return;
    const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) return;
    setBulkAdding((p) => ({ ...p, [subjectId]: true }));
    const subj = activeSection?.subjects.find((s) => s.id === subjectId);
    let order = subj?.items.length ?? 0;
    for (const line of lines) {
      await fetch("/api/topics/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, content: line, order: order++ }),
      });
    }
    setBulkText((p) => ({ ...p, [subjectId]: "" }));
    setBulkMode((p) => ({ ...p, [subjectId]: false }));
    if (selectedExamId) await loadSections(selectedExamId);
    setBulkAdding((p) => ({ ...p, [subjectId]: false }));
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/topics/items/${id}`, { method: "DELETE" });
    if (selectedExamId) await loadSections(selectedExamId);
  };

  const saveEditItem = async () => {
    if (!editingItem) return;
    await fetch(`/api/topics/items/${editingItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingItem.content }),
    });
    setEditingItem(null);
    if (selectedExamId) await loadSections(selectedExamId);
  };

  const toggleSub = (id: number) => {
    setExpandedSub((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedExam = exams.find((e) => e.id === selectedExamId);

  const categoryLabel: Record<string, string> = {
    abituriyent: "Abituriyent", ibtidai: "İbtidai",
    tekmillesme: "Təkmilləşdirmə", dil: "Xarici dil",
  };

  // How many dils have sections with subjects
  const activeDilData = DIL_OPTIONS.find((d) => d.key === activeDil)!;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-ink mb-1">Mövzu İdarəetməsi</h1>
      <p className="text-sm text-muted mb-8">İmtahan seçin, bölmə (dil) seçin və mövzuları idarə edin</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: exam selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-ink/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-bold text-ink">İmtahanlar</h2>
              <span className="text-xs text-muted">{exams.length} ədəd</span>
            </div>
            {exams.length === 0 ? (
              <p className="px-5 py-8 text-sm text-muted text-center">Əvvəlcə imtahan yaradın</p>
            ) : (
              <ul className="divide-y divide-ink/[0.05]">
                {exams.map((exam) => {
                  // Count how many dil sections exist for this exam
                  const hasSections = selectedExamId === exam.id
                    ? Object.values(sections).filter(Boolean).length
                    : null;
                  return (
                    <li key={exam.id}>
                      <button
                        onClick={() => handleSelectExam(exam.id)}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                          selectedExamId === exam.id ? "bg-orange-tint" : "hover:bg-paper"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-ink truncate">{exam.name}</div>
                          <div className="text-xs text-muted">{exam.date} · {categoryLabel[exam.category] || exam.category}</div>
                        </div>
                        {selectedExamId === exam.id && (
                          <div className="flex items-center gap-1">
                            {hasSections !== null && hasSections > 0 && (
                              <span className="text-[10px] font-bold text-orange bg-orange-tint px-1.5 py-0.5 rounded-md">
                                {hasSections} dil
                              </span>
                            )}
                            <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT: topics editor */}
        <div className="lg:col-span-2">
          {!selectedExamId ? (
            <div className="bg-white border border-ink/[0.08] rounded-2xl flex items-center justify-center h-64 text-muted">
              <div className="text-center">
                <div className="text-4xl mb-3">👈</div>
                <p className="font-medium text-ink">İmtahan seçin</p>
                <p className="text-sm mt-1">Sol tərəfdən imtahan seçin</p>
              </div>
            </div>
          ) : loading ? (
            <div className="bg-white border border-ink/[0.08] rounded-2xl flex items-center justify-center h-64">
              <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Exam name + dil tabs */}
              <div className="bg-white border border-ink/[0.08] rounded-2xl p-5">
                <h2 className="text-lg font-bold text-ink mb-4">{selectedExam?.name}</h2>
                {/* Dil tabs */}
                <div className="flex flex-wrap gap-2">
                  {DIL_OPTIONS.map((opt) => {
                    const hasSection = !!sections[opt.key];
                    const isActive = activeDil === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => { setActiveDil(opt.key); setExpandedSub(new Set()); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                          isActive
                            ? `${opt.color} text-white border-transparent`
                            : "bg-paper text-muted hover:text-ink border-ink/[0.1]"
                        }`}
                      >
                        <span>{opt.flag}</span>
                        <span>{opt.label}</span>
                        {hasSection && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            isActive ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                          }`}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active dil content */}
              {!activeSection ? (
                <div className="bg-white border border-ink/[0.08] rounded-2xl p-10 text-center">
                  <div className="text-4xl mb-3">{activeDilData.flag}</div>
                  <p className="font-semibold text-ink mb-1">{activeDilData.label} bölməsi</p>
                  <p className="text-sm text-muted mb-6">
                    <strong>{selectedExam?.name}</strong> imtahanı üçün {activeDilData.label} bölməsi hələ yaradılmayıb
                  </p>
                  <button
                    onClick={createSection}
                    disabled={creating}
                    className={`text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50 ${activeDilData.color} hover:opacity-90`}
                  >
                    {creating ? "Yaradılır..." : `+ ${activeDilData.label} bölməsi yarat`}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Section header */}
                  <div className="bg-white border border-ink/[0.08] rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{activeDilData.flag}</span>
                        <span className="font-bold text-ink">{activeDilData.label} bölməsi</span>
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        {activeSection.subjects.length} fənn · {activeSection.subjects.reduce((a, s) => a + s.items.length, 0)} mövzu
                      </p>
                    </div>
                    <button
                      onClick={() => deleteSection(activeSection.id)}
                      className="text-xs font-semibold text-brand-red hover:bg-brand-red-soft px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Bölməni sil
                    </button>
                  </div>

                  {/* Add subject */}
                  <div className="bg-white border border-ink/[0.08] rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-ink mb-3">Fənn əlavə et</h3>
                    <div className="flex gap-2">
                      <input
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSubject()}
                        placeholder="Fənnin adı — məs: Riyaziyyat"
                        className="flex-1 border border-ink/[0.12] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange"
                      />
                      <button
                        onClick={addSubject}
                        disabled={addingSubject || !newSubjectName.trim()}
                        className="bg-orange text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-deep transition-colors disabled:opacity-40"
                      >
                        {addingSubject ? "..." : "Əlavə et"}
                      </button>
                    </div>
                  </div>

                  {/* Subject cards */}
                  {activeSection.subjects.length === 0 ? (
                    <div className="bg-white border border-ink/[0.08] rounded-2xl py-12 text-center text-muted">
                      <div className="text-3xl mb-2">📚</div>
                      <p className="text-sm">Bu bölmə üçün hələ fənn yoxdur. Yuxarıdan fənn əlavə edin.</p>
                    </div>
                  ) : (
                    activeSection.subjects.map((sub) => {
                      const open = expandedSub.has(sub.id);
                      return (
                        <div key={sub.id} className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
                          <div className="flex items-center gap-3 px-5 py-4 border-b border-ink/[0.06]">
                            <button onClick={() => toggleSub(sub.id)} className="flex-1 flex items-center gap-3 text-left">
                              <div className="w-9 h-9 rounded-xl bg-orange-tint flex items-center justify-center text-lg flex-shrink-0">📚</div>
                              <div>
                                <div className="font-bold text-ink">{sub.name}</div>
                                <div className="text-xs text-muted">{sub.items.length} mövzu</div>
                              </div>
                              <svg className={`w-4 h-4 text-muted ml-auto transition-transform ${open ? "rotate-180" : ""}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <polyline points="6 9 12 15 18 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <button onClick={() => deleteSubject(sub.id)}
                              className="text-xs text-brand-red hover:bg-brand-red-soft px-2.5 py-1.5 rounded-lg transition-colors flex-shrink-0">
                              Sil
                            </button>
                          </div>

                          {open && (
                            <div className="p-4 space-y-2">
                              {sub.items.map((item, idx) => (
                                <div key={item.id} className="flex items-start gap-2 group">
                                  <span className="mt-1 w-5 h-5 rounded-md bg-orange-tint text-orange text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  {editingItem?.id === item.id ? (
                                    <div className="flex-1 flex gap-2">
                                      <textarea
                                        value={editingItem.content}
                                        onChange={(e) => setEditingItem({ id: item.id, content: e.target.value })}
                                        rows={2}
                                        className="flex-1 border border-orange rounded-xl px-3 py-2 text-sm focus:outline-none resize-none"
                                      />
                                      <div className="flex flex-col gap-1">
                                        <button onClick={saveEditItem}
                                          className="text-xs bg-orange text-white px-3 py-1.5 rounded-lg font-semibold">
                                          Saxla
                                        </button>
                                        <button onClick={() => setEditingItem(null)}
                                          className="text-xs bg-paper text-muted px-3 py-1.5 rounded-lg">
                                          Ləğv
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex-1 flex items-start justify-between gap-2">
                                      <span className="text-sm text-ink leading-relaxed">{item.content}</span>
                                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                        <button onClick={() => setEditingItem({ id: item.id, content: item.content })}
                                          className="text-[10px] text-muted hover:text-orange px-2 py-1 rounded-md hover:bg-orange-tint transition-colors">
                                          Düzəlt
                                        </button>
                                        <button onClick={() => deleteItem(item.id)}
                                          className="text-[10px] text-brand-red hover:bg-brand-red-soft px-2 py-1 rounded-md transition-colors">
                                          Sil
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}

                              <div className="mt-3 pt-3 border-t border-ink/[0.06]">
                                {/* Mode toggle */}
                                <div className="flex items-center gap-2 mb-2">
                                  <button
                                    onClick={() => setBulkMode((p) => ({ ...p, [sub.id]: false }))}
                                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${!bulkMode[sub.id] ? "bg-orange text-white" : "bg-paper text-muted hover:text-ink"}`}
                                  >
                                    Tək mövzu
                                  </button>
                                  <button
                                    onClick={() => setBulkMode((p) => ({ ...p, [sub.id]: true }))}
                                    className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors ${bulkMode[sub.id] ? "bg-orange text-white" : "bg-paper text-muted hover:text-ink"}`}
                                  >
                                    📋 Toplu yapışdır
                                  </button>
                                </div>

                                {bulkMode[sub.id] ? (
                                  <div className="space-y-2">
                                    <p className="text-xs text-muted">Hər sətir ayrı mövzu sayılır. Word-dan kopyalayın, yapışdırın.</p>
                                    <textarea
                                      value={bulkText[sub.id] || ""}
                                      onChange={(e) => setBulkText((p) => ({ ...p, [sub.id]: e.target.value }))}
                                      rows={8}
                                      placeholder={"Mövzu 1\nMövzu 2\nMövzu 3\n..."}
                                      className="w-full border border-ink/[0.12] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange resize-y font-mono"
                                    />
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => addBulkItems(sub.id)}
                                        disabled={bulkAdding[sub.id] || !(bulkText[sub.id] || "").trim()}
                                        className="bg-orange text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-orange-deep transition-colors disabled:opacity-40"
                                      >
                                        {bulkAdding[sub.id] ? "Əlavə olunur..." : `Hamısını əlavə et (${(bulkText[sub.id] || "").split("\n").filter((l) => l.trim()).length} mövzu)`}
                                      </button>
                                      <button
                                        onClick={() => { setBulkMode((p) => ({ ...p, [sub.id]: false })); setBulkText((p) => ({ ...p, [sub.id]: "" })); }}
                                        className="text-xs text-muted hover:text-ink px-3 py-2 rounded-lg"
                                      >
                                        Ləğv et
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex gap-2">
                                    <textarea
                                      ref={(el) => { itemInputRef.current[sub.id] = el; }}
                                      value={newItem[sub.id] || ""}
                                      onChange={(e) => setNewItem((p) => ({ ...p, [sub.id]: e.target.value }))}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                          e.preventDefault();
                                          addItem(sub.id);
                                        }
                                      }}
                                      rows={2}
                                      placeholder="Yeni mövzu — Enter ilə əlavə et"
                                      className="flex-1 border border-ink/[0.12] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange resize-none"
                                    />
                                    <button
                                      onClick={() => addItem(sub.id)}
                                      disabled={addingItem[sub.id] || !(newItem[sub.id] || "").trim()}
                                      className="bg-orange text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-orange-deep transition-colors disabled:opacity-40 self-end"
                                    >
                                      {addingItem[sub.id] ? "..." : "Əlavə"}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
