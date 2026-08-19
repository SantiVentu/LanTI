"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PHASE } from "@/animations/stagePhases";
import { addAbout2Phase } from "@/animations/about2Phase";
import { addServicesPhase } from "@/animations/servicesPhase";
import { addSkyPhase } from "@/animations/skyPhase";

gsap.registerPlugin(ScrollTrigger);

// Orquesta el stage About2 → Services. Un único timeline scrubbeado: el scroll deja de
// navegar entre secciones y pasa a recorrer estados de una misma escena.
//
// Mientras la ventana está pineada, las dos capas quedan SIEMPRE en la misma posición de
// pantalla. Eso es lo que permite que una sección nazca detrás de la otra en vez de subir
// desde abajo, y hace que solapar gestos sea gratis: no hay geometría de scroll que
// compensar, solo posiciones en el timeline.
//
// El pin va en su PROPIO trigger, separado del timeline. Si fueran el mismo, el timeline no
// podría empezar antes de que el pin enganche, y la primera fase —los renglones barriendo
// mientras el stage sube— quedaría atrapada dentro del pin, con la sección ya quieta.
// Separados, el timeline arranca PHASE.blockUp pantallas antes y atraviesa el pin de largo.
//
// El pin usa pinSpacing por defecto: el spacer aporta el recorrido posterior al enganche.
export function useStageSequence(
  stageRef: RefObject<HTMLElement | null>,
  innerRef: RefObject<HTMLElement | null>,
  skyFrom: string,
  skyTo: string
) {
  useEffect(() => {
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!stage || !inner) return;

    const ctx = gsap.context(() => {
      // Anticipo: cuánto recorre el timeline ANTES de que la ventana se congele. Es la
      // primera fase completa, así que sale del mapa y no de un número suelto.
      const leadIn = PHASE.blockUp * 100;

      // El pin no anima nada: solo congela la ventana desde que el stage llega arriba.
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: `+=${PHASE.end * 100 - leadIn}%`,
        pin: inner,
      });

      // El timeline se crea DESPUÉS del pin a propósito: así ScrollTrigger no le suma la
      // distancia pineada y el end en distancia cruda es literal. Arranca `leadIn` antes del
      // pin y termina con él, de modo que 1 unidad = 100vh en TODO el recorrido, dentro y
      // fuera del pin. Sin eso el mapeo se deformaría al cruzar el enganche.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: `top ${leadIn}%`,
          end: `+=${PHASE.end * 100}%`,
          scrub: 1, // suavizado: el barrido persigue al scroll en vez de ir clavado
          invalidateOnRefresh: true,
        },
      });

      addAbout2Phase(tl, stage);
      addServicesPhase(tl, stage);
      addSkyPhase(tl, skyFrom, skyTo);
    }, stage);

    return () => {
      ctx.revert();
      // El vire escribe la var en documentElement, fuera del alcance del context
      document.documentElement.style.removeProperty("--sky-pastel");
    };
  }, [stageRef, innerRef, skyFrom, skyTo]);
}
