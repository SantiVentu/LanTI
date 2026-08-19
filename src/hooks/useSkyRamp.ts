"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKY_ZONES, createSkyRamp, resolveSkyZones } from "@/animations/skyRamp";

gsap.registerPlugin(ScrollTrigger);

// Tiñe el cielo compartido (--sky-pastel) a lo largo de TODA la página: del mediodía del Hero
// a la noche del Footer. Es el único escritor de esa variable —por eso el vire de Services
// dejó de vivir en el timeline del stage—, así no hay dos fuentes peleando por el mismo color.
//
// Se escribe la var a mano porque GSAP no interpola colores dentro de custom properties, y va
// sobre documentElement para que body, Hero2 y el stage viren en bloque, sin costuras.
//
// A propósito NO usa un ScrollTrigger con rango. Uno atado al documento se crea antes de que
// exista el pin del stage, así que mide la página sin el pin-spacer —unos 1400px menos— y su
// rango termina mucho antes del fondo real: pasado ese punto deja de actualizar y el footer se
// queda con el color de Contact. Leer el scroll directo del ticker no tiene ese problema.
export function useSkyRamp() {
  useEffect(() => {
    const root = document.documentElement;
    let colorAt = createSkyRamp(resolveSkyZones(SKY_ZONES));
    let painted = -1;

    const paint = () => {
      const scroll = window.scrollY;
      if (scroll === painted) return;

      painted = scroll;
      root.style.setProperty("--sky-pastel", colorAt(scroll));
    };

    // Las paradas se miden del DOM, así que hay que rehacerlas cuando cambian las alturas. El
    // evento global de ScrollTrigger corre DESPUÉS de refrescar todos los triggers, o sea con
    // los pines ya aplicados y el layout final.
    const rebuild = () => {
      colorAt = createSkyRamp(resolveSkyZones(SKY_ZONES));
      painted = -1;
      paint();
    };

    paint();
    gsap.ticker.add(paint);
    ScrollTrigger.addEventListener("refresh", rebuild);

    return () => {
      gsap.ticker.remove(paint);
      ScrollTrigger.removeEventListener("refresh", rebuild);
      // Devuelve el control al valor declarado en globals.css
      root.style.removeProperty("--sky-pastel");
    };
  }, []);
}
