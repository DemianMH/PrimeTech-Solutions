import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Bot,
  BriefcaseBusiness,
  Building2,
  Database,
  Flame,
  GraduationCap,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Ticket,
  Utensils,
  Workflow,
} from "lucide-react";
import { automationProjects, portfolioProjects } from "@/lib/site";

export const metadata = {
  title: "Portafolio",
  description: "Portafolio web y automatizaciones reales de PrimeTech Solutions para negocios.",
};

function ProjectVector({ index }: { index: number }) {
  const icons = [Ticket, Building2, Sparkles, Flame, Utensils, GraduationCap, BriefcaseBusiness, ShieldCheck, Bot];
  const Icon = icons[index % icons.length];

  return (
    <div className={`project-vector vector-${index % 4}`} aria-hidden="true">
      <div className="vector-ring" />
      <div className="vector-chip">
        <Icon size={30} />
      </div>
      <span className="vector-line line-a" />
      <span className="vector-line line-b" />
    </div>
  );
}

export default function PortfolioPage() {
  const automationIcons = [Workflow, Bot, BellRing, Database, Sparkles];

  return (
    <section className="inner-hero">
      <div className="portfolio-hero-panel">
        <div className="section-heading">
          <span className="eyebrow">Portafolio PrimeTech</span>
          <h1>Proyectos web y automatizaciones creadas para vender, operar y responder mejor.</h1>
          <p>
            Aquí reunimos sitios, plataformas y flujos operativos que ayudan a negocios reales a verse
            más profesionales, recibir más contactos y trabajar con menos tareas repetitivas.
          </p>
        </div>
        <div className="portfolio-orb">
          <Layers3 size={38} />
          <span />
          <span />
        </div>
      </div>

      <div className="section-heading compact portfolio-subhead">
        <span className="eyebrow">Sitios y plataformas</span>
        <h2>Portafolio web con imagen, contexto y objetivo comercial.</h2>
        <p>
          Cada proyecto está pensado para que el visitante entienda rápido qué ofrece el negocio,
          por qué confiar y cuál es el siguiente paso para pedir información.
        </p>
      </div>

      <div className="portfolio-showcase">
        {portfolioProjects.map((project, index) => (
          <article key={project.title} className={`project-card project-card-${index % 4}`}>
            <a href={project.url} target="_blank" rel="noreferrer" className="project-browser">
              <ProjectVector index={index} />
              <div className="browser-bar">
                <span />
                <span />
                <span />
                <small>{project.url.replace("https://", "").replace("www.", "")}</small>
              </div>
              <Image
                src={project.image}
                alt={`Captura del proyecto ${project.title}`}
                width={900}
                height={620}
                sizes="(max-width: 980px) 100vw, 55vw"
                className="project-image"
              />
            </a>
            <div className="project-content">
              <span className="project-category">
                <MonitorSmartphone size={15} /> {project.category}
              </span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-impact">
                <Sparkles size={17} /> {project.impact}
              </div>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href={project.url} target="_blank" rel="noreferrer" className="project-link">
                Visitar proyecto <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="automation-portfolio">
        <div className="automation-copy">
          <span className="eyebrow">Automatizaciones implementadas</span>
          <h2>Flujos con n8n, WhatsApp, formularios, correos, hojas de cálculo, CRM y APIs.</h2>
          <p>
            Estos casos se muestran de forma operativa y anónima para proteger información de clientes,
            pero reflejan el tipo de soluciones que se pueden implementar para ventas, administración,
            soporte y seguimiento.
          </p>
        </div>
        <div className="automation-grid">
          {automationProjects.map((project, index) => {
            const Icon = automationIcons[index % automationIcons.length];
            return (
              <article className="automation-card" key={project.title}>
                <div className="automation-icon">
                  <Icon size={25} />
                </div>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>{project.result}</strong>
                <div className="automation-flow" aria-label={`Flujo de ${project.title}`}>
                  {project.steps.map((step) => (
                    <em key={step}>{step}</em>
                  ))}
                </div>
                <small>{project.stack}</small>
              </article>
            );
          })}
        </div>
      </div>

      <div className="cta-section slim">
        <div>
          <span className="eyebrow">Tu caso</span>
          <h2>Podemos convertir tu sitio, tus mensajes y tus procesos en una ruta clara de venta.</h2>
        </div>
        <Link href="/contacto" className="primary-action">
          Empezar diagnostico <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
