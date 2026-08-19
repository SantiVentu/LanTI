import gsap from "gsap";

export interface SkyZone {
  /** Valor de data-sky-section del elemento que ancla la parada */
  section: string;
  /**
   * Posición dentro de esa sección: 0 su borde superior, 1 el inferior. Se resuelve como
   * "cuando ese punto pasa por el CENTRO de la ventana", no por el borde de arriba. El centro
   * es lo que uno mira, y además hace que las paradas de la última sección sean alcanzables:
   * el scroll termina una ventana antes del final del documento, así que anclando al borde
   * superior las últimas paradas nunca llegan a tocarse.
   */
  at: number;
  color: string;
  /** Solo documental */
  zone: string;
}

// El cielo recorre un día completo mientras se baja por la página.
//
// Los colores van DE A PARES: uno para llegar y otro, del mismo valor, para sostenerlo. Sin
// ese sostén cada color es apenas un punto de cruce —se alcanza y en el frame siguiente ya se
// está yendo al próximo—, así que ninguno se llega a leer. El tramo ENTRE pares es la
// transición; el tramo DENTRO del par es cuánto dura ese momento del día.
//
// Para que un color dure más se alarga su par. Para que llegue más tarde se corre el par
// entero. Lo que no hay que hacer es correr una parada suelta hacia adelante: eso no la
// retrasa, aplasta a todas las que vienen después.
export const SKY_ZONES: SkyZone[] = [
  { section: "hero", at: 0, color: "#f8e2ad", zone: "Hero — mediodía" },
  { section: "hero", at: 0.7, color: "#f8e2ad", zone: "sostiene el mediodía" },

  { section: "stage", at: 0.15, color: "#ebc284", zone: "About2 — tarde (ámbar de marca)" },
  { section: "stage", at: 0.5, color: "#ebc284", zone: "sostiene el ámbar" },

  { section: "stage", at: 0.66, color: "#e59a5f", zone: "Services, título — hora dorada" },
  { section: "stage", at: 0.76, color: "#e59a5f", zone: "sostiene la hora dorada" },

  { section: "stage", at: 0.92, color: "#b4503a", zone: "Services, cards — atardecer" },
  { section: "contact", at: 0.2, color: "#b4503a", zone: "sostiene el atardecer" },

  { section: "contact", at: 0.55, color: "#7a3450", zone: "Contact — crepúsculo" },
  { section: "footer", at: 0.1, color: "#7a3450", zone: "sostiene el crepúsculo" },

  { section: "footer", at: 0.3, color: "#221d3d", zone: "Footer — noche" },
  { section: "footer", at: 1, color: "#221d3d", zone: "sostiene la noche" },
];

interface ResolvedStop {
  /** Posición de scroll, en píxeles */
  at: number;
  color: string;
}

// Traduce las paradas a posiciones de scroll midiendo el DOM. Se llama en cada refresh de
// ScrollTrigger, así que sobrevive a resizes y a cambios de alto de cualquier sección: nada
// depende de estimar cuánto mide la página.
export const resolveSkyZones = (zones: SkyZone[]): ResolvedStop[] => {
  const half = window.innerHeight / 2;
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

  const stops = zones.flatMap((zone) => {
    const element = document.querySelector<HTMLElement>(
      `[data-sky-section="${zone.section}"]`
    );
    if (!element) return [];

    const rect = element.getBoundingClientRect();
    const top = rect.top + window.scrollY;

    return [
      {
        at: gsap.utils.clamp(0, maxScroll, top + zone.at * rect.height - half),
        color: zone.color,
      },
    ];
  });

  // Ordenadas por si una fracción alta de una sección cae después de una baja de la siguiente
  return stops.sort((a, b) => a.at - b.at);
};

// Arma un resolvedor de color. Los interpoladores se crean una sola vez y después cada frame
// solo busca el tramo y mezcla.
export const createSkyRamp = (stops: ResolvedStop[]) => {
  const segments = stops.slice(0, -1).map((stop, index) => ({
    from: stop.at,
    to: stops[index + 1].at,
    mix: gsap.utils.interpolate(stop.color, stops[index + 1].color),
  }));

  const first = stops[0];
  const last = stops[stops.length - 1];

  return (scroll: number): string => {
    if (!segments.length) return first?.color ?? "";

    const value = gsap.utils.clamp(first.at, last.at, scroll);
    const segment =
      segments.find((candidate) => value <= candidate.to) ??
      segments[segments.length - 1];
    const span = segment.to - segment.from;

    return segment.mix(span === 0 ? 1 : (value - segment.from) / span);
  };
};
