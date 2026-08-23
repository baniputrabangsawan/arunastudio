import Link from "next/link";
import { ArrowUpRight, AtSign, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";

export function Footer() {
  const { email, location } = contactDetails;
  const socials = [
    { label: "GitHub", href: contactDetails.githubUrl, Icon: Github },
    { label: "LinkedIn", href: contactDetails.linkedinUrl, Icon: Linkedin },
    { label: "Instagram", href: contactDetails.instagramUrl, Icon: Instagram },
    { label: "Threads", href: contactDetails.threadsUrl, Icon: AtSign },
  ];

  return (
    <footer className="border-t border-black/20 bg-[var(--accent)] px-0 pb-8 pt-20 text-[var(--ink)]">
      <div className="container">
        <div className="grid gap-12 border-b border-white/15 pb-16 md:grid-cols-[1.4fr_.6fr_.8fr]">
          <div>
            <h2 className="max-w-2xl text-5xl font-bold leading-[.98] tracking-[-.055em] md:text-7xl">Pelanggan berikutnya perlu menemukan Anda.</h2>
            <Link href="/mulai-project" className="button light mt-8">Mulai Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div>
            <p className="mb-4 text-sm text-black/55">Jelajahi</p>
            <div className="grid gap-3 font-bold">
              <Link href="/layanan">Layanan</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/harga">Harga</Link>
              <Link href="/blog">Journal</Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm text-black/55">Hubungi</p>
            <div className="grid gap-3 font-bold">
              {location && <p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0" size={18} aria-hidden="true" />{location}</p>}
              {email && <a className="flex items-start gap-2 break-all" href={`mailto:${email}`}><Mail className="mt-0.5 shrink-0" size={18} aria-hidden="true" />{email}</a>}
              <Link href="/kontak">Kontak</Link>
              <Link href="/mulai-project">Project brief</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Media sosial ARUNA">
              {socials.filter(({ href }) => href).map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="grid size-11 place-items-center border border-black/35 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]">
                  <Icon size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ARUNA. Website untuk bisnis Indonesia.</p>
          <div className="flex gap-5"><Link href="/privacy">Privasi</Link><Link href="/terms">Ketentuan</Link></div>
        </div>
      </div>
    </footer>
  );
}
