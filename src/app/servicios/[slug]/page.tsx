import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, TimerReset } from "lucide-react";
import { ServiceShowcase } from "@/components/site/Visuals";
import { paymentPolicy, processSteps, serviceBySlug, services, siteConfig } from "@/lib/site";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = serviceBySlug(params.slug);
  if (!service) {
    return { title: "Servicio no encontrado" };
  }
  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `${siteConfig.domain}/servicios/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = serviceBySlug(params.slug);
  if (!service) {
    notFound();
  }
  const Icon = service.icon;
  const whatsappHref = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    `Hola PrimeTech, quiero cotizar ${service.title}.`
  )}`;

  return (
    <>
      <section className="service-hero" style={{ "--accent": service.accent } as CSSProperties}>
        <div>
          <Link href="/servicios" className="back-link">
            <ArrowLeft size={16} /> Todos los servicios
          </Link>
          <span className="eyebrow">PrimeTech Solutions</span>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          <div className="hero-actions">
            <a className="primary-action" href={whatsappHref} target="_blank" rel="noreferrer">
              Cotizar servicio <ArrowRight size={18} />
            </a>
            <Link href="/contacto" className="secondary-action">
              Agendar diagnostico
            </Link>
          </div>
        </div>
        <div className="service-visual-panel">
          <ServiceShowcase
            accent={service.accent}
            type={service.slug}
            title={service.shortTitle}
            icon={<Icon size={54} />}
          />
          <div className="scan-card">
            <Icon size={22} />
            <strong>{service.hook}</strong>
          </div>
        </div>
      </section>

      <section className="section-wrap service-detail-grid">
        <article className="detail-card big">
          <h2>Que realizamos</h2>
          <p>{service.hook}</p>
          <ul className="check-list">
            {service.deliverables.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} /> {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="detail-card">
          <h2>Pago y cambios</h2>
          <ul className="policy-list">
            {paymentPolicy.map((policy) => (
              <li key={policy}>
                <CreditCard size={17} /> {policy}
              </li>
            ))}
          </ul>
        </article>
        <article className="detail-card">
          <h2>Resultados esperados</h2>
          <ul className="policy-list">
            {service.outcomes.map((outcome) => (
              <li key={outcome}>
                <TimerReset size={17} /> {outcome}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="process-section muted">
        <div className="section-heading compact">
          <span className="eyebrow">Entrega</span>
          <h2>Proceso de trabajo para este servicio.</h2>
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

      <section className="faq-section">
        <div className="section-heading compact">
          <span className="eyebrow">Preguntas</span>
          <h2>Respuestas rápidas antes de cotizar.</h2>
        </div>
        <div className="faq-grid">
          {service.faq.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
