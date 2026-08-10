import {
  Bot,
  BrainCircuit,
  Camera,
  Cloud,
  Code2,
  Cpu,
  HardDrive,
  Network,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

export const siteConfig = {
  name: "PrimeTech Solutions",
  domain: "https://primetechsolutions.com.mx",
  phone: "523322555391",
  email: "contacto@primetechsolutions.com.mx",
  location: "Guadalajara, Jalisco, Mexico",
  description:
    "Soluciones de tecnología, automatización, sitios web, IA, CCTV, nube e infraestructura para negocios que quieren operar mejor y vender más.",
};

export const navItems = [
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export const paymentPolicy = [
  "Anticipo del 50% para iniciar proyectos mayores a $2,500 MXN.",
  "50% restante al terminar y antes de la entrega final.",
  "Proyectos menores a $2,500 MXN se liquidan en un solo pago.",
  "Incluye 7 días hábiles de ajustes sobre el alcance aprobado.",
];

export const processSteps = [
  {
    title: "Diagnostico",
    text: "Revisamos tu negocio, urgencia, objetivos, herramientas actuales y el impacto real que esperas.",
  },
  {
    title: "Propuesta clara",
    text: "Definimos alcance, tiempos, entregables, responsables y costo antes de iniciar.",
  },
  {
    title: "Construccion",
    text: "Trabajamos por avances visibles, validaciones cortas y pruebas para evitar sorpresas al final.",
  },
  {
    title: "Entrega y soporte",
    text: "Documentamos lo esencial, capacitamos a tu equipo y dejamos los 7 dias habiles de cambios.",
  },
];

export const services = [
  {
    slug: "automatizaciones",
    title: "Automatización de procesos",
    shortTitle: "Automatizaciones",
    icon: Zap,
    accent: "#14b8a6",
    summary:
      "Conectamos formularios, WhatsApp, CRM, hojas de cálculo, correos y tareas repetitivas para que tu equipo trabaje con menos fricción.",
    hook: "Menos capturas manuales, más seguimiento y respuestas más rápidas.",
    deliverables: [
      "Mapa del proceso actual y del proceso optimizado.",
      "Flujos con validaciones, alertas, registros y responsables.",
      "Integraciones con herramientas como WhatsApp, CRM, email, formularios y bases de datos.",
      "Pruebas con casos reales antes de activar el flujo.",
    ],
    outcomes: [
      "Reduce errores por captura manual.",
      "Mejora tiempos de respuesta.",
      "Deja trazabilidad de ventas, solicitudes y operaciones.",
    ],
    faq: [
      ["¿Puedo automatizar aunque no tenga CRM?", "Sí. Podemos iniciar con herramientas simples y escalar después."],
      ["¿Se puede conectar WhatsApp?", "Sí, dependiendo del proveedor y permisos disponibles para tu negocio."],
      ["¿Cuánto tarda?", "Automatizaciones pequeñas pueden tomar días; flujos complejos se calendarizan por etapas."],
    ],
  },
  {
    slug: "sitios-web",
    title: "Sitios web y landing pages",
    shortTitle: "Sitios web",
    icon: Code2,
    accent: "#2563eb",
    summary:
      "Creamos páginas rápidas, responsivas y pensadas para convertir visitas en cotizaciones, mensajes y clientes reales.",
    hook: "Tu sitio debe cargar rápido, verse premium y explicar por qué comprarte.",
    deliverables: [
      "Arquitectura de información, textos comerciales y llamados a la acción.",
      "Diseño responsivo para celular, tablet y escritorio.",
      "Formularios, WhatsApp, analítica, SEO técnico y optimización de velocidad.",
      "Publicación en hosting compatible como Netlify y configuración de dominio.",
    ],
    outcomes: [
      "Mayor confianza al enviar propuestas.",
      "Mas mensajes por WhatsApp y formularios.",
      "Mejor base para anuncios, Google y redes sociales.",
    ],
    faq: [
      ["¿Incluye dominio y hosting?", "Podemos configurarlos; el costo del proveedor se cotiza aparte."],
      ["¿Puedo editar contenido despues?", "Si el alcance lo requiere, dejamos una estructura editable o una guia sencilla."],
      ["¿Incluye SEO?", "Incluye SEO técnico inicial, sitemap, metadata y estructura limpia."],
    ],
  },
  {
    slug: "chatbots-agentes-ia",
    title: "Chatbots y agentes IA",
    shortTitle: "Chatbots IA",
    icon: BrainCircuit,
    accent: "#8b5cf6",
    summary:
      "Disenamos asistentes que responden preguntas, califican prospectos, levantan solicitudes y ayudan a tu equipo a vender o atender mejor.",
    hook: "Atencion constante sin perder el control de tu proceso comercial.",
    deliverables: [
      "Guion conversacional, base de conocimiento y reglas de escalamiento.",
      "Captura de datos, filtros de prospectos y resumen para tu equipo.",
      "Integracion con WhatsApp, web, formularios o CRM segun factibilidad.",
      "Pruebas de seguridad para evitar respuestas fuera de alcance.",
    ],
    outcomes: [
      "Respuestas más consistentes.",
      "Menos tiempo perdido en preguntas repetidas.",
      "Prospectos mejor calificados antes de hablar con ventas.",
    ],
    faq: [
      ["¿La IA reemplaza a mi equipo?", "No. La usamos para filtrar, informar y escalar cuando hace falta una persona."],
      ["¿Puede vender por WhatsApp?", "Puede orientar y levantar datos; pagos o cierres se definen segun tu flujo."],
      ["¿Se entrena con mi información?", "Sí. Trabajamos con documentos, preguntas frecuentes y reglas autorizadas."],
    ],
  },
  {
    slug: "venta-equipos",
    title: "Venta de equipos tecnologicos",
    shortTitle: "Venta de equipos",
    icon: Cpu,
    accent: "#ef4444",
    summary:
      "Te ayudamos a elegir computadoras, componentes, perifericos, puntos de venta y equipo de red segun uso real, presupuesto y crecimiento.",
    hook: "Compra equipo correcto desde el inicio, sin pagar de más por lo que no ocupas.",
    deliverables: [
      "Diagnostico de necesidad por puesto, area o sucursal.",
      "Recomendacion de equipo por rendimiento, garantia y disponibilidad.",
      "Cotización clara y opción de instalación/configuración.",
      "Preparación básica, software esencial y entrega documentada.",
    ],
    outcomes: [
      "Menos fallas por compras improvisadas.",
      "Mejor rendimiento para tu operacion diaria.",
      "Estandarización para soporte más rápido.",
    ],
    faq: [
      ["¿Venden solo computadoras?", "Tambien podemos cotizar perifericos, red, almacenamiento y equipo para operacion."],
      ["¿Incluye instalación?", "Puede incluirse según alcance y ubicación."],
      ["¿Puedo pedir varias opciones?", "Sí. Podemos darte alternativas por nivel de presupuesto."],
    ],
  },
  {
    slug: "cctv",
    title: "CCTV y videovigilancia",
    shortTitle: "CCTV",
    icon: Camera,
    accent: "#0ea5e9",
    summary:
      "Diseñamos soluciones de cámaras para negocios, oficinas, bodegas y hogares con enfoque en cobertura, grabación y acceso seguro.",
    hook: "Visibilidad real de tus espacios, sin instalaciones improvisadas.",
    deliverables: [
      "Levantamiento de zonas criticas, puntos ciegos y condiciones de luz.",
      "Propuesta de cámaras, grabador, almacenamiento y cableado.",
      "Instalación, configuración de acceso y pruebas de grabación.",
      "Guia de uso para revisar eventos y monitoreo basico.",
    ],
    outcomes: [
      "Mejor control de accesos y áreas importantes.",
      "Evidencia disponible cuando se necesita.",
      "Sistema preparado para crecer por etapas.",
    ],
    faq: [
      ["¿Puedo ver las cámaras desde el celular?", "Sí, configurando accesos seguros según el equipo elegido."],
      ["¿Cuántos días graba?", "Depende de cámaras, calidad y almacenamiento; lo calculamos en la propuesta."],
      ["¿Instalan cableado?", "Sí, si el alcance lo incluye, se considera ruta, materiales y tiempos."],
    ],
  },
  {
    slug: "infraestructura",
    title: "Infraestructura y redes",
    shortTitle: "Infraestructura",
    icon: Network,
    accent: "#f59e0b",
    summary:
      "Planeamos redes, cableado, Wi-Fi, racks y equipos para que tu negocio tenga conectividad estable y ordenada.",
    hook: "La red no debe notarse: debe funcionar todos los dias.",
    deliverables: [
      "Revision de cobertura, puntos de red, equipos y crecimiento esperado.",
      "Diseño de red, segmentación básica y recomendaciones de seguridad.",
      "Cableado, organizacion, etiquetado y pruebas segun proyecto.",
      "Documentacion de accesos, equipos y mapa basico.",
    ],
    outcomes: [
      "Menos caídas y zonas sin señal.",
      "Infraestructura más fácil de mantener.",
      "Base solida para CCTV, nube, POS y sistemas.",
    ],
    faq: [
      ["¿Atienden oficinas pequeñas?", "Sí. Podemos trabajar desde una oficina pequeña hasta varias áreas o sucursales."],
      ["¿Mejoran Wi-Fi?", "Sí. Revisamos ubicación, interferencias, capacidad y equipo."],
      ["¿Documentan la red?", "Sí, entregamos información básica para administrarla mejor."],
    ],
  },
  {
    slug: "nube",
    title: "Nube, respaldos y continuidad",
    shortTitle: "Nube",
    icon: Cloud,
    accent: "#22c55e",
    summary:
      "Configuramos respaldos, almacenamiento, correos, accesos y herramientas en la nube para proteger información y trabajar mejor.",
    hook: "Tu información debe estar disponible, ordenada y protegida.",
    deliverables: [
      "Revision de archivos, accesos, cuentas y riesgos actuales.",
      "Estrategia de respaldos, permisos y organización por áreas.",
      "Configuracion de servicios cloud segun necesidad y presupuesto.",
      "Pruebas de recuperacion y guia de uso.",
    ],
    outcomes: [
      "Menos riesgo de perder información.",
      "Mejor colaboracion entre equipos.",
      "Accesos controlados y faciles de auditar.",
    ],
    faq: [
      ["¿Sirve para mi negocio pequeño?", "Sí. La nube puede iniciar simple y crecer por etapas."],
      ["¿Incluye correos empresariales?", "Podemos configurarlos si el servicio elegido lo permite."],
      ["¿Hacen respaldos automáticos?", "Sí, cuando la herramienta y permisos lo permiten."],
    ],
  },
  {
    slug: "reparacion-equipo",
    title: "Reparación y soporte de equipo",
    shortTitle: "Reparación",
    icon: Wrench,
    accent: "#64748b",
    summary:
      "Diagnosticamos, reparamos y optimizamos computadoras para reducir interrupciones y extender la vida util del equipo.",
    hook: "Soporte claro: diagnóstico, opciones y entrega sin vueltas.",
    deliverables: [
      "Diagnostico de hardware, software, rendimiento y seguridad basica.",
      "Cotización de reparación o recomendación de reemplazo si conviene más.",
      "Mantenimiento, limpieza lógica, instalación o cambio de componentes.",
      "Pruebas finales y recomendaciones de uso.",
    ],
    outcomes: [
      "Equipos más estables y rápidos.",
      "Menos interrupciones en el trabajo diario.",
      "Decisiones claras entre reparar o renovar.",
    ],
    faq: [
      ["¿Pueden revisar antes de cotizar?", "Sí, el diagnóstico define la mejor ruta."],
      ["¿Recuperan información?", "Se evalúa cada caso y se informa el riesgo antes de actuar."],
      ["¿Atienden empresas?", "Sí, podemos programar soporte por equipos o áreas."],
    ],
  },
];

export const portfolio = [
  {
    title: "Operación comercial más rápida",
    category: "Automatizacion",
    result: "Seguimiento de prospectos con alertas, registros y flujo de cotización.",
  },
  {
    title: "Sitio de presentacion premium",
    category: "Sitio web",
    result: "Estructura clara para servicios, contacto directo y posicionamiento local.",
  },
  {
    title: "Red preparada para crecimiento",
    category: "Infraestructura",
    result: "Cableado ordenado, mejor cobertura Wi-Fi y base para cámaras y sistemas.",
  },
];

export const portfolioProjects = [
  {
    title: "Sorteo Mike & Co",
    category: "Plataforma de sorteos",
    image: "/portafolio/sorteomikeco.png",
    url: "https://sorteomikeco.com",
    description:
      "Plataforma de venta de boletos para sorteos premium. La experiencia guia al usuario para elegir paquetes, revisar detalles del premio y comprar de forma directa.",
    impact: "Compra digital clara, paquetes visibles y flujo preparado para conversión.",
    tags: ["Sorteos", "Ecommerce", "Pagos", "UI/UX"],
  },
  {
    title: "CZC Projects",
    category: "Sitio corporativo",
    image: "/portafolio/czcprojects.png",
    url: "https://czcprojects.com.mx",
    description:
      "Sitio para integradora de soluciones tecnológicas enfocada en cámaras de seguridad, paneles solares, cableado estructurado, Wi-Fi y nodos de red.",
    impact: "Presencia profesional para explicar servicios tecnicos y captar proyectos de mayor valor.",
    tags: ["CCTV", "Redes", "Solar", "Corporativo"],
  },
  {
    title: "Tersus Clean",
    category: "Landing de conversión",
    image: "/portafolio/tersusclean.png",
    url: "https://tersusclean.com.mx",
    description:
      "Landing para empresa de limpieza con servicios de lavanderia, tapiceria, hogar, limpieza corporativa y productos especializados.",
    impact: "Mensaje comercial directo, servicios claros y contacto rápido para cotizaciones.",
    tags: ["Servicios", "Limpieza", "Landing", "WhatsApp"],
  },
  {
    title: "Revive the Fire",
    category: "Sitio institucional",
    image: "/portafolio/revivethefire.png",
    url: "https://revivethefire.info",
    description:
      "Sitio bilingüe para ministerio y comunidad, con identidad visual, información de contacto y presencia digital para eventos y comunicación.",
    impact: "Marca institucional más clara y accesible para comunidad internacional.",
    tags: ["Institucional", "Bilingue", "Comunidad", "Web"],
  },
  {
    title: "Portofino Conway",
    category: "Restaurante",
    image: "/portafolio/portofinoconway.png",
    url: "https://portofinoconway.com",
    description:
      "Sitio para restaurante italiano con navegación a menú, contacto, horarios, ubicación y accesos directos para ordenar por plataformas externas.",
    impact: "Experiencia móvil pensada para encontrar información y pedir rápido.",
    tags: ["Restaurante", "Menu", "Pedidos", "Local"],
  },
  {
    title: "Bere Cardenas Cosmetologia",
    category: "Cursos y LMS",
    image: "/portafolio/berecardenas.png",
    url: "https://berecardenascosmetologia.com.mx/",
    description:
      "Plataforma educativa para cosmetología profesional con cursos, presentación de autoridad, acceso de alumnos y enfoque en formación estética.",
    impact: "Base digital para vender cursos, mostrar trayectoria y gestionar aprendizaje.",
    tags: ["LMS", "Cursos", "Cosmetologia", "Alumnos"],
  },
  {
    title: "INAPECC Consultoria",
    category: "Consultoria educativa",
    image: "/portafolio/inapecc.png",
    url: "https://consultoriainapecc.com/",
    description:
      "Landing profesional para consultoría pedagógica, gestión RVOE, proyectos curriculares, Acuerdo 286 y desarrollo institucional.",
    impact: "Contenido ordenado para explicar servicios complejos y generar confianza.",
    tags: ["Consultoria", "Educacion", "RVOE", "Landing"],
  },
  {
    title: "Rifas El Guero",
    category: "Plataforma de rifas",
    image: "/portafolio/rifaselguero.png",
    url: "https://rifaselguero.com.mx/",
    description:
      "Sitio para rifas con verificador de boletos, seccion de ganadores, pagos y contacto directo por WhatsApp.",
    impact: "Mas confianza para participantes y operacion digital de sorteos.",
    tags: ["Rifas", "Verificador", "WhatsApp", "Landing"],
  },
];

export const trustSignals = [
  { value: "7 dias", label: "habiles de ajustes incluidos" },
  { value: "50/50", label: "pago por avance en proyectos" },
  { value: "8 áreas", label: "tecnológicas cubiertas" },
  { value: "1 equipo", label: "que entiende software e infraestructura" },
];

export const serviceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);

export const iconMap = {
  Bot,
  HardDrive,
  ShieldCheck,
  Sparkles,
};
