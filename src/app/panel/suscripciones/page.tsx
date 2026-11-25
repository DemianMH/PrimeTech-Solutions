"use client";

import { useState } from "react";
import { Badge, Empty, FormModal, PageHead, Stat, save, remove, useQuery } from "@/components/panel/ui";
import { subscriptionFields } from "@/components/panel/forms";
import { supabaseBrowser } from "@/lib/supabase";
import { PERIODS, addMonths, fdate, money, today } from "@/lib/tickets";

type S = Record<string, unknown> & {
  id: string; client_id: string; name: string; amount: number; currency: string; period: string;
  next_charge: string | null; status: string; clients: { name: string; color: string } | null;
};

export default function SubscriptionsPage() {
  const subs = useQuery<S[]>((sb) => sb.from("subscriptions").select("*,clients(name,color)").order("next_charge") as never);
  const clients = useQuery<{ id: string; name: string }[]>((sb) => sb.from("clients").select("id,name").order("name") as never);
  const [edit, setEdit] = useState<Record<string, unknown> | null>(null);
  const [flash, setFlash] = useState("");
  const opts = (clients.data || []).map((c) => ({ value: c.id, label: c.name }));
  const active = (subs.data || []).filter((s) => s.status === "activa");
  const perMonth = active.filter((s) => s.period === "mensual").reduce((a, s) => a + Number(s.amount), 0);
  const perYear = active.filter((s) => s.period === "anual").reduce((a, s) => a + Number(s.amount), 0);
  const late = active.filter((s) => s.next_charge && s.next_charge < today());
  const monthEnd = today().slice(0, 7) + "-31";
  const dueThisMonth = active.filter((s) => s.next_charge && s.next_charge <= monthEnd).reduce((a, s) => a + Number(s.amount), 0);

  /** Registra el cobro como ingreso y mueve la fecha del próximo cobro. */
  const charge = async (s: S) => {
    if (!confirm(`¿Registrar cobro de ${money(s.amount, s.currency)} a ${s.clients?.name}?`)) return;
    const sb = supabaseBrowser();
    const { error } = await sb.from("transactions").insert({
      date: today(), kind: "ingreso", amount: s.amount, concept: `${s.name} · ${fdate(s.next_charge)}`,
      category: "Suscripción", client_id: s.client_id, subscription_id: s.id, paid: true, method: "Transferencia",
    });
    if (error) return setFlash(error.message);
    const months = PERIODS[s.period]?.months || 0;
    await sb.from("subscriptions").update(months ? { next_charge: addMonths(s.next_charge || today(), months) } : { status: "cancelada" }).eq("id", s.id);
    setFlash(`Cobro registrado en Contabilidad. ${months ? "Próximo cobro: " + fdate(addMonths(s.next_charge || today(), months)) : ""}`);
    subs.reload();
  };

  return (
    <>
      <PageHead title="Suscripciones" sub="Servicios recurrentes de tus clientes y sus fechas de cobro." actions={<button className="pa-btn" onClick={() => setEdit({ currency: "MXN", period: "mensual", status: "activa", start_date: today(), next_charge: today() })}>Nueva suscripción</button>} />
      {flash && <p className="pa-flash" onClick={() => setFlash("")}>{flash}</p>}
      <div className="pa-stats">
        <Stat label="Mensualidades" value={`${money(perMonth)} al mes`} hint={`${active.filter((s) => s.period === "mensual").length} clientes pagan cada mes`} accent="#c084fc" />
        <Stat label="Renovaciones anuales" value={`${money(perYear)} al año`} hint="Dominios y licencias anuales" accent="#38bdf8" />
        <Stat label="Por cobrar este mes" value={money(dueThisMonth)} accent="#4ade80" />
        <Stat label="Atrasadas" value={late.length} hint={late.length ? "Revisa los cobros en rojo" : "Al corriente"} accent="#f87171" />
      </div>
      <section className="pa-card flush">
        {subs.loading ? (
          <Empty>Cargando…</Empty>
        ) : !subs.data?.length ? (
          <Empty>Sin suscripciones. Agrega la primera.</Empty>
        ) : (
          <table className="pa-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Periodo</th>
                <th>Monto</th>
                <th>Próximo cobro</th>
                <th>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subs.data.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="pa-dot" style={{ background: s.clients?.color || "#22d3ee" }} />
                    {s.clients?.name}
                  </td>
                  <td>
                    <button className="pa-link" onClick={() => setEdit(s)}>
                      {s.name}
                    </button>
                  </td>
                  <td className="pa-muted">{PERIODS[s.period]?.label}</td>
                  <td>{money(s.amount, s.currency)}</td>
                  <td className={s.status === "activa" && s.next_charge && s.next_charge < today() ? "pa-late" : ""}>{fdate(s.next_charge)}</td>
                  <td>
                    <Badge label={s.status} color={s.status === "activa" ? "#4ade80" : s.status === "pausada" ? "#facc15" : "#94a3b8"} />
                  </td>
                  <td>
                    {s.status === "activa" && (
                      <button className="pa-btn small" onClick={() => charge(s)}>
                        Registrar cobro
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {edit && (
        <FormModal
          title={edit.id ? "Editar suscripción" : "Nueva suscripción"}
          fields={subscriptionFields(opts)}
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={async (v) => { const e = await save("subscriptions", v, edit.id as string | undefined); subs.reload(); return e; }}
          onDelete={edit.id ? async () => { const e = await remove("subscriptions", edit.id as string); subs.reload(); return e; } : undefined}
        />
      )}
    </>
  );
}
