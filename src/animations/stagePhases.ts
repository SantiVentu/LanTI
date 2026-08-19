// Mapa de fases del stage About2 → Services, en unidades de timeline.
// 1 unidad = 100vh de scroll: useStageSequence deriva el largo del pin de PHASE.end, así que
// mover un número acá cambia el ritmo Y el largo del scroll de forma consistente.
//
// Como las dos secciones viven en la misma caja de pantalla, las fases pueden solaparse sin
// ningún truco: basta con darles la misma posición. "reveal" y "aboutOut" se pisan a
// propósito — el título y las cards de Services entran mientras About2 todavía se está
// retirando.
//
// Ojo con blockUp: además de una fase, marca dónde engancha el pin. Moverla cambia cuánto
// recorrido queda ANTES del congelamiento, y con eso el top de .anchorServices en el CSS.
export const PHASE = {
  linesIn: 0, // entran los renglones de About2 por los costados, con el stage todavía subiendo
  blockUp: 0.6, // ACÁ engancha el pin: la ventana se congela y sube el bloque de apoyo
  handoff: 1, // About2 arranca su salida lateral
  reveal: 1.45, // entran a la vez el título de Services y las cards
  aboutOut: 1.6, // About2 termina de abrirse; desde acá vira el color de fondo
  end: 2.15, // el sobrante sobre "reveal" es lo que dura el abanico: 0.7 = 70vh de rueda
} as const;
