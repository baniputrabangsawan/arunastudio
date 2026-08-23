import type { Metadata } from "next";
import Link from "next/link";
import { AtSign, Github, Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { contactDetails } from "@/lib/contact-details";

export const metadata: Metadata = { title: "Kontak", description: "Hubungi ARUNA untuk konsultasi website bisnis." };

export default function ContactPage() {
  const { email, location } = contactDetails;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const socials = [
    { label: "GitHub", href: contactDetails.githubUrl, Icon: Github },
    { label: "LinkedIn", href: contactDetails.linkedinUrl, Icon: Linkedin },
    { label: "Instagram", href: contactDetails.instagramUrl, Icon: Instagram },
    { label: "Threads", href: contactDetails.threadsUrl, Icon: AtSign },
  ];

  return (
    <main>
      <PageHero eyebrow="Kontak" title="Percakapan pertama tidak harus serba siap." description="Ceritakan bisnis, masalah, atau ide yang masih berantakan. Kami bantu merapikannya menjadi langkah yang realistis." />
      <section className="section surface">
        <div className="container grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <h2 className="font-display text-4xl">Pilih cara yang nyaman.</h2>
            <div className="mt-8 grid gap-3">
              {whatsapp ? <a className="flex min-h-16 items-center gap-4 border border-black/15 px-5" href={`https://wa.me/${whatsapp}`}><MessageCircle aria-hidden="true" /> WhatsApp</a> : <p className="border border-dashed border-black/20 p-4 text-sm text-[var(--muted)]">Nomor WhatsApp belum dikonfigurasi.</p>}
              {email && <a className="flex min-h-16 items-center gap-4 border border-black/15 px-5" href={`mailto:${email}`}><Mail aria-hidden="true" /> {email}</a>}
              {location && <div className="flex min-h-16 items-center gap-4 border border-black/15 px-5"><MapPin aria-hidden="true" /> {location}</div>}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {socials.filter(({ href }) => href).map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center gap-2 border border-black/15 px-3 text-sm font-bold transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]">
                  <Icon size={18} aria-hidden="true" /> {label}
                </a>
              ))}
            </div>
            <Link className="text-link mt-8" href="/mulai-project">Atau isi project brief lengkap</Link>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
