import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { getPublishedServices } from "@/lib/content-data";
import { PageHero } from "@/components/page-hero";
export const metadata: Metadata = { title:"Layanan", description:"Layanan desain dan pembuatan website ARUNA untuk bisnis kecil dan UMKM." };
export const revalidate=300;
export default async function ServicesPage(){const services=await getPublishedServices();return <main><PageHero eyebrow="Layanan ARUNA" title="Pilih website yang sesuai dengan pekerjaan Anda." description="Kami membantu menentukan halaman, fitur, dan anggaran tanpa menambah hal yang tidak perlu."/><section className="section surface"><div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-12">{services.map((s,i)=><article key={s.slug} className={`border border-black/15 p-7 md:p-10 ${i===0||i===3?"lg:col-span-7":"lg:col-span-5"}`}><p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--accent)]">{s.group}</p><h2 className="mt-8 font-display text-4xl tracking-[-.04em]">{s.title}</h2><p className="mt-4 text-[var(--muted)]">{s.description}</p><ul className="my-8 grid gap-3">{s.items.map(x=><li className="flex items-center gap-3" key={x}><Check size={17} className="text-[var(--accent)]"/>{x}</li>)}</ul><Link className="text-link" href={`/layanan/${s.slug}`}>Lihat detail <ArrowUpRight size={17}/></Link></article>)}</div></section></main>}
