"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Copy, ExternalLink, Mail, Plus, Trash2, Wrench } from "lucide-react";
import { Avatar, Badge, Empty, FormModal, Stat, notify, remove, save, useQuery } from "@/components/panel/ui";
import { clientFields, projectFields, subscriptionFields } from "@/components/panel/forms";
import { supabaseBrowser } from "@/lib/supabase";
import { PERIODS, PRIORITY, STAGES, SUPPORT_CATEGORIES, TICKET_STATUS, fdate, money, subsSummary, today } from "@/lib/tickets";

type Client = Record<string, unknown> & {
  id: string; name: string; email: string | null; phone: string | null; contact_name: string | null; industry: string | null;
  status: string; support_enabled: boolean; portal_token: string; color: string; notes: string | null; logo_url: string | null;
  client_services: { id: string; name: string; active: boolean }[];
  tickets: { id: string; number: number; subject: string; status: string; priority: string; created_at: string }[];
  projects: (Record<string, unknown> & { id: string; name: string; stage: string; amount: number; due_date: string | null })[];
  subscriptions: (Record<string, unknown> & { id: string; name: string; amount: number; currency: string; period: string; next_charge: string | null; status: string })[];
  transactions: { id: string; date: string; kind: string; amount: number; concept: string; paid: boolean }[];
};

export default function ClientDetail({ params }: { params: { id: string } }) {
  const c = useQuery<Client>(
    (sb) =>
      sb
        .from("clients")
        .select("*,client_services(id,name,active),tickets(id,number,subject,status,priority,created_at),projects(*),subscriptions(*),transactions(id,date,kind,amount,concept,paid)")
        .eq("id", params.id)
        .single() as never,
    [params.id]
  );
  const [tab, setTab] = useState("tickets");
  const [modal, setModal] = useState<null | { kind: "client" | "project" | "sub"; row?: Record<string, unknown> }>(null);
  const [service, setService] = useState("");
  const [flash, setFlash] = useState("");

  if (c.loading && !c.data) return <Empty>Cargando cliente…</Empty>;
  if (!c.data) return <Empty>No se encontró el cliente. {c.error}</Empty>;
  const client = c.data;
  const link = typeof window !== "undefined" ? `${window.location.origin}/soporte/${client.portal_token}` : "";
  const open = client.tickets.filter((t) => !["resuelto", "cerrado"].includes(t.status));
  const pays = subsSummary(client.subscriptions);
  const nextCharge = client.subscriptions.filter((s) => s.status === "activa" && s.next_charge).map((s) => s.next_charge as string).sort()[0];
  const year = today().slice(0, 4);
  const billedYear = client.transactions.filter((t) => t.kind === "ingreso" && t.paid && t.date.startsWith(year)).reduce((a, t) => a + Number(t.amount), 0);
  const owed = client.transactions.filter((t) => t.kind === "ingreso" && !t.paid).reduce((a, t) => a + Number(t.amount), 0);
  const clientOpt = [{ value: client.id, label: client.name }];

  const toggleSupport = async () => {
    await save("clients", { support_enabled: !client.support_enabled }, client.id);
    c.reload();
  };
  const uploadLogo = async (file?: File) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return setFlash("El logo debe pesar menos de 2 MB.");
    const sb = supabaseBrowser();
    const ext = (file.name.split(".").pop() || "png").toLowerCase();
    const path = `${client.id}-${Date.now()}.${ext}`;
    const { error } = await sb.storage.from("logos").upload(path, file, { contentType: file.type, upsert: true });
    if (error) return setFlash(error.message);
    const url = sb.storage.from("logos").getPublicUrl(path).data.publicUrl;
    await save("clients", { logo_url: url }, client.id);
    setFlash("Logo actualizado.");
    c.reload();
  };
  const addService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service.trim()) return;
    await save("client_services", { client_id: client.id, name: service.trim() });
    setService("");
    c.reload();
  };

  return (
    <>
      <Link href="/panel/clientes" className="pa-back">
        <ArrowLeft size={16} /> Clientes
      </Link>
      <header className="pa-head">
        <div className="pa-head-client">
          <label className="pa-logo-edit" title="Cambiar logo">
            <Avatar name={client.name} color={client.color} logo={client.logo_url} big />
            <span>{client.logo_url ? "Cambiar" : "Subir logo"}</span>
            <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" hidden onChange={(e) => uploadLogo(e.target.files?.[0])} />
          </label>
          <div>
            <h1>{client.name}</h1>
            <p>{[client.industry, client.contact_name, client.phone, client.email].filter(Boolean).join(" · ") || "Sin datos de contacto"}</p>
          </div>
        </div>
        <div className="pa-head-actions">
          <button className="pa-btn ghost" onClick={() => setModal({ kind: "client", row: client })}>
            Editar
          </button>
          <Link className="pa-btn" href={`/panel/tickets?nuevo=1`}>
            Nuevo ticket
          </Link>
        </div>
      </header>
      {flash && <p className="pa-flash" onClick={() => setFlash("")}>{flash}</p>}

      <section className="pa-card pa-portal">
        <div>
          <h2>Link de soporte del cliente</h2>
          <p>Compártelo para que levanten tickets, adjunten archivos y vean sus pendientes y resueltos.</p>
          <code>{link}</code>
        </div>
        <div className="pa-portal-actions">
          <button className="pa-btn ghost small" onClick={() => { navigator.clipboard.writeText(link); setFlash("Link copiado."); }}>
            <Copy size={14} /> Copiar
          </button>
          <a className="pa-btn ghost small" href={link} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Abrir
          </a>
          {client.phone && (
            <a className="pa-btn ghost small" target="_blank" rel="noreferrer" href={`https://wa.me/52${client.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(`Hola, este es tu portal de soporte con PrimeTech. Ahí puedes levantar tickets y ver su avance: ${link}`)}`}>
              WhatsApp
            </a>
          )}
          {client.email && (
            <button className="pa-btn ghost small" onClick={() => { notify({ clientId: client.id, kind: "portal" }); setFlash(`Se envió el link a ${client.email}.`); }}>
              <Mail size={14} /> Enviar por correo
            </button>
          )}
        </div>
      </section>

      <div className="pa-stats">
        <Stat label="Tickets abiertos" value={open.length} hint={`${client.tickets.length} en total`} accent="#38bdf8" />
        <Stat label="Lo que paga" value={pays[0] || "—"} hint={[...pays.slice(1), nextCharge ? `próximo cobro ${fdate(nextCharge)}` : ""].filter(Boolean).join(" · ") || "Sin suscripción activa"} accent="#c084fc" />
        <Stat label={`Cobrado en ${year}`} value={money(billedYear)} hint={owed ? `${money(owed)} por cobrar` : "Sin adeudos"} accent="#4ade80" />
        <Stat label="Proyectos" value={client.projects.length} accent="#facc15" />
      </div>

      <section className="pa-card">
        <header>
          <h2>Qué tiene contigo (categorías de sus tickets)</h2>
        </header>
        <div className="pa-services">
          {client.client_services.map((s) => (
            <span key={s.id} className={`pa-chip ${s.active ? "" : "off"}`}>
              <button type="button" title={s.active ? "Desactivar" : "Activar"} onClick={async () => { await save("client_services", { active: !s.active }, s.id); c.reload(); }}>
                {s.name}
              </button>
              <button type="button" aria-label="Quitar" onClick={async () => { if (confirm(`¿Quitar «${s.name}»?`)) { await remove("client_services", s.id); c.reload(); } }}>
                <Trash2 size={12} />
              </button>
            </span>
          ))}
          <form onSubmit={addService} className="pa-inline">
            <input value={service} onChange={(e) => setService(e.target.value)} placeholder="Ej. Sitio web, Chatbot, ERP, CCTV…" />
            <button className="pa-btn small">
              <Plus size={14} /> Agregar
            </button>
          </form>
        </div>
        <label className="pa-toggle">
          <input type="checkbox" checked={client.support_enabled} onChange={toggleSupport} />
          <span className="pa-toggle-ui" />
          <span>
            <strong>
              <Wrench size={14} /> Soporte técnico, reparaciones y compra de equipos
            </strong>
            <small>{SUPPORT_CATEGORIES.join(" · ")}</small>
          </span>
        </label>
      </section>

      <div className="pa-tabs">
        {[
          ["tickets", `Tickets (${client.tickets.length})`],
          ["proyectos", `Proyectos (${client.projects.length})`],
          ["suscripciones", `Suscripciones (${client.subscriptions.length})`],
          ["movimientos", `Movimientos (${client.transactions.length})`],
        ].map(([k, l]) => (
          <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>
            {l}
          </button>
        ))}
      </div>

      <section className="pa-card flush">
        {tab === "tickets" &&
          (client.tickets.length ? (
            <ul className="pa-list padded">
              {[...client.tickets].sort((a, b) => b.created_at.localeCompare(a.created_at)).map((t) => (
                <li key={t.id}>
                  <Link href={`/panel/tickets/${t.id}`}>
                    <span className="pa-num">#{t.number}</span>
                    <span className="pa-grow">
                      <strong>{t.subject}</strong>
                      <small>{fdate(t.created_at, true)}</small>
                    </span>
                    <Badge {...PRIORITY[t.priority]} />
                    <Badge {...TICKET_STATUS[t.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Sin tickets todavía.</Empty>
          ))}
        {tab === "proyectos" && (
          <>
            <div className="pa-card-actions">
              <button className="pa-btn small" onClick={() => setModal({ kind: "project", row: { client_id: client.id, stage: "diagnostico", start_date: today() } })}>
                <Plus size={14} /> Proyecto
              </button>
            </div>
            {client.projects.length ? (
              <ul className="pa-list padded">
                {client.projects.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => setModal({ kind: "project", row: p })}>
                      <span className="pa-grow">
                        <strong>{p.name}</strong>
                        <small>Entrega {fdate(p.due_date)}</small>
                      </span>
                      <strong>{money(p.amount)}</strong>
                      <Badge {...STAGES[p.stage]} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>Sin proyectos.</Empty>
            )}
          </>
        )}
        {tab === "suscripciones" && (
          <>
            <div className="pa-card-actions">
              <button className="pa-btn small" onClick={() => setModal({ kind: "sub", row: { client_id: client.id, currency: "MXN", period: "mensual", status: "activa", start_date: today(), next_charge: today() } })}>
                <Plus size={14} /> Suscripción
              </button>
            </div>
            {client.subscriptions.length ? (
              <ul className="pa-list padded">
                {client.subscriptions.map((s) => (
                  <li key={s.id}>
                    <button type="button" onClick={() => setModal({ kind: "sub", row: s })}>
                      <span className="pa-grow">
                        <strong>{s.name}</strong>
                        <small>
                          {PERIODS[s.period]?.label} · próximo cobro {fdate(s.next_charge)}
                        </small>
                      </span>
                      <strong>{money(s.amount, s.currency)}</strong>
                      <Badge label={s.status} color={s.status === "activa" ? "#4ade80" : "#94a3b8"} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty>Sin suscripciones.</Empty>
            )}
          </>
        )}
        {tab === "movimientos" &&
          (client.transactions.length ? (
            <table className="pa-table">
              <tbody>
                {[...client.transactions].sort((a, b) => b.date.localeCompare(a.date)).map((t) => (
                  <tr key={t.id}>
                    <td className="pa-muted">{fdate(t.date)}</td>
                    <td>{t.concept}</td>
                    <td>{!t.paid && <Badge label={t.kind === "ingreso" ? "Por cobrar" : "Por pagar"} color="#facc15" />}</td>
                    <td className={t.kind === "ingreso" ? "pa-pos" : "pa-neg"}>{(t.kind === "gasto" ? "−" : "") + money(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty>Sin movimientos. Regístralos en Contabilidad.</Empty>
          ))}
      </section>

      {client.notes && (
        <section className="pa-card">
          <h2>Notas</h2>
          <p className="pa-pre">{client.notes}</p>
        </section>
      )}

      {modal?.kind === "client" && (
        <FormModal
          title="Editar cliente"
          fields={clientFields}
          initial={modal.row}
          onClose={() => setModal(null)}
          onSave={async (v) => { const e = await save("clients", v, client.id); c.reload(); return e; }}
          onDelete={async () => { const e = await remove("clients", client.id); if (!e) window.location.href = "/panel/clientes"; return e; }}
        />
      )}
      {modal?.kind === "project" && (
        <FormModal
          title={modal.row?.id ? "Editar proyecto" : "Nuevo proyecto"}
          fields={projectFields(clientOpt)}
          initial={modal.row}
          onClose={() => setModal(null)}
          onSave={async (v) => { const e = await save("projects", v, modal.row?.id as string | undefined); c.reload(); return e; }}
          onDelete={modal.row?.id ? async () => { const e = await remove("projects", modal.row!.id as string); c.reload(); return e; } : undefined}
        />
      )}
      {modal?.kind === "sub" && (
        <FormModal
          title={modal.row?.id ? "Editar suscripción" : "Nueva suscripción"}
          fields={subscriptionFields(clientOpt)}
          initial={modal.row}
          onClose={() => setModal(null)}
          onSave={async (v) => { const e = await save("subscriptions", v, modal.row?.id as string | undefined); c.reload(); return e; }}
          onDelete={modal.row?.id ? async () => { const e = await remove("subscriptions", modal.row!.id as string); c.reload(); return e; } : undefined}
        />
      )}
    </>
  );
}
