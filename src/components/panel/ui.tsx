"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";

/* ---------- Piezas visuales ---------- */

export function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className="pa-badge" style={{ color, background: `${color}1f`, borderColor: `${color}55` }}>
      {label}
    </span>
  );
}

export function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: ReactNode; accent?: string }) {
  return (
    <div className="pa-stat" style={accent ? { borderTopColor: accent } : undefined}>
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="pa-empty">{children}</div>;
}

export function PageHead({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <header className="pa-head">
      <div>
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {actions && <div className="pa-head-actions">{actions}</div>}
    </header>
  );
}

export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="pa-modal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`pa-modal ${wide ? "wide" : ""}`} role="dialog" aria-label={title}>
        <header>
          <h2>{title}</h2>
          <button type="button" className="pa-icon" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

/* ---------- Formulario genérico ---------- */

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select" | "checkbox" | "color" | "url";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
  hint?: string;
};

type Row = Record<string, unknown>;

export function FormModal({
  title,
  fields,
  initial,
  onClose,
  onSave,
  onDelete,
}: {
  title: string;
  fields: Field[];
  initial?: Row;
  onClose: () => void;
  onSave: (values: Row) => Promise<string | void>;
  onDelete?: () => Promise<string | void>;
}) {
  const [values, setValues] = useState<Row>(() => {
    const v: Row = {};
    fields.forEach((f) => (v[f.name] = initial?.[f.name] ?? (f.type === "checkbox" ? false : "")));
    return v;
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (name: string, value: unknown) => setValues((p) => ({ ...p, [name]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const clean: Row = {};
    fields.forEach((f) => {
      const v = values[f.name];
      clean[f.name] = f.type === "number" ? (v === "" ? null : Number(v)) : v === "" ? null : v;
    });
    const err = await onSave(clean);
    setBusy(false);
    if (err) setError(err);
    else onClose();
  };

  return (
    <Modal title={title} onClose={onClose} wide={fields.length > 6}>
      <form className="pa-form" onSubmit={submit}>
        <div className="pa-grid">
          {fields.map((f) => (
            <label key={f.name} className={f.full || f.type === "textarea" ? "full" : f.type === "checkbox" ? "check" : ""}>
              {f.type === "checkbox" ? (
                <>
                  <input type="checkbox" checked={Boolean(values[f.name])} onChange={(e) => set(f.name, e.target.checked)} />
                  <span>{f.label}</span>
                </>
              ) : (
                <>
                  <span>
                    {f.label} {f.required && <em>*</em>}
                  </span>
                  {f.type === "textarea" ? (
                    <textarea value={String(values[f.name] ?? "")} required={f.required} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} />
                  ) : f.type === "select" ? (
                    <select value={String(values[f.name] ?? "")} required={f.required} onChange={(e) => set(f.name, e.target.value)}>
                      {!f.required && <option value="">—</option>}
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type || "text"}
                      step={f.type === "number" ? "0.01" : undefined}
                      value={String(values[f.name] ?? "")}
                      required={f.required}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  )}
                </>
              )}
              {f.hint && <small>{f.hint}</small>}
            </label>
          ))}
        </div>
        {error && <p className="pa-error">{error}</p>}
        <footer>
          {onDelete && (
            <button
              type="button"
              className="pa-btn danger"
              onClick={async () => {
                if (!confirm("¿Eliminar este registro? No se puede deshacer.")) return;
                const err = await onDelete();
                if (err) setError(err);
                else onClose();
              }}
            >
              Eliminar
            </button>
          )}
          <span style={{ flex: 1 }} />
          <button type="button" className="pa-btn ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="pa-btn" disabled={busy}>
            {busy ? "Guardando…" : "Guardar"}
          </button>
        </footer>
      </form>
    </Modal>
  );
}

/* ---------- Datos ---------- */

/** Carga una consulta de Supabase y permite recargarla. */
export function useQuery<T>(run: (sb: ReturnType<typeof supabaseBrowser>) => PromiseLike<{ data: T | null; error: { message: string } | null }>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    const r = await run(supabaseBrowser());
    setData(r.data);
    setError(r.error?.message || "");
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => {
    reload();
  }, [reload]);
  return { data, error, loading, reload };
}

/** Guarda (inserta o actualiza) y devuelve el mensaje de error, si hubo. */
export async function save(table: string, values: Row, id?: string) {
  const sb = supabaseBrowser();
  const r = id ? await sb.from(table).update(values).eq("id", id) : await sb.from(table).insert(values);
  return r.error?.message;
}

export async function remove(table: string, id: string) {
  const r = await supabaseBrowser().from(table).delete().eq("id", id);
  return r.error?.message;
}

/** Llama a la API de avisos por correo con la sesión del panel. */
export async function notify(body: Record<string, unknown>) {
  const { data } = await supabaseBrowser().auth.getSession();
  const token = data.session?.access_token;
  if (!token) return;
  await fetch("/api/panel/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

/** Logo del cliente; si no tiene, sus iniciales en su color. */
export function Avatar({ name, color, logo, big }: { name: string; color?: string | null; logo?: string | null; big?: boolean }) {
  return (
    <span className={`pa-avatar ${big ? "big" : ""} ${logo ? "logo" : ""}`} style={{ ["--c" as string]: color || "#22d3ee" }}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={name} />
      ) : (
        name.slice(0, 2).toUpperCase()
      )}
    </span>
  );
}
