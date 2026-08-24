import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getPublishedProject, getPublishedProjects } from "@/lib/portfolio-data";
import { PageHero } from "@/components/page-hero";
import { PortfolioImage } from "@/components/portfolio-image";

export async function generateStaticParams() {
  return (await getPublishedProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  return project ? { title: project.name, description: project.summary } : { title: "Project tidak ditemukan" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();
  return <main>
    <PageHero eyebrow={`${project.category}${project.isDemo ? " / konsep demonstrasi" : ""}`} title={project.name} description={project.summary} />
    <section className="section">
      <div className="container">
        <div className="relative aspect-[4/3] overflow-hidden border border-black/20 lg:aspect-[16/9]" data-parallax-viewport>
          <div className="parallax-media-layer" data-parallax="media">
            <PortfolioImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 1320px) 100vw, 1320px" className="object-cover" />
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4"><h2 className="text-3xl font-bold tracking-[-.04em]">Masalah</h2><p className="mt-4 text-lg text-[var(--muted)]">{project.problem}</p></div>
          <div className="lg:col-span-5"><h2 className="text-3xl font-bold tracking-[-.04em]">Solusi</h2><p className="mt-4 text-lg text-[var(--muted)]">{project.solution}</p></div>
          <div className="lg:col-span-3"><h2 className="text-3xl font-bold tracking-[-.04em]">Fokus</h2><ul className="mt-4 grid gap-3">{project.focus.map((item) => <li className="flex gap-2" key={item}><Check size={17} className="text-[var(--accent)]" aria-hidden="true" />{item}</li>)}</ul></div>
        </div>
        {project.isDemo && <div className="mt-16 border border-black/20 bg-[var(--surface)] p-6"><strong>Catatan:</strong> Project ini adalah demonstrasi visual ARUNA, bukan perusahaan atau klien nyata.</div>}
        <Link href="/mulai-project" className="button mt-10">Mulai Project <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </main>;
}
