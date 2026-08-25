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
  return project ? { title: `${project.name} — ${project.status === "concept" ? "Concept Project" : "Client Project"}`, description: project.summary, alternates: { canonical: `/portfolio/${project.slug}` } } : { title: "Project tidak ditemukan" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();
  return <main>
    <PageHero eyebrow={`${project.category} / ${project.status === "concept" ? "Concept Project" : "Client Project"}`} title={project.name} description={project.summary} />
    <section className="section">
      <div className="container">
        <div className="relative aspect-[2/1] overflow-hidden border border-black/20 bg-[var(--surface)]">
          <PortfolioImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 1320px) 100vw, 1320px" className="object-contain" />
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <div><h2 className="text-3xl font-bold tracking-[-.04em]">Challenge</h2><p className="mt-4 text-lg text-[var(--muted)]">{project.challenge}</p></div>
          <div><h2 className="text-3xl font-bold tracking-[-.04em]">Strategy</h2><p className="mt-4 text-lg text-[var(--muted)]">{project.strategy}</p></div>
          <div><h2 className="text-3xl font-bold tracking-[-.04em]">Design</h2><p className="mt-4 text-lg text-[var(--muted)]">{project.design}</p></div>
        </div>
        <section className="mt-16 grid gap-8 border-y border-black/20 py-12 lg:grid-cols-[.7fr_1.3fr]"><h2 className="text-3xl font-bold tracking-[-.04em]">Features</h2><ul className="grid gap-3 sm:grid-cols-2">{project.features.map((item) => <li className="flex gap-2" key={item}><Check size={17} className="text-[var(--accent-dark)]" aria-hidden="true" />{item}</li>)}</ul></section>
        <section className="mt-16"><h2 className="text-3xl font-bold tracking-[-.04em]">Desktop & mobile preview</h2><div className="mt-7 grid gap-4 lg:grid-cols-[1.45fr_.55fr]"><div className="relative aspect-[16/10] overflow-hidden border border-black/20 bg-[var(--surface)]"><PortfolioImage src={project.imageUrl} alt={`Desktop ${project.imageAlt}`} sizes="70vw" className="object-contain" /></div><div className="relative aspect-[9/14] overflow-hidden border border-black/20 bg-[var(--surface)]"><PortfolioImage src={project.imageUrl} alt={`Mobile ${project.imageAlt}`} sizes="30vw" className="object-contain" /></div></div></section>
        {project.status === "concept" && <div className="mt-16 border border-black/20 bg-[var(--surface)] p-6"><strong>Catatan transparansi:</strong> Ini adalah concept project untuk menunjukkan pendekatan desain ARUNA, bukan perusahaan atau klien nyata. Tidak ada hasil bisnis atau statistik yang diklaim.</div>}
        <div className="mt-10 flex flex-wrap gap-5">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button">Lihat Website <ArrowRight size={17} aria-hidden="true" /></a>}<Link href="/mulai-project" className="button">Diskusikan website bisnis Anda <ArrowRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>
  </main>;
}
