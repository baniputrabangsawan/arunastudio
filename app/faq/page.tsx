import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { getPublishedFaqs, getPublishedServices } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "FAQ Jasa Website",
  description: "Jawaban atas pertanyaan umum tentang layanan, harga, proses, revisi, dan pengelolaan website ARUNA.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const [faqs, services] = await Promise.all([getPublishedFaqs(), getPublishedServices()]);

  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Jawaban sebelum memulai project."
        description="Temukan informasi umum dan jawaban khusus untuk setiap layanan ARUNA di satu halaman."
      />
      <section className="section bg-[var(--surface)] pt-0">
        <div className="container grid gap-16">
          <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
            <div>
              <p className="eyebrow">Pertanyaan umum</p>
              <h2 className="text-4xl font-bold tracking-[-.045em]">Tentang project ARUNA.</h2>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>

          {services.filter((service) => service.faqs.length > 0).map((service) => (
            <div className="grid gap-10 border-t border-black/20 pt-14 lg:grid-cols-[.6fr_1.4fr]" key={service.slug}>
              <div>
                <p className="eyebrow">FAQ layanan</p>
                <h2 className="text-3xl font-bold tracking-[-.04em]">{service.title}</h2>
              </div>
              <FaqAccordion faqs={service.faqs} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
