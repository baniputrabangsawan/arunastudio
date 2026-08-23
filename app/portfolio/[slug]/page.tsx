import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { projects } from "@/lib/data";
import { PageHero } from "@/components/page-hero";

const images: Record<string, string> = { "rasa-nusa": "/images/project-rasa-nusa.webp", "ruang-tumbuh": "/images/aruna-hero-business-owner.webp", "bengkel-selaras": "/images/project-bengkel-selaras.webp" };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main>
    <PageHero eyebrow={`${project.category} / konsep demonstrasi`} title={project.name} description={project.summary} />
    <section className="section">
      <div className="container">
        <div className="relative aspect-[4/3] overflow-hidden border border-black/20 lg:aspect-[16/9]" data-parallax-viewport>
          <div className="parallax-media-layer" data-parallax="media">
            <Image src={images[project.slug]} alt={`Tampilan konsep website ${project.name}`} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><h2 className="text-3xl font-bold tracking-[-.04em]">Masalah</h2><p className="mt-4 text-lg text-[var(--muted)]">Informasi bisnis tersebar dan pelanggan belum punya jalur tindakan yang jelas.</p></div>
          <div className="lg:col-span-5"><h2 className="text-3xl font-bold tracking-[-.04em]">Solusi</h2><p className="mt-4 text-lg text-[var(--muted)]">Konten dibuat ringkas. Identitasnya terasa khas. Tombol utama mengikuti kebutuhan pelanggan.</p></div>
          <div className="lg:col-span-3"><h2 className="text-3xl font-bold tracking-[-.04em]">Fokus</h2><ul className="mt-4 grid gap-3">{["Mobile-first", "Mudah dibaca", "WhatsApp atau booking", "SEO-ready"].map((item) => <li className="flex gap-2" key={item}><Check size={17} className="text-[var(--accent)]" aria-hidden="true" />{item}</li>)}</ul></div>
        </div>
        <div className="mt-16 border border-black/20 bg-[var(--surface)] p-6"><strong>Catatan:</strong> Project ini adalah demonstrasi visual ARUNA, bukan perusahaan atau klien nyata.</div>
        <Link href="/mulai-project" className="button mt-10">Mulai Project <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </main>;
}
