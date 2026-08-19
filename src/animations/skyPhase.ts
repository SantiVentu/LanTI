import gsap from "gsap";
import { PHASE } from "./stagePhases";

// Vire del cielo compartido (--sky-pastel) durante el abanico de cards: el título entra con
// el color original todavía puesto y el cambio de fondo cierra junto con la última card.
//
// Se escribe la var a mano porque GSAP no interpola colores dentro de custom properties. Va
// sobre documentElement y no sobre el stage para que body, Hero2 y lo que sigue viren en
// bloque: si solo cambiara el stage, se vería una costura en sus bordes.
export function addSkyPhase(
  tl: gsap.core.Timeline,
  fromColor: string,
  toColor: string
) {
  const root = document.documentElement;
  const mixColor = gsap.utils.interpolate(fromColor, toColor);
  const proxy = { progress: 0 };

  tl.to(
    proxy,
    {
      progress: 1,
      duration: PHASE.end - PHASE.aboutOut,
      ease: "none",
      onUpdate: () =>
        root.style.setProperty("--sky-pastel", mixColor(proxy.progress)),
    },
    PHASE.aboutOut
  );
}
