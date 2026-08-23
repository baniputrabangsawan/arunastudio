import styles from "./page-hero.module.css";

export function PageHero({ eyebrow, title, description }: { eyebrow:string; title:string; description:string }) {
  return <section className={`${styles.hero} overflow-hidden border-b border-black/15 pb-20 pt-28 md:pb-24`} data-parallax-viewport><div className={styles.decoration} aria-hidden="true"><div className={styles.slow} data-parallax="accent-slow"/><div className={styles.fast} data-parallax="accent-fast"/></div><div className={`${styles.content} container reveal`}><p className="eyebrow">{eyebrow}</p><h1 className="display max-w-[1050px]">{title}</h1><p className="subheading mt-7">{description}</p></div></section>;
}
