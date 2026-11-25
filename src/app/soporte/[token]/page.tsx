"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, FileText, Paperclip, Send, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { supabaseBrowser } from "@/lib/supabase";
import { PRIORITY, TICKET_STATUS, fdate } from "@/lib/tickets";

type Ticket = {
  id: string; number: number; subject: string; category: string; status: string; priority: string; created_at: string; updated_at: string;
  messages: { author: string; body: string; created_at: string }[];
  files: { name: string; path: string }[];
};
type Info = { name: string; color: string; logo_url: string | null; categories: string[]; tickets: Ticket[] };

const MAX_FILES = 8;
const MAX_MB = 15;
const ACCEPT = "image/*,.pdf,.xls,.xlsx,.csv,.doc,.docx,.txt,.zip";

export default function PortalPage({ params }: { params: { token: string } }) {
  const token = params.token;
  const [info, setInfo] = useState<Info | null | undefined>(undefined);
  const [tab, setTab] = useState<"nuevo" | "pendientes" | "resueltos">("nuevo");
  const [done, setDone] = useState<number | null>(null);

  const load = useCallback(async () => {
    const { data } = await supabaseBrowser().rpc("portal_info", { p_token: token });
    setInfo((data as Info) || null);
  }, [token]);
  useEffect(() => {
    load();
  }, [load]);

  if (info === undefined) return <div className="sp-wrap"><p className="sp-loading">Cargando tu portal…</p></div>;
  if (info === null)
    return (
      <div className="sp-wrap">
        <div className="sp-card sp-center">
          <h1>Enlace no válido</h1>
          <p>Este enlace de soporte no existe o ya no está activo. Escríbenos por WhatsApp y te ayudamos.</p>
          <a className="sp-btn" href="https://wa.me/523330620287" target="_blank" rel="noreferrer">
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </div>
    );

  const pending = info.tickets.filter((t) => !["resuelto", "cerrado"].includes(t.status));
  const solved = info.tickets.filter((t) => ["resuelto", "cerrado"].includes(t.status));

  return (
    <div className="sp-wrap" style={{ ["--c" as string]: info.color || "#0891b2" }}>
      <header className="sp-top">
        <div className="sp-brand">
          <Image src="/logo-color.png" width={36} height={36} alt="PrimeTech" />
          <span>
            Soporte <b>PrimeTech</b>
          </span>
        </div>
        <a href="https://wa.me/523330620287" target="_blank" rel="noreferrer" className="sp-wa">
          <FaWhatsapp /> ¿Urgente? WhatsApp
        </a>
      </header>

      <section className="sp-hero">
        <span className="sp-client">
          {info.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={info.logo_url} alt="" />
          )}
          {info.name}
        </span>
        <h1>¿En qué te ayudamos?</h1>
        <p>Levanta un ticket y te avisamos por correo cada vez que avance. Aquí mismo puedes ver tus solicitudes pendientes y resueltas.</p>
      </section>

      <nav className="sp-tabs">
        <button className={tab === "nuevo" ? "active" : ""} onClick={() => { setTab("nuevo"); setDone(null); }}>
          Nuevo ticket
        </button>
        <button className={tab === "pendientes" ? "active" : ""} onClick={() => setTab("pendientes")}>
          Pendientes <span>{pending.length}</span>
        </button>
        <button className={tab === "resueltos" ? "active" : ""} onClick={() => setTab("resueltos")}>
          Resueltos <span>{solved.length}</span>
        </button>
      </nav>

      {tab === "nuevo" &&
        (done ? (
          <div className="sp-card sp-center">
            <CheckCircle2 size={48} className="sp-ok" />
            <h2>¡Ticket #{done} registrado!</h2>
            <p>Ya nos llegó tu solicitud. Si dejaste tu correo, te mandamos la confirmación y los avances por ahí.</p>
            <div className="sp-row">
              <button className="sp-btn ghost" onClick={() => setDone(null)}>
                Levantar otro
              </button>
              <button className="sp-btn" onClick={() => setTab("pendientes")}>
                Ver mis tickets
              </button>
            </div>
          </div>
        ) : (
          <NewTicket token={token} categories={info.categories} onCreated={(n) => { setDone(n); load(); }} />
        ))}

      {tab !== "nuevo" && (
        <div className="sp-list">
          {(tab === "pendientes" ? pending : solved).length === 0 ? (
            <div className="sp-card sp-center">
              <p>{tab === "pendientes" ? "No tienes tickets pendientes. 🎉" : "Aún no hay tickets resueltos."}</p>
            </div>
          ) : (
            (tab === "pendientes" ? pending : solved).map((t) => <TicketCard key={t.id} t={t} token={token} onReply={load} />)
          )}
        </div>
      )}

      <footer className="sp-foot">
        PrimeTech Solutions · Guadalajara, Jalisco · <a href="mailto:contacto@primetechsolutionsmx.org">contacto@primetechsolutionsmx.org</a>
      </footer>
    </div>
  );
}

function NewTicket({ token, categories, onCreated }: { token: string; categories: string[]; onCreated: (n: number) => void }) {
  const [form, setForm] = useState({ category: "", subject: "", description: "", priority: "normal", contact_name: "", contact_phone: "", contact_email: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`pt-contact-${token}`) || "{}");
      setForm((f) => ({ ...f, ...saved }));
    } catch {}
  }, [token]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      if (f.size > MAX_MB * 1024 * 1024) {
        setError(`«${f.name}» pesa más de ${MAX_MB} MB.`);
        continue;
      }
      if (next.length < MAX_FILES) next.push(f);
    }
    setFiles(next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const sb = supabaseBrowser();
      const uploaded = [];
      for (const f of files) {
        const safe = f.name.normalize("NFD").replace(/[^\w.\-]+/g, "_").slice(-80);
        const path = `${token}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
        const { error: upErr } = await sb.storage.from("adjuntos").upload(path, f, { contentType: f.type || undefined });
        if (upErr) throw new Error(`No se pudo subir «${f.name}»: ${upErr.message}`);
        uploaded.push({ path, name: f.name, size: f.size, mime: f.type });
      }
      const res = await fetch("/api/soporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ...form, files: uploaded }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "No se pudo registrar el ticket.");
      localStorage.setItem(`pt-contact-${token}`, JSON.stringify({ contact_name: form.contact_name, contact_phone: form.contact_phone, contact_email: form.contact_email }));
      setForm((f) => ({ ...f, category: "", subject: "", description: "", priority: "normal" }));
      setFiles([]);
      onCreated(json.number);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    }
    setBusy(false);
  };

  return (
    <form className="sp-card sp-form" onSubmit={submit}>
      <label>
        <span>Categoría *</span>
        <div className="sp-cats">
          {categories.map((c) => (
            <button type="button" key={c} className={form.category === c ? "active" : ""} onClick={() => set("category", c)}>
              {c}
            </button>
          ))}
        </div>
        <input className="sp-hidden" required value={form.category} onChange={() => undefined} tabIndex={-1} aria-hidden />
      </label>
      <label>
        <span>Asunto *</span>
        <input required maxLength={200} value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="Ej. La impresora de recepción no imprime" />
      </label>
      <label>
        <span>Describe lo que pasa *</span>
        <textarea required value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="¿Qué pasa, desde cuándo, en qué equipo o área? Entre más detalle, más rápido lo resolvemos." />
      </label>
      <label>
        <span>¿Qué tan urgente es?</span>
        <div className="sp-prio">
          {Object.entries(PRIORITY).map(([k, p]) => (
            <button type="button" key={k} className={form.priority === k ? "active" : ""} style={{ ["--p" as string]: p.color }} onClick={() => set("priority", k)}>
              {p.label}
            </button>
          ))}
        </div>
      </label>

      <div className="sp-drop" onClick={() => input.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
        <Paperclip size={18} />
        <span>
          <b>Adjunta archivos</b> (fotos, PDF, Excel, Word…) — arrástralos aquí o da clic. Máx. {MAX_FILES} archivos de {MAX_MB} MB.
        </span>
        <input ref={input} type="file" multiple accept={ACCEPT} hidden onChange={(e) => addFiles(e.target.files)} />
      </div>
      {!!files.length && (
        <ul className="sp-files">
          {files.map((f, i) => (
            <li key={i}>
              <FileText size={14} /> {f.name} <small>{Math.ceil(f.size / 1024)} KB</small>
              <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label="Quitar">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <fieldset>
        <legend>Datos de contacto (opcional)</legend>
        <p>Para darte atención personalizada y avisarte el estatus por correo.</p>
        <div className="sp-grid">
          <label>
            <span>Tu nombre</span>
            <input value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} autoComplete="name" />
          </label>
          <label>
            <span>Teléfono</span>
            <input type="tel" value={form.contact_phone} onChange={(e) => set("contact_phone", e.target.value)} autoComplete="tel" placeholder="33 1234 5678" />
          </label>
          <label>
            <span>Correo</span>
            <input type="email" value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} autoComplete="email" placeholder="tu@empresa.com" />
          </label>
        </div>
      </fieldset>

      {error && <p className="sp-error">{error}</p>}
      <button className="sp-btn big" disabled={busy || !form.category}>
        {busy ? "Enviando…" : (
          <>
            <Send size={17} /> Enviar ticket
          </>
        )}
      </button>
      {!form.category && <small className="sp-muted">Elige una categoría para continuar.</small>}
    </form>
  );
}

function TicketCard({ t, token, onReply }: { t: Ticket; token: string; onReply: () => void }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const st = TICKET_STATUS[t.status];
  const steps = ["nuevo", "en_proceso", "resuelto"];
  const reached = t.status === "cerrado" ? 3 : t.status === "en_espera" ? 2 : steps.indexOf(t.status) + 1;

  const open_file = async (path: string) => {
    const { data } = await supabaseBrowser().storage.from("adjuntos").createSignedUrl(path, 300);
    if (data) window.open(data.signedUrl, "_blank");
  };

  return (
    <article className={`sp-card sp-ticket ${open ? "open" : ""}`}>
      <button type="button" className="sp-ticket-head" onClick={() => setOpen((v) => !v)}>
        <span className="sp-num">#{t.number}</span>
        <span className="sp-grow">
          <strong>{t.subject}</strong>
          <small>
            {t.category} · {fdate(t.created_at, true)}
          </small>
        </span>
        <span className="sp-status" style={{ color: st.color, background: `${st.color}1a` }}>
          {st.label}
        </span>
        <ChevronDown size={18} className="sp-chev" />
      </button>
      {open && (
        <div className="sp-ticket-body">
          <ol className="sp-steps">
            {["Recibido", t.status === "en_espera" ? "Esperando tu respuesta" : "En proceso", "Resuelto"].map((s, i) => (
              <li key={s} className={i < reached ? "on" : ""}>
                <i /> {s}
              </li>
            ))}
          </ol>
          {!!t.files.length && (
            <div className="sp-attach">
              {t.files.map((f) => (
                <button key={f.path} type="button" onClick={() => open_file(f.path)}>
                  <Paperclip size={13} /> {f.name}
                </button>
              ))}
            </div>
          )}
          <ol className="sp-thread">
            {t.messages.map((m, i) => (
              <li key={i} className={m.author}>
                <header>
                  <strong>{m.author === "cliente" ? "Tú" : m.author === "sistema" ? "Actualización" : "PrimeTech"}</strong>
                  <time>{fdate(m.created_at, true)}</time>
                </header>
                <p>{m.body}</p>
              </li>
            ))}
          </ol>
          {t.status !== "cerrado" && (
            <form
              className="sp-reply"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!body.trim()) return;
                setBusy(true);
                await fetch("/api/soporte/reply", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ token, ticketId: t.id, number: t.number, body }),
                });
                setBusy(false);
                setBody("");
                onReply();
              }}
            >
              <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={t.status === "resuelto" ? "¿Sigue fallando? Escríbenos y lo reabrimos." : "Agrega información o responde…"} />
              <button className="sp-btn" disabled={busy || !body.trim()}>
                <Send size={15} /> Enviar
              </button>
            </form>
          )}
        </div>
      )}
    </article>
  );
}
