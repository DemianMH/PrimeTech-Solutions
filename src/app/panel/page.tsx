"use client";

import Link from "next/link";
import { Badge, Empty, PageHead, Stat, useQuery } from "@/components/panel/ui";
import { TICKET_STATUS, PRIORITY, STAGES, fdate, money, today } from "@/lib/tickets";

type T = { id: string; number: number; subject: string; status: string; priority: string; created_at: string; clients: { name: string } | null };
type S = { id: string; name: string; amount: number; period: string; next_charge: string | null; status: string; clients: { name: string } | null };
type Tx = { kind: string; amount: number; paid: boolean; date: string };
type P = { id: string; name: string; stage: string; due_date: string | null; clients: { name: string } | null };

export default function PanelHome() {
  const month = today().slice(0, 7);
  const tickets = useQuery<T[]>((sb) =>
    sb.from("tickets").select("id,number,subject,status,priority,created_at,clients(name)").in("status", ["nuevo", "en_proceso", "en_espera"]).order("created_at", { ascending: false }) as never
  );
  const subs = useQuery<S[]>((sb) => sb.from("subscriptions").select("id,name,amount,period,next_charge,status,clients(name)").eq("status", "activa").order("next_charge") as never);
  const txs = useQuery<Tx[]>((sb) => sb.from("transactions").select("kind,amount,paid,date").gte("date", `${month}-01`) as never);
  const projects = useQuery<P[]>((sb) =>
    sb.from("projects").select("id,name,stage,due_date,clients(name)").not("stage", "in", "(soporte,cancelado,pausado)").order("due_date", { nullsFirst: false }) as never
  );
  const clients = useQuery<{ id: string }[]>((sb) => sb.from("clients").select("id").eq("status", "activo") as never);

  const income = (txs.data || []).filter((t) => t.kind === "ingreso" && t.paid).reduce((a, t) => a + Number(t.amount), 0);
  const expense = (txs.data || []).filter((t) => t.kind === "gasto" && t.paid).reduce((a, t) => a + Number(t.amount), 0);
  const pending = (txs.data || []).filter((t) => t.kind === "ingreso" && !t.paid).reduce((a, t) => a + Number(t.amount), 0);
  const perMonth = (subs.data || []).filter((s) => s.period === "mensual").reduce((a, s) => a + Number(s.amount), 0);
  const perYear = (subs.data || []).filter((s) => s.period === "anual").reduce((a, s) => a + Number(s.amount), 0);
  const in15 = new Date(Date.now() + 15 * 864e5).toISOString().slice(0, 10);
  const upcoming = (subs.data || []).filter((s) => s.next_charge && s.next_charge <= in15);
  const urgent = (tickets.data || []).filter((t) => t.priority === "urgente" || t.priority === "alta").length;
  const monthName = new Date().toLocaleString("es-MX", { month: "long" });

  return (
    <>
      <PageHead title="Hola, Demian" sub={`Así va PrimeTech en ${monthName}.`} actions={<Link className="pa-btn" href="/panel/tickets?nuevo=1">Nuevo ticket</Link>} />
      <div className="pa-stats">
        <Stat label="Tickets abiertos" value={tickets.data?.length ?? "…"} hint={urgent ? `${urgent} con prioridad alta` : "Sin urgencias"} accent="#38bdf8" />
        <Stat label={`Ingresos de ${monthName}`} value={money(income)} hint={pending ? `${money(pending)} por cobrar` : "Todo cobrado"} accent="#4ade80" />
        <Stat label="Gastos del mes" value={money(expense)} hint={`Utilidad ${money(income - expense)}`} accent="#fb923c" />
        <Stat label="Mensualidades" value={`${money(perMonth)} al mes`} hint={`+ ${money(perYear)} al año en renovaciones · ${clients.data?.length ?? 0} clientes activos`} accent="#c084fc" />
      </div>

      <div className="pa-cols">
        <section className="pa-card">
          <header>
            <h2>Tickets por atender</h2>
            <Link href="/panel/tickets">Ver todos</Link>
          </header>
          {!tickets.data?.length ? (
            <Empty>No hay tickets abiertos. 🎉</Empty>
          ) : (
            <ul className="pa-list">
              {tickets.data.slice(0, 8).map((t) => (
                <li key={t.id}>
                  <Link href={`/panel/tickets/${t.id}`}>
                    <span className="pa-num">#{t.number}</span>
                    <span className="pa-grow">
                      <strong>{t.subject}</strong>
                      <small>
                        {t.clients?.name} · {fdate(t.created_at)}
                      </small>
                    </span>
                    <Badge {...PRIORITY[t.priority]} />
                    <Badge {...TICKET_STATUS[t.status]} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="pa-card">
          <header>
            <h2>Cobros próximos (15 días)</h2>
            <Link href="/panel/suscripciones">Suscripciones</Link>
          </header>
          {!upcoming.length ? (
            <Empty>Sin cobros en los próximos 15 días.</Empty>
          ) : (
            <ul className="pa-list">
              {upcoming.map((s) => (
                <li key={s.id}>
                  <Link href="/panel/suscripciones">
                    <span className="pa-grow">
                      <strong>{s.clients?.name}</strong>
                      <small>{s.name}</small>
                    </span>
                    <span className={s.next_charge! < today() ? "pa-late" : ""}>{fdate(s.next_charge)}</span>
                    <strong>{money(s.amount)}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <header style={{ marginTop: "1.2rem" }}>
            <h2>Proyectos en curso</h2>
            <Link href="/panel/proyectos">Proyectos</Link>
          </header>
          {!projects.data?.length ? (
            <Empty>Sin proyectos en curso.</Empty>
          ) : (
            <ul className="pa-list">
              {projects.data.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link href="/panel/proyectos">
                    <span className="pa-grow">
                      <strong>{p.name}</strong>
                      <small>
                        {p.clients?.name || "Sin cliente"} · entrega {fdate(p.due_date)}
                      </small>
                    </span>
                    <Badge {...STAGES[p.stage]} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
