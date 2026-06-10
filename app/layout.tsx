import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import ConditionalShell from "@/components/ConditionalShell";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MQ Akademiyası — Keyfiyyətli təhsil, real nəticə",
  description: "MQ Akademiyası müasir və keyfiyyətli təhsil prinsiplərinə əsaslanaraq fəaliyyət göstərən təhsil mərkəzidir. 4 filial — Bakı və Abşeron.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={inter.variable}>
      <body>
        <SessionWrapper>
          <ConditionalShell>{children}</ConditionalShell>
        </SessionWrapper>
      </body>
    </html>
  );
}
