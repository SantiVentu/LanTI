import gsap from "gsap";
import styles from "@/components/Services/Services.module.css";
import { PHASE } from "./stagePhases";

// Pose final del abanico: los extremos abren más y caen un poco, como cartas sostenidas
// desde el centro. El arco es suave a propósito.
const FAN_POSE = [
  { rotation: -8, y: 28 },
  { rotation: -2.5, y: 0 },
  { rotation: 2.5, y: 0 },
  { rotation: 8, y: 28 },
];

// Cuánto se adelanta el título respecto de su fase. Solapa apenas el final de la salida de
// About2 sin tocar PHASE.title, del que cuelga la duración de esa salida.
const TITLE_LEAD = 0.15;
// Cuánto dura el cruce del título. Junto con el adelanto y el desfase de la palabra derecha
// llena la franja hasta PHASE.cards, así queda puesto justo cuando arrancan las cards.
const CROSS_DURATION = 0.6;
// La palabra derecha sale apenas después que la izquierda, como los renglones de About2
const WORD_STAGGER = 0.05;
// Fundido de entrada: la opacidad sube a lo largo de TODO el recorrido, así la palabra llega
// a sólido recién cuando termina de acomodarse. Va lineal a propósito —el deslizamiento usa
// power2.out y cubre la distancia temprano; si el fundido copiara esa curva, la palabra ya
// estaría opaca a mitad de camino y el efecto se perdería.
const FADE_DURATION = CROSS_DURATION;

const pose = (index: number) => FAN_POSE[index % FAN_POSE.length];

// Tramo de Services dentro del stage: el título entra por los costados —una palabra desde
// cada lado, en espejo de la salida de About2— recién cuando los renglones de About2
// terminaron de abrirse, y después suben las cards en abanico.
export function addServicesPhase(tl: gsap.core.Timeline, root: HTMLElement) {
  const sel = gsap.utils.selector(root);
  const [wordLeft] = sel(`.${styles.wordLeft}`);
  const [wordRight] = sel(`.${styles.wordRight}`);
  const cards = sel("[data-card]") as HTMLElement[];
  if (!wordLeft || !wordRight || !cards.length) return;

  // Margen holgado para sacar cada palabra de pantalla estando centrada. El recorte lo hace
  // el overflow del stage, en el borde de la ventana.
  const offscreen = () => window.innerWidth * 0.75;
  const fromLeft = () => -offscreen();

  // Desplazamiento que apila cada card en el centro del grupo. offsetLeft es medida de
  // layout —los transforms no la afectan—, así que se recalcula bien en cada resize.
  const stackOffset = (target: HTMLElement) => {
    const first = cards[0];
    const last = cards[cards.length - 1];
    const groupCenter =
      (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2;

    return groupCenter - (target.offsetLeft + target.offsetWidth / 2);
  };

  const fanDuration = PHASE.end - PHASE.cards;

  // Estado inicial explícito para todo. Con stagger, GSAP solo renderiza los sub-tweens que
  // arrancan en el tiempo 0, así que las cards con delay se quedarían visibles en su celda.
  gsap.set([wordLeft, wordRight], { autoAlpha: 0 });
  gsap.set(wordLeft, { x: fromLeft });
  gsap.set(wordRight, { x: offscreen });
  gsap.set(cards, {
    autoAlpha: 0,
    x: (_index: number, target: HTMLElement) => stackOffset(target),
    y: 0,
    yPercent: 120,
    rotation: 0,
    transformOrigin: "50% 100%", // pivote abajo: el giro se lee como abanico
  });

  const titleStart = PHASE.title - TITLE_LEAD;

  tl
    // Cada palabra se funde con su propio deslizamiento, no las dos juntas
    .to(
      wordLeft,
      { autoAlpha: 1, duration: FADE_DURATION, ease: "none" },
      titleStart
    )
    .to(
      wordRight,
      { autoAlpha: 1, duration: FADE_DURATION, ease: "none" },
      titleStart + WORD_STAGGER
    )
    // Cruce: la izquierda arranca primero y la derecha la sigue. Los fromTo con función se
    // reevalúan en cada refresh, así el desplazamiento sigue al ancho de la ventana.
    .fromTo(
      wordLeft,
      { x: fromLeft },
      { x: 0, duration: CROSS_DURATION, ease: "power2.out" },
      titleStart
    )
    .fromTo(
      wordRight,
      { x: offscreen },
      { x: 0, duration: CROSS_DURATION, ease: "power2.out" },
      titleStart + WORD_STAGGER
    )
    // Cards: aparecen ya en movimiento (no es un fundido largo)
    .to(
      cards,
      {
        autoAlpha: 1,
        duration: 0.15,
        stagger: { each: 0.05, from: "center" },
      },
      PHASE.cards
    )
    // Suben desde abajo de pantalla mientras se separan hacia su pose de abanico. Subir y
    // abrirse son el MISMO movimiento.
    .fromTo(
      cards,
      {
        x: (_index: number, target: HTMLElement) => stackOffset(target),
        y: 0,
        yPercent: 120,
        rotation: 0,
      },
      {
        x: 0,
        y: (index: number) => pose(index).y,
        yPercent: 0,
        rotation: (index: number) => pose(index).rotation,
        duration: fanDuration,
        ease: "power1.out",
      },
      PHASE.cards
    );
}
