import Link from "next/link";
import { ArrowRight, BadgeCheck, Megaphone, Palette, Printer, Sparkles } from "lucide-react";
import { DesignHeroArt, DesignVectorStrip, ProductCard } from "@/components/site/PrimeDesign";
import { brandServices, designProducts, marketingServices } from "@/lib/prime-design";

export const metadata = {
  title: "Prime Design | Diseño, impresiones y marketing visual",
  description:
    "Prime Design: catálogo de impresiones, diseño de marca, marketing para redes y piezas visuales para negocios.",
};

export default function PrimeDesignPage() {
  const featured = designProducts.filter((product) =>
    ["lona-front", "tarjetas-fv-brillante", "vinil-brillante", "rollup", "playera-dtf-adulto", "tripticos"].includes(product.slug)
  );

  return (
    <>
      <section className="design-hero">
        <div>
          <span className="design-eyebrow">Prime Design</span>
          <h1>Diseño e impresión para que tu marca se vea lista para vender.</h1>
          <p>
            Creamos piezas visuales, impresos, branding y contenido para redes con un flujo simple:
            eliges lo que necesitas, nos das medidas o archivo, y armamos una cotización clara.
          </p>
          <div className="design-actions">
            <Link href="/prime-design/catalogo" className="design-primary">
              Ver catálogo <ArrowRight size={18} />
            </Link>
            <Link href="/prime-design/branding" className="design-secondary">
              Diseño de marca
            </Link>
          </div>
        </div>
        <DesignHeroArt />
      </section>

      <DesignVectorStrip />

      <section className="design-section">
        <div className="design-section-head">
          <span className="design-eyebrow">Catálogo rápido</span>
          <h2>Productos que tus clientes ven, tocan y recuerdan.</h2>
          <p>Lonas, viniles, tarjetas, volantes, promocionales y papeleria comercial con solicitud guiada.</p>
        </div>
        <div className="design-product-grid featured">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="design-services-band">
        <article>
          <Palette size={28} />
          <h2>Marca</h2>
          <p>{brandServices[0].text}</p>
        </article>
        <article>
          <Printer size={28} />
          <h2>Impresion</h2>
          <p>Materiales impresos para venta, eventos, exhibicion, punto de venta y presentacion profesional.</p>
        </article>
        <article>
          <Megaphone size={28} />
          <h2>Marketing</h2>
          <p>{marketingServices[0].text}</p>
        </article>
      </section>

      <section className="design-cta">
        <div>
          <span className="design-eyebrow">Estrategia visual</span>
          <h2>Una marca se recuerda cuando todo se siente conectado.</h2>
          <p>
            Repetimos con intencion color, tipografia, tono, piezas impresas y contenido digital
            para que tus clientes reconozcan tu negocio en redes, anuncios y materiales fisicos.
          </p>
        </div>
        <BadgeCheck size={58} />
        <Sparkles className="cta-spark" size={28} />
      </section>
    </>
  );
}
