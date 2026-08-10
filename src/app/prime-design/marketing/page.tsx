import Link from "next/link";
import { ArrowRight, CalendarDays, Megaphone, MousePointerClick, TrendingUp } from "lucide-react";
import { marketingServices } from "@/lib/prime-design";

export const metadata = {
  title: "Marketing para redes | Prime Design",
  description: "Contenido, campañas locales, diseño para redes sociales y materiales promocionales.",
};

export default function MarketingPage() {
  return (
    <section className="design-inner">
      <div className="design-split marketing">
        <div>
          <span className="design-eyebrow">Marketing digital</span>
          <h1>Contenido visual para que tu negocio publique con intencion.</h1>
          <p>
            Creamos piezas para redes y campanas locales con mensajes claros: beneficio visible,
            llamada a la acción, prueba social y diseño consistente con tu marca.
          </p>
          <Link href="/prime-design/portafolio" className="design-primary">
            Ver espacio de portafolio <ArrowRight size={18} />
          </Link>
        </div>
        <div className="marketing-stack">
          <span><CalendarDays size={24} /> Calendario</span>
          <span><Megaphone size={24} /> Campana</span>
          <span><MousePointerClick size={24} /> Accion</span>
          <span><TrendingUp size={24} /> Medicion</span>
        </div>
      </div>

      <div className="design-services-list">
        {marketingServices.map((service) => (
          <article key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
