export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className="max-w-4xl">
    <span className="sr-only">{eyebrow}</span>
    <h2 className="heading">{title}</h2>
    {description && <p className={`subheading mb-0 mt-6 ${light ? "" : ""}`}>{description}</p>}
  </div>;
}
