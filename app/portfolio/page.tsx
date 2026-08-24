import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedProjects } from "@/lib/portfolio-data";
import { PageHero } from "@/components/page-hero";
import { PortfolioImage } from "@/components/portfolio-image";

export const metadata: Metadata = { title: "Portfolio", description: "Eksplorasi konsep dan karya website ARUNA." };
export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  return <main>
    <PageHero eyebrow="Portfolio" title="Satu gaya tidak cocok untuk semua bisnis." description="Setiap project dirancang mengikuti karakter bisnis, kebutuhan pelanggan, dan tujuan yang ingin dicapai." />
    <section className="section">
      <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => <Link href={`/portfolio/${project.slug}`} key={project.slug} className="group h-full">
          <article className="flex h-full flex-col">
            <div className="relative aspect-[4/3] overflow-hidden border border-black/20" data-parallax-viewport>
              <div className="parallax-media-layer" data-parallax="media">
                <PortfolioImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
            <div className="flex flex-1 flex-col border-x border-b border-black/20 bg-[var(--paper)] p-6 md:p-7">
              <p className="m-0 text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">{project.category}</p>
              <div className="mt-8">
                <h2 className="text-3xl font-bold tracking-[-.045em]">{project.name}</h2>
                <p className="mt-3 text-[var(--muted)]">{project.summary}</p>
              </div>
              <div className="mt-auto flex items-end justify-between gap-5 border-t border-black/15 pt-6">
                <div>
                  <p className="m-0 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">Jenis project</p>
                  <p className="mb-0 mt-2 font-bold">{project.type}</p>
                </div>
                <ArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </div>
          </article>
        </Link>)}
      </div>
    </section>
  </main>;
}
