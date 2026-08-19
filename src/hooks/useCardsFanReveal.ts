"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pose final del abanico: los extremos abren más y caen un poco, como cartas sostenidas
// desde el centro. El arco es suave a propósito.
const FAN_POSE = [
  { rotation: -8, y: 28 },
  { rotation: -2.5, y: 0 },
  { rotation: 2.5, y: 0 },
  { rotation: 8, y: 28 },
];

// Services pineada: las cards NACEN apiladas al centro, debajo del borde de pantalla. Con
// el scroll suben y se separan en abanico en un mismo movimiento continuo.
export function useCardsFanReveal(
  sectionRef: RefObject<HTMLElement | null>,
  cardSelector: string
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(cardSelector)
    );
    if (!cards.length) return;

    // Desplazamiento que apila cada card en el centro del grupo. offsetLeft es medida de
    // layout —los transforms no la afectan—, así que se recalcula bien en cada resize.
    const stackOffset = (target: HTMLElement) => {
      const first = cards[0];
      const last = cards[cards.length - 1];
      const groupCenter =
        (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;

      return groupCenter - (target.offsetLeft + target.offsetWidth / 2);
    };

    const pose = (index: number) => FAN_POSE[index % FAN_POSE.length];

    const mm = gsap.matchMedia();

    // Desktop/tablet: la grilla es horizontal (el abanico se lee) y la sección mide una
    // pantalla, así que se puede pinear.
    mm.add("(min-width: 901px)", () => {
      // Estado inicial explícito para las 4 cards. No alcanza con el immediateRender de los
      // fromTo: con stagger, GSAP solo renderiza los sub-tweens que arrancan en el tiempo 0,
      // así que las cards con delay se quedarían visibles en su celda hasta que les toque.
      gsap.set(cards, {
        autoAlpha: 0,
        x: (_index: number, target: HTMLElement) => stackOffset(target),
        y: 0,
        yPercent: 170,
        rotation: 0,
        transformOrigin: "50% 100%", // pivote abajo: el giro se lee como abanico
      });

      // El pin va en su propio trigger, sin animación: se clava cuando la sección llega
      // arriba y dura 70vh.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=70%",
        pin: true,
      });

      // El abanico arranca 50vh ANTES del pin para que las cards ya estén subiendo cuando
      // la sección entra, sin pantalla vacía. Se crea después del pin para que ScrollTrigger
      // no le sume la distancia pineada, y el end en distancia cruda (50 + 70) lo hace
      // terminar justo con el pin. Subir y abrirse son el MISMO movimiento.
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "+=120%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      reveal
        // Aparecen apenas arranca, ya en movimiento (no es un fundido largo)
        .fromTo(
          cards,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.12,
            stagger: { each: 0.06, from: "center" },
          },
          0
        )
        // Suben desde abajo de pantalla mientras se separan hacia su pose de abanico
        .fromTo(
          cards,
          {
            x: (_index: number, target: HTMLElement) => stackOffset(target),
            y: 0,
            yPercent: 170,
            rotation: 0,
          },
          {
            x: 0,
            y: (index: number) => pose(index).y,
            yPercent: 0,
            rotation: (index: number) => pose(index).rotation,
            duration: 1,
            ease: "power1.out",
            stagger: { each: 0.06, from: "center" },
          },
          0
        );
    });

    // Mobile: la grilla se apila en columna y la sección mide varias pantallas. Sin abanico
    // ni pin: las cards entran de a una desde abajo.
    mm.add("(max-width: 900px)", () => {
      // Mismo motivo que arriba: el estado inicial va en un set, no en el from
      gsap.set(cards, { autoAlpha: 0, yPercent: 40 });

      gsap.to(cards, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, [sectionRef, cardSelector]);
}
