"use client";
import { useEffect, useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = async () => {
    const res = await fetch("/api/contact");
    if (res.ok) setMessages(await res.json());
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  const del = async (id: number) => {
    if (!confirm("Bu mesajı silmək istəyirsiniz?")) return;
    await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const unread = messages.filter((m) => !m.read).length;

  const toggle = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
    const msg = messages.find((m) => m.id === id);
    if (msg && !msg.read) markRead(id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-7">
        <h1 className="text-3xl font-semibold text-ink tracking-tight">Mesajlar</h1>
        {unread > 0 && (
          <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {unread} yeni
          </span>
        )}
      </div>

      <div className="bg-white border border-ink/[0.08] rounded-2xl overflow-hidden">
        {messages.length === 0 ? (
          <div className="px-7 py-16 text-center text-muted">
            <div className="text-4xl mb-3">✉️</div>
            <p className="font-medium text-ink">Hələ heç bir mesaj yoxdur</p>
          </div>
        ) : (
          <div className="divide-y divide-ink/[0.06]">
            {messages.map((msg) => (
              <div key={msg.id} className={`transition-colors ${!msg.read ? "bg-orange-tint/30" : ""}`}>
                <button
                  onClick={() => toggle(msg.id)}
                  className="w-full flex items-start gap-4 px-6 py-4 text-left hover:bg-paper transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-tint flex items-center justify-center text-orange-deep font-bold text-sm flex-shrink-0 mt-0.5">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold text-ink ${!msg.read ? "font-bold" : ""}`}>
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-muted">{msg.email}{msg.phone ? ` · ${msg.phone}` : ""}</div>
                    <p className="text-sm text-ink-2 mt-1 truncate">{msg.message}</p>
                  </div>
                  <div className="text-xs text-muted flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString("az-AZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </button>

                {expanded === msg.id && (
                  <div className="px-6 pb-5 ml-14">
                    <div className="bg-paper border border-ink/[0.08] rounded-xl p-4 mb-3">
                      <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <div className="flex gap-3">
                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-orange text-white px-3 py-1.5 rounded-lg hover:bg-orange-deep transition-colors no-underline"
                        >
                          📞 Zəng et
                        </a>
                      )}
                      <button
                        onClick={() => del(msg.id)}
                        className="text-xs font-semibold text-brand-red hover:bg-brand-red-soft px-3 py-1.5 rounded-lg transition-colors ml-auto"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
