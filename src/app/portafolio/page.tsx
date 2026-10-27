import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { automationProjects } from "@/lib/site";
import { showcaseProjects } from "@/lib/showcase";
import { RevealObserver } from "@/components/experience/RevealObserver";
import { PapelPicado } from "@/components/experience/PapelPicado";
import { AbisaiChapter, C444Chapter, CfnChapter } from "@/components/projects/ProjectChapters";
import { ProjectReel } from "@/components/projects/ProjectReel";
import { AutomationWorkflow } from "@/components/site/AutomationWorkflow";
import { PortfolioViews } from "@/components/game/PortfolioViews";

export const metadata = {
  title: "Portafolio de sitios web y automatizaciones",
  description:
    "Recorre como juego o en vista normal los sitios web, plataformas y automatizaciones que PrimeTech Solutions ha creado para negocios en Guadalajara y todo México.",
  alternates: { canonical: "/portafolio" },
};

export default function PortfolioPage() {
  // Los sitios archivados van al final del recorrido.
  const others = showcaseProjects
    .filter((project) => !project.featured)
    .sort((a, b) => Number(Boolean(a.offline)) - Number(Boolean(b.offline)));

  return (
    <div className="xp xp-portfolio">
      <PapelPicado />
      <RevealObserver />
      <PortfolioViews projects={showcaseProjects}>
        <section id="portafolio" className="ch ch-intro">
          <div className="contact-inner reveal">
            <span className="xp-kicker">Portafolio PrimeTech</span>
            <h1>
              {showcaseProjects.length} proyectos. <em>Cada uno con su propia historia.</em>
            </h1>
            <p>
              Baja para recorrerlos uno por uno: planos navegables, seguimientos en vivo, catálogos y las páginas
              completas de cada sitio.
            </p>
            <a href="#flotilla-nacional" className="pj-cta">
              Empezar recorrido <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section id="flotilla-nacional" className="ch">
          <CfnChapter />
        </section>
        <section id="constructora-444" className="ch">
          <C444Chapter />
        </section>
        <section id="abisai" className="ch">
          <AbisaiChapter />
        </section>

        <section id="proyectos" className="ch ch-reel">
          <header className="xp-head reveal">
            <span className="xp-kicker">Más proyectos</span>
            <h2>Un proyecto a la vez. Recórrelo como si estuvieras dentro.</h2>
          </header>
          <ProjectReel projects={others} />
        </section>

        <section id="automatizaciones" className="ch ch-auto">
          <header className="xp-head reveal">
            <span className="xp-kicker">Automatizaciones</span>
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
          <div className="xp-center reveal">
            <Link href="/contacto" className="pj-cta">
              Empezar mi proyecto <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </PortfolioViews>
    </div>
  );
}
