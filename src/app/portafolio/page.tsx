import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  Flame,
  GraduationCap,
  Layers3,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Ticket,
  Utensils,
} from "lucide-react";
import { portfolioProjects } from "@/lib/site";

export const metadata = {
  title: "Portafolio",
  description: "Casos y tipos de resultados que PrimeTech Solutions puede construir para negocios.",
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
  return (
    <section className="inner-hero">
      <div className="portfolio-hero-panel">
        <div className="section-heading">
          <span className="eyebrow">Portafolio PrimeTech</span>
          <h1>Sitios web que convierten visitas en confianza, pedidos y cotizaciones.</h1>
          <p>
            Creamos experiencias digitales para negocios que necesitan verse profesionales,
            explicar mejor sus servicios y facilitar que sus clientes tomen acción desde el primer contacto.
          </p>
        </div>
        <div className="portfolio-orb">
          <Layers3 size={38} />
          <span />
          <span />
        </div>
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

      <div className="cta-section slim">
        <div>
          <span className="eyebrow">Tu caso</span>
          <h2>Podemos construir una ruta igual de clara para tu negocio.</h2>
        </div>
        <Link href="/contacto" className="primary-action">
          Empezar diagnostico <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
