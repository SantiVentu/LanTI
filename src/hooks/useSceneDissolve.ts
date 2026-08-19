"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Disuelve la escena al scrollear (sin pin): las nubes se desvanecen revelando el color
// sólido del fondo, que continúa en la sección siguiente sin costura.
export function useSceneDissolve(
  rootRef: RefObject<HTMLElement | null>,
  styles: Record<string, string>
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root);

      // Desvanecido: escena + textos (título) juntos, repartido en más scroll → más suave
      gsap.to(sel(`.${styles.layers}, .${styles.stage}`), {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top", // arranca apenas empezás a scrollear
          end: "70% top", // tramo más largo → el fade es más gradual y menos fuerte
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [rootRef, styles]);
}
