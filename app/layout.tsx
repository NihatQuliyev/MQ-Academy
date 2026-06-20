import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalShell from "@/components/ConditionalShell";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MQ Akademiyası — Keyfiyyətli təhsil, real nəticə",
  description: "MQ Akademiyası müasir və keyfiyyətli təhsil prinsiplərinə əsaslanaraq fəaliyyət göstərən təhsil mərkəzidir. Abituriyent, magistr, xarici dil, ofis proqramları və daha çox. 4 filial — Bakı və Abşeron.",
  keywords: ["MQ Akademiyası", "MQ Academy", "mqacademy", "mq academy baku", "təhsil mərkəzi", "abituriyent hazırlığı", "magistr hazırlığı", "ingilis dili kursu", "IELTS", "Bakı kursu", "Abşeron kursu", "DİM hazırlığı"],
  metadataBase: new URL("https://mqacademy.az"),
  alternates: {
    canonical: "https://mqacademy.az",
  },
  openGraph: {
    title: "MQ Akademiyası — Keyfiyyətli təhsil, real nəticə",
    description: "Abituriyent, magistr, xarici dil, ofis proqramları və daha çox. 4 filial — Bakı və Abşeron.",
    url: "https://mqacademy.az",
    siteName: "MQ Akademiyası",
    locale: "az_AZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={inter.variable}>
      <body>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
