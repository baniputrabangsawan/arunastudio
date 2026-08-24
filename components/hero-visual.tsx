"use client";

import { CalendarCheck, Check, Globe2, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./hero-visual.module.css";

const restTransform = "rotateX(-3deg) rotateY(-6deg)";

export function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reduceMotionRef.current = media.matches;
      if (media.matches && sceneRef.current) {
        sceneRef.current.style.transform = "none";
      }
    };

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => {
      media.removeEventListener("change", updatePreference);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reduceMotionRef.current || !sceneRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const nextTransform = `rotateX(${-3 - y * 5}deg) rotateY(${-6 + x * 8}deg)`;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (sceneRef.current) sceneRef.current.style.transform = nextTransform;
    });
  }

  function handlePointerLeave() {
    if (reduceMotionRef.current || !sceneRef.current) return;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    sceneRef.current.style.transform = restTransform;
  }

  return (
    <figure
      className={styles.visual}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-parallax-viewport
    >
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.scrollLayer} data-parallax="hero-scene">
          <div ref={sceneRef} className={styles.scene} data-mobile-tilt>
          <div className={`${styles.object} ${styles.browser}`}>
            <div className={styles.browserBar}>
              <span />
              <span />
              <span />
              <div>preview website</div>
            </div>
            <div className={styles.website}>
              <div className={styles.siteNav}>
                <strong>ARUNA/</strong>
                <span>Layanan&nbsp;&nbsp; Portfolio&nbsp;&nbsp; Harga</span>
              </div>
              <div className={styles.siteHero}>
                <div>
                  <p>Website untuk bisnis</p>
                  <h2>Biar pelanggan langsung percaya.</h2>
                  <span className={styles.siteButton}>Mulai project</span>
                </div>
                <div className={styles.brandVisual}>
                  <span className={styles.brandMark}>ARUNA<span>/</span></span>
                  <span className={styles.brandRule} />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.object} ${styles.phone}`}>
            <div className={styles.phoneSpeaker} />
            <div className={styles.phoneScreen}>
              <div className={styles.mobileNav}>ARUNA/</div>
              <div className={styles.mobilePhoto}><span>DESAIN · WEBSITE · GROWTH</span></div>
              <p>Website bisnis</p>
              <strong>Tampil serius. Tumbuh terarah.</strong>
              <span>Mulai project</span>
            </div>
          </div>

          <div className={`${styles.object} ${styles.whatsapp}`}>
            <MessageCircle size={20} strokeWidth={2.4} />
            <div><small>WhatsApp</small><strong>Konsultasi siap dimulai</strong></div>
            <Check size={16} strokeWidth={3} />
          </div>

          <div className={`${styles.object} ${styles.booking}`}>
            <CalendarCheck size={20} strokeWidth={2.4} />
            <div><small>Konsultasi baru</small><strong>Hari ini, 14.30</strong></div>
          </div>

            <div className={`${styles.object} ${styles.shopBadge}`}>
              <Globe2 size={17} strokeWidth={2.4} />
              Website siap tayang
            </div>
          </div>
        </div>
      </div>

    </figure>
  );
}
