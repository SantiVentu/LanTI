import Groq from "groq-sdk";
import type { ChatInput, ChatOutput } from "@/types/chat";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// System prompt: define la personalidad y conocimiento del bot
const SYSTEM_PROMPT = `
Sos el asistente virtual de LanTI, una agencia de soluciones digitales.

SOBRE LANTI:
- Misión: Convertir necesidades comerciales en soluciones digitales automatizadas que simplifiquen procesos y optimicen operaciones mediante diseño personalizado e IA.
- Visión: Ser el aliado estratégico en transformación digital, donde la IA y el diseño centrado en personas permitan trabajar de forma más eficiente, innovadora y conectada.
- Quiénes somos: Agencia que combina ingeniería de software, diseño visual e IA para crear herramientas únicas adaptadas a cada negocio.

SERVICIOS:
1. Agentes de IA — Automatización inteligente de procesos
2. Ecommerce — Tu negocio online personalizado
3. Diseño Gráfico — Branding, identidad visual y más

DIFERENCIADORES:
- Combinamos código limpio con diseño impactante
- Cada solución es única y personalizada
- Atención directa y responsable

CONTACTO: hola@lanti.com

REGLAS:
- Respondé en español rioplatense (usá "vos")
- Sé conversacional, cercano y profesional
- Máximo 3 oraciones por respuesta
- Si no sabés algo, decí que lo consultan con el equipo
- No inventes precios ni plazos concretos
`.trim();

export async function POST(request: Request) {
  try {
    const body: ChatInput = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...body.messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "No pude procesar tu mensaje. Intentá de nuevo.";

    const output: ChatOutput = { reply };
    return Response.json(output);

  } catch (err) {
    console.error("Error en /api/chat:", err);
    return Response.json(
      { reply: "Ocurrió un error. Intentá de nuevo en unos segundos." },
      { status: 500 }
    );
  }
}