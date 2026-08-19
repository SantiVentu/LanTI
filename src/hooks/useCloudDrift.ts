"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

// Marquee continuo de nubes hacia la izquierda: la pista de dos copias se desplaza a velocidad
// constante y se reinicia sin costura. Aparecen por la derecha y se desvanecen por la izquierda
// gracias a la máscara de bordes del CSS.
export function useCloudDrift(
  rootRef: RefObject<HTMLElement | null>,
  styles: Record<string, string>
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root);

      // Desplaza la pista una copia completa (-50%) en bucle lineal e infinito
      const marquee = (selector: string, duration: number) =>
        gsap.to(sel(selector), {
          xPercent: -50,
          duration,
          ease: "none",
          repeat: -1,
        });

      // Profundidad por velocidad real (no solo por duración): las capas principales miden
      // 110% de ancho y recorren ~220vw/loop; las bandas bajas miden 80% y recorren ~160vw.
      // Las duraciones ya compensan ese ancho, así la velocidad en pantalla crece de fondo a
      // primer plano: Back (más lento) → Mid → Front → bandas bajas (más rápido).
      marquee(`.${styles.nubesBack} .${styles.cloudTrack}`, 230); // ~0.96 vw/s
      marquee(`.${styles.nubesMid} .${styles.cloudTrack}`, 170); // ~1.29 vw/s
      marquee(`.${styles.nubesFront} .${styles.cloudTrack}`, 125); // ~1.76 vw/s

      // Bandas bajas (primer plano, lo más cercano): duración menor por su ancho de 80%
      marquee(`.${styles.nubesLowB} .${styles.cloudTrack}`, 84); // ~1.90 vw/s
      marquee(`.${styles.nubesLowA} .${styles.cloudTrack}`, 76); // ~2.11 vw/s
    }, root);

    return () => ctx.revert();
  }, [rootRef, styles]);
}
