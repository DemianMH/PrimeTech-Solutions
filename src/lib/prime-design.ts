export const designBrand = {
  name: "Prime Design",
  whatsapp: "523322555391",
  email: "contacto@primetechsolutions.com.mx",
};

export const designNav = [
  { label: "Catálogo", href: "/prime-design/catalogo" },
  { label: "Marca", href: "/prime-design/branding" },
  { label: "Marketing", href: "/prime-design/marketing" },
  { label: "Portafolio", href: "/prime-design/portafolio" },
];

export const catalogFiles = [
  "10mil-volantes.jpg",
  "5mil-volantes.jpg",
  "adherible-fasson.png",
  "albanene.png",
  "barniz-antigraffiti.png",
  "barniz-brillante.png",
  "canvas.png",
  "carpetas-brillante.jpg",
  "coroplast.png",
  "corte-vinil-120cm.png",
  "corte-vinil-58cm.png",
  "corte-vinil-esmerilado-120cm.png",
  "corte-vinil-esmerilado-58cm.png",
  "corte-vinil-espejo.png",
  "corte-vinil-fluorescente.png",
  "corte-vinil-textil.png",
  "corte-vinil.png",
  "couche-150gr.png",
  "couche-300gr.png",
  "display-60x160.png",
  "display-80x180.png",
  "display-arana.png",
  "doblez.png",
  "dtf.png",
  "estireno-cal15-fv.png",
  "estireno-cal15.png",
  "folders.png",
  "gafete-pvc.png",
  "hojas-membretadas-120gr.jpeg",
  "hojas-membretadas-1tinta.png",
  "hojas-membretadas-2tintas.jpg",
  "hojas-membretadas-carta-90gr.jpg",
  "hojas-membretadas-oficio.jpg",
  "hojas-membretadas.png",
  "iman-automotriz.png",
  "lamina-coroplast.png",
  "lamina-trovicel.png",
  "laminado-floor-graphic.png",
  "laminado-transparente.png",
  "lona-front.png",
  "lona-mate.jpg",
  "lona-mesh.png",
  "lona-terminados.jpg",
  "lona-translucida.jpg",
  "mousepad.png",
  "notas-bond-cuarto.jpeg",
  "notas-bond-media.jpg",
  "notas-bond-oficio.jpeg",
  "notas-carta-fv-copia.png",
  "notas-cuarto-copia.jpeg",
  "notas-media-copia.jpg",
  "notas-remision.png",
  "ojillos.png",
  "opalina-240gr.png",
  "pelicula-backlight.png",
  "pin-58mm.png",
  "playera-dtf-adulto.png",
  "playera-dtf-nino.png",
  "playera-sublimada-frente.png",
  "playera-sublimada-fv.png",
  "playera-sublimada.png",
  "recetarios-medicos.png",
  "recetas-bond-90gr.jpg",
  "recetas-color-120gr.png",
  "redondeo-esquina.png",
  "rollup.png",
  "tarjetas-frente-brillante.jpeg",
  "tarjetas-fv-brillante.jpg",
  "tarjetas-laminado-mate.png",
  "taza-blanca.png",
  "taza-interior-color.png",
  "taza-magica.png",
  "tela-bandera.png",
  "tripticos.png",
  "trovicel-3mm.png",
  "vinil-blanco-suaje.jpeg",
  "vinil-brillante.png",
  "vinil-color-impreso.jpg",
  "vinil-color-suaje.jpg",
  "vinil-esmerilado.jpg",
  "vinil-estatico.jpg",
  "vinil-holografico.jpeg",
  "vinil-laminado.jpeg",
  "vinil-mate.jpg",
  "vinil-microperforado.png",
  "vinil-reflejante-3m.jpg",
  "vinil-reflejante-suaje.jpg",
  "vinil-textil-impreso.png",
  "vinil-transparente-suaje.jpeg",
  "vinil-transparente.png",
  "volantes-bond-1tinta.jpg",
  "volantes-bond-color.jpg",
  "volantes-cuarto-carta.png",
  "volantes-media-carta.png",
  "volantes-media-frente.jpg",
  "volantes-media-fv.png",
];

export type DesignProduct = {
  slug: string;
  title: string;
  category: string;
  image: string;
  use: string;
  specs: string[];
  formFields: string[];
};

const categoryRules = [
  { match: ["lona", "rollup", "display", "coroplast", "trovicel", "backlight", "tela-bandera", "estireno"], category: "Gran formato" },
  { match: ["vinil", "laminado", "adherible", "iman"], category: "Viniles y adhesivos" },
  { match: ["tarjetas", "volantes", "tripticos", "folders", "hojas", "notas", "recetas", "recetarios"], category: "Papeleria comercial" },
  { match: ["playera", "taza", "mousepad", "pin", "dtf"], category: "Promocionales" },
  { match: ["barniz", "doblez", "ojillos", "redondeo"], category: "Acabados" },
  { match: ["couche", "opalina", "albanene", "canvas"], category: "Materiales" },
];

const titleCase = (slug: string) =>
  slug
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/-/g, " ")
    .replace(/\bfv\b/gi, "frente y vuelta")
    .replace(/\bgr\b/gi, "gr")
    .replace(/\bcm\b/gi, "cm")
    .replace(/\b3m\b/gi, "3M")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const slugFromFile = (file: string) => file.replace(/\.(jpg|jpeg|png|webp)$/i, "");

export const designCategories = Array.from(
  new Set(catalogFiles.map((file) => getDesignProduct(slugFromFile(file)).category))
);

export function getDesignProduct(slug: string): DesignProduct {
  const file = catalogFiles.find((item) => slugFromFile(item) === slug) || catalogFiles[0];
  const lower = file.toLowerCase();
  const category =
    categoryRules.find((rule) => rule.match.some((word) => lower.includes(word)))?.category || "Impresion";
  const isLona = lower.includes("lona");
  const isVinyl = lower.includes("vinil") || lower.includes("adherible");
  const isApparel = lower.includes("playera") || lower.includes("dtf");
  const isPromo = isApparel || lower.includes("taza") || lower.includes("pin") || lower.includes("mousepad");
  const isPaper = ["tarjetas", "volantes", "tripticos", "folders", "hojas", "notas", "recetas"].some((word) =>
    lower.includes(word)
  );

  const formFields = [
    "Nombre y WhatsApp",
    "Cantidad aproximada",
    "¿Con diseño o sin diseño?",
    "Fecha ideal de entrega",
    "Subir archivo o indicar si necesita diseño",
  ];

  if (isLona || isVinyl) {
    formFields.splice(2, 0, "Medida final en cm o metros", "Uso: interior, exterior, evento o aparador");
  }
  if (isPaper) {
    formFields.splice(2, 0, "Tamaño final", "Impresión: frente o frente y vuelta", "Tipo de papel o acabado");
  }
  if (isPromo) {
    formFields.splice(2, 0, "Talla, color o variante", "Ubicacion del estampado", "Numero de tintas o arte");
  }

  return {
    slug,
    title: titleCase(file),
    category,
    image: `/diseño-grafico/${file}`,
    use: getProductUse(lower, category),
    specs: getProductSpecs(lower, category),
    formFields,
  };
}

export const designProducts = catalogFiles.map((file) => getDesignProduct(slugFromFile(file)));

function getProductUse(file: string, category: string) {
  if (file.includes("lona")) return "Ideal para fachadas, eventos, promociones, anuncios temporales y puntos de venta.";
  if (file.includes("vinil")) return "Sirve para rotulación, etiquetas, aparadores, vehículos, decoración y señalización.";
  if (file.includes("tarjetas")) return "Ayuda a presentar tu marca con una primera impresión profesional y consistente.";
  if (file.includes("volantes") || file.includes("tripticos")) return "Perfecto para promociones, menus, campanas locales y activaciones comerciales.";
  if (file.includes("playera") || file.includes("taza") || file.includes("pin")) return "Producto util para equipos, eventos, regalos corporativos y merchandising.";
  if (file.includes("hojas") || file.includes("folders")) return "Fortalece documentos, propuestas, entregas y comunicacion institucional.";
  if (category === "Acabados") return "Agrega protección, mejor tacto y un acabado más profesional a tus impresos.";
  return "Pensado para que tu marca se vea clara, cuidada y lista para vender mejor.";
}

function getProductSpecs(file: string, category: string) {
  const base = ["Cotización por medida, cantidad y acabado", "Opción con diseño o con archivo listo", "Revisión antes de producir"];
  if (file.includes("lona")) return ["Medida personalizada", "Opciones de ojillos, bastilla o refuerzo", "Material segun uso interior o exterior", ...base];
  if (file.includes("vinil")) return ["Suaje, impresión o corte según producto", "Acabado mate, brillante, transparente o especial", "Aplicación según superficie", ...base];
  if (category === "Papeleria comercial") return ["Frente o frente y vuelta", "Papel y gramaje segun presupuesto", "Acabados como laminado, doblez o redondeo", ...base];
  if (category === "Promocionales") return ["Color, talla o variante", "Área de impresión", "Cantidad por modelo", ...base];
  return base;
}

export const brandServices = [
  {
    title: "Identidad visual",
    text: "Logo, paleta, tipografias, usos correctos y piezas base para que tu negocio se vea consistente.",
  },
  {
    title: "Diseño de marca",
    text: "Sistema visual para redes, impresos, presentaciones, menu, etiquetas, uniformes y comunicacion comercial.",
  },
  {
    title: "Material comercial",
    text: "Volantes, tarjetas, catálogos, lonas, displays, carpetas, stickers y piezas listas para imprimir.",
  },
];

export const marketingServices = [
  {
    title: "Redes sociales",
    text: "Parrilla de contenido, diseños por formato, copies, promociones y piezas para mantener presencia constante.",
  },
  {
    title: "Campanas locales",
    text: "Creativos para promociones, aperturas, eventos, temporadas, anuncios y activaciones con llamada clara.",
  },
  {
    title: "Contenido que vende",
    text: "Mensajes simples, beneficios visibles, prueba social, antes/despues y ofertas faciles de entender.",
  },
];

export const invitationWebProjects = [
  {
    title: "Luz & Fabián",
    category: "Boda",
    url: "https://luzyfabian.netlify.app/",
    description:
      "Invitación web personalizada con apertura de sobre, identidad floral, información del evento y experiencia enfocada en celular.",
    images: {
      desktop: "/prime-design-portfolio/luz-y-fabian-desktop.png",
      tablet: "/prime-design-portfolio/luz-y-fabian-tablet.png",
      mobile: "/prime-design-portfolio/luz-y-fabian-mobile.png",
    },
  },
  {
    title: "Cumpleaños de César Adrián",
    category: "Cumpleaños infantil",
    url: "https://cumplecesaradrian.netlify.app/",
    description:
      "Invitación digital infantil con portada temática, datos de la celebración y recorrido visual adaptable a cualquier pantalla.",
    images: {
      desktop: "/prime-design-portfolio/cumple-cesar-adrian-desktop.png",
      tablet: "/prime-design-portfolio/cumple-cesar-adrian-tablet.png",
      mobile: "/prime-design-portfolio/cumple-cesar-adrian-mobile.png",
    },
  },
  {
    title: "Cumpleaños de Cristian",
    category: "Cumpleaños",
    url: "https://cumplecristian.netlify.app/",
    description:
      "Invitación web para una celebración de 41 años, con una presentación directa, elegante y pensada para compartirse por mensaje.",
    images: {
      desktop: "/prime-design-portfolio/cumple-cristian-desktop.png",
      tablet: "/prime-design-portfolio/cumple-cristian-tablet.png",
      mobile: "/prime-design-portfolio/cumple-cristian-mobile.png",
    },
  },
];

export const invitationTemplateProjects = [
  {
    title: "Plantilla Ana",
    category: "Plantilla web",
    url: "https://cerulean-chaja-b31358.netlify.app/",
    description:
      "Concepto personalizable para celebración con composición editorial, efectos suaves y secciones preparadas para adaptar datos, colores e imágenes.",
    images: {
      desktop: "/prime-design-portfolio/plantilla-cerulean-desktop.png",
      tablet: "/prime-design-portfolio/plantilla-cerulean-tablet.png",
      mobile: "/prime-design-portfolio/plantilla-cerulean-mobile.png",
    },
  },
  {
    title: "Plantilla Pavel & Alina",
    category: "Plantilla de boda",
    url: "https://helpful-sfogliatella-b5b011.netlify.app/",
    description:
      "Plantilla web de boda con estética romántica, jerarquía clara y estructura lista para personalizar cada detalle del evento.",
    images: {
      desktop: "/prime-design-portfolio/plantilla-helpful-desktop.png",
      tablet: "/prime-design-portfolio/plantilla-helpful-tablet.png",
      mobile: "/prime-design-portfolio/plantilla-helpful-mobile.png",
    },
  },
];

export const invitationPublishedProjects = [
  {
    title: "Invitación web estilo clásico",
    category: "Invitación web",
    url: "https://www.instagram.com/reel/DBujJBDxheK/",
    image: "/prime-design-portfolio/invitacion-web-clasica-limpia.png",
    description:
      "Proyecto web de estilo clásico documentado en video, con una presentación elegante para compartir información de la celebración.",
  },
];

export const invitationPdfProjects = [
  {
    title: "Boda ranchera",
    category: "Invitación PDF",
    url: "https://www.instagram.com/reel/DC2HN9PKFdW/",
    image: "/prime-design-portfolio/boda-ranchera-pdf-limpia.png",
    description:
      "Invitación digital en PDF con una dirección visual ranchera creada para una boda temática.",
  },
  {
    title: "Celebración mágica",
    category: "Invitación PDF",
    url: "https://www.instagram.com/reel/DCkGPSQSwlP/",
    image: "/prime-design-portfolio/celebracion-magica-pdf-limpia.png",
    description:
      "Pieza digital personalizada para compartir una celebración con una composición visual cálida y memorable.",
  },
  {
    title: "Invitación de princesas",
    category: "Invitación PDF infantil",
    url: "https://www.instagram.com/reel/C_I2-iMRdfE/",
    image: "/prime-design-portfolio/princesas-pdf-limpia.png",
    description:
      "Diseño digital infantil en PDF con temática de princesas, adaptado a los datos y estilo de la celebración.",
  },
  {
    title: "XV años",
    category: "Invitación PDF",
    url: "https://www.instagram.com/reel/C_f46_QRqc9/",
    image: "/prime-design-portfolio/xv-anos-pdf-limpia.png",
    description:
      "Invitación digital para XV años con presentación editorial y formato práctico para compartir desde el celular.",
  },
];
