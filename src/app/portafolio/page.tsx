"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Filter, Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const projects = [
  {
    title: "Mundo Scents",
    category: "Ecommerce y automatización",
    description:
      "Tienda online de perfumes con paquetes emprendedores, categorías, carrito y base comercial ideal para automatización por WhatsApp y ManyChat.",
    tags: ["Shopify", "Perfumes", "ManyChat", "WhatsApp", "Mayoreo"],
    url: "https://mundoscents.com/",
    impact: "Venta por catálogo, carrito y automatización comercial.",
  },
  {
    title: "KEX",
    category: "CRM y GoHighLevel",
    description:
      "Administración de automatizaciones y plataforma GoHighLevel para atención, seguimiento y operación comercial.",
    tags: ["GoHighLevel", "CRM", "WhatsApp", "Automatización", "HORECA"],
    url: "https://kex.com.mx/",
    impact: "Flujos comerciales, seguimiento y gestión de clientes.",
  },
  {
    title: "Charrería Nuevo Jalisco",
    category: "Ecommerce local",
    description:
      "Catálogo/ecommerce para productos de charrería típica de Jalisco con enfoque en pedidos, producto visual, SEO local y contacto por WhatsApp.",
    tags: ["Ecommerce", "PHP/MySQL", "Catálogo", "Jalisco", "WhatsApp"],
    url: "https://charrerianuevojalisco.com/",
    impact: "Presencia local, catálogo y pedidos organizados.",
  },
  {
    title: "Sorteo Mike & Co",
    category: "Plataforma web",
    description:
      "Plataforma de e-commerce para gestión y ejecución de sorteos en línea con diseño moderno y experiencia enfocada en compra.",
    tags: ["Ecommerce", "Sorteos", "UI/UX", "Pagos"],
    url: "https://sorteomikeco.com",
    impact: "Sistema especializado para operación digital.",
  },
  {
    title: "CZC Projects",
    category: "Sitio corporativo",
    description:
      "Sitio para constructora enfocado en mostrar proyectos de alto impacto, confianza y presencia profesional.",
    tags: ["Constructora", "Corporativo", "Portafolio", "Responsive"],
    url: "https://czcprojects.com.mx",
    impact: "Imagen profesional para proyectos de mayor valor.",
  },
  {
    title: "Tersus Clean",
    category: "Landing de conversión",
    description:
      "Landing page para empresa de servicios de limpieza, enfocada en claridad comercial y captación de clientes.",
    tags: ["Landing Page", "Servicios", "Conversión", "WhatsApp"],
    url: "https://tersusclean.com.mx",
    impact: "Comunicación directa para conseguir cotizaciones.",
  },
  {
    title: "Portofino Conway",
    category: "Restaurante y pedidos",
    description:
      "Sitio e-commerce para restaurante con menú y pedidos en línea, pensado para facilitar la compra desde celular.",
    tags: ["Restaurante", "Pedidos", "Ecommerce", "Menú digital"],
    url: "https://portofinoconway.com",
    impact: "Pedidos más fáciles y experiencia móvil.",
  },
  {
    title: "Bere Cárdenas Cosmetología",
    category: "Cursos y LMS",
    description:
      "Plataforma e-learning con cursos, temarios, clases en video, progreso de alumnos y certificados digitales.",
    tags: ["LMS", "Cursos", "Certificados", "E-learning"],
    url: "https://berecardenascosmetologia.com.mx/",
    impact: "Educación digital con operación administrable.",
  },
  {
    title: "INAPECC Consultoría",
    category: "Landing de conversión",
    description:
      "Landing profesional para servicios de consultoría con secciones claras, credibilidad y formulario de contacto.",
    tags: ["Consultoría", "Landing", "Servicios", "Formulario"],
    url: "https://consultoriainapecc.com/",
    impact: "Página clara para explicar servicios y captar prospectos.",
  },
  {
    title: "Rifas El Güero",
    category: "Plataforma web",
    description:
      "Landing para organización y promoción de rifas con estructura comercial, testimonios y llamados a la acción.",
    tags: ["Rifas", "Landing", "Ecommerce", "UI/UX"],
    url: "https://rifaselguero.com.mx/",
    impact: "Mayor confianza y venta digital para sorteos.",
  },
];

const categories = ["Todos", ...Array.from(new Set(projects.map((project) => project.category)))];

export default function PortfolioPage() {
  const [active, setActive] = useState("Todos");
  const filtered = useMemo(() => active === "Todos" ? projects : projects.filter((project) => project.category === active), [active]);

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
          <Sparkles className="mr-2 h-4 w-4" /> Portafolio PrimeTech Solutions
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl">
          Casos organizados por solución, no solo por diseño.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Esta vista ayuda a que un prospecto identifique rápido si PrimeTech ya resolvió algo parecido: ecommerce, automatización, CRM, cursos, sitios corporativos o landings de conversión.
        </motion.p>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2">
          <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-slate-300">
            <Filter className="h-4 w-4 text-cyan-300" /> Filtrar:
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${active === category ? "bg-cyan-300 text-slate-950" : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <motion.article layout key={project.title} variants={fadeUp} initial="hidden" animate="visible" className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 transition hover:-translate-y-2 hover:border-cyan-300/30">
              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-400/10 blur-2xl transition group-hover:bg-purple-400/20" />
              <span className="relative rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-cyan-100">{project.category}</span>
              <h2 className="relative mt-5 text-2xl font-black text-white">{project.title}</h2>
              <p className="relative mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
              <div className="relative mt-5 rounded-2xl bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">
                <CheckCircle2 className="mr-2 inline h-4 w-4" /> {project.impact}
              </div>
              <div className="relative mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.url} target="_blank" rel="noreferrer" className="relative mt-6 inline-flex items-center text-sm font-black text-cyan-200 hover:text-white">
                Visitar sitio <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
