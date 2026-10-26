import { portfolioProjects } from "@/lib/site";

export type ShowcaseProject = {
  slug: string;
  title: string;
  category: string;
  url: string;
  /** El sitio permite mostrarse dentro de un iframe (sin X-Frame-Options / frame-ancestors). */
  embeddable: boolean;
  featured?: boolean;
  accent: string;
  shots: { desktop: string; mobile: string };
  description: string;
  impact: string;
  highlights: string[];
  tags: string[];
};

const live = (slug: string) => ({
  desktop: `/portafolio/live/${slug}-desktop.jpg`,
  mobile: `/portafolio/live/${slug}-mobile.jpg`,
});

/** Proyectos más recientes: se muestran primero y destacados. */
const featuredProjects: ShowcaseProject[] = [
  {
    slug: "flotilla-nacional",
    title: "Flotilla Nacional (CFN)",
    category: "Plataforma de gestión de flotillas",
    url: "https://flotillanacional.com/",
    embeddable: false,
    featured: true,
    accent: "#c6f432",
    shots: live("flotilla-nacional"),
    description:
      "Plataforma para una empresa que coordina mantenimiento, suministros, telepeaje y una red de talleres para flotillas en todo México. El sitio explica el servicio y muestra cómo se ve la operación desde dentro.",
    impact:
      "Convierte un servicio complejo de logística en una experiencia clara: el cliente entiende el proceso, la cobertura y lo que verá en su portal antes de solicitar el diagnóstico.",
    highlights: [
      "Seguimiento visual del servicio en 7 etapas, de la solicitud al cierre.",
      "Mapa interactivo de cobertura nacional con proveedores vinculados.",
      "Portal cliente con vista demo: unidades, servicios, documentos, evidencias y finanzas.",
      "Diseño oscuro de alto contraste, SVG/WebP y sitemap para SEO.",
    ],
    tags: ["Portal cliente", "Logística", "Mapa interactivo", "B2B"],
  },
  {
    slug: "constructora-444",
    title: "Constructora 4:44",
    category: "Plataforma inmobiliaria y crowdfunding",
    url: "https://constructora444.com/",
    embeddable: false,
    featured: true,
    accent: "#e8b04b",
    shots: live("constructora-444"),
    description:
      "Sitio para una constructora e inmobiliaria de Guadalajara: venta de casas y departamentos, construcción para terceros, supervisión de obra y crowdfunding inmobiliario para inversionistas.",
    impact:
      "Une venta, inversión y confianza en un solo lugar: cada proyecto tiene su ficha con datos clave y el visitante puede agendar visita o pedir cotización sin salir del sitio.",
    highlights: [
      "Fichas de proyectos activos y entregados con unidades, superficie y precio.",
      "Formulario para agendar visita o llamada eligiendo proyecto y horario.",
      "Portales privados para inversionistas e inmobiliarias aliadas.",
      "Imágenes WebP responsivas y versión de logo para fondo claro y oscuro.",
    ],
    tags: ["Inmobiliaria", "Crowdfunding", "Portal privado", "Leads"],
  },
  {
    slug: "abisai-handbags",
    title: "Abisai Handbags",
    category: "Catálogo mayorista administrable",
    url: "https://abisaihandbags.com/",
    embeddable: false,
    featured: true,
    accent: "#e58fb1",
    shots: live("abisai-handbags"),
    description:
      "Catálogo para un importador y distribuidor de bolsas, carteras y mochilas al mayoreo en Zapopan, con envíos a todo México y colecciones por temporada.",
    impact:
      "Lleva al comprador mayorista del interés a la conversación: filtra por categoría o temporada, recibe una recomendación rápida y solicita acceso de mayoreo o escribe por WhatsApp.",
    highlights: [
      "Catálogo filtrable por categoría y temporada, con catálogos digitales.",
      "Asistente «Descúbrelo en 10 segundos» que recomienda según uso y estilo.",
      "Solicitud de acceso mayorista y sección de colaboraciones con marcas.",
      "Panel de administración para cargar y actualizar productos.",
    ],
    tags: ["Catálogo", "Mayoreo", "Panel admin", "WhatsApp"],
  },
];

/** Sitios con cabeceras verificadas que permiten mostrarse en iframe. */
const embeddableUrls = new Set([
  "https://czcprojects.com.mx",
  "https://tersusclean.com.mx",
  "https://portofinoconway.com",
  "https://berecardenascosmetologia.com.mx/",
  "https://rifaselguero.com.mx/",
]);

/** Sitios que hoy no responden: se usan las capturas guardadas del portafolio anterior. */
const offlineShots = new Set(["sorteo-mike", "inapecc"]);

const accents = ["#38bdf8", "#a78bfa", "#34d399", "#fb7185", "#fbbf24", "#22d3ee", "#f472b6", "#60a5fa", "#4ade80", "#f97316"];

const slugFromImage = (path: string) => path.split("/").pop()!.replace(/-desktop\.png$/, "");

const legacyProjects: ShowcaseProject[] = portfolioProjects.map((project, index) => {
  const slug = slugFromImage(project.images.desktop);
  return {
    slug,
    title: project.title,
    category: project.category,
    url: project.url,
    embeddable: embeddableUrls.has(project.url),
    accent: accents[index % accents.length],
    shots: live(slug),
    description: project.description,
    impact: project.impact,
    highlights: [],
    tags: project.tags,
  };
});

export const showcaseProjects: ShowcaseProject[] = [...featuredProjects, ...legacyProjects];
export const featuredShowcase = featuredProjects;
