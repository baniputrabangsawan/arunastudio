import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import arunaIcon from "@/aruna.png";
import { siteUrl } from "@/lib/utils";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "ARUNA - Jasa Pembuatan Website untuk UMKM", template: "%s - ARUNA" },
  description: "Website custom yang membuat bisnis kecil tampil lebih profesional, mudah dipercaya, dan siap berkembang.",
  keywords: ["jasa pembuatan website", "jasa website UMKM", "website bisnis"],
  icons: { icon: [{ url: arunaIcon.src, type: "image/png" }] },
  openGraph: { title: "ARUNA - Website premium untuk bisnis yang sedang tumbuh", description: "Desain custom, harga jelas, dan teknologi yang berguna untuk bisnis Anda.", type: "website", locale: "id_ID" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
