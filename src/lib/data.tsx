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
  { text: "Cursos", url: "/cursos" },
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