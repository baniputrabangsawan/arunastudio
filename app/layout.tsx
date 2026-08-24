import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import arunaLogo from "@/aruna1.svg";
import { siteUrl } from "@/lib/utils";
import { SiteShell } from "@/components/site-shell";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "ARUNA - Jasa Pembuatan Website untuk UMKM", template: "%s - ARUNA" },
  description: "Website custom yang membuat bisnis kecil tampil lebih profesional, mudah dipercaya, dan siap berkembang.",
  keywords: ["jasa pembuatan website", "jasa website UMKM", "website bisnis"],
  icons: { icon: [{ url: arunaLogo.src, type: "image/svg+xml" }] },
  openGraph: { title: "ARUNA - Website premium untuk bisnis yang sedang tumbuh", description: "Desain custom, harga jelas, dan teknologi yang berguna untuk bisnis Anda.", type: "website", locale: "id_ID" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        <SiteShell header={<Header />} footer={<Footer />} whatsapp={<WhatsAppButton />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
