import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

const principles = [
  ["01", "Mulai dari tujuan bisnis", "Kami memahami siapa pelanggan Anda dan tindakan apa yang perlu mereka ambil sebelum menentukan tampilan atau fitur."],
  ["02", "Keputusan yang transparan", "Scope, biaya, jadwal, dan alasan di balik setiap keputusan dijelaskan dengan bahasa yang mudah dipahami."],
  ["03", "Dibangun untuk digunakan", "Website harus cepat, nyaman di ponsel, dan memudahkan pelanggan menemukan informasi serta menghubungi bisnis Anda."],
  ["04", "Siap mengikuti pertumbuhan", "Struktur website disiapkan agar layanan dan kebutuhan baru dapat ditambahkan tanpa harus memulai ulang."],
] as const;

export const metadata: Metadata = {
  title: "Why ARUNA",
  description: "Alasan memilih ARUNA untuk membangun website bisnis yang custom, cepat, mobile-first, dan siap berkembang.",
  alternates: { canonical: "/why-aruna" },
};

export default function WhyArunaPage() {
  return (
    <main>
      <PageHero
        eyebrow="Why ARUNA"
        title="Website yang dibuat dengan alasan yang jelas."
        description="Setiap keputusan desain dan teknologi diarahkan untuk membuat bisnis Anda lebih mudah dipahami, dipercaya, dan dikembangkan."
      />
      <section className="section bg-[var(--paper)]">
        <div className="container grid gap-16 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow">Pendekatan ARUNA</p>
            <h2 className="heading">Partner digital yang menjaga setiap keputusan tetap masuk akal.</h2>
          </div>
          <ol className="border-t border-black/20">
            {principles.map(([number, title, description]) => (
              <li className="grid gap-5 border-b border-black/20 py-8 sm:grid-cols-[56px_1fr] md:py-10" key={number}>
                <span className="text-sm font-bold text-[var(--accent-dark)]">{number}</span>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-.035em]">{title}</h3>
                  <p className="mb-0 mt-3 max-w-2xl text-[var(--muted)]">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
