import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Portfolio", description: "Eksplorasi konsep dan karya website ARUNA." };
const images = ["/images/project-rasa-nusa.webp", "/images/aruna-hero-business-owner.webp", "/images/project-bengkel-selaras.webp"];

export default function PortfolioPage() {
  return <main>
    <PageHero eyebrow="Portfolio" title="Satu gaya tidak cocok untuk semua bisnis." description="Koleksi awal ini berupa konsep demonstrasi. Setiap arah dibuat untuk bisnis yang berbeda." />
    <section className="section">
      <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => <Link href={`/portfolio/${project.slug}`} key={project.slug} className="group h-full">
          <article className="flex h-full flex-col">
            <div className="relative aspect-[4/3] overflow-hidden border border-black/20" data-parallax-viewport>
              <div className="parallax-media-layer" data-parallax="media">
                <Image src={images[index]} alt={`Konsep website ${project.name}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
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
