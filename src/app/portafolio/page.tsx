import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { automationProjects } from "@/lib/site";
import { showcaseProjects } from "@/lib/showcase";
import { PrimeComputer } from "@/components/site/PrimeComputer";
import { AutomationWorkflow } from "@/components/site/AutomationWorkflow";

export const metadata = {
  title: "Portafolio de sitios web y automatizaciones",
  description:
    "Navega en vivo los sitios web, plataformas y automatizaciones que PrimeTech Solutions ha creado para negocios en Guadalajara y todo México.",
  alternates: { canonical: "/portafolio" },
};

export default function PortfolioPage() {
  return (
    <div className="x-home">
      <section className="x-showcase x-showcase-page">
        <header className="x-head light">
          <span className="x-eyebrow">
            <i /> Portafolio PrimeTech
          </span>
          <h1>Entra a nuestros proyectos desde esta computadora.</h1>
          <p>
            {showcaseProjects.length} sitios y plataformas reales. Cambia de proyecto en el dock, alterna entre
            escritorio y celular, recorre cada página y abre el sitio real con «Entrar».
          </p>
        </header>
        <PrimeComputer projects={showcaseProjects} />
      </section>

      <section className="x-section">
        <header className="x-head">
          <span className="x-eyebrow dark">
            <i /> Automatizaciones implementadas
          </span>
          <h2>Flujos con n8n, WhatsApp, CRM y APIs funcionando para clientes reales.</h2>
          <p>Mostramos el objetivo y las herramientas sin exponer datos privados ni credenciales de cada operación.</p>
        </header>
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
      </section>

      <section className="x-cta">
        <div>
          <span className="x-eyebrow">
            <i /> Tu proyecto
          </span>
          <h2>El siguiente sitio en esta computadora puede ser el tuyo.</h2>
        </div>
        <div className="x-cta-actions">
          <Link href="/contacto" className="x-btn x-btn-primary">
            Empezar diagnóstico <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
