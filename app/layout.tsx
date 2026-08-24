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
  alternates: { canonical: "/" },
  icons: { icon: [{ url: arunaLogo.src, type: "image/svg+xml" }] },
  openGraph: { title: "ARUNA - Jasa Website untuk UMKM Indonesia", description: "Website custom yang rapi, cepat, dan membantu pelanggan memilih bisnis Anda.", type: "website", locale: "id_ID", url: "/", siteName: "ARUNA" },
  twitter: { card: "summary_large_image", title: "ARUNA - Jasa Website untuk UMKM Indonesia", description: "Website custom yang rapi, cepat, dan membantu pelanggan memilih bisnis Anda." },
  category: "technology",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id-ID">
      <body suppressHydrationWarning>
        <SiteShell header={<Header />} footer={<Footer />} whatsapp={<WhatsAppButton />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
