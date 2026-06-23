"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import styles from "./MeshGradient.module.css";

// Paleta de la diseñadora → vec3 normalizado (0..1) tal cual el hex
const toVec = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    // uv derivado de la posición en clip space (0..1 en el área visible)
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uBg1;
  uniform vec3 uBg2;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  uniform vec3 uC5;
  uniform vec3 uC6;
  uniform vec3 uHi;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  // Mancha de degradado suave: pico en el centro y caída gradual (sin núcleo plano → se funden)
  float blob(vec2 p, vec2 c, float r) {
    float d = length(p - c) / r;
    return exp(-d * d * 1.6);
  }

  void main() {
    vec2 p = vUv; p.x *= uAspect;

    float t = uTime * 0.05;

    // Domain warp: deforma el espacio para que las manchas sean orgánicas (no círculos)
    vec2 warp = vec2(
      fbm(p * 1.7 + vec2(0.0, t)),
      fbm(p * 1.7 + vec2(3.7, 1.2) - t * 0.8)
    );
    vec2 pw = p + (warp - 0.5) * 0.5;

    // Centros con deriva lenta y sobria
    vec2 cPlum   = vec2(0.22 + 0.03 * sin(t * 0.5 + 0.8),  0.40 + 0.03 * cos(t * 0.6 + 1.2));
    vec2 cViolet = vec2(0.38 + 0.03 * sin(t * 0.9),       0.60 + 0.025 * cos(t * 0.7));
    vec2 cPeri   = vec2(0.50 + 0.03 * sin(t * 0.6 + 1.5),  0.48 + 0.03 * cos(t * 0.8 + 2.0));
    vec2 cGold   = vec2(0.72 + 0.03 * sin(t * 0.7 + 3.0),  0.56 + 0.025 * cos(t * 0.9 + 1.0));
    cPlum.x *= uAspect; cViolet.x *= uAspect; cPeri.x *= uAspect; cGold.x *= uAspect;

    // Fondo indigo-violeta con leve variación diagonal
    vec3 col = mix(uBg1, uBg2, smoothstep(0.0, 1.0, vUv.x * 0.5 + (1.0 - vUv.y) * 0.5));

    // Manchas suaves y amplias que se superponen y funden entre sí
    col = mix(col, uC6, blob(pw, cPlum,   0.52) * 0.70); // violeta profundo (#482B5B)
    col = mix(col, uC1, blob(pw, cViolet, 0.56) * 0.80); // violeta
    col = mix(col, uC2, blob(pw, cPeri,   0.46) * 0.55); // periwinkle
    col = mix(col, uC5, blob(pw, cGold,   0.50) * 0.70); // dorado (zona cálida amplia)
    col = mix(col, uC4, blob(pw, cGold,   0.34) * 0.45); // coral (sobre el dorado, transición)
    col = mix(col, uC3, blob(pw, cGold,   0.18) * 0.40); // naranja (acento tenue, concéntrico)

    // Más indigo oscuro solo del lado izquierdo (resto intacto)
    float leftMask = smoothstep(0.55, 0.0, vUv.x);
    col = mix(col, uBg2, leftMask * 0.6);

    // El violeta oscuro siempre cubre la franja inferior → empalme unificado con About
    float bottomFactor = smoothstep(0.04, 0.42, vUv.y);
    col = mix(uBg1, col, bottomFactor);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Scene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uBg1: { value: toVec("#2d2b54") }, // indigo-violeta (empalme con About)
      uBg2: { value: toVec("#242744") }, // navy (variación)
      uC1: { value: toVec("#7C6AAD") },  // violeta (mancha izq)
      uC2: { value: toVec("#9986B6") },  // periwinkle
      uC3: { value: toVec("#E95825") },  // naranja (núcleo cálido)
      uC4: { value: toVec("#D67F61") },  // coral (transición)
      uC5: { value: toVec("#E7CA7A") },  // dorado (mancha cálida)
      uC6: { value: toVec("#482B5B") },  // violeta profundo
      uHi: { value: toVec("#FEFAE0") },  // crema (brillo)
    }),
    []
  );

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uAspect.value = state.size.width / state.size.height;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </ScreenQuad>
  );
}

export default function GradientCanvas() {
  return (
    <Canvas
      flat
      frameloop="always"
      dpr={[1, 2]}
      className={styles.canvas}
      onCreated={({ gl }) => {
        // Mostrar los valores tal cual (los colores ya vienen en sRGB normalizado)
        gl.outputColorSpace = THREE.LinearSRGBColorSpace;
      }}
    >
      <Scene />
    </Canvas>
  );
}
