import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return <footer className="border-t border-black/20 bg-[var(--accent)] px-0 pb-8 pt-20 text-[var(--ink)]">
    <div className="container">
      <div className="grid gap-12 border-b border-white/15 pb-16 md:grid-cols-[1.4fr_.6fr_.6fr]">
        <div><h2 className="max-w-2xl text-5xl font-bold leading-[.98] tracking-[-.055em] md:text-7xl">Pelanggan berikutnya perlu menemukan Anda.</h2><Link href="/mulai-project" className="button light mt-8">Mulai Project <ArrowUpRight size={18} /></Link></div>
        <div><p className="mb-4 text-sm text-black/55">Jelajahi</p><div className="grid gap-3 font-bold"><Link href="/layanan">Layanan</Link><Link href="/portfolio">Portfolio</Link><Link href="/harga">Harga</Link><Link href="/blog">Journal</Link></div></div>
        <div><p className="mb-4 text-sm text-black/55">Hubungi</p><div className="grid gap-3 font-bold"><Link href="/kontak">Kontak</Link><Link href="/mulai-project">Project brief</Link><a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}>Instagram</a></div></div>
      </div>
      <div className="flex flex-col gap-4 pt-7 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} ARUNA. Website untuk bisnis Indonesia.</p><div className="flex gap-5"><Link href="/privacy">Privasi</Link><Link href="/terms">Ketentuan</Link></div></div>
    </div>
  </footer>;
}
