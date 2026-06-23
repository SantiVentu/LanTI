"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MeshGradient from "@/components/MeshGradient/MeshGradient";
import styles from "./Hero.module.css";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root);

      // Estado inicial: texto bajo la máscara + logo sin rellenar
      gsap.set(sel(`.${styles.maskInner}`), { yPercent: 120 });
      gsap.set(sel(`.${styles.logoFill}`), { clipPath: "inset(0 100% 0 0)" });

      // Secuencia de apertura: el logo se llena de color y luego se difumina
      const tl = gsap.timeline();

      // 1. "LanTI" se rellena de color (carga rápida pero apreciable)
      tl.to(sel(`.${styles.logoFill}`), {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.0,
        ease: "power2.inOut",
        delay: 0.2,
      })
        // 2. La pantalla de carga se difumina y desvanece
        .to(sel(`.${styles.loader}`), {
          autoAlpha: 0,
          filter: "blur(24px)",
          scale: 1.06,
          duration: 0.7,
          ease: "power2.inOut",
        }, "+=0.15")
        .set(sel(`.${styles.loader}`), { display: "none" })
        // 3. Texto subiendo desde la máscara, solapando el difuminado
        .to(sel(`.${styles.maskInner}`), {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        }, "-=0.4");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.hero}>
      {/* Fondo: mesh gradient con blobs (distorsión al mouse + deriva autónoma) */}
      <div className={styles.bg}>
        <MeshGradient />
      </div>
      {/* Fade al indigo para empalmar sin costura con About */}
      <div className={styles.fade} aria-hidden="true" />

      {/* Intro arriba a la izquierda */}
      <div className={styles.intro}>
        <span className={styles.mask}>
          <span className={`${styles.maskInner} ${styles.introText}`}>
            Somos un Estudio Digital de <strong>tecnología y diseño</strong> trabajando
            juntos para potenciar tu negocio.
          </span>
        </span>
      </div>

      {/* Título abajo a la derecha, escalonado desde máscaras */}
      <div className={styles.content}>
        <span className={styles.mask}>
          <h1 className={`${styles.maskInner} ${styles.title}`}>
            <span className={styles.line}>Ideas con <span className={styles.accentViolet}>identidad,</span></span>
            <span className={styles.line}><span className={styles.accentOrange}>experiencias</span> con impacto</span>
          </h1>
        </span>
      </div>

      {/* Pantalla de carga: "LanTI" se llena de color y se difumina */}
      <div className={styles.loader} aria-hidden="true">
        <span className={styles.logo}>
          <span className={styles.logoBase}>LanTI</span>
          <span className={styles.logoFill}>LanTI</span>
        </span>
      </div>
    </section>
  );
}
