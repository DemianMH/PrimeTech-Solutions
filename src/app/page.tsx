import Link from "next/link";
import { ArrowRight, CheckCircle2, MousePointer2, ShieldCheck, Sparkles } from "lucide-react";
import { MotionLines, PrimeRobot } from "@/components/site/Visuals";
import { portfolio, processSteps, services, trustSignals } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <MotionLines />
        <div className="hero-copy">
          <span className="eyebrow">Tecnología clara para negocios que avanzan</span>
          <h1>
            Tu operacion puede verse
            <span className="word-stage">
              <span>más rápida</span>
              <span>más segura</span>
              <span>más inteligente</span>
            </span>
          </h1>
          <p>
            En PrimeTech Solutions construimos sitios web, automatizaciones, agentes IA, nube,
            CCTV, redes y soporte con una meta: que tu negocio venda mejor y trabaje sin friccion.
          </p>
          <div className="hero-actions">
            <Link href="/servicios" className="primary-action">
              Ver servicios <ArrowRight size={18} />
            </Link>
            <Link href="/portafolio" className="secondary-action">
              Portafolio <MousePointer2 size={18} />
            </Link>
          </div>
        </div>
        <PrimeRobot />
      </section>

      <section className="signal-band">
        {trustSignals.map((signal) => (
          <div key={signal.label}>
            <strong>{signal.value}</strong>
            <span>{signal.label}</span>
          </div>
        ))}
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <span className="eyebrow">Servicios</span>
          <h2>Todo lo tecnologico que tu negocio necesita, separado por especialidad.</h2>
          <p>
            Cada servicio tiene alcance, proceso y condiciones claras desde el inicio para que puedas
            tomar decisiones rápido.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link href={`/servicios/${service.slug}`} className="service-card" key={service.slug}>
                <span className="service-icon" style={{ color: service.accent }}>
                  <Icon size={26} />
                </span>
                <h3>{service.shortTitle}</h3>
                <p>{service.summary}</p>
                <span className="card-link">
                  Ver detalle <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="process-section">
        <div className="section-heading compact">
          <span className="eyebrow">Proceso</span>
          <h2>Trabajamos por diagnostico, avance y entrega medible.</h2>
        </div>
        <div className="timeline">
          {processSteps.map((step, index) => (
            <article key={step.title} className="timeline-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-copy">
          <span className="eyebrow">Impacto</span>
          <h2>Tu tecnología debe ayudar a vender, responder, proteger y ordenar.</h2>
          <p>
            Un buen proyecto no es solo bonito. Debe cargar rápido, dejar procesos claros, reducir
            errores y convertir la confianza digital en oportunidades reales.
          </p>
          <ul className="check-list">
            <li><CheckCircle2 size={18} /> Sitios preparados para cotizaciones y WhatsApp.</li>
            <li><CheckCircle2 size={18} /> Automatizaciones para seguimiento y control.</li>
            <li><CheckCircle2 size={18} /> Infraestructura lista para operar y crecer.</li>
          </ul>
        </div>
        <div className="case-stack">
          {portfolio.map((item) => (
            <article key={item.title}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span className="eyebrow">Siguiente paso</span>
          <h2>Cuentalo en 3 minutos. Te regresamos una ruta clara.</h2>
        </div>
        <Link href="/contacto" className="primary-action">
          Solicitar diagnostico <Sparkles size={18} />
        </Link>
      </section>

      <section className="mini-seo-section">
        <ShieldCheck size={22} />
        <p>
          Trabajamos con practicas SEO limpias: estructura, velocidad, contenido util, metadata,
          sitemap y posicionamiento local. Sin palabras escondidas ni tecnicas que pongan en riesgo tu dominio.
        </p>
      </section>
    </>
  );
}
