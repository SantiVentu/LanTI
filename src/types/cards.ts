// Una imagen de carta con su medida real. Las dimensiones viajan con el archivo porque cada
// arte viene en un tamaño distinto, y el lightbox necesita la proporción exacta para calcular
// cuánto agrandar.
export interface CardFace {
  src: string;
  width: number;
  height: number;
}

export interface PokerCard {
  /** Identidad de la posición en el abanico, independiente de los archivos */
  id: string;
  /** Descripción de la carta: nombra el botón de la grilla y el overlay ampliado */
  alt: string;
  /** Lo que se revela al ampliar. En la grilla las cuatro muestran el dorso compartido. */
  face: CardFace;
}

// Punto de partida del FLIP: dónde y de qué tamaño se ve la carta en la grilla al hacer click.
// No es un DOMRect a propósito — el rect de una carta rotada devuelve la caja envolvente, que
// es hasta un 19% más ancha que la carta. El ancho sale de offsetWidth, que es medida de
// layout y no la afecta el transform; el centro sí sale del rect, porque al rotar un
// rectángulo su caja envolvente queda centrada en el mismo punto.
export interface CardOrigin {
  centerX: number;
  centerY: number;
  width: number;
}
