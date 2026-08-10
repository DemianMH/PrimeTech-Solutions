import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileUp, Flag, Palette, PenTool, Ruler, Sparkles } from "lucide-react";
import { designBrand, type DesignProduct } from "@/lib/prime-design";

export function DesignHeroArt() {
  return (
    <div className="design-hero-art" aria-hidden="true">
      <span className="organic-blob blob-yellow blob-top" />
      <span className="organic-blob blob-sage blob-left" />
      <span className="organic-blob blob-sage blob-bottom" />
      <span className="organic-ring ring-top" />
      <span className="organic-ring ring-bottom" />
      <div className="abstract-sky" />
      <div className="abstract-layer layer-one" />
      <div className="abstract-layer layer-two" />
      <div className="abstract-layer layer-three" />
      <div className="abstract-flag flag-one">
        <Flag size={18} />
      </div>
      <div className="abstract-flag flag-two">
        <Sparkles size={18} />
      </div>
      <div className="abstract-flag flag-three">
        <Palette size={18} />
      </div>
      <span className="sunken-dot dot-a" />
      <span className="sunken-dot dot-b" />
    </div>
  );
}

export function ProductCard({ product }: { product: DesignProduct }) {
  return (
    <Link href={`/prime-design/catalogo/${product.slug}`} className="design-product-card">
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={`${product.title} para cotización de impresión en Prime Design`}
          width={520}
          height={420}
          sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
          className="product-image"
        />
      </div>
      <span>{product.category}</span>
      <h3>{product.title}</h3>
      <p>{product.use}</p>
      <strong>
        Cotizar <ArrowRight size={16} />
      </strong>
    </Link>
  );
}

export function ProductQuoteForm({ product }: { product: DesignProduct }) {
  const message = `Hola Prime Design, quiero cotizar ${product.title}.`;
  const whatsappHref = `https://wa.me/${designBrand.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <form className="design-form" action={whatsappHref} method="get">
      <div className="form-title">
        <FileUp size={22} />
        <div>
          <h2>Datos para cotizar</h2>
          <p>Estos campos ayudan a darte una cotización más precisa y evitar vueltas.</p>
        </div>
      </div>
      <label>
        Nombre y WhatsApp
        <input name="contacto" required placeholder="Tu nombre y telefono" />
      </label>
      <label>
        Cantidad aproximada
        <input name="cantidad" required placeholder="Ej. 100, 500, 1000 piezas" />
      </label>
      {product.formFields.slice(2).map((field) => (
        <label key={field}>
          {field}
          {field.toLowerCase().includes("diseño") || field.toLowerCase().includes("diseno") ? (
            <select name={field}>
              <option>Con diseño desde cero</option>
              <option>Con ajuste a diseño existente</option>
              <option>Sin diseño, ya tengo archivo listo</option>
            </select>
          ) : field.toLowerCase().includes("subir") ? (
            <input type="file" name="archivo" />
          ) : (
            <input name={field} placeholder="Escribe el dato si lo tienes" />
          )}
        </label>
      ))}
      <label>
        Comentarios
        <textarea name="comentarios" placeholder="Medidas, colores, referencias, instalación, urgencia o dudas." />
      </label>
      <a className="design-submit" href={whatsappHref} target="_blank" rel="noreferrer">
        Enviar por WhatsApp <ArrowRight size={18} />
      </a>
    </form>
  );
}

export function DesignVectorStrip() {
  return (
    <div className="design-vector-strip" aria-hidden="true">
      <div><PenTool size={22} /><span /></div>
      <div><Ruler size={22} /><span /></div>
      <div><Sparkles size={22} /><span /></div>
    </div>
  );
}

export function SpecList({ product }: { product: DesignProduct }) {
  return (
    <ul className="design-spec-list">
      {product.specs.map((spec) => (
        <li key={spec}>
          <CheckCircle2 size={17} /> {spec}
        </li>
      ))}
    </ul>
  );
}
