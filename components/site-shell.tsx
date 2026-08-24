"use client";

import { usePathname } from "next/navigation";
import { ParallaxProvider } from "@/components/parallax-provider";

type SiteShellProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsapp: React.ReactNode;
};

export function SiteShell({ children, header, footer, whatsapp }: SiteShellProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      {header}
      <ParallaxProvider>{children}</ParallaxProvider>
      {whatsapp}
      {footer}
    </>
  );
}
