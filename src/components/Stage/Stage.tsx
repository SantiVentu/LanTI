"use client";

import { useRef } from "react";
import styles from "./Stage.module.css";
import About2 from "@/components/About2/About2";
import Services from "@/components/Services/Services";
import { useStageSequence } from "@/hooks/useStageSequence";

// About2 y Services apiladas en la misma caja de pantalla. El scroll no navega de una a la
// otra: recorre un timeline que las cruza, así una nace detrás de la otra en vez de subir
// desde abajo. El color de fondo no se maneja acá: lo lleva la rampa global (ver Sky).
export default function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useStageSequence(stageRef, innerRef);

  return (
    <div ref={stageRef} className={styles.stage} data-sky-section="stage">
      {/* Anclas del nav: las dos secciones comparten la misma caja del DOM, así que el hash
          tiene que caer en la posición de SCROLL de cada fase. Estos marcadores viven en el
          alto que genera el pin, no en la ventana pineada. */}
      <span id="nosotros" className={styles.anchorAbout} />
      <span id="servicios" className={styles.anchorServices} />

      <div ref={innerRef} className={styles.inner}>
        <div className={styles.layer}>
          <About2 />
        </div>
        <div className={styles.layer}>
          <Services />
        </div>
      </div>
    </div>
  );
}
