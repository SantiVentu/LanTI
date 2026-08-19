"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Profundidad de la escena: zoom de entrada, parallax de scroll y parallax de mouse por capa
export function useSceneParallax(
  rootRef: RefObject<HTMLElement | null>,
  styles: Record<string, string>
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root);

      // La escena entra saliendo de un leve zoom al aparecer en viewport
      gsap.fromTo(
        sel(`.${styles.layers}`),
        { scale: 1.12 },
        {
          scale: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top bottom", end: "top center", scrub: true },
        }
      );

      // Parallax de scroll: la escena se desplaza al recorrer la sección
      gsap.to(sel(`.${styles.layers}`), {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, styles]);
}
