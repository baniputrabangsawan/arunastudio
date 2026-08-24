"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import arunaLogo from "@/aruna1.svg";
import { navItems } from "@/lib/data";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-black/15 bg-[var(--canvas)]/95 backdrop-blur-md">
    <a href="#main-content" className="fixed left-4 top-3 z-[60] -translate-y-24 bg-[var(--ink)] px-4 py-2 text-sm font-bold text-white focus:translate-y-0">Lewati ke konten utama</a>
    <div className="container flex h-[72px] items-center justify-between">
      <Link href="/" className="flex h-full items-center" aria-label="ARUNA, beranda">
        <Image src={arunaLogo} priority alt="" className="h-12 w-auto md:h-[60px]" />
      </Link>
      <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
        {navItems.map((item) => <Link className="nav-link text-sm font-semibold text-[#4f5450]" key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <button className="grid size-11 place-items-center md:hidden" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <div className={`absolute inset-x-0 top-full border-b border-black/10 bg-[var(--canvas)] px-5 transition-[opacity,transform] duration-200 md:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
      <nav className="container grid py-5" aria-label="Navigasi mobile">
        {navItems.map((item) => <Link className="border-b border-black/10 py-4 text-xl font-semibold" key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link className="button mt-5 w-full" href="/mulai-project" onClick={() => setOpen(false)}>
          Mulai Project <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </nav>
    </div>
  </header>;
}
