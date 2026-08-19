"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/SmoothScroll/SmoothScroll";

// Frena el smooth scroll mientras algo lo bloquea (un overlay abierto, por ejemplo). Lenis se
// encarga de poner la clase .lenis-stopped en el html, que globals.css ya usa para el overflow.
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !locked) return;

    lenis.stop();
    return () => lenis.start();
  }, [lenis, locked]);
}
