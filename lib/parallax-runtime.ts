import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxRole = "hero-scene" | "media" | "accent-slow" | "accent-fast";

const profiles: Record<ParallaxRole, {
  axis: "y" | "yPercent";
  desktop: readonly [number, number];
  mobile: readonly [number, number];
}> = {
  "hero-scene": { axis: "y", desktop: [0, -120], mobile: [0, -58] },
  media: { axis: "yPercent", desktop: [-13, 13], mobile: [-7, 7] },
  "accent-slow": { axis: "y", desktop: [-64, 64], mobile: [-28, 28] },
  "accent-fast": { axis: "y", desktop: [104, -104], mobile: [48, -48] },
};

function getRevealTargets(container: HTMLElement) {
  return Array.from(container.children).flatMap((child) => {
    if (!(child instanceof HTMLElement) || child.dataset.scrollRevealIgnore !== undefined) return [];
    const isLayoutGroup = child.matches(".grid, ol, [data-scroll-reveal-group]");
    if (!isLayoutGroup || child.children.length < 2) return [child];
    return Array.from(child.children).filter(
      (item): item is HTMLElement => item instanceof HTMLElement && item.dataset.scrollRevealIgnore === undefined,
    );
  });
}

export function mountParallax(root: HTMLElement) {
  const media = gsap.matchMedia();

  media.add(
    {
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const conditions = context.conditions as { desktop: boolean; mobile: boolean; reduceMotion: boolean };
      const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
      const mobileTiltElements = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-tilt]"));
      const revealGroups = Array.from(root.querySelectorAll<HTMLElement>("main section .container"))
        .filter((container) => !container.classList.contains("reveal"))
        .map((container) => ({ container, targets: getRevealTargets(container) }))
        .filter(({ targets }) => targets.length > 0);

      if (conditions.reduceMotion) {
        gsap.set(elements, { clearProps: "transform" });
        gsap.set(mobileTiltElements, { clearProps: "transform" });
        gsap.set(revealGroups.flatMap(({ targets }) => targets), { clearProps: "opacity,transform" });
        return;
      }

      if (conditions.mobile) {
        mobileTiltElements.forEach((element) => {
          const trigger = element.closest<HTMLElement>("[data-parallax-viewport]") ?? element;
          gsap.fromTo(
            element,
            { y: 12, rotationX: -5, rotationY: -8 },
            {
              y: -12,
              rotationX: 2,
              rotationY: 5,
              ease: "none",
              force3D: true,
              scrollTrigger: { trigger, start: "clamp(top bottom)", end: "clamp(bottom top)", scrub: 0.4, invalidateOnRefresh: true },
            },
          );
        });
      }

      revealGroups.forEach(({ container, targets }) => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: conditions.desktop ? 28 : 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.64,
            ease: "power3.out",
            stagger: 0.075,
            force3D: true,
            clearProps: "opacity,transform",
            scrollTrigger: { trigger: container, start: "clamp(top 84%)", once: true },
          },
        );
      });

      elements.forEach((element) => {
        const role = element.dataset.parallax as ParallaxRole | undefined;
        if (!role || !profiles[role]) return;
        const profile = profiles[role];
        const [from, to] = conditions.desktop ? profile.desktop : profile.mobile;
        const trigger = element.closest<HTMLElement>("[data-parallax-viewport]") ?? element;
        const fromVars = profile.axis === "y" ? { y: from } : { yPercent: from };
        const toVars = profile.axis === "y" ? { y: to } : { yPercent: to };
        gsap.fromTo(element, fromVars, {
          ...toVars,
          ease: "none",
          force3D: true,
          scrollTrigger: { trigger, start: "clamp(top bottom)", end: "clamp(bottom top)", scrub: 0.25, invalidateOnRefresh: true },
        });
      });
    },
    root,
  );

  return () => media.revert();
}
