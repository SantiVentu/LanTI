"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// La instancia se expone por context para que cualquier componente pueda frenar el scroll
// (el lightbox de las cartas, por ejemplo) sin recrearla ni manotear el DOM por su cuenta.
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Smooth scroll global sincronizado con ScrollTrigger
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // duration = cuánto dura la cola residual al soltar la rueda; wheelMultiplier = impulso inicial
    const instance = new Lenis({
      duration: 1.8,
      wheelMultiplier: 1.5,
      smoothWheel: true,
    });
    setLenis(instance);

    // Cada scroll de Lenis refresca las posiciones de ScrollTrigger
    instance.on("scroll", ScrollTrigger.update);

    // El RAF de Lenis lo maneja el ticker de GSAP (una sola fuente de verdad)
    const update = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
