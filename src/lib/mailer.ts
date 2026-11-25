import nodemailer from "nodemailer";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://primetechsolutionsmx.org";
const REPLY_TO = "contacto@primetechsolutionsmx.org";

let transport: ReturnType<typeof nodemailer.createTransport> | null = null;
function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  if (!transport) {
    transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  }
  return transport;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Plantilla de correo con la marca PrimeTech (tablas e estilos en línea para Gmail/Outlook). */
export function layout(title: string, bodyHtml: string, button?: { label: string; href: string }) {
  return `<!doctype html><html><body style="margin:0;padding:24px 12px;background:#eef3f8;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
<tr><td style="background:#0b1122;padding:18px 24px;">
<span style="color:#ffffff;font-size:18px;font-weight:bold;">Prime<span style="color:#22d3ee;">Tech</span></span>
<span style="color:#7d8aa6;font-size:12px;"> &nbsp;Soporte</span></td></tr>
<tr><td style="padding:24px;">
<h1 style="margin:0 0 14px;font-size:20px;line-height:26px;color:#0f172a;">${esc(title)}</h1>
<div style="font-size:15px;line-height:23px;color:#334155;">${bodyHtml}</div>
${button ? `<p style="margin:22px 0 4px;"><a href="${button.href}" style="display:inline-block;background:#0891b2;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:999px;">${esc(button.label)}</a></p>` : ""}
</td></tr>
<tr><td style="padding:16px 24px;background:#f8fafc;font-size:12px;line-height:18px;color:#64748b;">
PrimeTech Solutions · Guadalajara, Jalisco · WhatsApp 33 3062 0287<br>
Puedes responder a este correo y llegará a nuestro equipo.</td></tr>
</table></body></html>`;
}

export const p = (text: string) => `<p style="margin:0 0 12px;">${esc(text).replace(/\n/g, "<br>")}</p>`;
export const quote = (text: string) =>
  `<div style="margin:0 0 14px;padding:12px 14px;border-left:3px solid #22d3ee;background:#f1f9fc;border-radius:6px;">${esc(text).replace(/\n/g, "<br>")}</div>`;
export const rows = (items: [string, string | null | undefined][]) =>
  `<table role="presentation" style="margin:0 0 14px;font-size:14px;">${items
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:3px 14px 3px 0;color:#64748b;">${esc(k)}</td><td style="padding:3px 0;"><b>${esc(String(v))}</b></td></tr>`)
    .join("")}</table>`;

export const portalUrl = (token: string) => `${SITE}/soporte/${token}`;
export const panelUrl = (path = "") => `${SITE}/panel${path}`;

export async function sendMail(to: string | null | undefined, subject: string, html: string) {
  const t = getTransport();
  if (!t || !to) return { sent: false, reason: !t ? "Falta configurar GMAIL_USER / GMAIL_APP_PASSWORD" : "Sin destinatario" };
  try {
    await t.sendMail({
      from: `"PrimeTech Solutions · Soporte" <${process.env.GMAIL_USER}>`,
      replyTo: REPLY_TO,
      to,
      subject,
      html,
    });
    return { sent: true };
  } catch (e) {
    console.error("sendMail", e);
    return { sent: false, reason: String(e) };
  }
}
