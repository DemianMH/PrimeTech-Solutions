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
      className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
    >
      <h4 className="font-medium text-gray-900 dark:text-white">{heading}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{info}</p>
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