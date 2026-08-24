import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import { InteractiveGrid } from "@/components/interactive-grid";

export function Hero() {
  return (
    <section className="min-h-[100dvh] pt-24">
      <div className="relative isolate grid overflow-hidden lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[1.02fr_.98fr]">
        <InteractiveGrid />
        <div className="relative z-10 flex items-center justify-center px-6 pb-2 pt-10 sm:px-10 sm:pb-4 sm:pt-12 lg:px-12 lg:py-14">
          <div className="reveal relative z-10 mx-auto max-w-[760px] text-center">
            <p className="eyebrow justify-center">Website untuk bisnis Indonesia</p>
            <h1 className="display hero-title">
              <span className="hero-title-line">Biar pelanggan</span>{" "}
              <span className="hero-title-line">langsung percaya.</span>
            </h1>
            <p className="subheading mx-auto mb-0 mt-7 max-w-[54ch]">ARUNA membuat website yang rapi, cepat, dan membantu pelanggan memilih bisnis Anda.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link className="button" href="/mulai-project">Mulai Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link className="button secondary" href="/portfolio">Lihat Portfolio</Link>
            </div>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
