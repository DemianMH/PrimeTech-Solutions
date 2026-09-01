import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  LayoutTemplate,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import { DeviceMockup } from "@/components/site/DeviceMockup";
import {
  invitationPdfProjects,
  invitationPublishedProjects,
  invitationTemplateProjects,
  invitationWebProjects,
  designBrand,
} from "@/lib/prime-design";

export const metadata = {
  title: "Portafolio de invitaciones | Prime Design",
  description:
    "Invitaciones web, plantillas personalizables e invitaciones PDF creadas por Prime Design.",
};

export default function DesignPortfolioPage() {
  const whatsappHref = `https://wa.me/${designBrand.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero cotizar una invitación personalizada.",
  )}`;

  return (
    <section className="design-inner design-portfolio-page">
      <div className="design-portfolio-hero">
        <div>
          <span className="design-eyebrow">Portafolio real</span>
          <h1>Invitaciones creadas para sentirse tan personales como la celebración.</h1>
          <p>
            Proyectos web adaptables, plantillas personalizables y piezas PDF listas para compartir.
            Cada formato se diseña alrededor de la historia, el evento y la forma en que los invitados
            recibirán la información.
          </p>
          <nav className="design-portfolio-nav" aria-label="Categorías del portafolio">
            <a href="#invitaciones-web"><MonitorSmartphone size={17} /> Invitaciones web</a>
            <a href="#plantillas"><LayoutTemplate size={17} /> Plantillas</a>
            <a href="#invitaciones-pdf"><FileText size={17} /> Invitaciones PDF</a>
          </nav>
        </div>
        <div className="design-portfolio-mark" aria-hidden="true">
          <Sparkles size={34} />
          <span />
          <span />
        </div>
      </div>

      <section id="invitaciones-web" className="design-portfolio-section">
        <div className="design-section-head">
          <span className="design-eyebrow">Invitaciones web personalizadas</span>
          <h2>Una experiencia completa que se abre, se recorre y se comparte desde el celular.</h2>
          <p>
            Estas piezas combinan diseño, animación e información útil en una dirección web propia.
            Las vistas muestran el comportamiento real en computadora, tableta y celular.
          </p>
        </div>

        <div className="invitation-web-grid">
          {invitationWebProjects.map((project) => (
            <article className="invitation-web-card" key={project.title}>
              <a href={project.url} target="_blank" rel="noreferrer" className="invitation-device-link">
                <DeviceMockup
                  variant="design"
                  title={project.title}
                  desktop={project.images.desktop}
                  tablet={project.images.tablet}
                  mobile={project.images.mobile}
                />
              </a>
              <div className="invitation-card-copy">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Abrir invitación <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}

          {invitationPublishedProjects.map((project) => (
            <article className="invitation-web-card invitation-recorded-card" key={project.title}>
              <a href={project.url} target="_blank" rel="noreferrer" className="recorded-web-preview">
                <Image
                  src={project.image}
                  alt={`Vista de ${project.title}`}
                  width={720}
                  height={900}
                  sizes="(max-width: 720px) 92vw, 42vw"
                />
                <span><MonitorSmartphone size={18} /> Proyecto web documentado</span>
              </a>
              <div className="invitation-card-copy">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Ver presentación <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="plantillas" className="design-portfolio-section template-portfolio-section">
        <div className="design-section-head">
          <span className="design-eyebrow">Plantillas personalizables</span>
          <h2>Una base visual definida que se adapta con los datos, colores e imágenes del evento.</h2>
          <p>
            Son puntos de partida listos para personalizar sin perder la calidad visual ni la experiencia
            adaptable de una invitación web hecha a medida.
          </p>
        </div>

        <div className="invitation-web-grid template-grid">
          {invitationTemplateProjects.map((project) => (
            <article className="invitation-web-card" key={project.title}>
              <a href={project.url} target="_blank" rel="noreferrer" className="invitation-device-link">
                <DeviceMockup
                  variant="design"
                  title={project.title}
                  desktop={project.images.desktop}
                  tablet={project.images.tablet}
                  mobile={project.images.mobile}
                />
              </a>
              <div className="invitation-card-copy">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Ver plantilla <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="invitaciones-pdf" className="design-portfolio-section pdf-portfolio-section">
        <div className="design-section-head">
          <span className="design-eyebrow">Invitaciones PDF</span>
          <h2>Piezas ligeras para enviar por mensaje, conservar y consultar en cualquier momento.</h2>
          <p>
            Cada diseño se categoriza por tipo de celebración y mantiene una composición personalizada,
            lista para compartir sin instalar aplicaciones.
          </p>
        </div>

        <div className="pdf-invitation-grid">
          {invitationPdfProjects.map((project) => (
            <article className="pdf-invitation-card" key={project.title}>
              <a href={project.url} target="_blank" rel="noreferrer" className="pdf-preview">
                <Image
                  src={project.image}
                  alt={`Vista previa de ${project.title}`}
                  width={720}
                  height={900}
                  sizes="(max-width: 640px) 92vw, (max-width: 980px) 46vw, 23vw"
                />
                <span><FileText size={17} /> PDF personalizado</span>
              </a>
              <div>
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Ver publicación <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="design-cta design-portfolio-cta">
        <div>
          <span className="design-eyebrow">Tu celebración</span>
          <h2>Elegimos el formato y construimos una invitación que sí se sienta tuya.</h2>
          <p>Cuéntanos la fecha, el estilo y la información que necesitas compartir.</p>
        </div>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="design-primary">
          Solicitar cotización <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
