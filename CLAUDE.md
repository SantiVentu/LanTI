# LanTI — Landing Page

Agencia de software, diseño e identidad. Esta es nuestra propia landing.

## Stack
- Next.js (App Router)
- TypeScript
- CSS Modules como sistema de estilo por defecto. NO estilos inline.
- Tailwind v4 está instalado y permitido **solo** para componentes y animaciones traídos de 21st (Magic MCP). Todo lo demás se escribe en CSS Modules. La marca está mapeada en `globals.css` vía `@theme` (utilidades `bg-ink`, `text-paper`, `text-accent`).

### Animación y 3D
- **Framer Motion** — animaciones de UI: entrada/salida de componentes, gestos, layout, transiciones simples.
- **GSAP + ScrollTrigger** — animaciones complejas ligadas al scroll: timelines, pinning, scrub, secuencias.
- **Lenis** — smooth scroll. Se integra con ScrollTrigger (sincronizar el `raf` de Lenis con `ScrollTrigger.update`).
- **Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)** — 3D: partículas, objetos que rotan, profundidad real.

Reglas de uso:
- Todo lo que use GSAP, Lenis, R3F o Three corre en cliente → componente con `"use client"`.
- Aislar el 3D y las animaciones de scroll en sus propios componentes/hooks; no mezclar lógica 3D dentro de componentes de presentación.
- Limpiar SIEMPRE en el cleanup del efecto: `ScrollTrigger.kill()`, `gsap.context().revert()`, destruir la instancia de Lenis y disponer geometrías/materiales de Three.
- Cargar el canvas 3D de forma diferida (`next/dynamic` con `ssr: false`) para no romper el render del servidor ni bloquear el LCP.
- Las animaciones corren SIEMPRE, sin importar `prefers-reduced-motion` (decisión del cliente: el movimiento es parte de la identidad de la marca). No agregar guards de reduce-motion.

## Convenciones de código
- Código en inglés: nombres de variables, funciones y componentes.
- Comentarios en español, breves, explicando QUÉ hace el bloque. No comentar lo obvio.
- Componentes funcionales con hooks. Nada de class components.
- Cada componente tiene su archivo .module.css al lado (ej: Hero.tsx + Hero.module.css).
- Server Components por defecto. Agregar "use client" solo cuando se necesite estado, efectos, eventos o APIs del navegador.

## Estructura
- Componentes en src/components/
- Tipos compartidos en src/types/
- Páginas en src/app/
- Assets (imágenes, íconos) en public/


## Cómo trabajar conmigo
- Antes de crear o editar código, explicame qué vas a hacer y por qué. Esperá mi confirmación antes de tocar archivos.
- No instales dependencias nuevas sin avisarme primero.
- Si algo del diseño está marcado como PENDIENTE, preguntame en vez de inventar valores.
- Hacé un cambio o un componente por vez, no todo de una.

## Principios de calidad (estándar senior React)

### Responsabilidad única
- Cada componente hace UNA cosa. Si hace varias, separalo.
- Lógica reutilizable o con estado va en custom hooks (ej: useScrollAnimation), no incrustada en el componente.
- Separá presentación (cómo se ve) de lógica (cómo funciona).

### Composición sobre modificación
- Extendé componentes con props (variant, size) y children, no editando el componente base cada vez.
- Preferí componentes chicos y composables a componentes grandes con muchas condiciones.

### Props limpias
- Pasá solo las props que el componente usa. Nada de props de más.
- Tipá todas las props con interfaces TypeScript. Prohibido usar "any".
- Props con nombres descriptivos que expliquen su intención.

### Datos desde afuera
- Los componentes reciben datos por props o context. No van a buscar datos por su cuenta.
- Esto los hace testeables y reutilizables.

### Buenas prácticas generales
- Nombres descriptivos en inglés (handleSubmit, isLoading, no x o data1).
- Funciones cortas y enfocadas.
- No optimizar prematuramente (nada de useMemo/useCallback sin una razón medible).
- Manejar estados de carga y error donde haya datos asíncronos.
- Accesibilidad básica: etiquetas semánticas, alt en imágenes, foco visible.

### Antes de dar por terminado un componente, verificá:
- ¿Hace una sola cosa?
- ¿Está tipado sin "any"?
- ¿Se ve bien en mobile, tablet y desktop?
- ¿Los nombres explican la intención?