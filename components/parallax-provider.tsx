"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type IdleCallbacks = {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const root = document.getElementById("main-content");
    if (!root) return;

    const idleCallbacks = window as unknown as IdleCallbacks;
    const requestIdle = idleCallbacks.requestIdleCallback;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const mount = () => {
      void import("@/lib/parallax-runtime").then(({ mountParallax }) => {
        if (!disposed) cleanup = mountParallax(root);
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
