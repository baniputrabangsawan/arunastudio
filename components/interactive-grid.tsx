"use client";

import { useEffect, useRef } from "react";
import styles from "./interactive-grid.module.css";

export function InteractiveGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    const lens = root?.querySelector<HTMLElement>(`[data-grid-lens]`);
    const pulse = root?.querySelector<HTMLElement>(`[data-grid-pulse]`);
    if (!root || !host || !lens || !pulse) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;

    const coordinates = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const moveLens = (event: PointerEvent) => {
      if (reduceMotion.matches || !finePointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const { x, y } = coordinates(event);
        lens.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        lens.style.opacity = "1";
      });
    };

    const hideLens = () => {
      lens.style.opacity = "0";
    };

    const playPulse = (event: PointerEvent) => {
      if (reduceMotion.matches) return;
      const { x, y } = coordinates(event);
      pulse.getAnimations().forEach((animation) => animation.cancel());
      pulse.animate(
        [
          { opacity: 0.42, transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(0.92)` },
          { opacity: 0, transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(1.45)` },
        ],
        { duration: 320, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
      );
    };

    host.addEventListener("pointermove", moveLens, { passive: true });
    host.addEventListener("pointerleave", hideLens);
    host.addEventListener("pointerdown", playPulse, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", moveLens);
      host.removeEventListener("pointerleave", hideLens);
      host.removeEventListener("pointerdown", playPulse);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.grid} aria-hidden="true">
      <div className={styles.lines} />
      <div className={styles.lens} data-grid-lens />
      <div className={styles.pulse} data-grid-pulse />
    </div>
  );
}
