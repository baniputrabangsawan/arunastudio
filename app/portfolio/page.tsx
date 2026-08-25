import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedProjects } from "@/lib/portfolio-data";
import { PageHero } from "@/components/page-hero";
import { PortfolioImage } from "@/components/portfolio-image";

export const metadata: Metadata = { title: "Portfolio Website UMKM", description: "Lihat concept project dan client project ARUNA untuk restoran, bengkel, dan bisnis lokal Indonesia.", alternates: { canonical: "/portfolio" } };
export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  return <main>
    <PageHero eyebrow="Portfolio" title="Satu gaya tidak cocok untuk semua bisnis." description="Setiap project dirancang mengikuti karakter bisnis, kebutuhan pelanggan, dan tujuan yang ingin dicapai." />
    <section className="section">
      <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <Link href={`/portfolio/${project.slug}`} key={project.slug} className="group h-full">
          <article className="flex h-full flex-col">
            <div className="relative aspect-[2/1] overflow-hidden border border-black/20 bg-[var(--surface)]">
              <PortfolioImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain transition-opacity duration-300 group-hover:opacity-95" />
            </div>
            <div className="flex flex-1 flex-col border-x border-b border-black/20 bg-[var(--paper)] p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="m-0 text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">{project.category}</p><span className="border border-black/20 px-2 py-1 text-[10px] font-black uppercase tracking-[.1em]">{project.status === "concept" ? "Concept Project" : "Client Project"}</span></div>
              <div className="mt-8">
                <h2 className="text-3xl font-bold tracking-[-.045em]">{project.name}</h2>
                <p className="mt-3 text-[var(--muted)]">{project.summary}</p>
              </div>
              <div className="mt-auto flex items-end justify-between gap-5 border-t border-black/15 pt-6">
                <div>
                  <p className="m-0 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">Jenis project</p>
                  <p className="mb-0 mt-2 font-bold">{project.type}</p>
                </div>
                <span className="flex items-center gap-2 text-sm font-bold">Lihat Case Study <ArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" /></span>
              </div>
            </div>
          </article>
        </Link>)}
      </div>
      <div className="container mt-14 border-t border-black/20 pt-8"><p className="text-xl font-bold">Bisnis Anda bisa menjadi project berikutnya.</p><Link className="button mt-4" href="/mulai-project">Mulai Project</Link></div>
    </section>
  </main>;
}
