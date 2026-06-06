# Prompts — LanTI

## Estructura base del proyecto

```markdown
## Objetivo

Construir el esqueleto base de la landing page de LanTI: migrar la estructura actual a `src/`, crear seis componentes placeholder y conectarlos en la página principal, de modo que el proyecto compile sin errores. Sin diseño visual todavía.

---

## Contexto

**Proyecto:** LanTI, landing page de una agencia de software, diseño e identidad.

**Stack:**
- Next.js con App Router
- TypeScript
- CSS Modules (sin Tailwind, sin estilos inline)
- Framer Motion no está instalado todavía — no usarlo

**Estado actual del proyecto:**
- Los archivos del app viven en `app/` (raíz del proyecto) — deben migrarse a `src/app/`
- `app/page.tsx` tiene el boilerplate de Create Next App — reemplazar por completo
- `app/layout.tsx` tiene `lang="en"` — corregir a `lang="es"` y actualizar el metadata
- No existe todavía ninguna carpeta `src/`

---

## Restricciones

- **No inventar colores, tipografías ni valores visuales.** Los `.module.css` deben estar vacíos o con solo un selector base sin valores de diseño reales
- **No instalar dependencias nuevas**
- **No usar Tailwind ni estilos inline**
- **No usar animaciones**
- **No modificar `globals.css`** ni assets en `public/`
- **No agregar `"use client"`** salvo razón técnica concreta (no debería haberla en esta etapa)

---

## Estructura de carpetas a crear

\`\`\`
src/
  app/
    layout.tsx       ← mover desde app/layout.tsx
    page.tsx         ← reemplazar contenido
    globals.css      ← mover desde app/globals.css
  components/
    Nav/
      Nav.tsx
      Nav.module.css
    Hero/
      Hero.tsx
      Hero.module.css
    Services/
      Services.tsx
      Services.module.css
    About/
      About.tsx
      About.module.css
    Contact/
      Contact.tsx
      Contact.module.css
    Footer/
      Footer.tsx
      Footer.module.css
  types/
\`\`\`

---

## Resultado esperado

**Archivos a crear/migrar:**
- Mover `app/` → `src/app/` (layout.tsx, page.tsx, globals.css)
- Crear los seis componentes en `src/components/` (Nav, Hero, Services, About, Contact, Footer), cada uno con su `.tsx` y `.module.css`

**Cambios en archivos existentes:**
- `src/app/page.tsx`: importar y usar en orden Nav, Hero, Services, About, Contact, Footer
- `src/app/layout.tsx`: `lang="es"`, metadata con título "LanTI" y descripción acorde

**Comportamiento esperado al terminar:**
- `npm run dev` y `npm run build` sin errores ni warnings de TypeScript
- Cada componente renderiza un placeholder reconocible (ej: `<section><p>Hero</p></section>`)
- Los `.module.css` existen pero sin valores de diseño reales
- La página muestra todos los componentes en orden vertical

**Flujo de trabajo esperado:**
Antes de tocar cualquier archivo, explicar qué se va a hacer, en qué orden y por qué. Esperar confirmación explícita antes de proceder.
```

---

## Services — Scroll capturado con caja interna

```markdown
### Objetivo

Implementar en el componente `Services` un layout de scroll capturado ("scroll hijacking") donde
una caja centrada a la izquierda muestra los servicios uno por uno. El scroll de la pagina queda
bloqueado mientras el usuario navega entre los items internos; recien al llegar al primer o al
ultimo item se libera el scroll global.

---

### Contexto

**Archivos a modificar:**
- `src/components/Services/Services.tsx` — actualmente renderiza solo una `<section>` con
  un `<span>` label y sin contenido real.
- `src/components/Services/Services.module.css` — actualmente tiene `min-height: 900px` y
  estilos basicos de centrado.

**Archivos de referencia (no modificar):**
- `src/app/page.tsx` — monta los componentes en orden: Nav, Hero, Services, About, Contact,
  Footer. No tiene scroll personalizado ni libreria de smooth-scroll instalada.
- `src/app/globals.css` — define variables CSS (`--background`, `--foreground`), no tiene
  `overflow: hidden` ni cambios de `position` en `html` o `body`.

**Stack:**
- Next.js App Router, TypeScript estricto (prohibido `any`)
- CSS Modules (sin Tailwind, sin estilos inline)
- Framer Motion disponible para animaciones
- Server Components por defecto; agregar `"use client"` solo donde se necesite estado,
  efectos o eventos del navegador

**Datos de ejemplo para esta implementacion:**
Tres servicios: "UX/UI", "AI Agent", "Hamburguesas". Deben estar hardcodeados como array
tipado dentro del componente (los datos reales vendran despues).

---

### Comportamiento esperado

La seccion `Services` debe ocupar exactamente `100vh` en viewport.

Dentro de ella hay dos zonas horizontales:

1. **Zona izquierda (caja de scroll interno):** ocupa aproximadamente la mitad izquierda de
   la seccion. Contiene los items de servicio apilados verticalmente. Solo un item es visible
   a la vez; los demas estan fuera del area visible del contenedor (overflow oculto). El
   usuario navega entre items con el scroll (wheel o touch).

2. **Zona derecha:** reservada para contenido futuro; puede quedar vacia por ahora.

**Mecanica de scroll capturado:**
- Cuando el puntero esta sobre la caja de servicios (o la seccion esta en foco de scroll),
  los eventos `wheel` del navegador deben ser interceptados.
- Cada evento `wheel` con delta suficiente avanza o retrocede un item (snap one-by-one).
  Implementar un debounce o threshold para evitar saltos multiples por un solo gesto.
- Mientras no se haya llegado al ultimo item (scroll hacia abajo) o al primer item (scroll
  hacia arriba), el scroll de `window` NO debe avanzar (`preventDefault()` sobre el evento
  wheel).
- Al llegar al limite (primer o ultimo item), el proximo evento wheel se deja pasar al scroll
  global normalmente.
- En mobile, el mismo comportamiento debe aplicarse con eventos `touchstart` / `touchmove`.

**Transicion entre items:**
- Usar Framer Motion para animar el desplazamiento entre items (deslizamiento vertical,
  duracion y easing a criterio del implementador siempre que se sienta fluido).
- No usar CSS `scroll-snap` del navegador; la logica de snap debe ser controlada
  programaticamente para poder gestionar el bloqueo del scroll global.

---

### Restricciones

- No modificar `src/app/globals.css` ni `src/app/page.tsx`.
- No agregar `overflow: hidden` ni cambios de `position` en `html` o `body`; el bloqueo
  del scroll global se maneja solo con `preventDefault()` en el evento wheel.
- Paleta de colores y tipografia estan PENDIENTES: usar las variables CSS existentes
  (`--background`, `--foreground`) o valores neutros provisorios. No inventar una paleta
  definitiva.
- CSS Modules obligatorio para todos los estilos. Prohibido estilos inline.
- Toda la logica de scroll capturado y estado del item activo debe vivir en un custom hook
  separado (ej: `useScrollHijack`) dentro del mismo directorio `Services/`, no incrustada
  directamente en el componente.
- El componente `Services` debe ser Client Component (`"use client"`) dado que necesita
  eventos del navegador y estado. Documentar con un comentario en espanol por que se
  agrega la directiva.
- Mobile first: el layout de dos columnas puede colapsar a una sola columna en mobile si
  es necesario para que la caja de scroll se vea bien.
- Verificar la version de Next.js instalada en `package.json` antes de usar cualquier API
  reciente del framework; consultar la documentacion oficial si hay dudas sobre
  compatibilidad con App Router.
- No instalar dependencias nuevas. Framer Motion ya esta disponible en el proyecto.

---

### Resultado esperado

**Archivos que deben crearse o modificarse:**
- `src/components/Services/Services.tsx` — componente refactorizado con el nuevo layout
- `src/components/Services/Services.module.css` — estilos del layout (seccion, caja
  izquierda, item individual)
- `src/components/Services/useScrollHijack.ts` — custom hook con toda la logica de
  intercepcion de scroll y estado del indice activo (nuevo archivo)

**Criterios de aceptacion:**
1. Al hacer scroll hacia abajo sobre la seccion Services, los items se desplazan de abajo
   hacia arriba dentro de la caja, uno por uno, sin que la pagina avance a la seccion
   siguiente (About).
2. Al llegar al tercer item y volver a hacer scroll hacia abajo, la pagina avanza
   normalmente a la siguiente seccion.
3. Al hacer scroll hacia arriba desde el primer item, la pagina retrocede normalmente
   a la seccion anterior (Hero).
4. La transicion entre items es animada con Framer Motion y no presenta saltos bruscos.
5. En mobile, el comportamiento de touch replica la logica de wheel.
6. El codigo no contiene `any`, estilos inline ni clases de Tailwind.
7. Cada bloque no obvio tiene un comentario en espanol explicando que hace.
```

---

## Vista de wireframe de la landing

```markdown
Crear una página de prototipo/wireframe en `src/app/wireframe/page.tsx` que muestre todos los componentes de la landing en orden vertical (Nav, Hero, About, Services, Contact, Footer), con las siguientes características:

- Cada componente ocupa un bloque con dimensiones representativas reales (no placeholders mínimos): Nav con altura de barra de navegación, Hero con altura de pantalla completa, el resto con alturas razonables según su contenido esperado.
- Cada bloque tiene un color de fondo pastel distinto, definido mediante CSS Modules en un archivo `src/app/wireframe/wireframe.module.css`.
- En el centro de cada bloque aparece el nombre del componente (ej: "Hero", "About", etc.) en texto grande.
- La página completa es scrolleable de arriba a abajo, mostrando todos los bloques en orden.
- No reemplazar ni modificar los componentes reales existentes en `src/components/`.
- Usar CSS Modules exclusivamente. Sin Tailwind, sin estilos inline.

Antes de tocar cualquier archivo, explicame qué vas a crear y por qué. Esperá mi confirmación.
```
