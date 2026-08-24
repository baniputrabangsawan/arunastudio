import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PortfolioImage } from "@/components/portfolio-image";
import { getPublishedPosts } from "@/lib/content-data";

export const metadata: Metadata = { title: "Journal Website UMKM", description: "Panduan praktis tentang website bisnis, SEO lokal, dan digitalisasi untuk UMKM Indonesia.", alternates: { canonical: "/blog" } };
export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return <main>
    <PageHero eyebrow="Journal" title="Panduan website yang bisa langsung dipakai." description="Bahasan singkat untuk membantu pemilik bisnis memilih, menilai, dan mengelola website." />
    <section className="section">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-12">
        {posts.map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug} className={`group ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12 lg:grid lg:grid-cols-2"}`}>
          <div className={`relative overflow-hidden border border-black/20 ${index === 1 ? "aspect-[4/5]" : "aspect-[16/10]"}`} data-parallax-viewport><div className="parallax-media-layer" data-parallax="media"><PortfolioImage src={post.coverUrl} alt={`Sampul ${post.title}`} sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" /></div></div>
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
