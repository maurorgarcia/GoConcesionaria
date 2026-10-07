import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // TODO: conectar con tu CRM o enviar un email de aviso. Ejemplos:
  //   - POST a la API/webhook de tu CRM con { email, source: "landing" }
  //   - Enviar con Resend / Postmark / SMTP a ventas@tu-dominio
  // Por ahora solo se registra en el log del servidor.
  console.log("[lead] nueva solicitud de demo:", email);

  return NextResponse.json({ ok: true });
}
