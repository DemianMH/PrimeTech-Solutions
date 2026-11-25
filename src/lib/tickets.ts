// Catálogos compartidos del sistema de tickets, proyectos, contabilidad y suscripciones.

export const TICKET_STATUS: Record<string, { label: string; color: string }> = {
  nuevo: { label: "Nuevo", color: "#38bdf8" },
  en_proceso: { label: "En proceso", color: "#facc15" },
  en_espera: { label: "Esperando al cliente", color: "#c084fc" },
  resuelto: { label: "Resuelto", color: "#4ade80" },
  cerrado: { label: "Cerrado", color: "#94a3b8" },
};

export const PRIORITY: Record<string, { label: string; color: string }> = {
  baja: { label: "Baja", color: "#94a3b8" },
  normal: { label: "Normal", color: "#38bdf8" },
  alta: { label: "Alta", color: "#fb923c" },
  urgente: { label: "Urgente", color: "#f87171" },
};

export const STAGES: Record<string, { label: string; color: string }> = {
  prospecto: { label: "Prospecto", color: "#94a3b8" },
  diagnostico: { label: "Diagnóstico", color: "#38bdf8" },
  propuesta: { label: "Propuesta", color: "#c084fc" },
  construccion: { label: "Construcción", color: "#facc15" },
  entrega: { label: "Entrega", color: "#fb923c" },
  soporte: { label: "Soporte", color: "#4ade80" },
  pausado: { label: "Pausado", color: "#64748b" },
  cancelado: { label: "Cancelado", color: "#f87171" },
};

export const PERIODS: Record<string, { label: string; months: number }> = {
  mensual: { label: "Mensual", months: 1 },
  bimestral: { label: "Bimestral", months: 2 },
  trimestral: { label: "Trimestral", months: 3 },
  semestral: { label: "Semestral", months: 6 },
  anual: { label: "Anual", months: 12 },
  unico: { label: "Pago único", months: 0 },
};

export const TX_CATEGORIES = {
  ingreso: ["Proyecto", "Suscripción", "Soporte técnico", "Venta de equipo", "Reparación", "Otro ingreso"],
  gasto: ["Equipo / material", "Hosting y dominios", "Software y licencias", "Publicidad", "Transporte", "Comisiones", "Otro gasto"],
};

export const SUPPORT_CATEGORIES = [
  "Soporte técnico",
  "Reparación de software",
  "Reparación de hardware",
  "Compra de equipo (laptop, PC, periféricos)",
  "Impresoras y arrendamiento",
  "Redes e internet",
];

export const money = (n: number | string | null | undefined, currency = "MXN") =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency, maximumFractionDigits: 2 }).format(Number(n || 0));

export const fdate = (d: string | null | undefined, withTime = false) => {
  if (!d) return "—";
  const date = d.length === 10 ? new Date(d + "T12:00:00") : new Date(d);
  return date.toLocaleString("es-MX", withTime
    ? { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
    : { day: "numeric", month: "short", year: "numeric" });
};

/** Suma meses a una fecha AAAA-MM-DD. */
export function addMonths(d: string, months: number) {
  const date = new Date(d + "T12:00:00");
  date.setMonth(date.getMonth() + months);
  return date.toISOString().slice(0, 10);
}

/** Lo que una suscripción representa al mes. */
export function monthlyValue(amount: number, period: string) {
  const m = PERIODS[period]?.months || 0;
  return m ? Number(amount) / m : 0;
}

export const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
