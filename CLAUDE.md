# LanTI — Landing Page

Agencia de software, diseño e identidad. Esta es nuestra propia landing.

## Stack
- Next.js (App Router)
- TypeScript
- CSS Modules (NO usar Tailwind, NO estilos inline)
- Framer Motion para animaciones

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

## Estilo visual
- Idioma del sitio: español (lang="es")
- Estética: moderna, artística, jugada. Referencia: ohhmyads.com
- Tipografía: [PENDIENTE — la define la diseñadora]
- Paleta de colores: [PENDIENTE — la define la diseñadora]
- Mobile first: cada componente debe verse bien en mobile, tablet y desktop.

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