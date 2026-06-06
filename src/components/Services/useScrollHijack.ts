import { useState, useEffect, useRef, RefObject } from "react";

const COOLDOWN_MS = 550;
const TOUCH_THRESHOLD = 40;

export function useScrollHijack(sectionRef: RefObject<HTMLElement | null>, total: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const cooldownRef = useRef(false);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // La sección está "activa" cuando:
    // 1. Su borde superior está dentro de ±80px del tope del viewport (está alineada)
    // 2. Su borde inferior llega al 90% del viewport (ocupa la pantalla, no solo asoma)
    // La doble condición evita activar cuando la sección está mayormente fuera de vista
    const inFocus = () => {
      const { top, bottom } = el.getBoundingClientRect();
      return top >= -80 && top <= 80 && bottom >= window.innerHeight * 0.9;
    };

    const advance = (dir: 1 | -1, e: Event) => {
      const next = activeIndexRef.current + dir;
      if (next < 0 || next >= total) return; // en límite — dejar pasar el scroll global
      e.preventDefault();
      if (cooldownRef.current) return; // en transición: bloquear pero no avanzar doble
      cooldownRef.current = true;
      activeIndexRef.current = next;
      setActiveIndex(next);
      setTimeout(() => { cooldownRef.current = false; }, COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!inFocus()) return;
      advance(e.deltaY > 0 ? 1 : -1, e);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!inFocus()) return;
      const delta = touchStartRef.current - e.touches[0].clientY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      advance(delta > 0 ? 1 : -1, e);
      touchStartRef.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [total, sectionRef]);

  return { activeIndex };
}
