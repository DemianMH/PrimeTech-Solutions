import React from "react";
import { Code, ShieldCheck, LifeBuoy, Palette } from "lucide-react";

interface FeatureItemProps {
  heading: string;
  url?: string;
  info?: string;
  onPress?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  heading,
  url,
  info,
  onPress,
}) => {
  return (
    <a
      href={url}
      onClick={onPress}
      className="block p-3 hover:bg-gray-800 rounded-lg transition-colors"
    >
      <h4 className="font-medium text-white">{heading}</h4>
      <p className="text-sm text-gray-400 mt-1">{info}</p>
    </a>
  );
};

export const navLinks = [
  { text: "Inicio", url: "/" },
  {
    text: "Servicios",
    submenu: (
      <div className="grid grid-cols-1 gap-4">
        <FeatureItem
          heading="Desarrollo de Software"
          url="/servicios/desarrollo"
          info="Páginas, apps y software a medida."
        />
        <FeatureItem
          heading="Soporte IT y Help Desk"
          url="/servicios/soporte-it"
          info="Asistencia técnica especializada."
        />
        <FeatureItem
          heading="Hardware"
          url="/servicios/hardware"
          info="Compra, venta y reparación de equipos."
        />
        <FeatureItem
          heading="Ciberseguridad"
          url="/servicios/ciberseguridad"
          info="Protegemos tus activos digitales."
        />
        <FeatureItem
          heading="Infraestructura de Redes"
          url="/servicios/redes"
          info="Conectividad robusta y segura."
        />
      </div>
    ),
  },
  { text: "Diseño Gráfico", url: "/diseno-grafico" },
  { text: "Tienda", url: "/tienda" },
  { text: "Portafolio", url: "/portafolio" },
];

export const services = [
  {
    icon: <Code className="h-8 w-8 text-blue-500" />,
    title: "Desarrollo de Software",
    description: "Creamos aplicaciones web y software a medida, robustos y escalables para llevar tu negocio al siguiente nivel.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
    title: "Ciberseguridad",
    description: "Protegemos tus activos digitales con estrategias de seguridad avanzadas, auditorías y monitoreo constante.",
  },
  {
    icon: <LifeBuoy className="h-8 w-8 text-red-500" />,
    title: "Soporte IT y Help Desk",
    description: "Ofrecemos asistencia técnica especializada y soporte continuo para garantizar la operatividad de tus sistemas.",
  },
  {
    icon: <Palette className="h-8 w-8 text-purple-500" />,
    title: "Diseño Gráfico Profesional",
    description: "Construimos identidades de marca impactantes, desde logos y branding hasta material de impresión y publicidad digital.",
  },
];

export const logos = [
  { src: "/mikeyco-logo-corto-blanco.png", name: "Mike&Co" },
  { src: "/logoblanco.png", name: "Portofino" },
  { src: "/czc-projects.png", name: "CZC Projects" },
  { src: "/logovirkvigen.png", name: "Reavive la llama" },
  { src: "/tersus-logo.png", name: "Tersus Clean" },
];

export const testimonials = [
  {
    name: "Ana Gonzalez",
    company: "Innovate Inc",
    message: "El equipo de PrimeTech superó todas nuestras expectativas. El software que desarrollaron es robusto, rápido y exactamente lo que necesitábamos. ¡100% recomendados!",
    time: "11:34 AM",
  },
  {
    name: "Carlos Rodriguez",
    company: "Apex Enterprises",
    message: "Su servicio de ciberseguridad es de primer nivel. Detectaron vulnerabilidades que ni siquiera sabíamos que teníamos. Ahora operamos con mucha más tranquilidad.",
    time: "Ayer",
  },
];

export const portfolioProjects = [
  {
    id: 1,
    number: "01",
    title: "Sorteo Mike & Co",
    description: "Plataforma de e-commerce desarrollada para la gestión y ejecución de sorteos en línea. Un diseño moderno y un sistema de pago seguro para una experiencia de usuario excepcional.",
    tags: ["Desarrollo Web", "E-commerce", "Plataforma de Sorteos", "Diseño UI/UX"],
    imageUrl: "/portafolio/sorteomikeco.png",
    liveUrl: "https://sorteomikeco.com",
  },
  {
    id: 2,
    number: "02",
    title: "CZC Projects",
    description: "Sitio web corporativo para una constructora, enfocado en mostrar un portafolio de proyectos de alto impacto. Diseño elegante, profesional y totalmente adaptable a dispositivos móviles.",
    tags: ["Desarrollo Web", "Sitio Corporativo", "Diseño Adaptable"],
    imageUrl: "/portafolio/czcprojects.png",
    liveUrl: "https://czcprojects.com.mx",
  },
  {
    id: 3,
    number: "03",
    title: "Tersus Clean",
    description: "Landing page optimizada para la conversión, diseñada para una empresa de servicios de limpieza. El objetivo fue crear una presencia digital clara, directa y efectiva para captar nuevos clientes.",
    tags: ["Landing Page", "Diseño Web", "Optimización de Conversión"],
    imageUrl: "/portafolio/tersusclean.png",
    liveUrl: "https://tersusclean.com.mx",
  },
  {
    id: 4,
    number: "04",
    title: "Revive the Fire",
    description: "Página web para un evento o comunidad, con un diseño inspirador y dinámico. Se integraron funcionalidades para el registro y la comunicación con los asistentes.",
    tags: ["Diseño Web", "Página de Evento", "Gestión de Contenido"],
    imageUrl: "/portafolio/revivethefire.png",
    liveUrl: "https://revivethefire.info",
  },
  {
    id: 5,
    number: "05",
    title: "Portofino Conway",
    description: "Sitio web de e-commerce para un restaurante o negocio de comida, permitiendo a los clientes ver el menú y realizar pedidos en línea de forma fácil e intuitiva.",
    tags: ["Desarrollo Web", "E-commerce", "Restaurantes", "Pedidos en Línea"],
    imageUrl: "/portafolio/portofinoconway.png",
    liveUrl: "https://portofinoconway.com",
  },
];

export const servicesData = {
  desarrollo: {
    hero: {
      title: "Desarrollo de Software a Medida",
      tagline: "Construimos las herramientas digitales que impulsan tu visión y escalan tu negocio.",
      imageUrl: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    introduction: {
      title: "¿Tu software actual limita tu crecimiento?",
      content: "Muchas empresas operan con herramientas genéricas que no se adaptan a sus procesos únicos. Esto genera ineficiencia, limita la innovación y te deja un paso por detrás de la competencia. En PrimeTech, no creemos en soluciones universales."
    },
    features: [
      { title: "Aplicaciones Web y Móviles", description: "Desde PWA's hasta apps nativas, creamos experiencias fluidas y atractivas para tus usuarios en cualquier dispositivo." },
      { title: "Plataformas SaaS", description: "Desarrollamos modelos de Software como Servicio robustos y escalables, listos para monetizar tu idea." },
      { title: "Integración de API's", description: "Conectamos tus sistemas existentes, automatizamos flujos de trabajo y centralizamos tu información." },
      { title: "Mantenimiento y Evolución", description: "Tu software crecerá contigo. Ofrecemos soporte continuo y desarrollo evolutivo para adaptarnos a tus futuras necesidades." }
    ],
    process: {
      title: "Nuestro Proceso: De la Idea al Impacto",
      steps: [
        { name: "Descubrimiento", description: "Analizamos tus objetivos y desafíos para definir la estrategia tecnológica perfecta." },
        { name: "Diseño UI/UX", description: "Creamos interfaces intuitivas y atractivas que garantizan una experiencia de usuario memorable." },
        { name: "Desarrollo Ágil", description: "Construimos tu solución en ciclos iterativos, permitiendo flexibilidad y entregas rápidas." },
        { name: "Lanzamiento y Soporte", description: "Desplegamos la aplicación y te acompañamos para asegurar su éxito y rendimiento a largo plazo." }
      ]
    }
  },
  "soporte-it": {
    hero: {
      title: "Soporte IT y Help Desk",
      tagline: "Tu tranquilidad es nuestra prioridad. Operaciones fluidas, problemas resueltos.",
      imageUrl: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    introduction: {
      title: "¿Problemas técnicos que frenan a tu equipo?",
      content: "Cada minuto de inactividad es una pérdida de productividad y dinero. Un equipo sin soporte técnico eficiente se frustra y no puede alcanzar su máximo potencial. Estamos aquí para ser tu departamento de IT de confianza."
    },
    features: [
      { title: "Help Desk Remoto e In situ", description: "Soporte rápido y eficaz para resolver cualquier incidencia de tus empleados, donde sea que estén." },
      { title: "Mantenimiento Proactivo", description: "Monitoreamos tus sistemas 24/7 para prevenir problemas antes de que ocurran, garantizando la máxima disponibilidad." },
      { title: "Gestión de Infraestructura", description: "Administramos tus servidores, redes y dispositivos para que funcionen de manera óptima y segura." },
      { title: "Consultoría Tecnológica", description: "Te asesoramos en la adquisición y implementación de nuevas tecnologías para mejorar tu competitividad." }
    ],
    process: {
      title: "Cómo Garantizamos tu Operatividad",
      steps: [
        { name: "Auditoría Inicial", description: "Evaluamos tu infraestructura actual para identificar puntos débiles y oportunidades de mejora." },
        { name: "Plan de Acción", description: "Diseñamos una estrategia de soporte personalizada y un plan de mantenimiento proactivo." },
        { name: "Ejecución y Soporte", description: "Implementamos las mejoras y activamos nuestros canales de Help Desk para asistencia inmediata." },
        { name: "Reportes y Optimización", description: "Te entregamos informes periódicos de rendimiento y te proponemos optimizaciones continuas." }
      ]
    }
  },
  ciberseguridad: {
    hero: {
      title: "Ciberseguridad Avanzada",
      tagline: "Protegemos tu activo más valioso: tu información. Adelántate a las amenazas.",
      imageUrl: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    introduction: {
      title: "¿Estás preparado para un ciberataque?",
      content: "En el mundo digital actual, la pregunta no es si sufrirás un ataque, sino cuándo. Una brecha de seguridad puede costar millones en pérdidas y dañar irreparablemente tu reputación. La prevención es la mejor estrategia."
    },
    features: [
      { title: "Análisis de Vulnerabilidades", description: "Realizamos pruebas de penetración (pentesting) para descubrir y corregir fallos de seguridad en tus sistemas." },
      { title: "Monitoreo de Red 24/7", description: "Vigilancia constante de tu red para detectar y responder a actividades sospechosas en tiempo real." },
      { title: "Seguridad Cloud", description: "Configuramos y gestionamos la seguridad de tus entornos en la nube (AWS, Azure, Google Cloud) para proteger tus datos." },
      { title: "Capacitación de Empleados", description: "Entrenamos a tu equipo para que reconozcan intentos de phishing y otras tácticas de ingeniería social, tu primera línea de defensa." }
    ],
    process: {
      title: "Nuestro Escudo de Protección",
      steps: [
        { name: "Evaluación de Riesgos", description: "Identificamos los activos críticos de tu empresa y las amenazas potenciales a las que se enfrentan." },
        { name: "Diseño de Arquitectura Segura", description: "Creamos una estrategia de defensa en capas, implementando las mejores prácticas y herramientas." },
        { name: "Implementación y Monitoreo", description: "Desplegamos las soluciones de seguridad y comenzamos la vigilancia activa de tu ecosistema digital." },
        { name: "Respuesta a Incidentes", description: "En caso de un incidente, nuestro equipo actúa de inmediato para contener la amenaza y minimizar el impacto." }
      ]
    }
  },
    redes: {
    hero: {
      title: "Infraestructura de Redes",
      tagline: "Conectividad robusta, segura y de alta velocidad. La columna vertebral de tu negocio.",
      imageUrl: "https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    introduction: {
      title: "¿Tu red actual es un cuello de botella?",
      content: "Una red lenta, inestable o mal configurada afecta directamente la productividad de tu equipo y la experiencia de tus clientes. Una infraestructura de red moderna es esencial para soportar las demandas de aplicaciones en la nube, videoconferencias y transferencia de datos."
    },
    features: [
      { title: "Diseño y Cableado Estructurado", description: "Planificamos e implementamos redes físicas y Wi-Fi optimizadas para la máxima cobertura y rendimiento." },
      { title: "Configuración de Firewalls y VPNs", description: "Aseguramos el perímetro de tu red y habilitamos conexiones remotas seguras para tus colaboradores." },
      { title: "Gestión de Ancho de Banda", description: "Optimizamos el tráfico de tu red para priorizar aplicaciones críticas y garantizar una operación fluida." },
      { title: "Soluciones Wi-Fi de Alta Densidad", description: "Implementamos redes inalámbricas capaces de soportar cientos de dispositivos conectados simultáneamente en oficinas y eventos." }
    ],
    process: {
      title: "Construyendo tu Autopista Digital",
      steps: [
        { name: "Análisis de Requisitos", description: "Entendemos tus necesidades actuales y futuras de conectividad y seguridad." },
        { name: "Diseño de la Solución", description: "Elaboramos un plano detallado de la arquitectura de red, seleccionando los equipos adecuados." },
        { name: "Implementación y Pruebas", description: "Instalamos y configuramos todos los componentes, realizando pruebas exhaustivas para validar el rendimiento." },
        { name: "Monitoreo y Mantenimiento", description: "Ofrecemos servicios de gestión continua para asegurar que tu red opere siempre al máximo nivel." }
      ]
    }
  },
  hardware: {
    hero: {
      title: "Soluciones de Hardware",
      tagline: "Equipos de alto rendimiento, reparaciones expertas y asesoría para tu inversión tecnológica.",
      imageUrl: "https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    introduction: {
      title: "¿El equipo obsoleto está lastrando tu potencial?",
      content: "Trabajar con ordenadores lentos, servidores sobrecargados o periféricos defectuosos es una fuente constante de frustración y baja productividad. Invertir en el hardware adecuado es fundamental para que tu equipo pueda trabajar sin límites y con la máxima eficiencia."
    },
    features: [
      { title: "Venta de Equipo Personalizado", description: "Ensamblamos ordenadores y estaciones de trabajo a medida, optimizados para tus cargas de trabajo específicas (diseño, desarrollo, etc.)." },
      { title: "Adquisición de Servidores y Redes", description: "Te asesoramos en la compra e instalación de servidores, switches y otros equipos de infraestructura de red." },
      { title: "Reparación y Actualización", description: "Diagnosticamos y reparamos fallos en ordenadores y portátiles. Realizamos actualizaciones (RAM, SSD) para extender su vida útil." },
      { title: "Consultoría de Compra", description: "Analizamos tus necesidades y presupuesto para recomendarte las mejores opciones de hardware del mercado, evitando gastos innecesarios." }
    ],
     process: {
      title: "Nuestro Enfoque en Hardware",
      steps: [
        { name: "Evaluación de Necesidades", description: "Conversamos contigo para entender qué tareas realizarás y cuál es el rendimiento esperado." },
        { name: "Selección y Cotización", description: "Investigamos y te presentamos las mejores opciones de componentes o equipos que se ajusten a tus requisitos." },
        { name: "Ensamblaje e Instalación", description: "Si es un equipo a medida, lo ensamblamos con los más altos estándares. Si es equipo pre-construido, lo instalamos y configuramos." },
        { name: "Soporte y Garantía", description: "Te ofrecemos garantía por nuestro trabajo y soporte post-venta para cualquier duda o inconveniente." }
      ]
    }
  }
};

const WHATSAPP_NUMBER = "523334862414";

const generateWhatsAppLink = (productName: string) => {
  const message = `Hola, estoy interesado en el producto: *${productName}*. ¿Podrían darme más información?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const shopProducts = [
  {
    id: 1,
    name: "Sistema POS All-in-One para Retail",
    category: "Punto de Venta",
    idealFor: "Boutiques, tiendas de abarrotes, y pequeños comercios.",
    features: ["Pantalla táctil de 15\"", "Lector de código de barras", "Software de inventario pre-instalado"],
    imageUrl: "https://images.pexels.com/photos/4199490/pexels-photo-4199490.jpeg",
    whatsappUrl: generateWhatsAppLink("Sistema POS All-in-One para Retail"),
  },
  {
    id: 2,
    name: "Laptop Empresarial de Alto Rendimiento",
    category: "Laptops",
    idealFor: "Profesionales móviles, ejecutivos y equipos de ventas.",
    features: ["Procesador Core i7", "16GB RAM, 512GB SSD", "Diseño ligero y batería de larga duración"],
    imageUrl: "https://images.pexels.com/photos/811587/pexels-photo-811587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    whatsappUrl: generateWhatsAppLink("Laptop Empresarial de Alto Rendimiento"),
  },
  {
    id: 3,
    name: "PC Armada para Oficina de Alto Flujo",
    category: "PC Armadas",
    idealFor: "Oficinas, contadores y puestos administrativos.",
    features: ["Componentes optimizados para ofimática", "Gabinete sobrio y profesional", "Bajo consumo energético"],
    imageUrl: "https://images.pexels.com/photos/26966416/pexels-photo-26966416.jpeg",
    whatsappUrl: generateWhatsAppLink("PC Armada para Oficina de Alto Flujo"),
  },
  {
    id: 4,
    name: "Kit de Infraestructura de Red para PyMEs",
    category: "Estructura de Redes",
    idealFor: "Pequeñas y medianas empresas que buscan una red estable y segura.",
    features: ["Router de alta capacidad", "Switch de 24 puertos", "Access Point Wi-Fi 6"],
    imageUrl: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    whatsappUrl: generateWhatsAppLink("Kit de Infraestructura de Red para PyMEs"),
  },
  {
    id: 5,
    name: "Sistema de Videovigilancia IP (4 Cámaras)",
    category: "Cámaras",
    idealFor: "Almacenes, oficinas y locales comerciales que requieren seguridad.",
    features: ["Cámaras Full HD con visión nocturna", "Grabador NVR con 1TB de almacenamiento", "Acceso remoto desde el móvil"],
    imageUrl: "https://images.pexels.com/photos/13031873/pexels-photo-13031873.jpeg",
    whatsappUrl: generateWhatsAppLink("Sistema de Videovigilancia IP (4 Cámaras)"),
  },
  {
    id: 6,
    name: "Workstation para Diseño y Edición",
    category: "PC Armadas",
    idealFor: "Diseñadores gráficos, arquitectos y editores de video.",
    features: ["Tarjeta gráfica NVIDIA RTX", "32GB RAM de alta velocidad", "Almacenamiento SSD NVMe ultrarrápido"],
    imageUrl: "https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg",
    whatsappUrl: generateWhatsAppLink("Workstation para Diseño y Edición"),
  },
    {
    id: 7,
    name: "Rack de Comunicaciones (Site)",
    category: "Sites",
    idealFor: "Empresas que necesitan centralizar y proteger sus servidores y equipo de red.",
    features: ["Gabinete de 42U con ventilación", "Organizador de cables vertical", "PDU para distribución de energía"],
    imageUrl: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
    whatsappUrl: generateWhatsAppLink("Rack de Comunicaciones (Site)"),
  },
  {
    id: 8,
    name: "Terminal Móvil para Restaurantes",
    category: "Punto de Venta",
    idealFor: "Restaurantes, bares y food trucks para tomar órdenes en sitio.",
    features: ["Dispositivo Android robusto", "Impresora de tickets térmica integrada", "Software para gestión de mesas"],
    imageUrl: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg",
    whatsappUrl: generateWhatsAppLink("Terminal Móvil para Restaurantes"),
  },
];