import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getPublishedService, getPublishedServices } from "@/lib/content-data";
import { PageHero } from "@/components/page-hero";

export async function generateStaticParams() { return (await getPublishedServices()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = await getPublishedService((await params).slug);
  return service ? { title: service.title, description: service.description, alternates: { canonical: `/layanan/${service.slug}` } } : {};
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const service = await getPublishedService((await params).slug);
  if (!service) notFound();
  return <main>
    <PageHero eyebrow={service.group} title={service.title} description={service.description}/>
    <section className="section"><div className="container grid gap-12 lg:grid-cols-2"><article><p className="eyebrow">Untuk siapa</p><h2 className="text-3xl font-bold tracking-[-.04em]">Cocok jika bisnis Anda sedang menghadapi ini.</h2><p className="mt-5 text-lg text-[var(--muted)]">{service.audience}</p><p className="mt-6 border-l-2 border-[var(--accent)] pl-5 text-xl font-semibold">{service.problem}</p></article><aside className="border border-black/20 bg-[var(--paper)] p-7 md:p-9"><p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">Investasi & waktu</p><p className="mt-4 text-3xl font-black">{service.startingPrice}</p><p className="mt-3 text-[var(--muted)]">{service.timeline}</p><Link className="button mt-8" href={`/mulai-project?type=${encodeURIComponent(service.title)}`}>Bahas solusi ini <ArrowRight size={17}/></Link></aside></div></section>
    <section className="section bg-[var(--surface)]"><div className="container grid gap-12 lg:grid-cols-2"><div><p className="eyebrow">Deliverables</p><h2 className="heading !text-5xl">Yang Anda terima.</h2><ul className="mt-9 grid gap-4">{service.deliverables.map((item) => <li className="flex gap-3 border-b border-black/15 pb-4 text-lg" key={item}><Check className="text-[var(--accent-dark)]" size={19}/>{item}</li>)}</ul></div><div><p className="eyebrow">Fitur</p><h2 className="heading !text-5xl">Dipilih sesuai kebutuhan.</h2><ul className="mt-9 grid gap-3 sm:grid-cols-2">{service.features.map((item) => <li className="border border-black/20 bg-[var(--canvas)] p-4 font-semibold" key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Contoh penerapan</p><h2 className="heading !text-5xl">Bukan sekadar daftar fitur.</h2></div><p className="text-xl leading-relaxed text-[var(--muted)]">{service.exampleProject}</p></div></section>
    <section className="section bg-[var(--accent)]"><div className="container grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow">Solusi yang sesuai</p><h2 className="heading">Pilih berdasarkan masalah bisnis Anda.</h2></div><Link className="button light" href={`/mulai-project?type=${encodeURIComponent(service.title)}`}>Mulai brief <ArrowRight size={17}/></Link></div></section>
  </main>;
}
