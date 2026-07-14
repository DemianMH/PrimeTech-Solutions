"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Cpu,
  DatabaseZap,
  Globe2,
  LineChart,
  MessageCircle,
  Rocket,
  ShoppingCart,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

const whatsappText = encodeURIComponent(
  "Hola Primetech, vi la nueva web de PrimeTech y quiero un diagnóstico para vender más por WhatsApp / mejorar mi sitio."
);
const whatsappUrl = `https://wa.me/523330620287?text=${whatsappText}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const services: Array<{
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
}> = [
  {
    icon: Bot,
    badge: "Más solicitado",
    title: "Chatbots con IA para WhatsApp",
    description:
      "Respuestas rápidas para precios, citas, ubicación, disponibilidad, mayoreo y seguimiento sin perder clientes.",
    bullets: ["Flujos de venta", "Preguntas frecuentes", "Captura de leads"],
  },
  {
    icon: Workflow,
    badge: "Ventas",
    title: "Automatización ManyChat y WhatsApp",
    description:
      "Automatizamos mensajes, etiquetas, respuestas, catálogos, campañas y rutas de atención para vender más rápido.",
    bullets: ["Instagram + WhatsApp", "Secuencias", "Recordatorios"],
  },
  {
    icon: DatabaseZap,
    badge: "CRM",
    title: "GoHighLevel para negocios",
    description:
      "CRM, pipelines, formularios, seguimiento automático, landing pages y campañas para no dejar prospectos tirados.",
    bullets: ["Pipeline comercial", "Automatizaciones", "Reportes"],
  },
  {
    icon: Globe2,
    badge: "SEO local",
    title: "Sitios web para captar clientes",
    description:
      "Páginas modernas, rápidas y enfocadas en convertir búsquedas de Google en llamadas, formularios y WhatsApp.",
    bullets: ["Zapopan/GDL", "SEO técnico", "Mobile first"],
  },
  {
    icon: ShoppingCart,
    badge: "Comercios",
    title: "Ecommerce y catálogos digitales",
    description:
      "Tiendas, catálogos por categoría, productos destacados y botones de pedido directo a WhatsApp.",
    bullets: ["Catálogo visual", "Mayoreo", "Pedidos"],
  },
  {
    icon: Cpu,
    badge: "Empresas",
    title: "Soporte IT, redes y sistemas",
    description:
      "Infraestructura, equipos, redes, sites, cámaras, mantenimiento y soluciones para operación diaria.",
    bullets: ["Soporte remoto", "Redes", "Seguridad"],
  },
];

const proof = [
  { value: "24/7", label: "atención automatizada" },
  { value: "50%", label: "menos mensajes repetidos" },
  { value: "+10", label: "tipos de negocio atendidos" },
  { value: "Jalisco", label: "enfoque local" },
];

const industries = [
  "Comercios y mayoristas",
  "Clínicas y consultorios",
  "Restaurantes y cafeterías",
  "Constructoras y servicios B2B",
  "Escuelas, cursos y academias",
  "Tiendas con venta por WhatsApp",
  "Negocios con GoHighLevel",
  "Empresas con soporte IT",
];

const projects = [
  {
    title: "Mundo Scents",
    category: "Ecommerce + automatización",
    description:
      "Tienda online de perfumes con productos, paquetes emprendedores, carrito y base ideal para automatizar ventas por WhatsApp.",
    result: "Catálogo + ventas + automatización ManyChat",
    url: "https://mundoscents.com/",
  },
  {
    title: "KEX",
    category: "GoHighLevel + automatización",
    description:
      "Operación de automatizaciones y plataforma para negocio con catálogo de insumos, sucursales y atención comercial por WhatsApp.",
    result: "CRM + flujos + seguimiento comercial",
    url: "https://kex.com.mx/",
  },
  {
    title: "Charrería Nuevo Jalisco",
    category: "Ecommerce local",
    description:
      "Sitio para venta de trajes, sombreros y productos de charrería con enfoque en catálogo, pedidos y presencia local.",
    result: "Catálogo + SEO local + WhatsApp",
    url: "https://charrerianuevojalisco.com/",
  },
  {
    title: "Sorteo Mike & Co",
    category: "Plataforma de sorteos",
    description:
      "Sistema web para rifas y sorteos con experiencia moderna, pagos y operación digital.",
    result: "Plataforma web + ecommerce",
    url: "https://sorteomikeco.com",
  },
  {
    title: "Tersus Clean",
    category: "Landing de conversión",
    description:
      "Página enfocada en captar clientes para servicios de limpieza con comunicación clara y llamados a la acción.",
    result: "Landing page + captación",
    url: "https://tersusclean.com.mx",
  },
  {
    title: "Bere Cárdenas Cosmetología",
    category: "E-learning",
    description:
      "Plataforma de cursos con temarios, alumnos, progreso y certificaciones digitales.",
    result: "LMS + cursos + certificados",
    url: "https://berecardenascosmetologia.com.mx/",
  },
];

const packages = [
  {
    name: "Presencia Local",
    price: "Desde $4,500 MXN",
    bestFor: "Negocios que necesitan verse profesionales en Google",
    features: ["Landing de alto impacto", "WhatsApp visible", "SEO básico local", "Formulario de contacto"],
  },
  {
    name: "Ventas por WhatsApp",
    price: "Desde $7,500 MXN",
    bestFor: "Comercios, clínicas y servicios que reciben muchos mensajes",
    featured: true,
    features: ["Sitio o catálogo web", "Botones por servicio/producto", "Flujo de preguntas frecuentes", "Captura de datos"],
  },
  {
    name: "Sistema Comercial IA",
    price: "Desde $15,000 MXN",
    bestFor: "Negocios con más volumen que requieren CRM y seguimiento",
    features: ["CRM / GoHighLevel", "Chatbot con IA", "Automatizaciones", "Reportes y optimización"],
  },
];

const steps = [
  "Diagnóstico de tu WhatsApp, web y proceso de venta",
  "Diseño UX/UI móvil con enfoque en conversión",
  "Construcción de sitio, catálogo o landing",
  "Automatización de respuestas, CRM o chatbot",
  "Lanzamiento, medición y mejoras continuas",
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
      {children}
    </span>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
        <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-8 top-40 -z-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr]"
        >
          <div>
            <motion.div variants={fadeUp}>
              <Badge>
                <Sparkles className="mr-2 h-3.5 w-3.5" /> IA, WhatsApp y web para negocios de Jalisco
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-7 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Convierte tu sitio web y WhatsApp en una máquina de <span className="gradient-text">clientes y ventas</span>.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              En PrimeTech Solutions ayudamos a negocios de Zapopan, Guadalajara y Jalisco a vender más rápido con sitios web modernos, catálogos digitales, chatbots con IA, ManyChat, GoHighLevel y automatizaciones comerciales.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} className="group inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-white">
                Pedir diagnóstico gratis
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <Link href="/portafolio" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10">
                Ver casos reales
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
              {["Mobile first", "SEO local", "WhatsApp listo", "UX/UI actual", "Sin plantillas genéricas"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <div className="hero-glow glass-card relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="relative rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-cyan-200">Sistema de ventas</p>
                    <p className="text-xs text-slate-400">Web + WhatsApp + CRM + IA</p>
                  </div>
                  <div className="pulse-border rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-black text-emerald-200">Activo</div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Cliente nuevo", "Pregunta por precios y disponibilidad", MessageCircle],
                    ["Chatbot IA", "Responde, filtra y pide datos clave", Bot],
                    ["CRM", "Guarda lead y programa seguimiento", DatabaseZap],
                    ["Venta", "Cliente recibe propuesta por WhatsApp", LineChart],
                  ].map(([title, text, Icon], index) => {
                    const DynamicIcon = Icon as LucideIcon;
                    return (
                      <motion.div
                        key={String(title)}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.18 }}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                          <DynamicIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{String(title)}</p>
                          <p className="text-sm text-slate-400">{String(text)}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="float-slow absolute -bottom-8 -right-4 hidden rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Resultado</p>
              <p className="mt-1 text-2xl font-black text-white">menos fugas de clientes</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-5">
        <div className="mx-auto flex max-w-7xl overflow-hidden px-4">
          <div className="marquee-track flex min-w-max gap-4 pr-4">
            {[...industries, ...industries].map((item, index) => (
              <span key={`${item}-${index}`} className="rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 text-sm font-bold text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Servicios actualizados"
          title="Lo que hoy sí buscan los negocios: velocidad, IA y ventas por WhatsApp"
          description="No vendemos solo páginas web. Construimos sistemas comerciales para que tus prospectos entiendan, confíen, escriban y compren más rápido."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article key={service.title} variants={fadeUp} className="group glass-card rounded-[1.75rem] p-6 transition hover:-translate-y-2 hover:border-cyan-300/30">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20 transition group-hover:scale-110">
                  <service.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-cyan-100">{service.badge}</span>
              </div>
              <h3 className="text-xl font-black text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
              <div className="mt-5 grid gap-2">
                {service.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {bullet}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="ia-whatsapp" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-card rounded-[2rem] p-7 lg:p-9">
            <Badge>Especialidad para prospectar clientes buenos</Badge>
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">Tu diferencia: vender automatización que se entiende en dinero.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              A negocios con buen capital no les interesa “un bot bonito”; les interesa no perder mensajes, responder más rápido, ordenar prospectos y medir qué campañas generan ventas.
            </p>
            <div className="mt-7 grid gap-3">
              {[
                "Catálogo web conectado a WhatsApp",
                "Bot que pregunta producto, cantidad, ubicación y urgencia",
                "CRM que separa interesados, cotizados y cerrados",
                "Seguimiento automático para recuperar clientes que no contestaron",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Zap className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-sm font-semibold text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
            {proof.map((item) => (
              <motion.div key={item.label} variants={fadeUp} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
                <p className="text-4xl font-black gradient-text">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-300">{item.label}</p>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-6 sm:col-span-2">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-100">Oferta clara</p>
              <p className="mt-3 text-2xl font-black text-white">“Te instalo un sistema para vender y dar seguimiento desde WhatsApp, no solo una página.”</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="portafolio" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Casos y experiencia"
          title="Portafolio categorizado para generar confianza rápido"
          description="Agregué los proyectos que mencionaste y los acomodé por tipo de solución para que un prospecto entienda exactamente qué sabes hacer."
        />
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <motion.article key={project.title} variants={fadeUp} className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 transition hover:-translate-y-2 hover:border-cyan-300/30">
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-2xl transition group-hover:bg-cyan-400/20" />
              <span className="relative rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-cyan-100">{project.category}</span>
              <h3 className="relative mt-5 text-2xl font-black text-white">{project.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
              <div className="relative mt-5 rounded-2xl bg-white/[0.04] p-4 text-sm font-bold text-cyan-100">
                {project.result}
              </div>
              <a href={project.url} target="_blank" rel="noreferrer" className="relative mt-5 inline-flex items-center text-sm font-black text-cyan-200 hover:text-white">
                Ver proyecto <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link href="/portafolio" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-black text-white hover:bg-white/10">
            Ver portafolio completo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="paquetes" className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Paquetes vendibles"
          title="Precios con entrada baja, pero pensados para subir a automatización"
          description="Esto ayuda a cerrar clientes más rápido sin sonar barato: empiezas con presencia o catálogo y luego escalas a CRM, IA y mantenimiento mensual."
        />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {packages.map((pack) => (
            <motion.article
              key={pack.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`rounded-[2rem] border p-6 ${pack.featured ? "border-cyan-300/40 bg-cyan-300/10 shadow-2xl shadow-cyan-400/10" : "border-white/10 bg-slate-900/70"}`}
            >
              {pack.featured && <Badge>Recomendado</Badge>}
              <h3 className="mt-4 text-2xl font-black text-white">{pack.name}</h3>
              <p className="mt-2 text-3xl font-black gradient-text">{pack.price}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{pack.bestFor}</p>
              <div className="mt-6 grid gap-3">
                {pack.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-cyan-300" /> {feature}
                  </div>
                ))}
              </div>
              <a href={whatsappUrl} className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200">
                Cotizar este paquete
              </a>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:p-10">
          <div>
            <Badge>Proceso</Badge>
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">Cómo llevamos a un negocio de “me escriben y se pierden” a “tengo seguimiento real”.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              El objetivo es que el cliente vea avance desde la primera semana: estructura, mensajes, sitio, WhatsApp y medición.
            </p>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-300 text-sm font-black text-slate-950">0{index + 1}</div>
                <div>
                  <p className="font-black text-white">{step}</p>
                  <p className="mt-1 text-sm text-slate-400">Entrega clara, medible y pensada para celulares.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2.2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 via-white/[0.06] to-purple-500/15 p-8 text-center sm:p-12"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-cyan-300 text-slate-950">
            <Rocket className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-balance text-3xl font-black text-white sm:text-5xl">¿Quieres clientes mejores? Cambiemos lo que vendes y cómo lo presentas.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Te preparo diagnóstico de tu web, WhatsApp y oferta para que puedas cerrar proyectos de mayor valor en Jalisco.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={whatsappUrl} className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-7 py-4 font-black text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-white">
              Hablar con Primetech <MessageCircle className="ml-2 h-5 w-5" />
            </a>
            <Link href="/servicios" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 font-black text-white hover:bg-white/10">
              Ver servicios
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
