"use client";

import { useRef } from "react";
import styles from "./Services.module.css";
import Cards from "@/components/Cards/Cards";
import { useCardsFanReveal } from "@/hooks/useCardsFanReveal";
import { useSkyColorShift } from "@/hooks/useSkyColorShift";

// Ámbar del resto del sitio → rosé durazno propio de Services
const SKY_FROM = "#ebc284";
const SKY_TO = "#f3d4c4";

// Sección pineada: las cards suben apiladas desde abajo y se abren en abanico, mientras el
// cielo compartido vira a un tono más claro.
export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  // El orden importa: useCardsFanReveal crea el pin y el vire se apoya en que ya exista.
  useCardsFanReveal(rootRef, "[data-card]");
  useSkyColorShift(rootRef, SKY_FROM, SKY_TO);

  return (
    <section ref={rootRef} className={styles.services} id="servicios">
      <div className={styles.content}>
        <h2 className={styles.title}>Nuestros servicios</h2>
        <Cards />
      </div>
    </section>
  );
}
