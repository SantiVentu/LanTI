"use client";

import { useRef, useEffect } from "react";
import styles from "./ShaderCanvas.module.css";

const SHADER_SOURCE = `#version 300 es
/*
 * Space nebula shader — tema claro, paleta sage/teal/amber
 * Adaptado de Matthias Hurrle (@atzedent)
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void) {
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }

  // Paleta del sitio
  vec3 sage  = vec3(0.933, 0.945, 0.925);  // #eef1ec
  vec3 teal  = vec3(0.110, 0.440, 0.314);  // #1c7050
  vec3 amber = vec3(0.784, 0.376, 0.098);  // #c8601a

  col = clamp(col, 0.0, 1.0);

  // Invertir: el espacio negro se vuelve claro, las luces pasan a matices teal/amber
  vec3 inv = 1.0 - col;
  float warmth   = clamp(col.r - max(col.g, col.b), 0.0, 1.0);
  float coolness = clamp(col.g - max(col.r, col.b), 0.0, 1.0)
                 + clamp(col.b - max(col.r, col.g), 0.0, 1.0) * 0.5;

  vec3 result = inv;
  result = mix(result, teal,  coolness * 0.8);
  result = mix(result, amber, warmth   * 0.7);
  // Anclar al sage para que todo el espectro sea on-palette
  result = mix(result, sage, 0.45);
  result = clamp(result, 0.72, 1.0);

  // Tiñe los centros brillantes de los cometas con naranja claro
  float cometGlow = smoothstep(0.4, 0.9, max(col.r, max(col.g, col.b)));
  vec3 cometOrange = vec3(1.0, 0.76, 0.50);
  result = mix(result, cometOrange, cometGlow * 0.75);

  O = vec4(result, 1);
}`;

const VERTEX_SOURCE = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

const QUAD = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);

class Renderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;

  constructor(private canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext("webgl2")!;
  }

  private compile(shader: WebGLShader, src: string) {
    const { gl } = this;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader error:", gl.getShaderInfoLog(shader));
    }
  }

  setup() {
    const { gl } = this;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, VERTEX_SOURCE);
    this.compile(this.fs, SHADER_SOURCE);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error("Program error:", gl.getProgramInfoLog(this.program));
    }

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(this.program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  }

  resize() {
    const { gl, canvas } = this;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  render(now: number) {
    const { gl, program, canvas } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(gl.getUniformLocation(program, "resolution"), canvas.width, canvas.height);
    gl.uniform1f(gl.getUniformLocation(program, "time"), now * 1e-3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    const { gl } = this;
    if (!this.program) return;
    if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
    if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
    if (this.buffer) gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
  }
}

export default function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    const renderer = new Renderer(canvas);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      renderer.resize();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    renderer.setup();

    let rafId: number;
    const loop = (now: number) => {
      renderer.render(now);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      renderer.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
}
