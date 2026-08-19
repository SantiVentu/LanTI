// Mapa de fases del stage About2 → Services, en unidades de timeline.
// 1 unidad = 100vh de scroll: useStageSequence deriva el largo del pin de PHASE.end, así que
// mover un número acá cambia el ritmo Y el largo del scroll de forma consistente.
//
// Como las dos secciones viven en la misma caja de pantalla, las fases pueden solaparse sin
// ningún truco: basta con darles la misma posición. Hoy no se solapan —el título espera a
// que los renglones de About2 terminen de abrirse— pero acercar "title" a "handoff" alcanza
// para pisarlos.
//
// Ojo con blockUp: además de una fase, marca dónde engancha el pin. Moverla cambia cuánto
// recorrido queda ANTES del congelamiento, y con eso el top de .anchorServices en el CSS.
export const PHASE = {
  linesIn: 0, // entran los renglones de About2 por los costados, con el stage todavía subiendo
  blockUp: 0.6, // ACÁ engancha el pin: la ventana se congela y sube el bloque de apoyo
  handoff: 1, // About2 empieza a retirarse por los costados
  title: 1.6, // los renglones ya se abrieron: entra el título de Services
  cards: 2.1, // abanico de cards + vire de color
  end: 2.8, // el sobrante sobre "cards" es lo que dura el abanico: 0.7 = 70vh de rueda
} as const;
