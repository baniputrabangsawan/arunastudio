import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/data";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Journal", description: "Panduan website, SEO, dan digitalisasi bisnis untuk UMKM." };
const images = ["/images/project-rasa-nusa.webp", "/images/aruna-hero-business-owner.webp", "/images/project-bengkel-selaras.webp"];

export default function BlogPage() {
  return <main>
    <PageHero eyebrow="Journal" title="Panduan website yang bisa langsung dipakai." description="Bahasan singkat untuk membantu pemilik bisnis memilih, menilai, dan mengelola website." />
    <section className="section">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-12">
        {posts.map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug} className={`group ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12 lg:grid lg:grid-cols-2"}`}>
          <div className={`relative overflow-hidden border border-black/20 ${index === 1 ? "aspect-[4/5]" : "aspect-[16/10]"}`} data-parallax-viewport><div className="parallax-media-layer" data-parallax="media"><Image src={images[index]} alt="" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" /></div></div>
          <div className="border-x border-b border-black/20 bg-[var(--paper)] p-7 lg:p-9">
            <p className="m-0 text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">{post.category} / {post.date}</p>
            <h2 className="mt-8 text-3xl font-bold leading-tight tracking-[-.04em]">{post.title}</h2>
            <p className="mt-4 text-[var(--muted)]">{post.excerpt}</p><ArrowUpRight className="mt-10" aria-hidden="true" />
          </div>
        </Link>)}
      </div>
    </section>
  </main>;
}
