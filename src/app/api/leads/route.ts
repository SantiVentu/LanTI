import type { LeadsApiRequest, LeadsApiResponse } from "@/types/chat";

export async function POST(request: Request) {
  try {
    const body: LeadsApiRequest = await request.json();

    // TODO: integrar Google Sheets en fase siguiente
    console.log("Lead recibido:", body.lead);

    const output: LeadsApiResponse = {
      success: true,
      message: "Lead recibido correctamente",
    };

    return Response.json(output);

  } catch (err) {
    console.error("Error en /api/leads:", err);

    const output: LeadsApiResponse = {
      success: false,
      message: "Error al procesar el lead",
    };

    return Response.json(output, { status: 500 });
  }
}