import {
  BarChart3,
  Boxes,
  Building2,
  CalendarDays,
  Landmark,
  ShieldCheck,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";

/**
 * Módulos ERP a la medida desarrollados sobre Odoo 18, presentados de forma genérica
 * (sin nombres de clientes) para que cualquier empresa vea lo que puede tener.
 */
export type ErpArea = { title: string; icon: LucideIcon; color: string; text: string; modules: string[] };

export const erpAreas: ErpArea[] = [
  {
    title: "Contabilidad y finanzas",
    icon: Landmark,
    color: "#0ea5e9",
    text: "Control contable sobre la contabilidad nativa, con conciliación de bancos y facturación electrónica.",
    modules: [
      "Módulo de Contabilidad y CFDI",
      "Módulo de Bancos y Cajas (CxC y CxP)",
      "Módulo de Folio de factura real",
      "Módulo de Reporte de gastos multiempresa",
      "Módulo de Inventario fiscal y consignación",
    ],
  },
  {
    title: "Ventas y CRM",
    icon: ShoppingCart,
    color: "#22c55e",
    text: "Un solo CRM ligado a contactos, ventas, compras, facturas y entregas, con metas en tiempo real.",
    modules: [
      "Módulo de CRM unificado",
      "Módulo de Cotizador inteligente",
      "Módulo de Pronósticos y objetivos de venta",
      "Módulo de Prospección automática por correo",
      "Módulo de Plan de viaje comercial",
    ],
  },
  {
    title: "Inventario y almacén",
    icon: Boxes,
    color: "#f59e0b",
    text: "Inventario por código de barras, etiquetas y sincronización del catálogo con tiendas en línea.",
    modules: [
      "Módulo de Salidas por escáner (lector o celular)",
      "Módulo de Etiquetas con código de barras",
      "Módulo de Sincronización con sitio web y marketplaces",
      "Módulo de Seguimiento de importaciones por semana",
      "Módulo de Descarga de imágenes de producto",
    ],
  },
  {
    title: "Logística y flotillas",
    icon: Truck,
    color: "#a3e635",
    text: "Expediente único por servicio, talleres, autorizaciones y portal para que el cliente vea su operación.",
    modules: [
      "Módulo de Gestión de flotillas",
      "Módulo de Logística integrada",
      "Módulo de Checklists, talleres y autorizaciones",
      "Módulo de Telepeaje y consumibles",
      "Módulo de Portal de clientes",
    ],
  },
  {
    title: "Inmobiliaria y proyectos",
    icon: Building2,
    color: "#f97316",
    text: "Avance de obra, gasto, cronograma, unidades e inversionistas, con acceso por portal web.",
    modules: [
      "Módulo de Proyectos inmobiliarios",
      "Módulo de Avance y gasto de obra",
      "Módulo de Unidades e inversiones",
      "Módulo de Portales para inversionistas",
    ],
  },
  {
    title: "Inteligencia de negocio",
    icon: BarChart3,
    color: "#a855f7",
    text: "Tableros para dirección con KPIs, metas, pronósticos y alertas automáticas.",
    modules: [
      "Módulo de BI y KPIs",
      "Módulo de Centro de mando por empresa",
      "Módulo de Alertas y pronósticos",
      "Módulo de Tablero ejecutivo",
    ],
  },
  {
    title: "Productividad",
    icon: CalendarDays,
    color: "#ec4899",
    text: "Tableros tipo Trello, calendario operativo y automatizaciones guiadas para el día a día.",
    modules: [
      "Módulo de Tableros y actividades tipo Trello",
      "Módulo de Calendario operativo",
      "Módulo de Automatizaciones y tipo de cambio",
      "Módulo de Portada de inicio",
    ],
  },
  {
    title: "Seguridad y multiempresa",
    icon: ShieldCheck,
    color: "#38bdf8",
    text: "Cada persona ve solo lo suyo: permisos por puesto, por empresa y aislamiento de datos.",
    modules: [
      "Módulo de Roles y permisos por puesto",
      "Módulo de Multiempresa y aislamiento",
      "Módulo de Núcleo de seguridad",
    ],
  },
];

export const erpModuleCount = erpAreas.reduce((sum, area) => sum + area.modules.length, 0);
