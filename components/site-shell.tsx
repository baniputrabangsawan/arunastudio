"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ParallaxProvider } from "@/components/parallax-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      <Header />
      <ParallaxProvider>{children}</ParallaxProvider>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
