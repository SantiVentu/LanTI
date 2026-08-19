"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import type { CardOrigin, PokerCard } from "@/types/cards";
import { CARD_BACK, POKER_CARDS } from "./cardArt";
import CardLightbox from "./CardLightbox";
import styles from "./Cards.module.css";

interface FocusedCard {
  card: PokerCard;
  origin: CardOrigin;
}

// Grilla de cartas boca abajo. La animación de entrada la maneja la sección contenedora vía
// [data-card]; acá solo vive el revelado de una carta al clickearla.
export default function Cards() {
  const [focused, setFocused] = useState<FocusedCard | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const reveal = (card: PokerCard, event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    triggerRef.current = target;
    setFocused({
      card,
      origin: {
        // Centro visual: la caja envolvente de un rectángulo rotado queda centrada en el
        // mismo punto que el rectángulo, así que el centro del rect sirve tal cual.
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        // Ancho sin rotar: el rect lo devolvería inflado por el giro del abanico.
        width: target.offsetWidth,
      },
    });
  };

  // Al cerrar, el foco de teclado vuelve a la carta que lo abrió
  const close = () => {
    setFocused(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <div className={styles.cards}>
        {POKER_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className={styles.card}
            data-card
            data-focused={focused?.card.id === card.id ? "" : undefined}
            aria-label={`Revelar ${card.alt}`}
            onClick={(event) => reveal(card, event)}
          >
            {/* Wrapper interno: se queda con el hover porque el transform del exterior es de GSAP */}
            <span className={styles.cardInner}>
              <Image
                src={CARD_BACK.src}
                // Decorativa: el botón ya se anuncia con su aria-label, y las cuatro
                // muestran el mismo dorso
                alt=""
                width={CARD_BACK.width}
                height={CARD_BACK.height}
                className={styles.cardImage}
                sizes="(max-width: 520px) 78vw, (max-width: 900px) 40vw, 22vw"
              />
            </span>
          </button>
        ))}
      </div>

      <CardLightbox
        card={focused?.card ?? null}
        origin={focused?.origin ?? null}
        onClose={close}
      />
    </>
  );
}
