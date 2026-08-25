"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

type IdleCallbacks = {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    if (window.location.hash) return;

    const scrollToTop = () => {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);

    return () => window.cancelAnimationFrame(frame);
  }, [lenis, pathname]);

  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root) return;

    const isRouteChange = previousPathnameRef.current !== pathname;
    previousPathnameRef.current = pathname;

    const idleCallbacks = window as unknown as IdleCallbacks;
    const requestIdle = idleCallbacks.requestIdleCallback;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const mount = () => {
      void import("@/lib/parallax-runtime").then(({ mountParallax }) => {
        if (!disposed) cleanup = mountParallax(root, { revealOnScroll: !isRouteChange });
      });
    };

    const handle = requestIdle
      ? requestIdle(mount, { timeout: 700 })
      : window.setTimeout(mount, 120);

    return () => {
      disposed = true;
      if (requestIdle && idleCallbacks.cancelIdleCallback) idleCallbacks.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, [pathname]);

  return <div id="main-content" tabIndex={-1}>{children}</div>;
}
