"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { CardOrigin, PokerCard } from "@/types/cards";
import { useScrollLock } from "@/hooks/useScrollLock";
import styles from "./CardLightbox.module.css";

// Cuánto de la ventana llega a ocupar la carta revelada
const MAX_HEIGHT_RATIO = 0.82;
const MAX_WIDTH_RATIO = 0.86;

interface Size {
  width: number;
  height: number;
}

// El tamaño destino se calcula en JS y no en CSS porque el FLIP necesita el número exacto para
// sacar la escala de partida. Va al CSS como custom property. La proporción sale de la carta
// revelada, que no es la misma que la del dorso ni la misma entre artes.
const measureTarget = (ratio: number): Size => {
  let height = window.innerHeight * MAX_HEIGHT_RATIO;
  let width = height * ratio;

  if (width > window.innerWidth * MAX_WIDTH_RATIO) {
    width = window.innerWidth * MAX_WIDTH_RATIO;
    height = width / ratio;
  }

  return { width, height };
};

interface RevealedCardProps {
  card: PokerCard;
  origin: CardOrigin;
  onClose: () => void;
}

// Vive aparte para poder medir la ventana en el inicializador perezoso del useState: así el
// tamaño está listo en el primer render y la carta nunca parpadea en el centro antes del FLIP.
function RevealedCard({ card, origin, onClose }: RevealedCardProps) {
  const ratio = card.face.width / card.face.height;
  const [target, setTarget] = useState<Size>(() => measureTarget(ratio));

  useScrollLock(true);

  useEffect(() => {
    const sync = () => setTarget(measureTarget(ratio));
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [ratio]);

  // Escape cierra, igual que el click afuera
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Estado de partida: el delta entre dónde está la carta en la grilla y el centro de la
  // ventana, más la escala que la achica a su tamaño original.
  const from = {
    x: origin.centerX - window.innerWidth / 2,
    y: origin.centerY - window.innerHeight / 2,
    scale: origin.width / target.width,
  };

  const size = {
    "--card-width": `${target.width}px`,
    "--card-height": `${target.height}px`,
  } as CSSProperties;

  return (
    // El fade de salida va solo acá: como la carta está adentro, se desvanece con el fondo
    // sin moverse. Nada de viaje de vuelta.
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // La salida es más corta y con easeOut: arranca fuerte y se apaga. Un fade largo con
      // el blur a full lee como una mancha que se lava, no como un cierre.
      exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
      transition={{ duration: 0.3 }}
      // Cierra cualquier click dentro del overlay: el fondo y también la carta, que deja
      // burbujear el evento hasta acá
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.alt}
    >
      {/* Sin `exit` propio: se queda quieta y se apaga junto con el fondo */}
      <motion.div
        className={styles.card}
        style={size}
        initial={from}
        animate={{ x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      >
        <Image
          src={card.face.src}
          alt={card.alt}
          width={card.face.width}
          height={card.face.height}
          className={styles.image}
          sizes="86vw"
        />
      </motion.div>
    </motion.div>
  );
}

interface CardLightboxProps {
  card: PokerCard | null;
  origin: CardOrigin | null;
  onClose: () => void;
}

// Overlay de carta revelada. Va por portal al body a propósito: dentro de la sección, los
// ancestros con transform (el pin de GSAP y el abanico) se vuelven el bloque contenedor de
// cualquier position:fixed, y la carta no podría centrarse contra la ventana.
export default function CardLightbox({
  card,
  origin,
  onClose,
}: CardLightboxProps) {
  const [mounted, setMounted] = useState(false);

  // El portal necesita el body, que no existe durante el render del servidor
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // AnimatePresence retiene el overlay montado mientras corre el fade de salida
  return createPortal(
    <AnimatePresence>
      {card && origin ? (
        <RevealedCard
          key={card.id}
          card={card}
          origin={origin}
          onClose={onClose}
        />
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
