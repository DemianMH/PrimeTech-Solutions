import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { layout, panelUrl, quote, sendMail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/** El cliente responde a un ticket desde su portal. */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const body = typeof b?.body === "string" ? b.body.trim().slice(0, 4000) : "";
  if (!b?.token || !b?.ticketId || !body) return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
  const { data, error } = await supabaseServer().rpc("portal_reply", { p_token: b.token, p_ticket: b.ticketId, p_body: body });
  if (error || !data) return NextResponse.json({ error: error?.message || "No se pudo enviar" }, { status: 400 });
  await sendMail(
    process.env.NOTIFY_EMAIL,
    `💬 Respuesta del cliente en el ticket #${b.number || ""}`,
    layout(`El cliente respondió el ticket #${b.number || ""}`, quote(body), { label: "Abrir en el panel", href: panelUrl(`/tickets/${b.ticketId}`) })
  );
  return NextResponse.json({ ok: true });
}
