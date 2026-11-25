"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Empty, FormModal, Modal, PageHead, remove, save, useQuery } from "@/components/panel/ui";
import { projectFields } from "@/components/panel/forms";
import { supabaseBrowser } from "@/lib/supabase";
import { STAGES, fdate, money, today } from "@/lib/tickets";

type P = Record<string, unknown> & {
  id: string; name: string; type: string | null; stage: string; amount: number; start_date: string | null; due_date: string | null;
  site_url: string | null; repo_url: string | null; description: string | null; client_id: string | null;
  clients: { name: string; color: string } | null; project_notes: { id: string; body: string; created_at: string }[];
};

const BOARD = ["prospecto", "diagnostico", "propuesta", "construccion", "entrega", "soporte"];

export default function ProjectsPage() {
  const projects = useQuery<P[]>((sb) => sb.from("projects").select("*,clients(name,color),project_notes(id,body,created_at)").order("due_date", { nullsFirst: false }) as never);
  const clients = useQuery<{ id: string; name: string }[]>((sb) => sb.from("clients").select("id,name").order("name") as never);
  const [edit, setEdit] = useState<Record<string, unknown> | null>(null);
  const [open, setOpen] = useState<P | null>(null);
  const [note, setNote] = useState("");
  const [showClosed, setShowClosed] = useState(false);
  const opts = (clients.data || []).map((c) => ({ value: c.id, label: c.name }));
  const stages = showClosed ? [...BOARD, "pausado", "cancelado"] : BOARD;
  const totalOpen = (projects.data || []).filter((p) => !["soporte", "cancelado", "pausado"].includes(p.stage)).reduce((a, p) => a + Number(p.amount || 0), 0);

  const move = async (p: P, dir: number) => {
    const i = BOARD.indexOf(p.stage);
    const next = BOARD[i + dir];
    if (!next) return;
    await save("projects", { stage: next }, p.id);
    await supabaseBrowser().from("project_notes").insert({ project_id: p.id, body: `Pasó a «${STAGES[next].label}».` });
    projects.reload();
  };

  return (
    <>
      <PageHead
        title="Proyectos"
        sub={`Tu forma de trabajar: diagnóstico → propuesta → construcción → entrega → soporte. ${money(totalOpen)} en proyectos en curso.`}
        actions={
          <>
            <label className="pa-switch">
              <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} /> Ver pausados y cancelados
            </label>
            <button className="pa-btn" onClick={() => setEdit({ stage: "diagnostico", start_date: today() })}>
              Nuevo proyecto
            </button>
          </>
        }
      />
      {projects.loading ? (
        <Empty>Cargando…</Empty>
      ) : (
        <div className="pa-board">
          {stages.map((s) => {
            const list = (projects.data || []).filter((p) => p.stage === s);
            return (
              <section key={s} className="pa-col" style={{ ["--c" as string]: STAGES[s].color }}>
                <header>
                  <strong>{STAGES[s].label}</strong>
                  <span>{list.length}</span>
                </header>
                {list.map((p) => (
                  <article key={p.id} className="pa-proj" onClick={() => setOpen(p)}>
                    <strong>{p.name}</strong>
                    <small>
                      <span className="pa-dot" style={{ background: p.clients?.color || "#22d3ee" }} />
                      {p.clients?.name || "Sin cliente"}
                    </small>
                    <footer>
                      <span>{money(p.amount)}</span>
                      <span className={p.due_date && p.due_date < today() && s !== "soporte" ? "pa-late" : ""}>{p.due_date ? fdate(p.due_date) : ""}</span>
                    </footer>
                    {BOARD.includes(s) && (
                      <div className="pa-move" onClick={(e) => e.stopPropagation()}>
                        {BOARD.indexOf(s) > 0 && <button onClick={() => move(p, -1)}>←</button>}
                        {BOARD.indexOf(s) < BOARD.length - 1 && <button onClick={() => move(p, 1)}>→</button>}
                      </div>
                    )}
                  </article>
                ))}
              </section>
            );
          })}
        </div>
      )}

      {open && (
        <Modal title={open.name} onClose={() => setOpen(null)} wide>
          <div className="pa-proj-detail">
            <dl className="pa-dl">
              <dt>Cliente</dt>
              <dd>{open.clients?.name || "—"}</dd>
              <dt>Tipo</dt>
              <dd>{open.type || "—"}</dd>
              <dt>Etapa</dt>
              <dd>{STAGES[open.stage].label}</dd>
              <dt>Monto</dt>
              <dd>{money(open.amount)}</dd>
              <dt>Fechas</dt>
              <dd>
                {fdate(open.start_date)} → {fdate(open.due_date)}
              </dd>
              <dt>Enlaces</dt>
              <dd className="pa-links">
                {open.site_url && (
                  <a href={open.site_url} target="_blank" rel="noreferrer">
                    <ExternalLink size={13} /> Sitio
                  </a>
                )}
                {open.repo_url && (
                  <a href={open.repo_url} target="_blank" rel="noreferrer">
                    <Github size={13} /> Repositorio
                  </a>
                )}
                {!open.site_url && !open.repo_url && "—"}
              </dd>
            </dl>
            {open.description && <p className="pa-pre">{open.description}</p>}
            <h2>Bitácora</h2>
            <form
              className="pa-inline"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!note.trim()) return;
                await supabaseBrowser().from("project_notes").insert({ project_id: open.id, body: note.trim() });
                setNote("");
                await projects.reload();
                setOpen(null);
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
              <button className="pa-btn" onClick={() => { setEdit(open); setOpen(null); }}>
                Editar proyecto
              </button>
            </footer>
          </div>
        </Modal>
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
