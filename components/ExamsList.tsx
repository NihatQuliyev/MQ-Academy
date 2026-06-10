"use client";
import Link from "next/link";

interface Exam {
  id: number;
  name: string;
  category: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  branch: string;
  grade: string;
  topics: string[];
  note: string;
  hasTopics?: boolean;
}

const months: Record<string, string> = {
  "01": "Yan", "02": "Fev", "03": "Mar", "04": "Apr",
  "05": "May", "06": "İyn", "07": "İyl", "08": "Avq",
  "09": "Sen", "10": "Okt", "11": "Noy", "12": "Dek",
};

function formatDate(dateStr: string) {
  const [, m, d] = dateStr.split("-");
  return { day: d, month: months[m] || m };
}

export default function ExamsList({
  exams,
}: {
  exams: Exam[];
  currentCategory: string;
  currentType: string;
}) {
  return (
    <div>
      <div className="text-sm text-muted mb-4 font-medium">
        {exams.length} imtahan tapıldı
      </div>

      {exams.length === 0 ? (
        <div className="bg-white border border-ink/[0.08] rounded-2xl p-16 text-center">
          <div className="flex justify-center mb-4 text-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-ink mb-2">Bu kriteriyalara uyğun imtahan tapılmadı</h3>
          <p className="text-sm text-muted">Filterləri dəyişərək yenidən cəhd edin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {exams.map((exam) => {
            const { day, month } = formatDate(exam.date);
            return (
              <div key={exam.id} className="bg-white border border-ink/[0.08] rounded-2xl p-6 grid grid-cols-[90px_1fr_auto] gap-5 items-center hover:border-orange hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => window.location.href = `/exams/${exam.id}`}>
                {/* Date */}
                <div className="flex flex-col items-center bg-orange-tint rounded-xl px-3 py-4 text-center">
                  <span className="text-4xl font-semibold text-orange-deep leading-none tracking-tight">{day}</span>
                  <span className="text-xs font-semibold text-orange-deep uppercase tracking-wider mt-1">{month}</span>
                </div>

                {/* Body */}
                <div>
                  <h3 className="text-xl font-semibold text-ink mb-2 tracking-tight">{exam.name}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-muted mb-3">
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0112 0v2"/></svg>
                      {exam.grade}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {exam.branch}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {exam.duration}
                    </span>
                  </div>
                  {exam.note && (
                    <p className="text-xs text-muted">{exam.note}</p>
                  )}
                </div>

                {/* Side */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-semibold text-ink">{exam.time}</span>
                  {exam.hasTopics && (
                    <Link
                      href={`/topics?examId=${exam.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-orange-tint text-orange-deep border border-orange-soft px-3 py-1.5 rounded-xl hover:bg-orange hover:text-white transition-all no-underline"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                        <line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
                      </svg>
                      Mövzular
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
