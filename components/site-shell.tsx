type SiteShellProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsapp: React.ReactNode;
};

export function SiteShell({ children, header, footer, whatsapp }: SiteShellProps) {
  return (
    <>
      {header}
      <div id="main-content" tabIndex={-1}>{children}</div>
      {whatsapp}
      {footer}
    </>
  );
}
