"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Menu,
  Settings,
  X,
} from "lucide-react";

const navigation = [
  [LayoutDashboard, "Dashboard", "/admin"],
  [Inbox, "Leads", "/admin/leads"],
  [FolderKanban, "Portfolio", "/admin/portfolio"],
  [FileText, "Layanan", "/admin/services"],
  [FileText, "Harga", "/admin/pricing"],
  [FileText, "FAQ", "/admin/faq"],
  [FileText, "Artikel", "/admin/blog"],
  [CalendarDays, "Availability", "/admin/availability"],
  [Settings, "Pengaturan", "/admin/settings"],
] as const;

function SidebarContent({ pathname, close }: { pathname: string; close?: () => void }) {
  return (
    <>
      <div className="flex h-20 items-center border-b border-white/15 px-6">
        <Link href="/admin" className="text-xl font-black tracking-[.18em]" onClick={close}>
          ARUNA<span className="text-[var(--accent)]">/</span>
        </Link>
      </div>
      <nav className="grid gap-1 p-4" aria-label="Navigasi admin">
        {navigation.map(([Icon, label, href]) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              href={href}
              key={href}
              onClick={close}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 items-center gap-3 border-l-2 px-4 text-sm font-bold transition-colors ${active ? "border-[var(--accent)] bg-white text-[var(--ink)]" : "border-transparent text-white/65 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/15 p-4">
        <Link href="/" target="_blank" className="flex min-h-12 items-center justify-between px-4 text-sm font-bold text-white/65 hover:bg-white/10 hover:text-white">
          Lihat website
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") return children;

  return (
    <div className="min-h-screen bg-[#eee9e4]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[var(--ink)] text-white lg:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/15 bg-[#eee9e4]/95 px-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="font-black tracking-[.16em]">ARUNA<span className="text-[var(--accent)]">/</span></Link>
        <button className="grid size-11 place-items-center border border-black/15 bg-white" type="button" aria-label="Buka menu admin" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu size={20} aria-hidden="true" />
        </button>
      </header>

      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"}`} aria-hidden={!open}>
        <button className={`absolute inset-0 bg-black/45 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} type="button" aria-label="Tutup menu admin" onClick={() => setOpen(false)} />
        <aside className={`absolute inset-y-0 left-0 flex w-[min(86vw,320px)] flex-col bg-[var(--ink)] text-white transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <button className="absolute right-3 top-[18px] grid size-11 place-items-center text-white" type="button" aria-label="Tutup menu admin" onClick={() => setOpen(false)}>
            <X size={21} aria-hidden="true" />
          </button>
          <SidebarContent pathname={pathname} close={() => setOpen(false)} />
        </aside>
      </div>

      <div className="min-h-screen lg:pl-64">{children}</div>
    </div>
  );
}
