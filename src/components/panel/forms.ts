// Campos de los formularios del panel (reutilizados en varias pantallas).
import type { Field } from "./ui";
import { PERIODS, STAGES, TX_CATEGORIES } from "@/lib/tickets";

type Opt = { value: string; label: string }[];

export const clientFields: Field[] = [
  { name: "name", label: "Nombre comercial", required: true, placeholder: "Talento Humano" },
  { name: "legal_name", label: "Razón social" },
  { name: "industry", label: "Giro", placeholder: "Reclutamiento, clínica, industrial…" },
  { name: "rfc", label: "RFC" },
  { name: "contact_name", label: "Persona de contacto" },
  { name: "phone", label: "Teléfono / WhatsApp", type: "tel" },
  { name: "email", label: "Correo para avisos", type: "email" },
  { name: "website", label: "Sitio web", type: "url", placeholder: "https://" },
  { name: "address", label: "Dirección", full: true },
  {
    name: "status", label: "Estado", type: "select", required: true,
    options: [
      { value: "activo", label: "Activo" },
      { value: "pausado", label: "Pausado" },
      { value: "inactivo", label: "Inactivo (sin acceso al portal)" },
    ],
  },
  { name: "color", label: "Color en el panel", type: "color" },
  { name: "logo_url", label: "Logo (URL de la imagen)", type: "url", placeholder: "https://…/logo.png", hint: "También puedes subirlo dando clic en el logo de su ficha." },
  {
    name: "support_enabled", label: "Soporte técnico, reparaciones y compra de equipos", type: "checkbox", full: true,
  },
  { name: "notes", label: "Notas", type: "textarea" },
];

export const projectFields = (clients: Opt): Field[] => [
  { name: "name", label: "Proyecto", required: true, full: true },
  { name: "client_id", label: "Cliente", type: "select", options: clients },
  { name: "type", label: "Tipo", placeholder: "Sitio web, chatbot, ERP, CCTV…" },
  { name: "stage", label: "Etapa", type: "select", required: true, options: Object.entries(STAGES).map(([v, s]) => ({ value: v, label: s.label })) },
  { name: "amount", label: "Monto acordado (sin IVA)", type: "number" },
  { name: "start_date", label: "Inicio", type: "date" },
  { name: "due_date", label: "Entrega", type: "date" },
  { name: "site_url", label: "URL del sitio / demo", type: "url" },
  { name: "repo_url", label: "Repositorio", type: "url" },
  { name: "description", label: "Alcance y notas", type: "textarea" },
];

export const subscriptionFields = (clients: Opt): Field[] => [
  { name: "client_id", label: "Cliente", type: "select", required: true, options: clients },
  { name: "name", label: "Servicio", required: true, placeholder: "Hosting y soporte, chatbot, licencia…" },
  { name: "amount", label: "Monto", type: "number", required: true },
  { name: "currency", label: "Moneda", type: "select", required: true, options: [{ value: "MXN", label: "MXN" }, { value: "USD", label: "USD" }] },
  { name: "period", label: "Periodo", type: "select", required: true, options: Object.entries(PERIODS).map(([v, p]) => ({ value: v, label: p.label })) },
  { name: "start_date", label: "Inicio", type: "date" },
  { name: "next_charge", label: "Próximo cobro", type: "date", required: true },
  { name: "status", label: "Estado", type: "select", required: true, options: ["activa", "pausada", "cancelada"].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) })) },
  { name: "notes", label: "Notas", type: "textarea" },
];

export const txFields = (kind: "ingreso" | "gasto", clients: Opt, projects: Opt): Field[] => [
  { name: "date", label: "Fecha", type: "date", required: true },
  { name: "amount", label: "Monto", type: "number", required: true },
  { name: "concept", label: "Concepto", required: true, full: true },
  { name: "category", label: "Categoría", type: "select", required: true, options: TX_CATEGORIES[kind].map((c) => ({ value: c, label: c })) },
  { name: "method", label: "Forma de pago", type: "select", options: ["Transferencia", "Efectivo", "Tarjeta", "Depósito", "Otro"].map((v) => ({ value: v, label: v })) },
  { name: "client_id", label: "Cliente", type: "select", options: clients },
  { name: "project_id", label: "Proyecto", type: "select", options: projects },
  { name: "paid", label: kind === "ingreso" ? "Ya está cobrado" : "Ya está pagado", type: "checkbox" },
  { name: "notes", label: "Notas", type: "textarea" },
];
