import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getPublishedService } from "@/lib/content-data";
import { PageHero } from "@/components/page-hero";
export const dynamic="force-dynamic";
export default async function ServiceDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=await getPublishedService(slug);if(!s)notFound();return <main><PageHero eyebrow={s.group} title={s.title} description={s.description}/><section className="section surface"><div className="container grid gap-10 md:grid-cols-2"><div><p className="eyebrow">Yang bisa disiapkan</p><ul className="grid gap-4">{s.items.map(x=><li className="flex items-center gap-3 border-b border-black/10 pb-4 text-xl" key={x}><Check className="text-[var(--accent)]"/>{x}</li>)}</ul></div><div><h2 className="heading !text-5xl">Mulai dari tujuan, bukan daftar fitur.</h2><p className="subheading mt-6">Kami menyusun scope setelah memahami pelanggan, alur bisnis, konten, dan hasil yang ingin dicapai. Anda hanya membayar hal yang memang diperlukan.</p><Link className="button mt-7" href={`/mulai-project?type=${encodeURIComponent(s.title)}`}>Diskusikan kebutuhan <ArrowRight size={17}/></Link></div></div></section></main>}
