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
      "Plataforma de sorteos con enfoque comercial: presentación del premio, paquetes visibles, experiencia móvil y ruta directa para comprar o pedir información.",
    impact: "Convierte interés en intención de compra con una navegación más clara, confiable y preparada para campañas.",
    tags: ["Sorteos", "Ecommerce", "Pagos", "Conversión"],
  },
  {
    title: "CZC Projects",
    category: "Sitio corporativo",
    image: "/portafolio/czcprojects.png",
    url: "https://czcprojects.com.mx",
    description:
      "Sitio corporativo para una integradora tecnológica con servicios de CCTV, paneles solares, cableado estructurado, redes, Wi-Fi y nodos.",
    impact: "Ordena servicios técnicos complejos en una presencia profesional que ayuda a captar proyectos de mayor valor.",
    tags: ["CCTV", "Redes", "Solar", "B2B"],
  },
  {
    title: "Tersus Clean",
    category: "Landing de conversión",
    image: "/portafolio/tersusclean.png",
    url: "https://tersusclean.com.mx",
    description:
      "Landing para empresa de limpieza con servicios de lavandería, tapicería, hogar, limpieza corporativa y productos especializados.",
    impact: "Presenta servicios de forma rápida y lleva al usuario hacia cotización por WhatsApp sin fricción.",
    tags: ["Servicios", "Limpieza", "Landing", "WhatsApp"],
  },
  {
    title: "Revive the Fire",
    category: "Sitio institucional",
    image: "/portafolio/revivethefire.png",
    url: "https://revivethefire.info",
    description:
      "Sitio bilingüe para ministerio y comunidad, con identidad visual, información de contacto y presencia digital para eventos y comunicación.",
    impact: "Da presencia digital seria, accesible y útil para comunicar mensajes, eventos y canales de contacto.",
    tags: ["Institucional", "Bilingue", "Comunidad", "Web"],
  },
  {
    title: "Portofino Conway",
    category: "Restaurante",
    image: "/portafolio/portofinoconway.png",
    url: "https://portofinoconway.com",
    description:
      "Sitio para restaurante italiano con navegación a menú, contacto, horarios, ubicación y accesos directos para ordenar por plataformas externas.",
    impact: "Reduce pasos para consultar menú, ubicación y pedidos, especialmente desde celular.",
    tags: ["Restaurante", "Menu", "Pedidos", "Local"],
  },
  {
    title: "Bere Cardenas Cosmetologia",
    category: "Cursos y LMS",
    image: "/portafolio/berecardenas.png",
    url: "https://berecardenascosmetologia.com.mx/",
    description:
      "Plataforma educativa para cosmetología profesional con cursos, presentación de autoridad, acceso de alumnos y enfoque en formación estética.",
    impact: "Construye confianza para vender cursos, explicar trayectoria y centralizar la experiencia de alumnos.",
    tags: ["LMS", "Cursos", "Cosmetologia", "Alumnos"],
  },
  {
    title: "INAPECC Consultoria",
    category: "Consultoria educativa",
    image: "/portafolio/inapecc.png",
    url: "https://consultoriainapecc.com/",
    description:
      "Landing profesional para consultoría pedagógica, gestión RVOE, proyectos curriculares, Acuerdo 286 y desarrollo institucional.",
    impact: "Convierte servicios educativos complejos en una lectura clara para escuelas, docentes y directivos.",
    tags: ["Consultoria", "Educacion", "RVOE", "Landing"],
  },
  {
    title: "Rifas El Guero",
    category: "Plataforma de rifas",
    image: "/portafolio/rifaselguero.png",
    url: "https://rifaselguero.com.mx/",
    description:
      "Sitio para rifas con verificador de boletos, sección de ganadores, pagos y contacto directo por WhatsApp.",
    impact: "Aumenta confianza para participantes y mejora la operación digital del sorteo.",
    tags: ["Rifas", "Verificador", "WhatsApp", "Landing"],
  },
];

export const automationProjects = [
  {
    title: "Seguimiento automático de prospectos",
    stack: "n8n + WhatsApp + Google Sheets + correo",
    category: "Ventas",
    description:
      "Flujo para recibir prospectos desde formularios o campañas, guardarlos en una base operativa, notificar al equipo y preparar el primer mensaje de seguimiento.",
    result:
      "Menos prospectos perdidos, respuesta más rápida y registro ordenado de cada oportunidad.",
    steps: ["Captura", "Validación", "Registro", "Alerta", "Seguimiento"],
  },
  {
    title: "Cotizaciones y solicitudes centralizadas",
    stack: "n8n + formularios + correo + hojas de cálculo",
    category: "Operación",
    description:
      "Automatización para ordenar solicitudes de clientes, clasificar servicio requerido, enviar aviso interno y dejar evidencia para seguimiento comercial.",
    result:
      "El equipo puede responder con más contexto y priorizar solicitudes urgentes sin revisar varios canales manualmente.",
    steps: ["Formulario", "Clasificación", "Asignación", "Correo", "Bitácora"],
  },
  {
    title: "Alertas internas para tareas críticas",
    stack: "n8n + email + calendario + base de datos",
    category: "Administración",
    description:
      "Flujos para recordar vencimientos, pagos, renovaciones, entregas y tareas que no pueden depender de memoria o mensajes sueltos.",
    result:
      "Mayor control de fechas, menos retrasos y mejor seguimiento de responsabilidades.",
    steps: ["Fecha clave", "Regla", "Recordatorio", "Escalamiento", "Cierre"],
  },
  {
    title: "Sincronización entre herramientas",
    stack: "n8n + CRM + spreadsheets + APIs",
    category: "Integraciones",
    description:
      "Conexión de sistemas para evitar capturas repetidas entre CRM, hojas de cálculo, formularios, correos y reportes internos.",
    result:
      "Información más limpia, menos errores humanos y operación preparada para crecer.",
    steps: ["Entrada", "Normalización", "API", "Actualización", "Reporte"],
  },
  {
    title: "Reportes automáticos de actividad",
    stack: "n8n + dashboards + email programado",
    category: "Dirección",
    description:
      "Resumen automático de prospectos, solicitudes, tareas o indicadores para tomar decisiones sin pedir reportes manuales cada semana.",
    result:
      "Visibilidad del negocio con datos actualizados y menos trabajo administrativo.",
    steps: ["Datos", "Filtro", "Resumen", "Envío", "Decisión"],
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
