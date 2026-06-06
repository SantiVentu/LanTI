"use client";

import { motion } from "framer-motion";
import ShaderCanvas from "./ShaderCanvas";
import styles from "./Hero.module.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.75, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <ShaderCanvas />

      <div className={styles.container}>
        <motion.div
          className={styles.eyebrowWrap}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className={styles.eyebrowDot} aria-hidden />
          <p className={styles.eyebrow}>Tecnología · Diseño · Inteligencia Artificial</p>
        </motion.div>

        <motion.h1
          className={styles.heading}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Creamos en libertad,
          <br />
          <span className={styles.highlight}>diseñamos con calidad.</span>
        </motion.h1>

        <motion.p
          className={styles.subheading}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Somos una compañía de soluciones digitales creada para resolver
          los desafíos tecnológicos de tu negocio.
        </motion.p>

        <motion.div
          className={styles.actions}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a href="#contacto" className={styles.btnPrimary}>
            Hablemos
            <span className={styles.btnIcon} aria-hidden>↗</span>
          </a>
          <a href="#servicios" className={styles.btnSecondary}>
            Ver servicios
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />
      </motion.div>
    </section>
  );
}
