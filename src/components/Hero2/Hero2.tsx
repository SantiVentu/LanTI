"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./Hero2.module.css";
import { useIntroSequence } from "@/hooks/useIntroSequence";
import { useCloudDrift } from "@/hooks/useCloudDrift";
import { useSceneDissolve } from "@/hooks/useSceneDissolve";

export default function Hero2() {
  const rootRef = useRef<HTMLElement>(null);

  // Animaciones aisladas en hooks: intro/loader, deriva de nubes y dissolve al scrollear
  useIntroSequence(rootRef, styles);
  useCloudDrift(rootRef, styles);
  useSceneDissolve(rootRef, styles);

  return (
    
    <section ref={rootRef} className={styles.hero2} id="hero2" data-sky-section="hero">
      
      {/* Fade superior desde el crema para empalmar sin costura con About */}
      <div className={styles.topFade} aria-hidden="true" />
      {/* Degradado de base: funde las nubes más bajas con el color sólido, sin corte */}
      <div className={styles.bottomBlend} aria-hidden="true" />
      {/* Escena en capas con profundidad */}
      <div className={styles.layers}>
        <div className={`${styles.layer} ${styles.nubesBack}`}>
          <div className={styles.cloudTrack}>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            {/* Nubecitas que viajan sobre cada unión para disimular el empalme */}
            <div className={`${styles.cloudSeam} ${styles.seamA}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamB}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamC}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
          </div>
        </div>
        <div className={`${styles.layer} ${styles.sol}`}>
          <Image src="/imagenes/fondos/sol.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
        </div>
        <div className={`${styles.layer} ${styles.astronaut}`}>
          <Image src="/imagenes/fondos/agente.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
        </div>
        <div className={`${styles.layer} ${styles.nubesMid}`}>
          <div className={styles.cloudTrack}>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            {/* Nubecitas que viajan sobre cada unión para disimular el empalme */}
            <div className={`${styles.cloudSeam} ${styles.seamA}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamB}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamC}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
          </div>
        </div>
        <div className={`${styles.layer} ${styles.nubesFront}`}>
          <div className={styles.cloudTrack}>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            {/* Nubecitas que viajan sobre cada unión para disimular el empalme */}
            <div className={`${styles.cloudSeam} ${styles.seamA}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamB}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
          </div>
        </div>
        {/* Banda baja A: espejada respecto a nubesFront */}
        <div className={`${styles.layer} ${styles.nubesLowA}`}>
          <div className={styles.cloudTrack}>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            {/* Nubecitas que viajan sobre cada unión para disimular el empalme */}
            <div className={`${styles.cloudSeam} ${styles.seamA}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamB}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamC}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
          </div>
        </div>
        {/* Banda baja B: espejada respecto a nubesLowA (vuelve a normal) */}
        <div className={`${styles.layer} ${styles.nubesLowB}`}>
          <div className={styles.cloudTrack}>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={styles.cloudTile}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudTile} ${styles.flip}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="4000px" className={styles.layerImg} />
            </div>
            {/* Nubecitas que viajan sobre cada unión para disimular el empalme */}
            <div className={`${styles.cloudSeam} ${styles.seamA}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamB}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
            <div className={`${styles.cloudSeam} ${styles.seamC}`}>
              <Image src="/imagenes/fondos/nubes.webp" alt="" fill sizes="2000px" className={styles.layerImg} />
            </div>
          </div>
        </div>
      </div>

      {/* Texto acotado a la primera pantalla (100vh); las nubes se extienden más abajo */}
      <div className={styles.stage}>
        {/* Intro arriba a la izquierda */}
        <div className={styles.intro}>
          <span className={styles.mask}>
            <span className={`${styles.maskInner} ${styles.introText}`}>
              Somos un estudio digital<br />
              de <strong>software y diseño</strong><br />
              en Buenos Aires, Argentina.
            </span>
          </span>
        </div>

        {/* Título abajo a la izquierda, escalonado desde máscaras */}
        <div className={styles.content}>
          <span className={styles.mask}>
            <h1 className={`${styles.maskInner} ${styles.title}`}>
              <span className={styles.line}>Ideas con <span className={styles.accentViolet}>identidad,</span></span>
              <span className={styles.line}><span className={styles.accentOrange}>experiencias</span> con impacto</span>
            </h1>
          </span>
        </div>
      </div>

      {/* Pantalla de carga: "LanTI" se llena de color y se difumina */}
      <div className={styles.loader} aria-hidden="true">
        <span className={styles.logo}>
          <span className={styles.logoBase}>LANTI</span>
          <span className={styles.logoFill}>LANTI</span>
        </span>
      </div>
  
    </section>
  );
}
