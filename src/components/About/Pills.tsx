"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Pills.module.css";

gsap.registerPlugin(ScrollTrigger);

// Píldoras de cristal: arrancan arriba y bajan con el scroll hasta quedar todas al mismo nivel
// (la línea de "¡Empezar es fácil!")
export default function Pills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const section = root.closest("section") ?? root;
    const endEl = section.querySelector<HTMLElement>("[data-pills-end]");

    // Valores variados por pill → caída caótica (deriva lateral, tumbo y arranque)
    const xDrift = [-140, 120, -90, 160, -180, 70];
    const rotEnd = [-160, 220, -120, 300, -260, 140];
    const startRot = [-14, 10, 18, -8, 22, -18];
    const yJitter = [40, -30, 60, 0, 50, -20];

    const ctx = gsap.context(() => {
      const pills = gsap.utils.toArray<HTMLElement>(`.${styles.pill}`);

      pills.forEach((pill, i) => {
        // Distancia real hasta el destino (la cabecera de pasos)
        const pillTop = pill.getBoundingClientRect().top;
        const endTop = endEl ? endEl.getBoundingClientRect().top : pillTop + 600;
        const travel = endTop - pillTop + (yJitter[i % yJitter.length]);

        // 1. Caída caótica acompañando el scroll
        gsap.fromTo(
          pill,
          { rotation: startRot[i % startRot.length] },
          {
            y: travel,
            x: xDrift[i % xDrift.length],
            rotation: rotEnd[i % rotEnd.length],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              endTrigger: endEl ?? section,
              end: "center center",
              scrub: 1.2,
            },
          }
        );

        // 2. Se difuminan hasta desaparecer al acercarse el destino al centro
        gsap.to(pill, {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: endEl ?? section,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <span className={`${styles.pill} ${styles.pill1}`} />
      <span className={`${styles.pill} ${styles.pill2}`} />
      <span className={`${styles.pill} ${styles.pill3}`} />
      <span className={`${styles.pill} ${styles.pill4}`} />
      <span className={`${styles.pill} ${styles.pill5}`} />
      <span className={`${styles.pill} ${styles.pill6}`} />
    </div>
  );
}
