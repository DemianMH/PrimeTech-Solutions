import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HeroStage } from "@/components/three/HeroStage";
import type { OrbitService } from "@/components/three/HeroScene";
import { PrimeComputer } from "@/components/site/PrimeComputer";
import { automationProjects, processSteps, services, siteConfig } from "@/lib/site";
import { featuredShowcase, showcaseProjects } from "@/lib/showcase";

const orbitServices: OrbitService[] = [
  { slug: "sitios-web", label: "Sitios web", color: "#3b82f6", shape: "screen" },
  { slug: "chatbots-agentes-ia", label: "Chatbots IA", color: "#a855f7", shape: "chat" },
  { slug: "automatizaciones", label: "Automatización", color: "#14b8a6", shape: "bolt" },
  { slug: "cctv", label: "CCTV", color: "#0ea5e9", shape: "camera" },
  { slug: "nube", label: "Nube", color: "#22c55e", shape: "cloud" },
  { slug: "infraestructura", label: "Redes", color: "#f59e0b", shape: "rack" },
];

/** Los tres servicios con más demanda van al frente con su propio bloque. */
const topServices = [
  {
    slug: "sitios-web",
    kicker: "El más pedido",
    title: "Sitios web que se ven premium y generan cotizaciones",
    points: ["Diseño a medida, rápido y responsivo", "SEO técnico y local desde el día uno", "WhatsApp, formularios y analítica integrados"],
  },
  {
    slug: "chatbots-agentes-ia",
    kicker: "Atención 24/7",
    title: "Chatbots con IA para WhatsApp, Instagram y web",
    points: ["Responde, califica y agenda sin esperar", "Entrenado con la información de tu negocio", "Pasa a una persona cuando hace falta"],
  },
  {
    slug: "automatizaciones",
    kicker: "Menos trabajo manual",
    title: "Automatizaciones con n8n que conectan todo tu negocio",
    points: ["CRM, hojas de cálculo, correo y APIs conectados", "Alertas y seguimiento sin capturas repetidas", "Servidor propio: tus datos bajo tu control"],
  },
];

const faqs: [string, string][] = [
  [
    "¿Cuánto cuesta una página web para mi negocio en Guadalajara?",
    "Depende del alcance: una landing de conversión cuesta menos que un sitio con catálogo, portal o panel administrable. Te damos una cotización cerrada después de un diagnóstico corto y sin costo.",
  ],
  [
    "¿Cuánto tarda en estar lista?",
    "Una landing puede estar en una a dos semanas; sitios con catálogo, portales o integraciones se entregan por etapas con avances visibles.",
  ],
  [
    "¿Pueden conectar un chatbot de WhatsApp con IA a mi negocio?",
    "Sí. Implementamos bots con IA conectados a WhatsApp, Instagram y Facebook, entrenados con tu información y con traspaso a una persona cuando el cliente lo necesita.",
  ],
  [
    "¿Qué incluye el SEO?",
    "Estructura limpia, velocidad, metadata, datos estructurados, sitemap, configuración en Google Search Console y contenido pensado para búsquedas locales.",
  ],
  [
    "¿Cómo son los pagos?",
    "En proyectos mayores a $2,500 MXN trabajamos 50% de anticipo y 50% al terminar. Incluimos 7 días hábiles de ajustes sobre el alcance aprobado.",
  ],
  [
    "¿También dan soporte, CCTV y redes?",
    "Sí. Además de software instalamos cámaras, redes, Wi-Fi y nube, y damos soporte a equipos, para que un solo equipo cubra tu tecnología.",
  ],
];

export default function HomePage() {
  const whatsapp = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, quiero cotizar un proyecto."
  )}`;
  const projectCount = showcaseProjects.length + automationProjects.length;
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
    <div className="x-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="x-hero">
        <div className="x-hero-grid" aria-hidden="true" />
        <div className="x-hero-copy">
          <span className="x-eyebrow">
            <i /> Agencia de tecnología en Guadalajara
          </span>
          <h1>
            Sitios web, chatbots con IA y automatizaciones <em>que venden por ti.</em>
          </h1>
          <p>
            Diseñamos y programamos la tecnología de tu negocio: páginas que posicionan en Google, bots de
            WhatsApp que atienden 24/7 y flujos que eliminan el trabajo repetitivo. Además, CCTV, redes y nube.
          </p>
          <div className="x-hero-actions">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="x-btn x-btn-primary">
              <FaWhatsapp size={18} /> Cotizar por WhatsApp
            </a>
            <Link href="#proyectos" className="x-btn x-btn-ghost">
              Ver proyectos en vivo <ArrowRight size={17} />
            </Link>
          </div>
          <dl className="x-hero-stats">
            <div>
              <dt>{projectCount}+</dt>
              <dd>proyectos publicados</dd>
            </div>
            <div>
              <dt>24/7</dt>
              <dd>bots atendiendo</dd>
            </div>
            <div>
              <dt>7 días</dt>
              <dd>de ajustes incluidos</dd>
            </div>
          </dl>
        </div>
        <HeroStage services={orbitServices} />
      </section>

      <section className="x-marquee" aria-label="Algunos clientes">
        <div className="x-marquee-track">
          {[...showcaseProjects, ...showcaseProjects].map((project, i) => (
            <span key={`${project.slug}-${i}`} aria-hidden={i >= showcaseProjects.length}>
              <i style={{ background: project.accent }} /> {project.title}
            </span>
          ))}
        </div>
      </section>

      <section className="x-section">
        <header className="x-head">
          <span className="x-eyebrow dark">
            <i /> Lo que más nos piden
          </span>
          <h2>Tres servicios que mueven las ventas de nuestros clientes.</h2>
        </header>
        <div className="x-top-services">
          {topServices.map((item, i) => {
            const service = services.find((s) => s.slug === item.slug)!;
            const Icon = service.icon;
            return (
              <Link href={`/servicios/${item.slug}`} key={item.slug} className="x-top-card" style={{ ["--c" as string]: service.accent }}>
                <span className="x-top-index">0{i + 1}</span>
                <span className="x-top-icon">
                  <Icon size={26} />
                </span>
                <span className="x-top-kicker">{item.kicker}</span>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={16} /> {point}
                    </li>
                  ))}
                </ul>
                <span className="x-link">
                  Ver servicio <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="x-more-services">
          <span>También resolvemos:</span>
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

      <section className="x-showcase" id="proyectos">
        <header className="x-head light">
          <span className="x-eyebrow">
            <i /> Portafolio interactivo
          </span>
          <h2>No te mostramos fotos: navega nuestros proyectos.</h2>
          <p>
            Usa la computadora como si fuera tuya: cambia de pestaña, mira la versión de celular, recorre cada
            página y entra al sitio real.
          </p>
        </header>
        <PrimeComputer projects={[...featuredShowcase, ...showcaseProjects.filter((p) => !p.featured)]} compact />
        <div className="x-center">
          <Link href="/portafolio" className="x-btn x-btn-ghost">
            Ver los {showcaseProjects.length} proyectos y automatizaciones <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="x-section">
        <header className="x-head">
          <span className="x-eyebrow dark">
            <i /> Cómo trabajamos
          </span>
          <h2>Del diagnóstico a la entrega, sin sorpresas.</h2>
        </header>
        <ol className="x-steps">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="x-section x-faq-wrap">
        <header className="x-head">
          <span className="x-eyebrow dark">
            <i /> Preguntas frecuentes
          </span>
          <h2>Lo que nos preguntan antes de empezar.</h2>
        </header>
        <div className="x-faq">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="x-cta">
        <div>
          <span className="x-eyebrow">
            <i /> Diagnóstico sin costo
          </span>
          <h2>Cuéntanos tu proyecto y te respondemos hoy con una ruta clara.</h2>
        </div>
        <div className="x-cta-actions">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="x-btn x-btn-primary">
            <FaWhatsapp size={18} /> Escribir por WhatsApp
          </a>
          <Link href="/contacto" className="x-btn x-btn-ghost">
            <MessageCircle size={17} /> Formulario de contacto
          </Link>
        </div>
        <Sparkles className="x-cta-spark" size={120} aria-hidden="true" />
      </section>
    </div>
  );
}
