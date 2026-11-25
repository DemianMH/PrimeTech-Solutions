"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github, LayoutGrid, List, Plus } from "lucide-react";
import { Avatar, Badge, Empty, FormModal, Modal, PageHead, Stat, remove, save, useQuery } from "@/components/panel/ui";
import { projectFields, txFields } from "@/components/panel/forms";
import { supabaseBrowser } from "@/lib/supabase";
import { STAGES, fdate, money, today } from "@/lib/tickets";

type P = Record<string, unknown> & {
  id: string; name: string; type: string | null; stage: string; amount: number; start_date: string | null; due_date: string | null;
  site_url: string | null; repo_url: string | null; description: string | null; client_id: string | null;
  clients: { name: string; color: string; logo_url: string | null } | null;
  project_notes: { id: string; body: string; created_at: string }[];
  transactions: { id: string; date: string; kind: string; amount: number; paid: boolean; concept: string }[];
};

/** Tu forma de trabajar, en orden. */
const FLOW = ["prospecto", "diagnostico", "propuesta", "construccion", "entrega", "soporte"];
const ACTIVE = ["prospecto", "diagnostico", "propuesta", "construccion", "entrega"];

const paidOf = (p: P) => p.transactions.filter((t) => t.kind === "ingreso" && t.paid).reduce((a, t) => a + Number(t.amount), 0);

function daysLeft(d: string | null) {
  if (!d) return null;
  return Math.round((new Date(d + "T12:00:00").getTime() - new Date(today() + "T12:00:00").getTime()) / 864e5);
}

function DueLabel({ p }: { p: P }) {
  if (p.stage === "soporte") return <span className="pj2-due ok">Entregado</span>;
  const n = daysLeft(p.due_date);
  if (n === null) return <span className="pj2-due">Sin fecha</span>;
  if (n < 0) return <span className="pj2-due late">Atrasado {-n} {-n === 1 ? "día" : "días"}</span>;
  if (n === 0) return <span className="pj2-due soon">Entrega hoy</span>;
  return <span className={`pj2-due ${n <= 3 ? "soon" : ""}`}>Entrega en {n} {n === 1 ? "día" : "días"}</span>;
}

function Progress({ stage }: { stage: string }) {
  const i = FLOW.indexOf(stage);
  return (
    <div className="pj2-steps" title={STAGES[stage]?.label}>
      {FLOW.map((s, k) => (
        <i key={s} className={i >= 0 && k <= i ? "on" : ""} style={{ ["--c" as string]: STAGES[stage]?.color }} />
      ))}
    </div>
  );
}

function PaidBar({ p }: { p: P }) {
  const paid = paidOf(p);
  const total = Number(p.amount || 0);
  const pct = total ? Math.min(100, (paid / total) * 100) : 0;
  return (
    <div className="pj2-paid">
      <div>
        <strong>{money(total)}</strong>
        <small>{total ? `${money(paid)} cobrado` : "Sin monto"}</small>
      </div>
      {total > 0 && (
        <span className="pj2-bar">
          <i style={{ width: `${pct}%` }} />
        </span>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const projects = useQuery<P[]>((sb) =>
    sb
      .from("projects")
      .select("*,clients(name,color,logo_url),project_notes(id,body,created_at),transactions(id,date,kind,amount,paid,concept)")
      .order("due_date", { nullsFirst: false }) as never
  );
  const clients = useQuery<{ id: string; name: string }[]>((sb) => sb.from("clients").select("id,name").order("name") as never);
  const [view, setView] = useState<"tablero" | "lista">("tablero");
  const [edit, setEdit] = useState<Record<string, unknown> | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [payFor, setPayFor] = useState<P | null>(null);
  const [note, setNote] = useState("");
  const [showClosed, setShowClosed] = useState(false);

  const all = projects.data || [];
  const open = all.find((p) => p.id === openId) || null;
  const opts = (clients.data || []).map((c) => ({ value: c.id, label: c.name }));
  const stages = showClosed ? [...FLOW, "pausado", "cancelado"] : FLOW;
  const visible = all.filter((p) => stages.includes(p.stage));

  const stats = useMemo(() => {
    const live = all.filter((p) => ACTIVE.includes(p.stage));
    const value = live.reduce((a, p) => a + Number(p.amount || 0), 0);
    const paid = live.reduce((a, p) => a + paidOf(p), 0);
    const next = live.filter((p) => p.due_date).sort((a, b) => a.due_date!.localeCompare(b.due_date!))[0];
    return { count: live.length, value, paid, next };
  }, [all]);

  const setStage = async (p: P, stage: string) => {
    if (p.stage === stage) return;
    await save("projects", { stage }, p.id);
    await supabaseBrowser().from("project_notes").insert({ project_id: p.id, body: `Pasó a «${STAGES[stage].label}».` });
    projects.reload();
  };
  const move = (p: P, dir: number) => {
    const next = FLOW[FLOW.indexOf(p.stage) + dir];
    if (next) setStage(p, next);
  };

  const card = (p: P) => (
    <article key={p.id} className="pj2-card" style={{ ["--c" as string]: p.clients?.color || "#22d3ee" }} onClick={() => setOpenId(p.id)}>
      <header>
        <Avatar name={p.clients?.name || "?"} color={p.clients?.color} logo={p.clients?.logo_url} />
        <span>{p.clients?.name || "Sin cliente"}</span>
      </header>
      <strong className="pj2-title">{p.name}</strong>
      {p.type && <span className="pj2-type">{p.type}</span>}
      <Progress stage={p.stage} />
      <PaidBar p={p} />
      <footer>
        <DueLabel p={p} />
        {FLOW.includes(p.stage) && (
          <span className="pj2-move" onClick={(e) => e.stopPropagation()}>
            <button disabled={FLOW.indexOf(p.stage) === 0} onClick={() => move(p, -1)} aria-label="Etapa anterior">
              <ChevronLeft size={15} />
            </button>
            <button disabled={FLOW.indexOf(p.stage) === FLOW.length - 1} onClick={() => move(p, 1)} aria-label="Siguiente etapa">
              <ChevronRight size={15} />
            </button>
          </span>
        )}
      </footer>
    </article>
  );

  return (
    <>
      <PageHead
        title="Proyectos"
        sub="Diagnóstico → Propuesta → Construcción → Entrega → Soporte"
        actions={
          <>
            <div className="pj2-toggle">
              <button className={view === "tablero" ? "active" : ""} onClick={() => setView("tablero")}>
                <LayoutGrid size={15} /> Tablero
              </button>
              <button className={view === "lista" ? "active" : ""} onClick={() => setView("lista")}>
                <List size={15} /> Lista
              </button>
            </div>
            <button className="pa-btn" onClick={() => setEdit({ stage: "diagnostico", start_date: today() })}>
              <Plus size={16} /> Nuevo proyecto
            </button>
          </>
        }
      />

      <div className="pa-stats">
        <Stat label="Proyectos en curso" value={stats.count} accent="#facc15" />
        <Stat label="Valor en curso" value={money(stats.value)} hint="Sin IVA" accent="#38bdf8" />
        <Stat label="Cobrado" value={money(stats.paid)} hint={`Falta cobrar ${money(stats.value - stats.paid)}`} accent="#4ade80" />
        <Stat label="Próxima entrega" value={stats.next ? fdate(stats.next.due_date) : "—"} hint={stats.next?.name} accent="#fb923c" />
      </div>

      <label className="pa-switch pj2-closed">
        <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} /> Ver pausados y cancelados
      </label>

      {projects.loading ? (
        <Empty>Cargando…</Empty>
      ) : !all.length ? (
        <section className="pa-card">
          <Empty>Aún no hay proyectos. Crea el primero con «Nuevo proyecto».</Empty>
        </section>
      ) : view === "tablero" ? (
        <div className="pj2-board" style={{ ["--cols" as string]: stages.length }}>
          {stages.map((s) => {
            const list = visible.filter((p) => p.stage === s);
            const sum = list.reduce((a, p) => a + Number(p.amount || 0), 0);
            return (
              <section key={s} className={`pj2-col ${list.length ? "" : "empty"}`} style={{ ["--c" as string]: STAGES[s].color }}>
                <header>
                  <span>
                    <i /> {STAGES[s].label}
                  </span>
                  <b>{list.length}</b>
                </header>
                {sum > 0 && <small className="pj2-sum">{money(sum)}</small>}
                {list.length ? list.map(card) : <p className="pj2-none">Sin proyectos</p>}
              </section>
            );
          })}
        </div>
      ) : (
        <section className="pa-card flush">
          <table className="pa-table pj2-table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Etapa</th>
                <th>Entrega</th>
                <th style={{ textAlign: "right" }}>Monto</th>
                <th style={{ textAlign: "right" }}>Cobrado</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} onClick={() => setOpenId(p.id)}>
                  <td>
                    <span className="pj2-cell">
                      <Avatar name={p.clients?.name || "?"} color={p.clients?.color} logo={p.clients?.logo_url} />
                      <span>
                        <strong>{p.name}</strong>
                        <small>
                          {p.clients?.name || "Sin cliente"}
                          {p.type ? ` · ${p.type}` : ""}
                        </small>
                      </span>
                    </span>
                  </td>
                  <td>
                    <Badge {...STAGES[p.stage]} />
                    <Progress stage={p.stage} />
                  </td>
                  <td>
                    <DueLabel p={p} />
                    <small className="pa-muted" style={{ display: "block" }}>{fdate(p.due_date)}</small>
                  </td>
                  <td style={{ textAlign: "right" }}>{money(p.amount)}</td>
                  <td style={{ textAlign: "right" }} className="pa-pos">
                    {money(paidOf(p))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {open && (
        <Modal title={open.name} onClose={() => setOpenId(null)} wide>
          <div className="pa-proj-detail">
            <div className="pj2-head">
              <Avatar name={open.clients?.name || "?"} color={open.clients?.color} logo={open.clients?.logo_url} big />
              <div>
                <strong>{open.clients?.name || "Sin cliente"}</strong>
                <small>
                  {open.type || "Proyecto"} · {fdate(open.start_date)} → {fdate(open.due_date)}
                </small>
                <DueLabel p={open} />
              </div>
            </div>

            <div className="pj2-stepper">
              {FLOW.map((s, k) => (
                <button key={s} className={`${open.stage === s ? "current" : ""} ${FLOW.indexOf(open.stage) >= k ? "done" : ""}`} style={{ ["--c" as string]: STAGES[s].color }} onClick={() => setStage(open, s)}>
                  <i>{k + 1}</i>
                  {STAGES[s].label}
                </button>
              ))}
            </div>

            <div className="pj2-money">
              <PaidBar p={open} />
              <button className="pa-btn small" onClick={() => setPayFor(open)}>
                <Plus size={14} /> Registrar pago
              </button>
            </div>
            {!!open.transactions.length && (
              <ul className="pj2-payments">
                {[...open.transactions].sort((a, b) => b.date.localeCompare(a.date)).map((t) => (
                  <li key={t.id}>
                    <span>{fdate(t.date)}</span>
                    <span>{t.concept}</span>
                    <strong className={t.kind === "ingreso" ? "pa-pos" : "pa-neg"}>{(t.kind === "gasto" ? "−" : "") + money(t.amount)}</strong>
                    {!t.paid && <Badge label="Pendiente" color="#facc15" />}
                  </li>
                ))}
              </ul>
            )}

            {(open.site_url || open.repo_url) && (
              <div className="pa-links">
                {open.site_url && (
                  <a href={open.site_url} target="_blank" rel="noreferrer">
                    <ExternalLink size={13} /> Sitio / demo
                  </a>
                )}
                {open.repo_url && (
                  <a href={open.repo_url} target="_blank" rel="noreferrer">
                    <Github size={13} /> Repositorio
                  </a>
                )}
              </div>
            )}
            {open.description && <p className="pa-pre">{open.description}</p>}

            <h2>Bitácora</h2>
            <form
              className="pa-inline"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!note.trim()) return;
                await supabaseBrowser().from("project_notes").insert({ project_id: open.id, body: note.trim() });
                setNote("");
                projects.reload();
              }}
            >
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Avance, acuerdo con el cliente, pendiente…" />
              <button className="pa-btn small">Anotar</button>
            </form>
            <ol className="pa-timeline">
              {[...open.project_notes].sort((a, b) => b.created_at.localeCompare(a.created_at)).map((n) => (
                <li key={n.id}>
                  <time>{fdate(n.created_at, true)}</time>
                  <p className="pa-pre">{n.body}</p>
                </li>
              ))}
            </ol>
            <footer className="pa-modal-foot">
              <button className="pa-btn ghost" onClick={() => { setEdit(open); setOpenId(null); }}>
                Editar proyecto
              </button>
            </footer>
          </div>
        </Modal>
      )}

      {payFor && (
        <FormModal
          title={`Pago de «${payFor.name}»`}
          fields={txFields("ingreso", opts, all.map((p) => ({ value: p.id, label: p.name })))}
          initial={{ date: today(), paid: true, category: "Proyecto", method: "Transferencia", client_id: payFor.client_id, project_id: payFor.id, concept: `Anticipo · ${payFor.name}` }}
          onClose={() => setPayFor(null)}
          onSave={async (v) => {
            const e = await save("transactions", { ...v, kind: "ingreso", paid: Boolean(v.paid) });
            projects.reload();
            return e;
          }}
        />
      )}

      {edit && (
        <FormModal
          title={edit.id ? "Editar proyecto" : "Nuevo proyecto"}
          fields={projectFields(opts)}
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={async (v) => { const e = await save("projects", v, edit.id as string | undefined); projects.reload(); return e; }}
          onDelete={edit.id ? async () => { const e = await remove("projects", edit.id as string); projects.reload(); return e; } : undefined}
        />
      )}
    </>
  );
}
