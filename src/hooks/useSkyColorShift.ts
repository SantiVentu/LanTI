"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tiñe el cielo compartido (--sky-pastel) mientras la sección entra en pantalla. Al ser un
// scrub, el camino de vuelta es automático: scrolleando hacia arriba destiñe solo.
export function useSkyColorShift(
  sectionRef: RefObject<HTMLElement | null>,
  fromColor: string,
  toColor: string
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const root = document.documentElement;
    // GSAP no interpola colores dentro de custom properties, así que se resuelve la mezcla
    // a mano y se escribe la var ya calculada.
    const mixColor = gsap.utils.interpolate(fromColor, toColor);

    const trigger = ScrollTrigger.create({
      trigger: section,
      // Mismo rango que el abanico de cards: arranca cuando About2 se suelta y la sección
      // empieza a entrar, y cierra junto con la última card. Depende de que el pin ya exista
      // al crearse (ver orden de hooks en Services.tsx) para que el end en distancia cruda
      // no arrastre la distancia pineada.
      start: "top bottom",
      end: "+=170%",
      scrub: true,
      onUpdate: (self) => {
        root.style.setProperty("--sky-pastel", mixColor(self.progress));
      },
    });

    return () => {
      trigger.kill();
      // Devuelve el control al valor declarado en globals.css
      root.style.removeProperty("--sky-pastel");
    };
  }, [sectionRef, fromColor, toColor]);
}
