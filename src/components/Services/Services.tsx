"use client";
// Componente cliente: gestiona el ref de sección que useScrollHijack necesita para detectar el foco del viewport

import { useRef, type RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ServicesScroll from "./ServicesScroll";
import styles from "./Services.module.css";

type Service = {
  number: string;
  title: string;
  joke?: boolean;
};

const services: Service[] = [
  { number: "05", title: "Agentes IA" },
  { number: "02", title: "Diseño UI / UX" },
  { number: "01", title: "Automatización" },
  { number: "03", title: "Identidad & Marca" },
  { number: "04", title: "Hacer hamburguesas 🍔", joke: true },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null) as RefObject<HTMLElement>;

  return (
    <section className={styles.services} id="servicios" ref={sectionRef}>
      <Image
        src="/fondoweb.png"
        alt="LanTI — diseño con propósito"
        fill
        className={styles.image}
        priority
      />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <ServicesScroll services={services} sectionRef={sectionRef} />
        </motion.div>
      </div>
    </section>
  );
}
