import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { layout, p, panelUrl, portalUrl, quote, rows, sendMail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Crea un ticket desde el portal del cliente y manda los avisos por correo. */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b.token !== "string") return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });

  const sb = supabaseServer();
  const files = Array.isArray(b.files) ? b.files.slice(0, 10) : [];
  const { data, error } = await sb.rpc("portal_create_ticket", {
    p_token: b.token,
    p_category: str(b.category, 120) || "Otro",
    p_subject: str(b.subject, 200),
    p_description: str(b.description, 8000),
    p_contact_name: str(b.contact_name, 120) || null,
    p_contact_phone: str(b.contact_phone, 40) || null,
    p_contact_email: str(b.contact_email, 160) || null,
    p_priority: str(b.priority, 20) || "normal",
    p_files: files,
  });
  if (error || !data) return NextResponse.json({ error: error?.message || "No se pudo crear el ticket" }, { status: 400 });

  const t = data as { id: string; number: number; client: string; client_email: string | null };
  const subject = str(b.subject, 200);
  const details = rows([
    ["Cliente", t.client],
    ["Categoría", str(b.category, 120)],
    ["Prioridad", str(b.priority, 20)],
    ["Contacto", str(b.contact_name, 120)],
    ["Teléfono", str(b.contact_phone, 40)],
    ["Correo", str(b.contact_email, 160)],
    ["Archivos", files.length ? `${files.length} adjunto(s)` : null],
  ]);

  await Promise.all([
    sendMail(
      process.env.NOTIFY_EMAIL,
      `🎫 Ticket #${t.number} · ${t.client}: ${subject}`,
      layout(`Nuevo ticket #${t.number}`, details + quote(str(b.description, 8000)), { label: "Abrir en el panel", href: panelUrl(`/tickets/${t.id}`) })
    ),
    sendMail(
      str(b.contact_email, 160) || t.client_email,
      `Recibimos tu ticket #${t.number}: ${subject}`,
      layout(
        `Recibimos tu solicitud #${t.number}`,
        p(`Hola, ya registramos tu ticket «${subject}». Te avisaremos por este medio cada vez que cambie de estado.`) + details,
        { label: "Ver mis tickets", href: portalUrl(b.token) }
      )
    ),
  ]);

  return NextResponse.json({ ok: true, number: t.number });
}
