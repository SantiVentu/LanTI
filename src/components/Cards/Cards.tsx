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

  const focusedIndex = focused
    ? POKER_CARDS.findIndex((card) => card.id === focused.card.id)
    : -1;

  return (
    <>
      <div className={styles.cards}>
        {POKER_CARDS.map((card, index) => {
          const isFocused = index === focusedIndex;
          // Con una carta afuera, las tres restantes cierran filas. Las que estaban a su
          // izquierda se corren medio paso a la derecha y las de la derecha medio paso a la
          // izquierda —siempre medio paso, salga la carta que salga—, y el arco se reparte
          // entre las tres posiciones que quedan. El CSS hace las cuentas.
          const regrouping = focusedIndex >= 0 && !isFocused;

          return (
            <button
              key={card.id}
              type="button"
              className={styles.card}
              data-card
              data-focused={isFocused ? "" : undefined}
              data-side={
                regrouping ? (index < focusedIndex ? "left" : "right") : undefined
              }
              data-slot={
                regrouping ? (index < focusedIndex ? index : index - 1) : undefined
              }
              aria-label={`Revelar ${card.alt}`}
              onClick={(event) => reveal(card, event)}
            >
              {/* Una capa por transform: acá el reacomodo, adentro el hover, y el del botón
                  es de GSAP. Apilarlos en el mismo elemento los haría pisarse. */}
              <span className={styles.cardSlot}>
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
              </span>
            </button>
          );
        })}
      </div>

      <CardLightbox
        card={focused?.card ?? null}
        origin={focused?.origin ?? null}
        onClose={close}
      />
    </>
  );
}
