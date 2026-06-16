"use client";
import { useEffect, useState } from "react";

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  cvPath: string;
  createdAt: string;
  vacancy: { title: string; branch: string };
  vacancyId: number;
}

interface Vacancy {
  id: number;
  title: string;
  branch: string;
}

export default function AdminApplications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [msg, setMsg] = useState("");

  const load = async (vacancyId?: string) => {
    const url = vacancyId && vacancyId !== "all"
      ? `/api/applications?vacancyId=${vacancyId}`
      : "/api/applications";
    const res = await fetch(url);
    setApps(await res.json());
  };

  useEffect(() => {
    fetch("/api/vacancies").then((r) => r.json()).then(setVacancies);
    load();
  }, []);

  const handleFilter = (val: string) => {
    setFilter(val);
    load(val);
  };

  const del = async (id: number) => {
    if (!confirm("Bu müraciəti silmək istəyirsiniz?")) return;
    await fetch(`/api/applications?id=${id}`, { method: "DELETE" });
    setMsg("Silindi ✓");
    setTimeout(() => setMsg(""), 3000);
    load(filter);
  };

  const grouped = filter === "all"
    ? Object.groupBy(apps, (a) => a.vacancy?.title ?? "Naməlum")
    : null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-ink tracking-tight">Müraciətlər</h1>
          <p className="text-sm text-muted mt-1">Cəmi {apps.length} müraciət</p>
        </div>
        <select
          value={filter}
          onChange={(e) => handleFilter(e.target.value)}
          className="field-input max-w-xs"
        >
          <option value="all">Bütün vakansiyalar</option>
          {vacancies.map((v) => (
            <option key={v.id} value={String(v.id)}>{v.title} — {v.branch}</option>
          ))}
        </select>
      </div>

      {msg && (
        <div className="bg-brand-red-soft text-brand-red text-sm font-semibold px-4 py-3 rounded-xl mb-5">{msg}</div>
      )}

      {apps.length === 0 ? (
        <div className="bg-white border border-ink/[0.08] rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-ink mb-2">Hələ heç bir müraciət yoxdur</h3>
          <p className="text-sm text-muted">Müraciətlər daxil olduqda burada görünəcək.</p>
        </div>
      ) : grouped ? (
        <div className="space-y-6">
          {Object.entries(grouped).map(([title, items]) => (
            <div key={title} className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
              <div className="px-7 py-4 border-b border-ink/[0.08] bg-paper flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-ink">{title}</h2>
                  <p className="text-xs text-muted mt-0.5">{items?.length} müraciət</p>
                </div>
                <span className="bg-orange-tint text-orange-deep text-xs font-bold px-3 py-1 rounded-full">
                  {items?.length}
                </span>
              </div>
              <div className="divide-y divide-ink/[0.06]">
                {items?.map((a) => (
                  <AppRow key={a.id} app={a} onDelete={del} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
          <div className="divide-y divide-ink/[0.06]">
            {apps.map((a) => (
              <AppRow key={a.id} app={a} onDelete={del} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AppRow({ app, onDelete }: { app: Application; onDelete: (id: number) => void }) {
  const date = new Date(app.createdAt).toLocaleDateString("az-AZ", {
    day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <div className="px-7 py-5 hover:bg-paper transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-orange-tint flex items-center justify-center text-orange-deep font-semibold text-base flex-shrink-0">
          {app.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-ink text-sm">{app.name}</span>
            <span className="text-xs text-muted">· {date}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-ink-3">
            <span>✉ <a href={`mailto:${app.email}`} className="hover:text-orange transition-colors">{app.email}</a></span>
            <span>📞 <a href={`tel:${app.phone}`} className="hover:text-orange transition-colors">{app.phone}</a></span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {app.cvPath ? (
            <a
              href={`/api/cv-view?url=${encodeURIComponent(app.cvPath)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange bg-orange-tint border border-orange-soft px-3 py-1.5 rounded-lg hover:bg-orange hover:text-white transition-colors no-underline"
            >
              📄 CV-yə bax
            </a>
          ) : (
            <span className="text-xs text-muted bg-paper border border-ink/[0.08] px-3 py-1.5 rounded-lg">CV yoxdur</span>
          )}
          <button
            onClick={() => onDelete(app.id)}
            className="w-8 h-8 rounded-lg bg-paper border border-ink/[0.08] text-muted hover:bg-brand-red-soft hover:text-brand-red transition-colors flex items-center justify-center text-sm"
          >✕</button>
        </div>
      </div>
    </div>
  );
}
