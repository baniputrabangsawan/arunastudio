import Link from "next/link";
import { Check, Code2, Gauge, Handshake, Search, Smartphone, Sparkles } from "lucide-react";
import type { PublicPricingPlan } from "@/lib/content-data";
import { SectionHeading } from "./section-heading";
import trustStripStyles from "./trust-strip.module.css";

export function TrustStrip() {
  const indicators = ["Custom Design", "Mobile-first", "Transparent Pricing", "SEO-ready", "Post-launch Support"];
  const indicatorList = indicators.map((indicator) => (
    <li className={trustStripStyles.item} key={indicator}>
      <Check size={16} className="text-[var(--accent-dark)]" aria-hidden="true" />
      {indicator}
    </li>
  ));

  return (
    <section className="border-y border-black/15 bg-[var(--surface)] py-7 text-[var(--ink)]" aria-label="Standar setiap project ARUNA">
      <div className={trustStripStyles.marquee}>
        <div className={trustStripStyles.track}>
          <ul className={trustStripStyles.group}>{indicatorList}</ul>
          <ul className={trustStripStyles.group} aria-hidden="true">{indicatorList}</ul>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  [Sparkles, "Dibuat dari nol", "Tampilan mengikuti bisnis Anda, bukan template yang diganti warna."],
  [Smartphone, "Enak dibuka di HP", "Pelanggan bisa membaca dan menghubungi Anda tanpa mencubit layar."],
  [Gauge, "Cepat saat dibuka", "Halaman ringan membuat pelanggan tidak keburu pergi."],
  [Search, "Siap ditemukan", "Struktur dasar SEO disiapkan sejak awal."],
  [Handshake, "Bahasanya jelas", "Biaya, scope, dan progres tidak dibungkus istilah teknis."],
  [Code2, "Bisa ditambah nanti", "Website tidak perlu dibangun ulang saat bisnis berkembang."],
] as const;

export function PracticalValueSection() {
  return (
    <section className="section bg-[var(--surface)]">
      <div className="container">
        <SectionHeading eyebrow="Cara kami bekerja" title="Yang Anda bayar harus terasa gunanya." description="Desain bagus membantu pelanggan memahami bisnis dan mengambil tindakan. Sisanya harus punya alasan yang jelas." />
        <div className="mt-16 grid gap-px bg-black/20 md:grid-cols-2 lg:grid-cols-12">
          {reasons.map(([Icon, title, description], index) => (
            <article key={title} className={`bg-[var(--canvas)] p-7 md:p-9 ${[0, 3, 4].includes(index) ? "lg:col-span-5" : "lg:col-span-7"}`}>
              <Icon size={26} strokeWidth={1.7} className="text-[var(--accent)]" aria-hidden="true" />
              <h3 className="mt-14 text-2xl font-bold tracking-[-.035em]">{title}</h3>
              <p className="mb-0 mt-3 max-w-lg text-[var(--muted)]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    ["Ceritakan bisnis", "Kirim brief singkat. Tidak harus memakai istilah teknis."],
    ["Tentukan scope", "Halaman, fitur, biaya, dan jadwal ditulis sebelum pekerjaan dimulai."],
    ["Lihat progres", "Desain dan development ditinjau pada titik yang sudah disepakati."],
    ["Tayang", "Website diluncurkan, diserahkan, dan siap dirawat."],
  ];
  return (
    <section className="section bg-[var(--paper)]" id="proses">
      <div className="container">
        <SectionHeading eyebrow="Proses" title="Anda selalu tahu apa yang sedang dikerjakan." description="Empat tahap yang singkat, dengan keputusan dan biaya yang terlihat sejak awal." />
        <ol className="mt-16 grid gap-4 md:grid-cols-2">
          {steps.map(([title, description], index) => (
            <li className={`min-h-64 border border-black/20 p-7 md:p-9 ${index === 0 ? "bg-[var(--accent)]" : index === 3 ? "bg-[var(--ink)] text-[#f1f1ed]" : "bg-[var(--canvas)]"}`} key={title}>
              <h3 className="max-w-sm text-3xl font-bold tracking-[-.04em]">{title}</h3>
              <p className={`mb-0 mt-8 max-w-md ${index === 3 ? "text-white/65" : "text-black/65"}`}>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PricingSection({ pricing }: { pricing: PublicPricingPlan[] }) {
  return (
    <section className="section" id="harga">
      <div className="container">
        <SectionHeading eyebrow="Harga" title="Angkanya terlihat sebelum kita bicara." description="Pilih paket terdekat. Penawaran final mengikuti fitur dan jumlah halaman yang disepakati." />
        <div className="mt-16 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {pricing.map((plan, index) => (
            <article
              className={`flex min-h-[540px] flex-col border p-7 md:p-8 ${plan.featured ? "border-[var(--ink)] bg-[var(--accent)]" : "border-black/20 bg-[var(--paper)]"}`}
              key={plan.name}
            >
              <div className="flex min-h-8 items-start justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-[.12em] text-black/55">0{index + 1}</span>
                {plan.featured && <span className="border border-[var(--ink)] bg-[var(--ink)] px-3 py-1 text-[10px] font-black uppercase tracking-[.1em] text-[var(--paper)]">Direkomendasikan</span>}
              </div>

              <div className="mt-10">
                <h3 className="text-3xl font-bold tracking-[-.045em] md:text-4xl">{plan.name}</h3>
                <p className="mt-5 text-2xl font-black tracking-[-.025em]">{plan.price}</p>
                <p className="mt-5 max-w-sm text-black/65">{plan.note}</p>
              </div>

              <ul className="my-8 grid gap-4 border-t border-black/20 pt-7">
                {plan.features.map((feature) => <li className="flex items-center gap-3 font-semibold" key={feature}><Check size={17} strokeWidth={2.4} aria-hidden="true" />{feature}</li>)}
              </ul>

              <Link
                className={`${plan.featured ? "button light" : "button secondary"} mt-auto w-full`}
                href="/mulai-project"
              >
                Pilih {plan.name}
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--muted)]">Harga di atas adalah estimasi awal, bukan biaya tersembunyi.</p>
      </div>
    </section>
  );
}

export function ValueIncludedSection() {
  const values = ["Desain yang mengikuti karakter bisnis", "Nyaman dibuka dari ponsel", "WhatsApp langsung ke percakapan", "Form kontak yang menyimpan lead", "Halaman cepat dan ringan", "Fondasi SEO dasar", "Pendampingan saat website diluncurkan"];
  return <section className="section bg-[var(--ink)] text-[var(--paper)]"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow !text-[var(--paper)]">Nilai dasar</p><h2 className="heading">Setiap Website ARUNA Sudah Termasuk</h2></div><ul className="grid gap-px bg-[var(--ink)] sm:grid-cols-2">{values.map((value) => <li className="flex min-h-24 items-center gap-3 bg-[var(--ink)] p-5 font-semibold" key={value}><Check size={18} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />{value}</li>)}</ul></div></section>;
}

export function BeforeAfterSection() {
  const before = ["Hanya mengandalkan Instagram", "Informasi tersebar", "Harga harus ditanya", "Booking dicatat manual", "Sulit ditemukan di pencarian"];
  const after = ["Website profesional milik sendiri", "Layanan tersusun jelas", "Harga awal transparan", "WhatsApp atau booking langsung", "Fondasi SEO-ready"];
  return <section className="section"><div className="container"><SectionHeading eyebrow="Transformasi" title="Dari informasi tercecer menjadi alur yang meyakinkan." description="Website yang baik mengurangi keraguan sebelum pelanggan menghubungi Anda."/><div className="mt-14 grid gap-4 md:grid-cols-2"><article className="border border-black/20 bg-[var(--surface)] p-7 md:p-9"><p className="eyebrow">Sebelum</p><ul className="mt-8 grid gap-4">{before.map((item) => <li className="border-b border-black/15 pb-4 text-lg" key={item}>{item}</li>)}</ul></article><article className="border border-[var(--ink)] bg-[var(--accent)] p-7 md:p-9"><p className="eyebrow">Setelah</p><ul className="mt-8 grid gap-4">{after.map((item) => <li className="flex gap-3 border-b border-black/20 pb-4 text-lg font-bold" key={item}><Check size={19} aria-hidden="true" />{item}</li>)}</ul></article></div></div></section>;
}
