"use client";

import { motion } from "framer-motion";
import styles from "./ServicesScroll.module.css";

type Service = {
  number: string;
  title: string;
  joke?: boolean;
};

interface Props {
  services: Service[];
  sectionRef: React.RefObject<HTMLElement>;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ServicesScroll({ services }: Props) {
  return (
    <div className={styles.outer}>
      <div className={styles.box}>
        <p className={styles.eyebrow}>Lo que hacemos</p>
        <h2 className={styles.heading}>Servicios</h2>

        <ul className={styles.list}>
          {services.map((service, i) => (
            <motion.li
              key={service.number}
              className={`${styles.row} ${service.joke ? styles.jokeRow : ""}`}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: EASE }}
              whileHover={service.joke ? {} : { x: 5 }}
            >
              <span className={styles.number}>{service.number}</span>
              <span className={styles.title}>{service.title}</span>
              {!service.joke && (
                <span className={styles.arrow} aria-hidden>→</span>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
