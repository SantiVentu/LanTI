"use client";

import { useRef } from "react";
import styles from "./Services.module.css";
import Cards from "@/components/Cards/Cards";
import { useCardsFanReveal } from "@/hooks/useCardsFanReveal";

// Sección pineada: las cards suben apiladas desde abajo y se abren en abanico.
export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useCardsFanReveal(rootRef, "[data-card]");

  return (
    <section ref={rootRef} className={styles.services} id="servicios">
      <div className={styles.content}>
        <h2 className={styles.title}>Nuestros servicios</h2>
        <Cards />
      </div>
    </section>
  );
}
