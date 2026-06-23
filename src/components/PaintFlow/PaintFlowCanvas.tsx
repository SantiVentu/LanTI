"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";
import styles from "./PaintFlow.module.css";

// Paleta de la diseñadora → vec3 normalizado (0..1) tal cual el hex
const toVec = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uAspect;
  uniform vec3 uA;   // navy (base)
  uniform vec3 uB;   // púrpura profundo
  uniform vec3 uC;   // violeta
  uniform vec3 uD;   // coral
  uniform vec3 uE;   // naranja
  uniform vec3 uHi;  // dorado

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

  // Ruido fractal (varias octavas)
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vUv;
    p.x *= uAspect;

    float t = uTime * 0.06;

    // Campos de ruido suaves y de baja frecuencia que derivan lentamente en el tiempo
    float a = fbm(p * 1.2 + vec2(0.0, t));
    float b = fbm(p * 1.0 + vec2(5.2, 1.3) - t * 0.8);
    float c = fbm(p * 1.5 + vec2(2.0, 8.0) + t * 0.6);

    // Mezcla de la paleta en regiones grandes y difusas (estilo mesh gradient)
    vec3 col = uA;                                              // base navy
    col = mix(col, uB, smoothstep(0.30, 0.78, a));            // púrpura profundo
    col = mix(col, uC, smoothstep(0.35, 0.82, b) * 0.92);    // violeta
    col = mix(col, uD, smoothstep(0.45, 0.85, c) * 0.85);    // coral
    col = mix(col, uE, smoothstep(0.50, 0.90, a * c) * 0.8); // naranja
    col = mix(col, uHi, smoothstep(0.72, 0.96, b * c) * 0.5); // dorado

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Scene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uA: { value: toVec("#242744") }, // navy (base)
      uB: { value: toVec("#482B5B") }, // púrpura profundo
      uC: { value: toVec("#7C6AAD") }, // violeta
      uD: { value: toVec("#D67F61") }, // coral
      uE: { value: toVec("#E95825") }, // naranja
      uHi: { value: toVec("#E7CA7A") }, // dorado
    }),
    []
  );

  // Avanzar el tiempo y el aspecto cada frame vía ref al material
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

export default function PaintFlowCanvas() {
  return (
    <Canvas
      flat
      frameloop="always"
      dpr={[1, 1.5]}
      className={styles.canvas}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.LinearSRGBColorSpace;
      }}
    >
      <Scene />
    </Canvas>
  );
}
