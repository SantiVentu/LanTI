import gsap from "gsap";
import styles from "@/components/About2/About2.module.css";
import { PHASE } from "./stagePhases";

// Tramo de About2 dentro del stage: los renglones entran por los costados, sube el bloque de
// apoyo y después todo se retira por donde vino. La salida ocupa la franja handoff → title:
// termina exactamente cuando el título de Services empieza a entrar.
export function addAbout2Phase(tl: gsap.core.Timeline, root: HTMLElement) {
  const sel = gsap.utils.selector(root);
  const kicker = sel(`.${styles.kicker}`);
  const lineLeft = sel(`.${styles.lineLeft}`);
  const lineRight = sel(`.${styles.lineRight}`);
  const revealInner = sel(`.${styles.revealInner}`);

  const linesDuration = PHASE.blockUp - PHASE.linesIn;
  const blockDuration = PHASE.handoff - PHASE.blockUp;
  // La salida cierra justo donde entra el título de Services: uno releva al otro
  const exitDuration = PHASE.title - PHASE.handoff;
  // El kicker aguanta mientras los renglones ya se están yendo y recién después se apaga,
  // así no se va lo primero que se leyó. Es fracción de la salida, no un valor suelto.
  const kickerHold = exitDuration * 0.65;

  // Estado inicial explícito: no alcanza con el immediateRender en una timeline scrubbeada
  gsap.set(lineLeft, { autoAlpha: 0, xPercent: -110 });
  gsap.set(lineRight, { autoAlpha: 0, xPercent: 110 });
  gsap.set(revealInner, { autoAlpha: 0, yPercent: 60 });

  tl
    // Entrada: el renglón izquierdo aparece nítido (opacidad rápida) y se desliza
    .to(lineLeft, { autoAlpha: 1, duration: 0.1 }, PHASE.linesIn)
    .to(
      lineLeft,
      { xPercent: 0, duration: linesDuration, ease: "power2.out" },
      PHASE.linesIn
    )
    // El derecho, casi a la par
    .to(lineRight, { autoAlpha: 1, duration: 0.1 }, PHASE.linesIn + 0.08)
    .to(
      lineRight,
      { xPercent: 0, duration: linesDuration, ease: "power2.out" },
      PHASE.linesIn + 0.08
    )
    // Bloque de apoyo: aparece y sube desde abajo
    .to(revealInner, { autoAlpha: 1, duration: 0.15 }, PHASE.blockUp)
    .to(
      revealInner,
      { yPercent: 0, duration: blockDuration, ease: "power3.out" },
      PHASE.blockUp
    )
    // Salida en espejo: cada renglón se va por donde entró. ease "in" para que aceleren.
    .to(
      lineLeft,
      {
        xPercent: -110,
        autoAlpha: 0,
        duration: exitDuration,
        ease: "power2.in",
      },
      PHASE.handoff
    )
    .to(
      lineRight,
      { xPercent: 110, autoAlpha: 0, duration: exitDuration, ease: "power2.in" },
      PHASE.handoff
    )
    .to(
      revealInner,
      { yPercent: 60, autoAlpha: 0, duration: exitDuration, ease: "power2.in" },
      PHASE.handoff
    )
    .to(
      kicker,
      { autoAlpha: 0, duration: exitDuration - kickerHold },
      PHASE.handoff + kickerHold
    );
}
