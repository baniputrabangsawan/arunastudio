import { ParallaxProvider } from "@/components/parallax-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

type SiteShellProps = {
  children: React.ReactNode;
  assistant: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsapp: React.ReactNode;
};

export function SiteShell({ assistant, children, header, footer, whatsapp }: SiteShellProps) {
  return (
    <SmoothScrollProvider>
      {header}
      <ParallaxProvider>{children}</ParallaxProvider>
      {assistant}
      {whatsapp}
      {footer}
    </SmoothScrollProvider>
  );
}
