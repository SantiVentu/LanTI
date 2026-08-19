"use client";

import { useRef } from "react";
import styles from "./About2.module.css";
import { useAbout2Reveal } from "@/hooks/useAbout2Reveal";

// Sección pineada: statement en dos renglones (izq/der) + bloque que sube al scrollear.
export default function About2() {
  const rootRef = useRef<HTMLElement>(null);

  useAbout2Reveal(rootRef, styles);

  return (
    <section ref={rootRef} className={styles.about2} id="nosotros">
      <div className={styles.content}>
        <p className={styles.kicker}>Lanti - Estudio Digital</p>

        {/* Statement en dos renglones enmascarados: uno entra por izquierda, otro por derecha */}
        <h2 className={styles.statement}>
          <span className={styles.mask}>
            <span className={`${styles.maskInner} ${styles.lineLeft}`}>
              Cuando la <span className={styles.accent2}>tecnologia</span>
            </span>
          </span>
          <span className={styles.mask}>
            <span className={`${styles.maskInner} ${styles.lineRight}`}>
              y el <span className={styles.accent}>diseño</span> se unen.
            </span>
          </span>
        </h2>

        {/* Bloque que sube desde abajo al continuar el scroll */}
        <div className={styles.reveal}>
          <div className={styles.revealInner}>
            <p className={styles.lead}>
              Lo mejor de ambos mundos y es lo que nos gusta hacer: programar{" "}
              <b>soluciones</b> y diseñar <b>experiencias</b>. En un mundo donde la
              IA propone, Lanti dispone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
