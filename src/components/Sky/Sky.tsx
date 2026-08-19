"use client";

import { useSkyRamp } from "@/hooks/useSkyRamp";

// No renderiza nada: el cielo es una variable CSS global, no un elemento. Existe como
// componente para poder montar el efecto desde la página, que es un Server Component.
export default function Sky() {
  useSkyRamp();

  return null;
}
