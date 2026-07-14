"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  DatabaseZap,
  Globe2,
  MessageCircle,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Workflow,
} from "lucide-react";

const whatsappText = encodeURIComponent(
  "Hola Demian, quiero información de los servicios de PrimeTech Solutions."
);
const whatsappUrl = `https://wa.me/523330620287?text=${whatsappText}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const services: Array<{
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  forWho: string;
}> = [
  {
    icon: Bot,
    title: "Chatbots con IA para WhatsApp",
    subtitle: "Atención inmediata y filtrado de prospectos",
    description:
      "Creamos flujos que responden preguntas frecuentes, capturan datos, separan clientes reales y reducen mensajes repetidos.",
    deliverables: ["Guion conversacional", "Preguntas frecuentes", "Captura de datos", "Transferencia a humano"],
    forWho: "Clínicas, comercios, inmobiliarias, servicios urgentes y ecommerce.",
  },
  {
    icon: Workflow,
    title: "ManyChat y automatización comercial",
    subtitle: "Instagram, WhatsApp y campañas conectadas",
    description:
      "Diseñamos automatizaciones para responder, etiquetar, recuperar clientes y llevarlos desde redes sociales hasta WhatsApp.",
    deliverables: ["Flujos ManyChat", "Etiquetas", "Secuencias", "Mensajes de recuperación"],
    forWho: "Tiendas, marcas personales, ventas por catálogo y negocios con redes activas.",
  },
  {
    icon: DatabaseZap,
    title: "GoHighLevel y CRM",
    subtitle: "Seguimiento de prospectos y pipeline de ventas",
    description:
      "Configuramos embudos, formularios, pipelines y automatizaciones para que cada prospecto tenga seguimiento y no se pierda.",
    deliverables: ["Pipeline", "Formularios", "Landing pages", "Automatizaciones"],
    forWho: "Empresas con ventas consultivas, servicios B2B, clínicas, cursos y agencias.",
  },
  {
    icon: Globe2,
    title: "Sitios web y landing pages",
    subtitle: "Diseño moderno, móvil y orientado a conversión",
    description:
      "Creamos sitios que explican tu oferta, generan confianza y convierten visitas en WhatsApp, llamadas o formularios.",
    deliverables: ["UX/UI", "SEO técnico", "Copy de venta", "Formulario y WhatsApp"],
    forWho: "Negocios locales, servicios profesionales, constructoras, clínicas y comercios.",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce y catálogos digitales",
    subtitle: "Productos ordenados y pedidos más rápidos",
    description:
      "Desarrollamos tiendas, catálogos por categoría y páginas de producto conectadas a WhatsApp, pago o formularios.",
    deliverables: ["Catálogo", "Categorías", "Botones de pedido", "SEO de producto"],
    forWho: "Comercios de mayoreo, perfumes, ropa, alimentos, insumos y productos visuales.",
  },
  {
    icon: ShieldCheck,
    title: "Soporte IT, redes y seguridad",
    subtitle: "Operación tecnológica para empresas",
    description:
      "Apoyamos con redes, equipos, cableado, soporte, sitios, cámaras, mantenimiento y mejoras de infraestructura.",
    deliverables: ["Diagnóstico", "Soporte remoto", "Infraestructura", "Mantenimiento"],
    forWho: "Oficinas, comercios, escuelas, consultorios y empresas en crecimiento.",
  },
];

const seoServices = [
  "Página web para negocio en Guadalajara",
  "Chatbot para WhatsApp Business",
  "Automatización de ventas con IA",
  "Catálogo digital para vender por WhatsApp",
  "GoHighLevel para seguimiento de clientes",
  "ManyChat para Instagram y WhatsApp",
  "SEO local para negocios de Zapopan",
  "Landing page para captar cotizaciones",
];

export default function ServiciosPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl text-center">
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
          Servicios digitales para negocios de Jalisco
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl">
          Web, WhatsApp, IA y CRM para convertir prospectos en clientes.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Te ayudamos a construir una presencia digital que no solo se vea bien, sino que responda rápido, capture datos, ordene conversaciones y genere ventas.
        </motion.p>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.article key={service.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass-card rounded-[1.75rem] p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
              <service.icon className="h-6 w-6" />
            </div>
            <p className="mt-5 text-sm font-bold text-cyan-100">{service.subtitle}</p>
            <h2 className="mt-2 text-2xl font-black text-white">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
            <div className="mt-5 grid gap-2">
              {service.deliverables.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-white/[0.04] p-4 text-sm text-slate-300">
              <strong className="text-white">Ideal para: </strong>{service.forWho}
            </div>
          </motion.article>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
              Búsquedas que atacamos
            </div>
            <h2 className="mt-5 text-3xl font-black text-white">Keywords y servicios que un cliente sí busca cuando tiene intención de comprar.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Estas frases se integran en la estructura de contenido, títulos, descripciones y secciones para mejorar relevancia local.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {seoServices.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm font-semibold text-slate-200">
                <Search className="h-4 w-4 shrink-0 text-cyan-300" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-8 text-center">
        <Smartphone className="mx-auto h-10 w-10 text-cyan-200" />
        <h2 className="mt-5 text-3xl font-black text-white">¿Quieres que revisemos tu negocio?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Escríbenos y te decimos qué conviene primero: web, catálogo, WhatsApp, chatbot, CRM o campaña de captación.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappUrl} className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950 hover:bg-white">
            Cotizar por WhatsApp <MessageCircle className="ml-2 h-5 w-5" />
          </a>
          <Link href="/portafolio" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-black text-white hover:bg-white/10">
            Ver portafolio <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
