"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { rupiah } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import type { PublicAvailability } from "@/lib/content-data";

const packages = {
  "Landing Page": { base: 400000, min: 400000, max: 800000, includedPages: 1 },
  "Company Profile": { base: 900000, min: 900000, max: 1400000, includedPages: 4 },
  "Custom Website": { base: 2000000, min: 2000000, max: Infinity, includedPages: 5 },
} as const;
const addOns: Record<string, number> = { CMS: 300000, "Form Kontak": 100000, Booking: 500000, "Katalog Produk": 600000, Dashboard: 1000000, "SEO Lanjutan": 300000, Blog: 400000, Multibahasa: 500000, "Integrasi API": 600000 };

export function PriceCalculator() {
  const [type, setType] = useState<keyof typeof packages>("Company Profile");
  const [pages, setPages] = useState(4);
  const [features, setFeatures] = useState<string[]>([]);
  const plan = packages[type];
  const pageCost = Math.max(0, pages - plan.includedPages) * 80000;
  const featureCost = features.reduce((sum, feature) => sum + addOns[feature], 0);
  const total = plan.base + pageCost + featureCost;
  const exceeds = Number.isFinite(plan.max) && total > plan.max;
  const query = new URLSearchParams({ type, pages: String(pages), features: features.join(", "), estimate: String(total) }).toString();
  function changeType(value: keyof typeof packages) { setType(value); setPages(packages[value].includedPages); setFeatures([]); }
  function toggle(feature: string) { setFeatures((current) => current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature]); }
  return <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
    <div><label className="label">Jenis website<select className="field" value={type} onChange={(event) => changeType(event.target.value as keyof typeof packages)}>{Object.keys(packages).map((item) => <option key={item}>{item}</option>)}</select></label><label className="label mt-6">Jumlah halaman: <strong>{pages}</strong><input className="accent-[var(--accent)]" type="range" min="1" max="15" value={pages} onChange={(event) => setPages(Number(event.target.value))}/></label><fieldset className="mt-7"><legend className="mb-3 text-sm font-bold">Add-on</legend><div className="flex flex-wrap gap-2">{Object.keys(addOns).map((feature) => <button type="button" onClick={() => toggle(feature)} key={feature} aria-pressed={features.includes(feature)} className={`min-h-11 border px-3 text-sm font-semibold ${features.includes(feature) ? "border-[var(--ink)] bg-[var(--accent)]" : "border-black/20 bg-[var(--paper)]"}`}>{feature} · {rupiah(addOns[feature])}</button>)}</div></fieldset></div>
    <aside className="bg-[var(--ink)] p-7 text-[var(--paper)] md:p-9"><p className="text-sm text-white/60">Estimasi investasi</p><p className="mt-3 text-4xl font-black md:text-5xl">{rupiah(total)}</p><dl className="mt-7 grid gap-3 border-y border-white/20 py-5 text-sm"><div className="flex justify-between gap-5"><dt>Paket dasar</dt><dd>{rupiah(plan.base)}</dd></div><div className="flex justify-between gap-5"><dt>Halaman tambahan</dt><dd>{rupiah(pageCost)}</dd></div><div className="flex justify-between gap-5"><dt>Add-on</dt><dd>{rupiah(featureCost)}</dd></div></dl>{exceeds && <p className="mt-5 border-l-2 border-[var(--accent)] pl-4 text-sm text-white/80">Total melewati range {type}. Scope akan ditinjau sebagai Custom Website agar breakdown dan pengerjaannya tetap jelas.</p>}<Link href={`/mulai-project?${query}`} className="button mt-8 w-full">Gunakan estimasi ini <ArrowRight size={17}/></Link><p className="mt-4 text-xs text-white/50">Estimasi awal. Quotation final dibuat setelah scope dikonfirmasi.</p></aside>
  </div>;
}

export function WebsiteSimulator() {
  const [name, setName] = useState("Kopi Pagi"); const [category, setCategory] = useState("Coffee shop lokal"); const [headline, setHeadline] = useState("Secangkir jeda, dekat dari rumah."); const [accent, setAccent] = useState("#FF2334"); const [services, setServices] = useState("Kopi harian, pastry, pesan untuk acara"); const [whatsapp, setWhatsapp] = useState("");
  const query = new URLSearchParams({ source: "simulator", business: name, industry: category, headline, color: accent, features: services, whatsapp }).toString();
  return <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]"><div className="grid content-start gap-4"><label className="label">Nama bisnis<input className="field" value={name} onChange={(e) => setName(e.target.value)}/></label><label className="label">Kategori<input className="field" value={category} onChange={(e) => setCategory(e.target.value)}/></label><label className="label">Headline<input className="field" value={headline} onChange={(e) => setHeadline(e.target.value)}/></label><label className="label">Layanan<input className="field" value={services} onChange={(e) => setServices(e.target.value)}/></label><label className="label">WhatsApp<input className="field" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="08xxxxxxxxxx"/></label><label className="label">Warna utama<input className="h-12 w-full cursor-pointer bg-transparent" type="color" value={accent} onChange={(e) => setAccent(e.target.value)}/></label><Link className="button mt-2" href={`/mulai-project?${query}`}>Saya Mau Website Seperti Ini <ArrowRight size={17}/></Link></div><div className="overflow-hidden border border-black/15 bg-white shadow-[0_30px_80px_rgba(43,43,43,.1)]"><div className="flex h-8 items-center gap-1.5 bg-[#ece8e4] px-3"><i className="size-2 rounded-full bg-[var(--accent)]"/><i className="size-2 rounded-full bg-[#e6b45f]"/></div><div className="min-h-[430px] bg-[#fffaf2] p-7 md:p-10"><nav className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[.12em]"><span>{name || "Nama Bisnis"}</span><span className="hidden sm:block">Tentang · Layanan · Kontak</span></nav><div className="grid min-h-[330px] content-center md:grid-cols-[1fr_.7fr] md:gap-8"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{category || "Kategori bisnis"}</p><h3 className="text-4xl font-black leading-[.98] tracking-[-.04em] md:text-5xl">{headline || "Headline bisnis Anda"}</h3><p className="mt-4 text-sm text-black/60">{services}</p><button className="mt-7 px-4 py-2 text-sm font-bold text-white" style={{ background: accent }}>Hubungi Kami</button></div><div className="mt-8 min-h-44 md:mt-0" style={{ background: accent }}/></div></div></div></div>;
}

export function ProjectEstimator() {
  const [input, setInput] = useState("");
  const result = useMemo(() => { if (!input.trim()) return null; const value = input.toLowerCase(); const custom = /booking|dashboard|payment|api|toko|katalog/.test(value); const landing = /satu halaman|landing|promosi/.test(value) && !custom; return { type: custom ? "Custom Website" : landing ? "Landing Page" : "Company Profile", complexity: custom ? "Tinggi" : landing ? "Ringan" : "Menengah", price: custom ? "Mulai Rp2.000.000" : landing ? "Rp400.000–Rp800.000" : "Rp900.000–Rp1.400.000", features: [value.includes("whatsapp") ? "WhatsApp" : null, /booking|reservasi/.test(value) ? "Booking" : null, /toko|produk|katalog/.test(value) ? "Katalog" : null, "SEO dasar"].filter(Boolean) as string[] }; }, [input]);
  return <div className="grid gap-7 md:grid-cols-[1fr_.8fr]"><label className="label">Ceritakan kebutuhan Anda<textarea rows={7} className="field resize-y" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Contoh: Saya punya bengkel dan membutuhkan daftar layanan, WhatsApp, booking servis, dan lokasi."/></label><aside className="min-h-64 border border-black/15 bg-[var(--paper)] p-7">{result ? <div><p className="eyebrow">Rekomendasi paket</p><h3 className="text-3xl font-black">{result.type}</h3><p className="mt-3 text-xl font-black text-[var(--accent-dark)]">{result.price}</p><p className="mt-3">Kompleksitas: <strong>{result.complexity}</strong></p><ul className="mt-5 grid gap-2">{result.features.map((feature) => <li className="flex gap-2" key={feature}><Check size={16}/>{feature}</li>)}</ul><Link className="text-link mt-7" href={`/mulai-project?type=${encodeURIComponent(result.type)}&features=${encodeURIComponent(result.features.join(", "))}`}>Lanjutkan ke brief <ArrowRight size={16}/></Link></div> : <p className="grid h-full place-content-center text-center text-[var(--muted)]">Rekomendasi akan muncul saat Anda mulai bercerita.</p>}</aside></div>;
}

export function AvailabilitySection({ availability = siteConfig.availability }: { availability?: PublicAvailability }) { return <section className="border-y border-black/15 bg-[var(--surface)] py-7"><div className="container flex gap-3"><CalendarClock className="shrink-0 text-[var(--accent-dark)]"/><p className="m-0"><strong>Ketersediaan project: {availability.status.toLowerCase()}.</strong> {availability.message}</p></div></section>; }

export function SimulatorSection() { return <section className="section bg-[var(--paper)]" id="simulator"><div className="container"><p className="eyebrow">Website Simulator</p><h2 className="heading">Lihat seperti apa website bisnis Anda sebelum order.</h2><p className="subheading mt-6">Masukkan informasi dasar. Preview akan berubah langsung dan dapat diteruskan ke project brief.</p><div className="mt-12"><WebsiteSimulator/></div></div></section>; }
export function CalculatorSection() { return <section className="section" id="kalkulator"><div className="container"><p className="eyebrow">Price Calculator</p><h2 className="heading">Sudah tahu kebutuhannya? Hitung investasinya.</h2><p className="subheading mt-6">Lihat paket dasar, biaya halaman tambahan, dan add-on secara terpisah.</p><div className="mt-12 border border-black/20 bg-[var(--canvas)] p-5 md:p-9"><PriceCalculator/></div></div></section>; }

export function InteractiveStudio({ initialAvailability = siteConfig.availability }: { initialAvailability?: PublicAvailability }) { return <><CalculatorSection/><AvailabilitySection availability={initialAvailability}/></>; }
