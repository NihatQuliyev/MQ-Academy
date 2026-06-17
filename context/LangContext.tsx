"use client";
import { createContext, useContext, useState } from "react";

type Lang = "az" | "en" | "ru";
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }

const LangContext = createContext<LangCtx>({ lang: "az", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("az");
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
