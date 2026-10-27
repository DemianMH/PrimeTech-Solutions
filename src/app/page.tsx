import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HeroStage } from "@/components/three/HeroStage";
import type { OrbitService } from "@/components/three/HeroScene";
import { IntroLoader } from "@/components/experience/IntroLoader";
import { ChapterRail, type Chapter } from "@/components/experience/ChapterRail";
import { RevealObserver } from "@/components/experience/RevealObserver";
import { PapelPicado } from "@/components/experience/PapelPicado";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";
import { AutomationWorkflow } from "@/components/site/AutomationWorkflow";
import { automationProjects, processSteps, services, siteConfig } from "@/lib/site";
import { showcaseProjects } from "@/lib/showcase";

const orbitServices: OrbitService[] = [
  { slug: "sitios-web", label: "Sitios web", color: "#3b82f6", shape: "screen" },
  { slug: "chatbots-agentes-ia", label: "Chatbots IA", color: "#a855f7", shape: "chat" },
  { slug: "automatizaciones", label: "Automatización", color: "#14b8a6", shape: "bolt" },
  { slug: "cctv", label: "CCTV", color: "#0ea5e9", shape: "camera" },
  { slug: "nube", label: "Nube", color: "#22c55e", shape: "cloud" },
  { slug: "infraestructura", label: "Redes", color: "#f59e0b", shape: "rack" },
];

const chapters: Chapter[] = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "automatizaciones", label: "Automatizaciones" },
  { id: "proceso", label: "Proceso" },
  { id: "contacto", label: "Contacto" },
];

const topServices = [
  {
    slug: "sitios-web",
    title: "Sitios web que venden",
    text: "Diseño a medida, rápido, con SEO local, WhatsApp y analítica desde el primer día.",
  },
  {
    slug: "chatbots-agentes-ia",
    title: "Chatbots con IA",
    text: "Atienden, califican y agendan 24/7 en WhatsApp, Instagram y web, con traspaso a tu equipo.",
  },
  {
    slug: "automatizaciones",
    title: "Automatizaciones n8n",
    text: "CRM, hojas, correo y APIs conectados en tu propio servidor. Menos captura, más seguimiento.",
  },
];

const faqs: [string, string][] = [
  [
    "¿Cuánto cuesta una página web para mi negocio en Guadalajara?",
    "Depende del alcance: una landing cuesta menos que un sitio con catálogo, portal o panel administrable. Te damos una cotización cerrada después de un diagnóstico corto y sin costo.",
  ],
  [
    "¿Cuánto tarda en estar lista?",
    "Una landing puede estar en una a dos semanas; sitios con catálogo, portales o integraciones se entregan por etapas con avances visibles.",
  ],
  [
    "¿Pueden conectar un chatbot de WhatsApp con IA a mi negocio?",
    "Sí. Implementamos bots con IA conectados a WhatsApp, Instagram y Facebook, entrenados con tu información y con traspaso a una persona cuando hace falta.",
  ],
  [
    "¿Cómo son los pagos?",
    "En proyectos mayores a $2,500 MXN trabajamos 50% de anticipo y 50% al terminar, con 7 días hábiles de ajustes incluidos.",
  ],
];

export default function HomePage() {
  const whatsapp = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, quiero cotizar un proyecto."
  )}`;
  // Los sitios archivados van al final del carrusel.
  const carousel = [...showcaseProjects].sort((a, b) => Number(Boolean(a.offline)) - Number(Boolean(b.offline)));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <div className="xp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <IntroLoader />
      <PapelPicado />
      <RevealObserver />
      <ChapterRail chapters={chapters} />

      <section id="inicio" className="ch ch-hero">
        <HeroStage services={orbitServices} />
        <div className="hero-copy reveal">
          <span className="xp-kicker">Agencia de tecnología · Guadalajara</span>
          <h1>
            <span>Construimos</span>
            <span>
              tecnología que <em>vende</em>
            </span>
            <span>por ti.</span>
          </h1>
          <p>
            Sitios web, chatbots con IA y automatizaciones para negocios en Guadalajara y todo México. Además CCTV, redes y
            nube con un solo equipo.
          </p>
          <div className="hero-actions">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="pj-cta">
              <FaWhatsapp size={17} /> Cotizar por WhatsApp
            </a>
            <a href="#proyectos" className="xp-ghost">
              Ver proyectos
            </a>
          </div>
        </div>
        <a href="#servicios" className="scroll-cue" aria-label="Bajar a servicios">
          <span>Desliza</span>
          <ArrowDown size={16} />
        </a>
      </section>

      <section id="servicios" className="ch ch-services">
        <header className="xp-head reveal">
          <span className="xp-kicker">01 · Servicios</span>
          <h2>Lo que más mueve las ventas de nuestros clientes.</h2>
        </header>
        <div className="svc-grid">
          {topServices.map((item, i) => {
            const service = services.find((s) => s.slug === item.slug)!;
            const Icon = service.icon;
            return (
              <Link key={item.slug} href={`/servicios/${item.slug}`} className="svc-card reveal" style={{ ["--c" as string]: service.accent, transitionDelay: `${i * 90}ms` }}>
                <span className="svc-num">0{i + 1}</span>
                <span className="svc-icon">
                  <Icon size={28} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="svc-more">
                  Ver servicio <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="svc-more-list reveal">
          {services
            .filter((s) => !topServices.some((t) => t.slug === s.slug))
            .map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.slug} href={`/servicios/${service.slug}`} style={{ ["--c" as string]: service.accent }}>
                  <Icon size={17} /> {service.shortTitle}
                </Link>
              );
            })}
        </div>
      </section>

      <section id="proyectos" className="ch ch-ring">
        <header className="xp-head reveal">
          <span className="xp-kicker">02 · Proyectos</span>
          <h2>Trabajo real, publicado y funcionando.</h2>
        </header>
        <ProjectsCarousel projects={carousel} />
      </section>

      <section id="automatizaciones" className="ch ch-auto">
        <header className="xp-head reveal">
          <span className="xp-kicker">03 · Automatizaciones</span>
          <h2>Flujos con n8n, WhatsApp, CRM y APIs funcionando para clientes reales.</h2>
        </header>
        <div className="auto-list">
          {automationProjects.map((project, index) => (
            <article className="auto-card reveal" key={project.title}>
              <div>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.result}</p>
                <small>
                  {project.client} · {project.stack}
                </small>
              </div>
              <AutomationWorkflow client={project.client} steps={project.steps} theme={index} />
            </article>
          ))}
        </div>
      </section>

      <section id="proceso" className="ch ch-process">
        <header className="xp-head reveal">
          <span className="xp-kicker">04 · Proceso</span>
          <h2>Del diagnóstico a la entrega, sin sorpresas.</h2>
        </header>
        <ol className="steps">
          {processSteps.map((step, i) => (
            <li key={step.title} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="faq reveal">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contacto" className="ch ch-contact">
        <div className="contact-inner reveal">
          <span className="xp-kicker">05 · Hablemos</span>
          <h2>
            El siguiente proyecto <em>puede ser el tuyo.</em>
          </h2>
          <ul>
            <li>
              <Check size={17} /> Diagnóstico sin costo
            </li>
            <li>
              <Check size={17} /> 50% anticipo, 50% al entregar
            </li>
            <li>
              <Check size={17} /> 7 días hábiles de ajustes
            </li>
          </ul>
          <div className="hero-actions">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="pj-cta">
              <FaWhatsapp size={17} /> Escribir por WhatsApp
            </a>
            <Link href="/contacto" className="xp-ghost">
              Formulario de contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
