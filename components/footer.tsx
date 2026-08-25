import Link from "next/link";
import { ArrowUpRight, AtSign, Github, Instagram, Linkedin } from "lucide-react";
import { getPublicSettings } from "@/lib/content-data";
import { navItems } from "@/lib/data";
import styles from "./footer.module.css";

const services = ["Website Bisnis", "Sistem Bisnis", "SEO & Pertumbuhan", "Otomasi"];

function ServiceMarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.marqueeGroup} aria-hidden={hidden || undefined}>
      {services.map((service) => (
        <li className={styles.marqueeItem} key={service}>
          <span>{service}</span>
          <span className={styles.spark} aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
}

export async function Footer() {
  const settings = await getPublicSettings();
  const socials = [
    { label: "GitHub", href: settings.githubUrl, Icon: Github },
    { label: "LinkedIn", href: settings.linkedinUrl, Icon: Linkedin },
    { label: "Instagram", href: settings.instagramUrl, Icon: Instagram },
    { label: "Threads", href: settings.threadsUrl, Icon: AtSign },
  ].filter(({ href }) => href);

  return (
    <footer className={styles.footer}>
      <div className={styles.marquee} aria-label="Layanan utama ARUNA">
        <div className={styles.marqueeTrack}>
          <ServiceMarqueeGroup />
          <ServiceMarqueeGroup hidden />
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.cta}>
          <p className={styles.kicker}>Project berikutnya</p>
          <h2>Siap membuat bisnis Anda lebih meyakinkan?</h2>
          <p className={styles.ctaDescription}>Ceritakan bisnis dan kebutuhan Anda. ARUNA akan membantu menentukan halaman, fitur, dan kisaran investasi yang masuk akal.</p>
          <div className={styles.actions}>
            <Link className="button light" href="/mulai-project">
              Mulai project <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.directory}>
          <nav aria-label="Navigasi footer">
            <p className={styles.label}>Jelajahi</p>
            <div className={styles.navLinks}>
              {navItems.map((item) => (
                <Link className={styles.navLink} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <p className={styles.label}>Terhubung</p>
            <div className={styles.socials} aria-label="Media sosial ARUNA">
              {socials.map(({ label, href, Icon }) => (
                <a className={styles.socialLink} href={href} key={label} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                  <Icon size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} ARUNA. Website untuk bisnis Indonesia.</p>
        <div className={styles.legal}>
          <Link className={styles.navLink} href="/privacy">Privasi</Link>
          <Link className={styles.navLink} href="/terms">Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
}
