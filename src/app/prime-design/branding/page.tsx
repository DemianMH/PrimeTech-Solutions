import Link from "next/link";
import { ArrowRight, BadgeCheck, Palette, PenTool, Sparkles } from "lucide-react";
import { brandServices } from "@/lib/prime-design";

export const metadata = {
  title: "Diseño de marca | Prime Design",
  description: "Identidad visual, branding y materiales comerciales para negocios.",
};

export default function BrandingPage() {
  return (
    <section className="design-inner">
      <div className="design-split">
        <div>
          <span className="design-eyebrow">Diseño de marca</span>
          <h1>Que tu negocio se vea igual de serio en redes, impresos y ventas.</h1>
          <p>
            Una marca fuerte no es solo un logo. Es color, tono, orden visual, piezas comerciales y
            consistencia para que el cliente te recuerde y confíe más rápido.
          </p>
          <Link href="/prime-design/catalogo" className="design-primary">
            Ver impresos para marca <ArrowRight size={18} />
          </Link>
        </div>
        <div className="brand-board">
          <span><Palette size={28} /> Color</span>
          <span><PenTool size={28} /> Logo</span>
          <span><BadgeCheck size={28} /> Guia</span>
          <span><Sparkles size={28} /> Piezas</span>
        </div>
      </div>

      <div className="design-services-list">
        {brandServices.map((service) => (
          <article key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
