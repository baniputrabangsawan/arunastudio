import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Code2, Gauge, Handshake, Search, Smartphone, Sparkles } from "lucide-react";
import type { PublicFaq, PublicPricingPlan, PublicService } from "@/lib/content-data";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { FaqAccordion } from "./faq-accordion";
import { PortfolioImage } from "./portfolio-image";
import { SectionHeading } from "./section-heading";

export function TrustStrip() {
  const indicators = ["Desain Custom", "Mobile-first", "Harga Transparan", "SEO-ready", "Support Setelah Launch"];
  return (
    <section className="border-y border-black/15 bg-[var(--surface)] py-7 text-[var(--ink)]" aria-label="Standar setiap project ARUNA">
      <div className="container flex flex-wrap items-center justify-between gap-x-7 gap-y-3">
        {indicators.map((indicator) => <p className="m-0 flex items-center gap-2 text-sm font-bold" key={indicator}><Check size={16} className="text-[var(--accent-dark)]" aria-hidden="true" />{indicator}</p>)}
      </div>
    </section>
  );
}

export function ServicesSection({ services }: { services: PublicService[] }) {
  return (
    <section className="section" id="layanan">
      <div className="container">
        <SectionHeading eyebrow="Layanan" title="Pilih yang memang dibutuhkan bisnis Anda." description="Mulai dari satu halaman sampai sistem booking. Scope ditentukan setelah tujuan bisnisnya jelas." />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service, index) => (
            <Link
              href={`/layanan/${service.slug}`}
              key={service.slug}
              className={`group flex min-h-72 flex-col border border-black/20 p-7 md:p-9 ${index === 0 ? "bg-[var(--accent)] lg:col-span-7" : index === 1 ? "bg-[#d9dad6] lg:col-span-5" : index === 2 ? "bg-[var(--ink)] text-[#f1f1ed] lg:col-span-5" : "bg-[var(--paper)] lg:col-span-7"}`}
            >
              <p className={`m-0 text-xs font-bold uppercase tracking-[.12em] ${index === 2 ? "text-white/60" : "text-black/55"}`}>{service.group}</p>
              <h3 className="mt-auto max-w-md text-3xl font-bold tracking-[-.04em] md:text-4xl">{service.title}</h3>
              <div className="mt-5 flex items-end justify-between gap-5">
                <p className={`m-0 max-w-md ${index === 2 ? "text-white/65" : "text-black/65"}`}>{service.description}</p>
                <ArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </Link>
          ))}
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

export function WhySection() {
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

export function PortfolioSection({ projects }: { projects: PortfolioProject[] }) {
  const featuredProjects = projects.slice(0, 3);
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="eyebrow">Project terpilih</div>
        <SectionHeading light eyebrow="Portfolio" title="Bisnis berbeda. Cara bicara berbeda." description="Setiap tampilan disusun untuk membantu pelanggan memahami bisnis dan mengambil tindakan yang tepat." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link href={`/portfolio/${project.slug}`} className="group h-full" key={project.slug}>
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden border border-black/20" data-parallax-viewport>
                  <div className="parallax-media-layer" data-parallax="media">
                    <PortfolioImage src={project.imageUrl} alt={project.imageAlt} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col border-x border-b border-black/20 bg-[var(--paper)] p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3"><p className="m-0 text-xs font-bold uppercase tracking-[.12em] text-[var(--muted)]">{project.category}</p><span className="border border-black/20 px-2 py-1 text-[10px] font-black uppercase tracking-[.1em]">{project.status === "concept" ? "Concept Project" : "Client Project"}</span></div>
                  <div className="mt-8">
                    <h3 className="text-3xl font-bold tracking-[-.045em]">{project.name}</h3>
                    <p className="mb-0 mt-3 text-[var(--muted)]">{project.summary}</p>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-5 border-t border-black/15 pt-6">
                    <div>
                      <p className="m-0 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">Jenis project</p>
                      <p className="mb-0 mt-2 font-bold">{project.type}</p>
                    </div>
                    <span className="flex items-center gap-2 text-sm font-bold">Lihat Case Study <ArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" /></span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-5"><Link className="button secondary" href="/portfolio">Lihat Portfolio <ArrowRight size={18} aria-hidden="true" /></Link><p className="m-0 text-sm text-[var(--muted)]">Bisnis Anda bisa menjadi project berikutnya.</p></div>
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

export function FaqSection({ faqs }: { faqs: PublicFaq[] }) {
  return (
    <section className="section bg-[var(--surface)]" id="faq">
      <div className="container grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Pertanyaan umum</p>
          <h2 className="heading">Jawaban sebelum mulai.</h2>
          <p className="subheading mt-6">Belum terjawab? <Link className="text-link" href="/mulai-project">Ceritakan project Anda</Link>.</p>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}

export function ValueIncludedSection() {
  const values = ["Desain yang mengikuti karakter bisnis", "Nyaman dibuka dari ponsel", "WhatsApp langsung ke percakapan", "Form kontak yang menyimpan lead", "Halaman cepat dan ringan", "Fondasi SEO dasar", "Pendampingan saat website diluncurkan"];
  return <section className="section bg-[var(--ink)] text-[var(--paper)]"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow !text-[var(--paper)]">Nilai dasar</p><h2 className="heading">Setiap Website ARUNA Sudah Termasuk</h2></div><ul className="grid gap-px bg-white/20 sm:grid-cols-2">{values.map((value) => <li className="flex min-h-24 items-center gap-3 bg-[var(--ink)] p-5 font-semibold" key={value}><Check size={18} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />{value}</li>)}</ul></div></section>;
}

export function BeforeAfterSection() {
  const before = ["Hanya mengandalkan Instagram", "Informasi tersebar", "Harga harus ditanya", "Booking dicatat manual", "Sulit ditemukan di pencarian"];
  const after = ["Website profesional milik sendiri", "Layanan tersusun jelas", "Harga awal transparan", "WhatsApp atau booking langsung", "Fondasi SEO-ready"];
  return <section className="section"><div className="container"><SectionHeading eyebrow="Transformasi" title="Dari informasi tercecer menjadi alur yang meyakinkan." description="Website yang baik mengurangi keraguan sebelum pelanggan menghubungi Anda."/><div className="mt-14 grid gap-4 md:grid-cols-2"><article className="border border-black/20 bg-[var(--surface)] p-7 md:p-9"><p className="eyebrow">Sebelum</p><ul className="mt-8 grid gap-4">{before.map((item) => <li className="border-b border-black/15 pb-4 text-lg" key={item}>{item}</li>)}</ul></article><article className="border border-[var(--ink)] bg-[var(--accent)] p-7 md:p-9"><p className="eyebrow">Setelah</p><ul className="mt-8 grid gap-4">{after.map((item) => <li className="flex gap-3 border-b border-black/20 pb-4 text-lg font-bold" key={item}><Check size={19} aria-hidden="true" />{item}</li>)}</ul></article></div></div></section>;
}

export function FinalCtaSection() {
  return <section className="section bg-[var(--accent)]"><div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow">Langkah berikutnya</p><h2 className="heading">Siap membuat bisnis Anda terlihat lebih serius?</h2><p className="subheading mt-6 !text-black/70">Ceritakan bisnis dan kebutuhan Anda. ARUNA akan membantu menentukan halaman, fitur, dan kisaran investasi yang masuk akal.</p></div><Link className="button light" href="/mulai-project">Mulai Project <ArrowRight size={18} aria-hidden="true" /></Link></div></section>;
}
