"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Cards.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  description: string;
  icon: string;
}

// Íconos de línea para cada paso del proceso
const iconDiscover = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.3V16h6v-.2c0-.9.4-1.7 1-2.3A6 6 0 0 0 12 3Z" />
  </svg>
);

const iconDefine = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const iconBuild = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 6.5a3.5 3.5 0 0 1 4.9-3.2L16 6.2l1.8 1.8 2.9-2.9A3.5 3.5 0 0 1 17.5 10c-.5 0-1-.1-1.4-.3L7 19a2.1 2.1 0 0 1-3-3l8.3-9.1c-.2-.4-.3-.9-.3-1.4Z" />
  </svg>
);

const iconResults = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20h16" />
    <path d="M7 20v-5M12 20v-9M17 20v-6" />
    <path d="m6 9 4-4 3 3 5-5" />
    <path d="M18 3h-3M18 3v3" />
  </svg>
);

const steps: Step[] = [
  {
    title: "Descubrimiento",
    description: "Agendamos una reunión para conocer tu negocio, entender tus objetivos y detectar oportunidades.",
    icon: "/imagenes/iconos/lamparita.webp",
  },
  {
    title: "Definimos",
    description: "Analizamos los requerimientos, proponemos el alcance del proyecto y presentamos una propuesta y plan de trabajo.",
    icon: "/imagenes/iconos/lupita.webp",
  },
  {
    title: "Construimos",
    description: "Desarrollamos e integramos la solución trabajando de forma colaborativa, con avances visibles y revisiones durante todo el proceso.",
    icon: "/imagenes/iconos/martillito.webp",
  },
  {
    title: "Disfrutá los resultados",
    description: "Realizamos ajustes finales y te acompañamos para asegurar resultados reales y una creación exitosa.",
    icon: "/imagenes/iconos/estadisticas.webp",
  },
];


// Cards que entran 2 desde la izquierda y 2 desde la derecha, acompañando el scroll
export default function Cards() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const section = root.closest("section") ?? root;
    const endEl = section.querySelector<HTMLElement>("[data-cards-end]") ?? root;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

      const order = [1, 2];
      const order2 = [0, 3];

      order2.forEach((cardIndex, i) => {
        const card = cards[cardIndex]
        const fromLeft = cardIndex === 0 || cardIndex === 1;
        
        gsap.fromTo(
        card,
        {
          xPercent: fromLeft ? -1200 : 1200,
          autoAlpha: 0,
        },
        {
          xPercent: 0,
          autoAlpha: 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            endTrigger: endEl,
            end: "center top",
            scrub: 1.2,
          },

          // mantiene el efecto acordeón
          delay: i * 0.45,
          }
        );
      });

      order.forEach((cardIndex, i) => {
        const card = cards[cardIndex]
        const fromLeft = cardIndex === 0 || cardIndex === 1;
        
        gsap.fromTo(
        card,
        {
          xPercent: fromLeft ? -600 : 600,
          autoAlpha: 0,
        },
        {
          xPercent: 0,
          autoAlpha: 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            endTrigger: endEl,
            end: "center top",
            scrub: 1.2,
          },

          // mantiene el efecto acordeón
          delay: i * 0.45,
          }
        );
      });
    }, root);

    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.cards}>
      {steps.map((step) => (
        <article key={step.title} className={styles.card}>
          <span className={styles.cardIcon}>
            <Image src={step.icon} alt={step.title} width={90} height={90} />
          </span>
          <h4 className={styles.cardTitle}>{step.title}</h4>
          <p className={styles.cardDesc}>{step.description}</p>
        </article>
      ))}
    </div>
  );
}
