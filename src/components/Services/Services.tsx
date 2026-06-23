"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

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

      // Parallax de mouse: cada capa se mueve según su profundidad (solo punteros finos)
      if (window.matchMedia("(pointer: fine)").matches) {
        const movers = gsap.utils.toArray<HTMLElement>(sel(`.${styles.layer}`)).map((el) => ({
          depth: Number(el.dataset.depth ?? 0),
          xTo: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }),
          yTo: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }),
        }));

        const onMove = (e: MouseEvent) => {
          const relX = e.clientX / window.innerWidth - 0.5;
          const relY = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.xTo(-relX * m.depth);
            m.yTo(-relY * m.depth);
          });
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.services} id="servicios">
      {/* Fade superior desde el crema para empalmar sin costura con About */}
      <div className={styles.topFade} aria-hidden="true" />
      {/* Escena en capas con profundidad */}
      <div className={styles.layers}>
        <div className={`${styles.layer} ${styles.nubesBack}`} data-depth="6">
          <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
        </div>
        <div className={`${styles.layer} ${styles.sol}`} data-depth="14">
          <Image src="/imagenes/fondos/sol.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
        </div>
        <div className={`${styles.layer} ${styles.astronaut}`} data-depth="26">
          <Image src="/imagenes/fondos/agente.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
        </div>
        <div className={`${styles.layer} ${styles.nubesFront}`} data-depth="46">
          <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
        </div>
      </div>
    </section>
  );
}
