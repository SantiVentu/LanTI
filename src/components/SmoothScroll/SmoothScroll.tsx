"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

// Smooth scroll global sincronizado con ScrollTrigger
export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    // Cada scroll de Lenis refresca las posiciones de ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // El RAF de Lenis lo maneja el ticker de GSAP (una sola fuente de verdad)
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
