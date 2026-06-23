"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./PaintFlow.module.css";

// El canvas 3D se carga solo en cliente para no romper el SSR ni bloquear el LCP
const PaintFlowCanvas = dynamic(() => import("./PaintFlowCanvas"), { ssr: false });

interface PaintFlowProps {
  children?: ReactNode;
  className?: string;
}

export default function PaintFlow({ children, className }: PaintFlowProps) {
  // Montamos el canvas solo en cliente (evita SSR del WebGL)
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      {enabled && <PaintFlowCanvas />}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
