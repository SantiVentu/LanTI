"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// About2 pineado: los renglones NACEN invisibles (así no asoman por los bordes antes del
// pin). Al pinearse, aparecen nítidos (la opacidad sube rápido, sin quedar tenues) y se
// deslizan: uno desde la izquierda, otro desde la derecha; luego sube el bloque de apoyo.
export function useAbout2Reveal(
  rootRef: RefObject<HTMLElement | null>,
  styles: Record<string, string>
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root);
      const lineLeft = sel(`.${styles.lineLeft}`);
      const lineRight = sel(`.${styles.lineRight}`);
      const revealInner = sel(`.${styles.revealInner}`);

      // Estado inicial: invisibles y desplazadas, desde el load (no asoman antes del pin)
      gsap.set(lineLeft, { autoAlpha: 0, xPercent: -110 });
      gsap.set(lineRight, { autoAlpha: 0, xPercent: 110 });
      gsap.set(revealInner, { autoAlpha: 0, yPercent: 60 });

      // Aproximación (sin pin): los renglones entran mientras la sección sube y terminan
      // de juntarse cuando About2 queda entera en pantalla, justo antes del pin.
      // El overflow-x: clip recorta el barrido lateral.
      const approach = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 60%", // arrancan un poco más tarde, con la sección ya asomada
          end: "bottom bottom", // el fondo de la sección llega al fondo del viewport
          scrub: 1,
        },
      });

      // 1. Renglón izquierdo: aparece nítido (opacidad rápida) y se desliza a su lugar
      approach
        .to(lineLeft, { autoAlpha: 1, duration: 0.15 }, 0)
        .to(lineLeft, { xPercent: 0, duration: 1 }, 0)
        // 2. Renglón derecho: casi a la par
        .to(lineRight, { autoAlpha: 1, duration: 0.15 }, 0.12)
        .to(lineRight, { xPercent: 0, duration: 1 }, 0.12);

      // Pin: los renglones ya están puestos; solo sube el bloque de apoyo
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top top", // se pinea cuando el kicker llega arriba
          end: "+=60%", // lo justo para que suba el bloque, sin scroll muerto después
          pin: true,
          scrub: true,
        },
      });

      // 3. Bloque de apoyo: aparece y sube desde abajo
      tl.to(revealInner, { autoAlpha: 1, duration: 0.25 }, 0)
        .to(revealInner, { yPercent: 0, duration: 1 }, "<");
    }, root);

    return () => ctx.revert();
  }, [rootRef, styles]);
}
