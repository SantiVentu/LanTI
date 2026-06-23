"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./MeshGradient.module.css";

// El canvas 3D se carga solo en cliente para no romper el SSR ni bloquear el LCP
const GradientCanvas = dynamic(() => import("./GradientCanvas"), { ssr: false });

interface MeshGradientProps {
  // Contenido que se muestra sobre el degradado
  children?: ReactNode;
  className?: string;
}

export default function MeshGradient({ children, className }: MeshGradientProps) {
  // Montamos el canvas solo en cliente (evita SSR del WebGL)
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      {enabled && <GradientCanvas />}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
