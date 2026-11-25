"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Wrench } from "lucide-react";
import { Badge, Empty, FormModal, PageHead, useQuery } from "@/components/panel/ui";
import { clientFields } from "@/components/panel/forms";
import { supabaseBrowser } from "@/lib/supabase";
import { subsSummary } from "@/lib/tickets";

type C = {
  id: string; name: string; industry: string | null; contact_name: string | null; email: string | null; phone: string | null;
  status: string; support_enabled: boolean; color: string;
  client_services: { name: string; active: boolean }[]; tickets: { status: string }[]; subscriptions: { amount: number; period: string; status: string; currency: string }[]; projects: { stage: string }[];
};

const ST: Record<string, { label: string; color: string }> = {
  activo: { label: "Activo", color: "#4ade80" },
  pausado: { label: "Pausado", color: "#facc15" },
  inactivo: { label: "Inactivo", color: "#94a3b8" },
};

export default function ClientsPage() {
  const [q, setQ] = useState("");
  const [creating, setCreating] = useState(false);
  const clients = useQuery<C[]>((sb) =>
    sb.from("clients").select("id,name,industry,contact_name,email,phone,status,support_enabled,color,client_services(name,active),tickets(status),subscriptions(amount,period,status,currency),projects(stage)").order("name") as never
  );
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (clients.data || []).filter((c) => !s || `${c.name} ${c.industry} ${c.contact_name} ${c.email} ${c.client_services.map((x) => x.name).join(" ")}`.toLowerCase().includes(s));
  }, [clients.data, q]);

  return (
    <>
      <PageHead title="Clientes" sub="Da de alta a un cliente y comparte su link para que levante tickets." actions={<button className="pa-btn" onClick={() => setCreating(true)}>Nuevo cliente</button>} />
      <div className="pa-toolbar">
        <label className="pa-search">
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar cliente" />
        </label>
      </div>
      {clients.loading ? (
        <Empty>Cargando…</Empty>
      ) : !rows.length ? (
        <Empty>Aún no hay clientes. Da de alta el primero con «Nuevo cliente».</Empty>
      ) : (
        <div className="pa-client-grid">
          {rows.map((c) => {
            const open = c.tickets.filter((t) => !["resuelto", "cerrado"].includes(t.status)).length;
            const pays = subsSummary(c.subscriptions);
            const active = c.projects.filter((p) => !["soporte", "cancelado", "pausado"].includes(p.stage)).length;
            return (
              <Link key={c.id} href={`/panel/clientes/${c.id}`} className="pa-client" style={{ ["--c" as string]: c.color || "#22d3ee" }}>
                <header>
                  <span className="pa-avatar">{c.name.slice(0, 2).toUpperCase()}</span>
                  <div>
                    <strong>{c.name}</strong>
                    <small>{c.industry || c.contact_name || (c.phone ? `Tel. ${c.phone}` : "—")}</small>
                  </div>
                  <Badge {...ST[c.status]} />
                </header>
                <ul>
                  <li>
                    <b>{open}</b> tickets abiertos
                  </li>
                  <li>
                    <b>{active}</b> proyectos
                  </li>
                  {pays.length ? (
                    pays.map((p) => (
                      <li key={p}>
                        <b>{p}</b>
                      </li>
                    ))
                  ) : (
                    <li>Sin suscripción activa</li>
                  )}
                </ul>
                <div className="pa-client-tags">
                  {c.client_services.filter((x) => x.active).map((x) => (
                    <span key={x.name} className="pa-tag">{x.name}</span>
                  ))}
                  {!c.client_services.some((x) => x.active) && !c.support_enabled && <span className="pa-tag off">Sin servicios registrados</span>}
                </div>
                {c.support_enabled && (
                  <span className="pa-chip">
                    <Wrench size={12} /> Soporte técnico y equipos
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
      {creating && (
        <FormModal
          title="Nuevo cliente"
          fields={clientFields}
          initial={{ status: "activo", color: "#22d3ee", support_enabled: false }}
          onClose={() => setCreating(false)}
          onSave={async (v) => {
            const { data, error } = await supabaseBrowser().from("clients").insert(v).select("id").single();
            if (error) return error.message;
            window.location.href = `/panel/clientes/${data.id}`;
          }}
        />
      )}
    </>
  );
}
