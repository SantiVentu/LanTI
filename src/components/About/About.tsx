"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
  { value: "3", label: "disciplinas" },
  { value: "IA", label: "especialidad" },
  { value: "100%", label: "a medida" },
];

export default function About() {
  return (
    <section className={styles.about} id="nosotros">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className={styles.heading}>
              Análisis,
              <br />
              ingeniería y{" "}
              <span className={styles.highlight}>diseño.</span>
            </h2>

            <div className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <p className={styles.pullquote}>
              Transformamos necesidades comerciales en herramientas
              automatizadas que simplifican el trabajo diario.
            </p>

            <p className={styles.text}>
              LanTI nació de la unión de tres pilares: el análisis de datos,
              la ingeniería y arquitectura de software, y el diseño visual
              pensado en la experiencia de las personas. Te acompañamos en
              todo tu ecosistema digital, desde una landing hasta agentes de
              Inteligencia Artificial a la medida de tu empresa.
            </p>

            <a href="#contacto" className={styles.link}>
              Trabajemos juntos
              <span aria-hidden> →</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
