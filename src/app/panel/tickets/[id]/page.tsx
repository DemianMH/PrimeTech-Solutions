"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Download, Lock, Mail, Phone, Send } from "lucide-react";
import { Badge, Empty, useQuery, notify } from "@/components/panel/ui";
import { supabaseBrowser } from "@/lib/supabase";
import { PRIORITY, TICKET_STATUS, fdate } from "@/lib/tickets";

type Ticket = {
  id: string; number: number; subject: string; description: string; category: string; status: string; priority: string;
  contact_name: string | null; contact_phone: string | null; contact_email: string | null; source: string;
  created_at: string; updated_at: string; resolved_at: string | null;
  clients: { id: string; name: string; email: string | null; phone: string | null; portal_token: string } | null;
  ticket_messages: { id: string; author: string; body: string; internal: boolean; created_at: string }[];
  ticket_files: { id: string; name: string; path: string; size: number | null }[];
};

export default function TicketDetail({ params }: { params: { id: string } }) {
  const t = useQuery<Ticket>(
    (sb) =>
      sb
        .from("tickets")
        .select("*,clients(id,name,email,phone,portal_token),ticket_messages(id,author,body,internal,created_at),ticket_files(id,name,path,size)")
        .eq("id", params.id)
        .single() as never,
    [params.id]
  );
  const [body, setBody] = useState("");
  const [internal, setInternal] = useState(false);
  const [sendMail, setSendMail] = useState(true);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  if (t.loading && !t.data) return <Empty>Cargando ticket…</Empty>;
  if (!t.data) return <Empty>No se encontró el ticket. {t.error}</Empty>;
  const ticket = t.data;
  const msgs = [...ticket.ticket_messages].sort((a, b) => a.created_at.localeCompare(b.created_at));
  const mailTo = ticket.contact_email || ticket.clients?.email;

  const update = async (patch: Record<string, string>) => {
    const sb = supabaseBrowser();
    const { error } = await sb.from("tickets").update(patch).eq("id", ticket.id);
    if (error) return setFlash(error.message);
    if (patch.status) {
      await sb.from("ticket_messages").insert({ ticket_id: ticket.id, author: "sistema", body: `Estado cambiado a «${TICKET_STATUS[patch.status].label}».` });
      if (mailTo && sendMail) {
        notify({ ticketId: ticket.id, kind: "status" });
        setFlash(`Se avisó a ${mailTo} del nuevo estado.`);
      }
    }
    t.reload();
  };

  const reply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    const sb = supabaseBrowser();
    const { error } = await sb.from("ticket_messages").insert({ ticket_id: ticket.id, author: "primetech", body, internal });
    if (!error && !internal) {
      if (ticket.status === "nuevo") await sb.from("tickets").update({ status: "en_proceso" }).eq("id", ticket.id);
      if (mailTo && sendMail) notify({ ticketId: ticket.id, kind: "reply", message: body });
    }
    setBusy(false);
    if (error) return setFlash(error.message);
    setFlash(internal ? "Nota interna guardada." : mailTo && sendMail ? `Respuesta enviada a ${mailTo}.` : "Respuesta guardada.");
    setBody("");
    t.reload();
  };

  const download = async (path: string) => {
    const { data, error } = await supabaseBrowser().storage.from("adjuntos").createSignedUrl(path, 300);
    if (data) window.open(data.signedUrl, "_blank");
    else setFlash(error?.message || "No se pudo abrir el archivo.");
  };

  return (
    <>
      <Link href="/panel/tickets" className="pa-back">
        <ArrowLeft size={16} /> Tickets
      </Link>
      <header className="pa-head">
        <div>
          <h1>
            <span className="pa-num">#{ticket.number}</span> {ticket.subject}
          </h1>
          <p>
            {ticket.clients?.name} · {ticket.category} · abierto {fdate(ticket.created_at, true)} · vía {ticket.source}
          </p>
        </div>
        <div className="pa-head-actions">
          <Badge {...PRIORITY[ticket.priority]} />
          <Badge {...TICKET_STATUS[ticket.status]} />
        </div>
      </header>
      {flash && <p className="pa-flash" onClick={() => setFlash("")}>{flash}</p>}

      <div className="pa-detail">
        <div>
          <section className="pa-card">
            <h2>Descripción</h2>
            <p className="pa-pre">{ticket.description}</p>
            {!!ticket.ticket_files.length && (
              <div className="pa-files">
                {ticket.ticket_files.map((f) => (
                  <button key={f.id} type="button" onClick={() => download(f.path)}>
                    <Download size={14} /> {f.name}
                    {f.size ? <small>{Math.ceil(f.size / 1024)} KB</small> : null}
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="pa-card">
            <h2>Conversación</h2>
            {!msgs.length && <Empty>Aún no hay respuestas.</Empty>}
            <ol className="pa-thread">
              {msgs.map((m) => (
                <li key={m.id} className={`${m.author} ${m.internal ? "internal" : ""}`}>
                  <header>
                    <strong>{m.author === "cliente" ? ticket.clients?.name : m.author === "sistema" ? "Sistema" : "PrimeTech"}</strong>
                    {m.internal && (
                      <span>
                        <Lock size={12} /> Nota interna
                      </span>
                    )}
                    <time>{fdate(m.created_at, true)}</time>
                  </header>
                  <p className="pa-pre">{m.body}</p>
                </li>
              ))}
            </ol>
            <form className="pa-reply" onSubmit={reply}>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={internal ? "Nota solo para ti (el cliente no la ve)…" : "Escribe la respuesta para el cliente…"} />
              <div>
                <label className="pa-switch">
                  <input type="checkbox" checked={internal} onChange={(e) => setInternal(e.target.checked)} /> Nota interna
                </label>
                <label className="pa-switch">
                  <input type="checkbox" checked={sendMail} onChange={(e) => setSendMail(e.target.checked)} disabled={!mailTo} /> Avisar por correo
                  {!mailTo && <small> (sin correo)</small>}
                </label>
                <button className="pa-btn" disabled={busy || !body.trim()}>
                  <Send size={15} /> {internal ? "Guardar nota" : "Responder"}
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside>
          <section className="pa-card">
            <h2>Estado</h2>
            <div className="pa-status-grid">
              {Object.entries(TICKET_STATUS).map(([k, s]) => (
                <button key={k} type="button" className={ticket.status === k ? "active" : ""} style={{ ["--c" as string]: s.color }} onClick={() => ticket.status !== k && update({ status: k })}>
                  {s.label}
                </button>
              ))}
            </div>
            <h2 style={{ marginTop: "1rem" }}>Prioridad</h2>
            <select value={ticket.priority} onChange={(e) => update({ priority: e.target.value })}>
              {Object.entries(PRIORITY).map(([k, p]) => (
                <option key={k} value={k}>
                  {p.label}
                </option>
              ))}
            </select>
            {ticket.resolved_at && <p className="pa-muted">Resuelto el {fdate(ticket.resolved_at, true)}</p>}
          </section>

          <section className="pa-card">
            <h2>Contacto</h2>
            <dl className="pa-dl">
              <dt>Cliente</dt>
              <dd>
                <Link href={`/panel/clientes/${ticket.clients?.id}`}>{ticket.clients?.name}</Link>
              </dd>
              <dt>Persona</dt>
              <dd>{ticket.contact_name || "—"}</dd>
              <dt>Teléfono</dt>
              <dd>
                {ticket.contact_phone ? (
                  <a href={`https://wa.me/52${ticket.contact_phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noreferrer">
                    <Phone size={13} /> {ticket.contact_phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
              <dt>Correo</dt>
              <dd>
                {mailTo ? (
                  <a href={`mailto:${mailTo}?subject=${encodeURIComponent(`Ticket #${ticket.number}: ${ticket.subject}`)}`}>
                    <Mail size={13} /> {mailTo}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </dl>
            {ticket.clients && (
              <button type="button" className="pa-btn ghost small" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/soporte/${ticket.clients!.portal_token}`)}>
                Copiar link del portal del cliente
              </button>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}
