import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceGlyph } from "@/components/site/Visuals";
import { services } from "@/lib/site";

export const metadata = {
  title: "Servicios tecnologicos",
  description:
    "Servicios de PrimeTech Solutions: automatización, sitios web, IA, equipos, CCTV, infraestructura, nube y soporte.",
};

export default function ServicesPage() {
  return (
    <section className="inner-hero">
      <div className="section-heading">
        <span className="eyebrow">Servicios</span>
        <h1>Soluciones separadas por necesidad, conectadas por estrategia.</h1>
        <p>
          Elige el servicio que necesitas y revisa alcance, proceso, condiciones de pago,
          entregables y preguntas frecuentes.
        </p>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <Link href={`/servicios/${service.slug}`} className="service-row" key={service.slug}>
            <ServiceGlyph accent={service.accent} type={service.slug} />
            <div>
              <span>{service.shortTitle}</span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
            </div>
            <ArrowRight size={22} />
          </Link>
        ))}
      </div>
    </section>
  );
}
