import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import { automationProjects, portfolioProjects } from "@/lib/site";
import { DeviceMockup } from "@/components/site/DeviceMockup";
import { AutomationWorkflow } from "@/components/site/AutomationWorkflow";

export const metadata = {
  title: "Portafolio",
  description: "Portafolio web y automatizaciones reales de PrimeTech Solutions para negocios.",
};

export default function PortfolioPage() {
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
              <DeviceMockup
                title={project.title}
                desktop={project.images.desktop}
                tablet={project.images.tablet}
                mobile={project.images.mobile}
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
            Casos implementados para clientes reales. Mostramos el objetivo y las herramientas utilizadas
            sin exponer información privada, credenciales ni datos internos de sus operaciones.
          </p>
        </div>
        <div className="automation-grid">
          {automationProjects.map((project, index) => (
            <article className="automation-card" key={project.title}>
              <div className="automation-card-copy">
                <span>{project.category}</span>
                <a className="automation-client" href={project.url} target="_blank" rel="noreferrer">
                  {project.client} <ArrowUpRight size={15} />
                </a>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>{project.result}</strong>
                <small>{project.stack}</small>
              </div>
              <AutomationWorkflow client={project.client} steps={project.steps} theme={index} />
            </article>
          ))}
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
