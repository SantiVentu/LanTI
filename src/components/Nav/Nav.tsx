"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Nav.module.css";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <Link href="/" className={styles.logo}>
          LanTI<span className={styles.dot}>.</span>
        </Link>

        <ul className={styles.links}>
          <li><a href="#servicios" className={styles.link}>Servicios</a></li>
          <li><a href="#nosotros" className={styles.link}>Nosotros</a></li>
          <li><a href="#contacto" className={styles.link}>Contacto</a></li>
        </ul>

        <a href="#contacto" className={styles.cta}>Hablemos</a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <a href="#servicios" className={styles.mobileLink} onClick={closeMenu}>Servicios</a>
            <a href="#nosotros" className={styles.mobileLink} onClick={closeMenu}>Nosotros</a>
            <a href="#contacto" className={styles.mobileLink} onClick={closeMenu}>Contacto</a>
            <a href="#contacto" className={styles.mobileCta} onClick={closeMenu}>Hablemos</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
