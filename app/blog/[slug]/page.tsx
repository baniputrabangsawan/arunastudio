import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleContent } from "@/components/article-content";
import { PortfolioImage } from "@/components/portfolio-image";
import { getPublishedPost, getPublishedPosts } from "@/lib/content-data";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPublishedPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Artikel tidak ditemukan" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  return <main className="surface pb-24 pt-28"><article className="container max-w-3xl"><Link className="text-link" href="/blog"><ArrowLeft size={17}/> Semua artikel</Link><p className="eyebrow mt-16">{post.category} / {post.date}</p><h1 className="mt-5 text-5xl font-bold leading-[.98] tracking-[-.055em] md:text-7xl">{post.title}</h1><p className="mt-7 text-xl leading-relaxed text-[var(--muted)]">{post.excerpt}</p><div className="relative my-12 aspect-[16/9] overflow-hidden border border-black/20" data-parallax-viewport><div className="parallax-media-layer" data-parallax="media"><PortfolioImage src={post.coverUrl} alt={`Sampul ${post.title}`} sizes="(max-width: 768px) 100vw, 768px" className="object-cover"/></div></div><ArticleContent content={post.content} /></article></main>;
}
