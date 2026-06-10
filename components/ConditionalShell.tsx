"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CtaBand from "./CtaBand";
import { LangProvider } from "@/context/LangContext";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin") || pathname === "/admin-login";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LangProvider>
      <Navbar />
      <main>{children}</main>
      <CtaBand />
      <Footer />
    </LangProvider>
  );
}
