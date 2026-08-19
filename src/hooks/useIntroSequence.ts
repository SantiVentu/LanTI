"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

// Secuencia de apertura del Hero: el logo se llena de color y el texto sube desde la máscara
export function useIntroSequence(
  rootRef: RefObject<HTMLElement | null>,
  styles: Record<string, string>
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root);

      // Estado inicial: texto bajo la máscara + logo sin rellenar
      gsap.set(sel(`.${styles.maskInner}`), { yPercent: 120 });
      gsap.set(sel(`.${styles.logoFill}`), { clipPath: "inset(0 100% 0 0)" });

      // Secuencia de apertura: el logo se llena de color y luego se difumina
      const tl = gsap.timeline();

      // 1. "LANTI" se rellena de color (más rápido, pero la duración total no cambia)
      tl.to(sel(`.${styles.logoFill}`), {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.2,
      })
        // 2. La pantalla de carga se difumina y desvanece (pausa mayor para conservar el timing)
        .to(sel(`.${styles.loader}`), {
          autoAlpha: 0,
          filter: "blur(24px)",
          scale: 1.06,
          duration: 0.7,
          ease: "power2.inOut",
        }, "+=0.55")
        .set(sel(`.${styles.loader}`), { display: "none" })
        // 3. Texto subiendo desde la máscara, solapando el difuminado
        .to(sel(`.${styles.maskInner}`), {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        }, "-=0.4");
    }, root);

    return () => ctx.revert();
  }, [rootRef, styles]);
}
