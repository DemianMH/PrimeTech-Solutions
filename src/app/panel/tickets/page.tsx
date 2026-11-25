"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge, Empty, FormModal, PageHead, useQuery } from "@/components/panel/ui";
import { supabaseBrowser } from "@/lib/supabase";
import { PRIORITY, SUPPORT_CATEGORIES, TICKET_STATUS, fdate } from "@/lib/tickets";

type T = {
  id: string; number: number; subject: string; category: string; status: string; priority: string;
  created_at: string; updated_at: string; client_id: string; clients: { name: string; color: string } | null;
};
type C = { id: string; name: string; support_enabled: boolean; client_services: { name: string; active: boolean }[] };

const TABS = [
  { key: "abiertos", label: "Abiertos", match: ["nuevo", "en_proceso", "en_espera"] },
  { key: "nuevo", label: "Nuevos", match: ["nuevo"] },
  { key: "en_espera", label: "Esperando cliente", match: ["en_espera"] },
  { key: "resueltos", label: "Resueltos", match: ["resuelto", "cerrado"] },
  { key: "todos", label: "Todos", match: [] as string[] },
];

export default function TicketsPage() {
  const [tab, setTab] = useState("abiertos");
  const [q, setQ] = useState("");
  const [client, setClient] = useState("");
  const [creating, setCreating] = useState(false);
  const tickets = useQuery<T[]>((sb) =>
    sb.from("tickets").select("id,number,subject,category,status,priority,created_at,updated_at,client_id,clients(name,color)").order("created_at", { ascending: false }) as never
  );
  const clients = useQuery<C[]>((sb) => sb.from("clients").select("id,name,support_enabled,client_services(name,active)").neq("status", "inactivo").order("name") as never);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("nuevo")) setCreating(true);
  }, []);

  const rows = useMemo(() => {
    const m = TABS.find((t) => t.key === tab)!.match;
    const s = q.trim().toLowerCase();
    return (tickets.data || []).filter(
      (t) =>
        (!m.length || m.includes(t.status)) &&
        (!client || t.client_id === client) &&
        (!s || `${t.number} ${t.subject} ${t.category} ${t.clients?.name}`.toLowerCase().includes(s))
    );
  }, [tickets.data, tab, q, client]);

  const count = (key: string) => {
    const m = TABS.find((t) => t.key === key)!.match;
    return (tickets.data || []).filter((t) => !m.length || m.includes(t.status)).length;
  };

  const allCategories = Array.from(
    new Set([...(clients.data || []).flatMap((c) => c.client_services.filter((s) => s.active).map((s) => s.name)), ...SUPPORT_CATEGORIES, "Otro"])
  );

  return (
    <>
      <PageHead title="Tickets" sub="Todo lo que tus clientes te piden, en un solo lugar." actions={<button className="pa-btn" onClick={() => setCreating(true)}>Nuevo ticket</button>} />
      <div className="pa-toolbar">
        <div className="pa-tabs">
          {TABS.map((t) => (
            <button key={t.key} className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>
              {t.label} <span>{count(t.key)}</span>
            </button>
          ))}
        </div>
        <div className="pa-filters">
          <label className="pa-search">
            <Search size={16} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por número, asunto o cliente" />
          </label>
          <select value={client} onChange={(e) => setClient(e.target.value)}>
            <option value="">Todos los clientes</option>
            {clients.data?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="pa-card flush">
        {tickets.loading ? (
          <Empty>Cargando…</Empty>
        ) : !rows.length ? (
          <Empty>No hay tickets en esta vista.</Empty>
        ) : (
          <table className="pa-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Asunto</th>
                <th>Cliente</th>
                <th>Categoría</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Actualizado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} onClick={() => (window.location.href = `/panel/tickets/${t.id}`)}>
                  <td className="pa-num">#{t.number}</td>
                  <td>
                    <Link href={`/panel/tickets/${t.id}`}>{t.subject}</Link>
                  </td>
                  <td>
                    <span className="pa-dot" style={{ background: t.clients?.color || "#22d3ee" }} />
                    {t.clients?.name}
                  </td>
                  <td className="pa-muted">{t.category}</td>
                  <td>
                    <Badge {...PRIORITY[t.priority]} />
                  </td>
                  <td>
                    <Badge {...TICKET_STATUS[t.status]} />
                  </td>
                  <td className="pa-muted">{fdate(t.updated_at, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {creating && (
        <FormModal
          title="Nuevo ticket"
          onClose={() => setCreating(false)}
          fields={[
            { name: "client_id", label: "Cliente", type: "select", required: true, options: (clients.data || []).map((c) => ({ value: c.id, label: c.name })) },
            { name: "category", label: "Categoría", type: "select", required: true, options: allCategories.map((c) => ({ value: c, label: c })) },
            { name: "subject", label: "Asunto", required: true, full: true },
            { name: "description", label: "Descripción", type: "textarea", required: true },
            { name: "priority", label: "Prioridad", type: "select", required: true, options: Object.entries(PRIORITY).map(([v, p]) => ({ value: v, label: p.label })) },
            { name: "source", label: "Llegó por", type: "select", required: true, options: ["whatsapp", "correo", "llamada", "panel"].map((v) => ({ value: v, label: v })) },
            { name: "contact_name", label: "Persona de contacto" },
            { name: "contact_phone", label: "Teléfono", type: "tel" },
            { name: "contact_email", label: "Correo para avisos", type: "email" },
          ]}
          initial={{ priority: "normal", source: "whatsapp" }}
          onSave={async (v) => {
            const { data, error } = await supabaseBrowser().from("tickets").insert(v).select("id").single();
            if (error) return error.message;
            window.location.href = `/panel/tickets/${data.id}`;
          }}
        />
      )}
    </>
  );
}
