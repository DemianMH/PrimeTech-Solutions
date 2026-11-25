import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { layout, p, portalUrl, quote, rows, sendMail } from "@/lib/mailer";
import { TICKET_STATUS } from "@/lib/tickets";

export const dynamic = "force-dynamic";

/** Avisos que manda el panel: cambio de estado, respuesta al cliente o envío del link del portal. */
export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Sin sesión" }, { status: 401 });
  const sb = supabaseServer(token);
  const { data: admin } = await sb.rpc("is_admin");
  if (!admin) return NextResponse.json({ error: "Sin permiso" }, { status: 403 });

  const b = await req.json().catch(() => ({}));

  if (b.kind === "portal" && b.clientId) {
    const { data: c } = await sb.from("clients").select("name,email,portal_token,support_enabled").eq("id", b.clientId).single();
    if (!c) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    const r = await sendMail(
      c.email,
      `Tu portal de soporte con PrimeTech`,
      layout(
        `Hola, ${c.name}`,
        p("Desde este enlace puedes levantar tickets de soporte, adjuntar fotos, PDF o Excel, y ver el avance de tus solicitudes pendientes y resueltas.") +
          p("Guárdalo en tus favoritos y compártelo solo con tu equipo."),
        { label: "Abrir mi portal de soporte", href: portalUrl(c.portal_token) }
      )
    );
    return NextResponse.json(r);
  }

  if (!b.ticketId) return NextResponse.json({ error: "Falta el ticket" }, { status: 400 });
  const { data: t } = await sb
    .from("tickets")
    .select("number,subject,status,contact_email,clients(name,email,portal_token)")
    .eq("id", b.ticketId)
    .single();
  if (!t) return NextResponse.json({ error: "Ticket no encontrado" }, { status: 404 });
  const client = t.clients as unknown as { name: string; email: string | null; portal_token: string };
  const to = t.contact_email || client?.email;
  const status = TICKET_STATUS[t.status]?.label || t.status;

  const html =
    b.kind === "reply"
      ? layout(`Respuesta a tu ticket #${t.number}`, p(`Tenemos una actualización sobre «${t.subject}»:`) + quote(String(b.message || "")), {
          label: "Ver mi ticket",
          href: portalUrl(client.portal_token),
        })
      : layout(
          `Tu ticket #${t.number} está: ${status}`,
          p(
            t.status === "resuelto"
              ? `Marcamos como resuelto tu ticket «${t.subject}». Si algo sigue fallando, respóndelo desde tu portal y lo reabrimos.`
              : t.status === "en_espera"
              ? `Para avanzar con «${t.subject}» necesitamos información o una confirmación de tu parte. Revisa el ticket en tu portal.`
              : `Actualizamos el estado de tu ticket «${t.subject}».`
          ) + rows([["Ticket", `#${t.number}`], ["Estado", status]]),
          { label: "Ver mis tickets", href: portalUrl(client.portal_token) }
        );
  const r = await sendMail(to, b.kind === "reply" ? `Re: Ticket #${t.number} · ${t.subject}` : `Ticket #${t.number}: ${status}`, html);
  return NextResponse.json(r);
}
