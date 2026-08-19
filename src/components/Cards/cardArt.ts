import type { CardFace, PokerCard } from "@/types/cards";

// Dorso compartido: en la grilla las cuatro están boca abajo y son idénticas. Lo que las
// distingue es lo que revelan al ampliarse.
export const CARD_BACK: CardFace = {
  src: "/imagenes/cards/magiccard.png",
  width: 223,
  height: 319,
};

// Las cuatro cartas del abanico, de izquierda a derecha. El `id` identifica la POSICIÓN y no
// el archivo: en la grilla las cuatro comparten imagen, así que el src no sirve para
// distinguirlas.
//
// Para reemplazarlas cuando llegue la entrega de la diseñadora alcanza con cambiar `face` y
// `alt` de cada una; las medidas viajan con cada archivo, así que pueden venir en tamaños
// distintos sin tocar nada más. Ni el layout ni la animación leen el contenido de la imagen.
export const POKER_CARDS: PokerCard[] = [
  {
    id: "card-1",
    alt: "China",
    face: { src: "/imagenes/cards/china.webp", width: 745, height: 1040 },
  },
  {
    id: "card-2",
    alt: "Ulamog",
    face: { src: "/imagenes/cards/ulamog.webp", width: 745, height: 1040 },
  },
  {
    id: "card-3",
    alt: "Gurmag Angler",
    face: { src: "/imagenes/cards/gurmagangler.webp", width: 672, height: 936 },
  },
  {
    id: "card-4",
    alt: "La Redimida",
    face: { src: "/imagenes/cards/laredimida.webp", width: 672, height: 936 },
  },
];
