"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Badge, Empty, FormModal, PageHead, Stat, remove, save, useQuery } from "@/components/panel/ui";
import { txFields } from "@/components/panel/forms";
import { fdate, money, today } from "@/lib/tickets";

type Tx = Record<string, unknown> & {
  id: string; date: string; kind: "ingreso" | "gasto"; amount: number; concept: string; category: string | null; method: string | null;
  paid: boolean; client_id: string | null; project_id: string | null; clients: { name: string } | null; projects: { name: string } | null;
};

const shift = (ym: string, n: number) => {
  const d = new Date(ym + "-15T12:00:00");
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 7);
};
const monthLabel = (ym: string, short = false) => {
  const s = new Date(ym + "-15T12:00:00").toLocaleString("es-MX", short ? { month: "short" } : { month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function AccountingPage() {
  const [ym, setYm] = useState(today().slice(0, 7));
  const from = shift(ym, -5) + "-01";
  const txs = useQuery<Tx[]>((sb) => sb.from("transactions").select("*,clients(name),projects(name)").gte("date", from).order("date", { ascending: false }) as never, [from]);
  const clients = useQuery<{ id: string; name: string }[]>((sb) => sb.from("clients").select("id,name").order("name") as never);
  const projects = useQuery<{ id: string; name: string }[]>((sb) => sb.from("projects").select("id,name").order("name") as never);
  const [edit, setEdit] = useState<{ kind: "ingreso" | "gasto"; row: Record<string, unknown> } | null>(null);
  const [filter, setFilter] = useState<"todo" | "ingreso" | "gasto" | "pendiente">("todo");

  const monthTx = useMemo(() => (txs.data || []).filter((t) => t.date.startsWith(ym)), [txs.data, ym]);
  const sum = (list: Tx[], kind: string, paid?: boolean) =>
    list.filter((t) => t.kind === kind && (paid === undefined || t.paid === paid)).reduce((a, t) => a + Number(t.amount), 0);
  const income = sum(monthTx, "ingreso", true);
  const expense = sum(monthTx, "gasto", true);
  const toCollect = sum(monthTx, "ingreso", false);
  const toPay = sum(monthTx, "gasto", false);

  const months = Array.from({ length: 6 }, (_, i) => shift(ym, i - 5));
  const series = months.map((m) => {
    const l = (txs.data || []).filter((t) => t.date.startsWith(m));
    return { m, inc: sum(l, "ingreso", true), exp: sum(l, "gasto", true) };
  });
  const max = Math.max(1, ...series.flatMap((s) => [s.inc, s.exp]));

  const byCat = (kind: string) => {
    const map = new Map<string, number>();
    monthTx.filter((t) => t.kind === kind && t.paid).forEach((t) => map.set(t.category || "Sin categoría", (map.get(t.category || "Sin categoría") || 0) + Number(t.amount)));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  };
  const byClient = (() => {
    const map = new Map<string, number>();
    monthTx.filter((t) => t.kind === "ingreso" && t.paid).forEach((t) => map.set(t.clients?.name || "Sin cliente", (map.get(t.clients?.name || "Sin cliente") || 0) + Number(t.amount)));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  })();

  const rows = monthTx.filter((t) => filter === "todo" || (filter === "pendiente" ? !t.paid : t.kind === filter));
  const cOpts = (clients.data || []).map((c) => ({ value: c.id, label: c.name }));
  const pOpts = (projects.data || []).map((p) => ({ value: p.id, label: p.name }));

  const exportCsv = () => {
    const head = "Fecha,Tipo,Concepto,Categoría,Cliente,Proyecto,Forma de pago,Estado,Monto";
    const lines = monthTx.map((t) =>
      [t.date, t.kind, t.concept, t.category, t.clients?.name, t.projects?.name, t.method, t.paid ? "Pagado" : "Pendiente", (t.kind === "gasto" ? -1 : 1) * Number(t.amount)]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob(["﻿" + [head, ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `contabilidad-${ym}.csv`;
    a.click();
  };

  return (
    <>
      <PageHead
        title="Contabilidad"
        sub="Ingresos, gastos y lo que falta por cobrar, mes por mes. Montos sin IVA."
        actions={
          <>
            <button className="pa-btn ghost" onClick={exportCsv}>
              <Download size={15} /> Excel (CSV)
            </button>
            <button className="pa-btn ghost" onClick={() => setEdit({ kind: "gasto", row: { date: today(), paid: true, category: "Otro gasto" } })}>
              + Gasto
            </button>
            <button className="pa-btn" onClick={() => setEdit({ kind: "ingreso", row: { date: today(), paid: true, category: "Proyecto", method: "Transferencia" } })}>
              + Ingreso
            </button>
          </>
        }
      />
      <div className="pa-month">
        <button className="pa-icon" onClick={() => setYm(shift(ym, -1))} aria-label="Mes anterior">
          <ChevronLeft size={18} />
        </button>
        <strong>{monthLabel(ym)}</strong>
        <button className="pa-icon" onClick={() => setYm(shift(ym, 1))} aria-label="Mes siguiente">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="pa-stats">
        <Stat label="Ingresos cobrados" value={money(income)} accent="#4ade80" />
        <Stat label="Gastos pagados" value={money(expense)} accent="#fb923c" />
        <Stat label="Utilidad" value={money(income - expense)} hint={income ? `${Math.round(((income - expense) / income) * 100)}% de margen` : undefined} accent="#38bdf8" />
        <Stat label="Por cobrar" value={money(toCollect)} hint={toPay ? `${money(toPay)} por pagar` : undefined} accent="#facc15" />
      </div>

      <div className="pa-cols">
        <section className="pa-card">
          <h2>Últimos 6 meses</h2>
          <div className="pa-bars">
            {series.map((s) => (
              <button key={s.m} className={s.m === ym ? "active" : ""} onClick={() => setYm(s.m)} title={`${money(s.inc)} / ${money(s.exp)}`}>
                <div>
                  <i style={{ height: `${(s.inc / max) * 100}%` }} className="inc" />
                  <i style={{ height: `${(s.exp / max) * 100}%` }} className="exp" />
                </div>
                <span>{monthLabel(s.m, true)}</span>
              </button>
            ))}
          </div>
          <p className="pa-legend">
            <span className="inc" /> Ingresos <span className="exp" /> Gastos
          </p>
        </section>
        <section className="pa-card">
          <h2>Ingresos por cliente</h2>
          {byClient.length ? (
            <ul className="pa-break">
              {byClient.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <i style={{ width: `${(v / income) * 100}%` }} />
                  <strong>{money(v)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Sin ingresos este mes.</Empty>
          )}
          <h2 style={{ marginTop: "1rem" }}>Gastos por categoría</h2>
          {byCat("gasto").length ? (
            <ul className="pa-break exp">
              {byCat("gasto").map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <i style={{ width: `${(v / expense) * 100}%` }} />
                  <strong>{money(v)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Sin gastos este mes.</Empty>
          )}
        </section>
      </div>

      <div className="pa-tabs">
        {(
          [
            ["todo", "Todo"],
            ["ingreso", "Ingresos"],
            ["gasto", "Gastos"],
            ["pendiente", "Pendientes"],
          ] as const
        ).map(([k, l]) => (
          <button key={k} className={filter === k ? "active" : ""} onClick={() => setFilter(k)}>
            {l}
          </button>
        ))}
      </div>
      <section className="pa-card flush">
        {!rows.length ? (
          <Empty>Sin movimientos en {monthLabel(ym)}.</Empty>
        ) : (
          <table className="pa-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th>Cliente / proyecto</th>
                <th>Estado</th>
                <th style={{ textAlign: "right" }}>Monto</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id} onClick={() => setEdit({ kind: t.kind, row: t })}>
                  <td className="pa-muted">{fdate(t.date)}</td>
                  <td>{t.concept}</td>
                  <td className="pa-muted">{t.category}</td>
                  <td className="pa-muted">{[t.clients?.name, t.projects?.name].filter(Boolean).join(" · ") || "—"}</td>
                  <td>{t.paid ? <Badge label={t.kind === "ingreso" ? "Cobrado" : "Pagado"} color="#4ade80" /> : <Badge label={t.kind === "ingreso" ? "Por cobrar" : "Por pagar"} color="#facc15" />}</td>
                  <td className={t.kind === "ingreso" ? "pa-pos" : "pa-neg"} style={{ textAlign: "right" }}>
                    {(t.kind === "gasto" ? "−" : "") + money(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {edit && (
        <FormModal
          title={`${edit.row.id ? "Editar" : "Nuevo"} ${edit.kind}`}
          fields={txFields(edit.kind, cOpts, pOpts)}
          initial={edit.row}
          onClose={() => setEdit(null)}
          onSave={async (v) => {
            const e = await save("transactions", { ...v, kind: edit.kind, paid: Boolean(v.paid) }, edit.row.id as string | undefined);
            txs.reload();
            return e;
          }}
          onDelete={edit.row.id ? async () => { const e = await remove("transactions", edit.row.id as string); txs.reload(); return e; } : undefined}
        />
      )}
    </>
  );
}
