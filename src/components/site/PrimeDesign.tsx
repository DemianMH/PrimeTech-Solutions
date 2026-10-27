import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { DesignProduct } from "@/lib/prime-design";

/** Collage CMYK con piezas reales del catálogo, marcas de registro y muestras de color. */
export function DesignHeroArt() {
  const pieces = [
    { src: "/diseño-grafico/lona-front.png", label: "Lona front", cls: "piece-a" },
    { src: "/diseño-grafico/playera-dtf-adulto.png", label: "Playera DTF", cls: "piece-b" },
    { src: "/diseño-grafico/tripticos.png", label: "Trípticos", cls: "piece-c" },
    { src: "/diseño-grafico/vinil-color-impreso.jpg", label: "Vinil impreso", cls: "piece-d" },
  ];
  return (
    <div className="cmyk-art" aria-hidden="true">
      <span className="cmyk-blob c" />
      <span className="cmyk-blob m" />
      <span className="cmyk-blob y" />
      {pieces.map((piece) => (
        <figure key={piece.src} className={`cmyk-piece ${piece.cls}`}>
          <Image src={piece.src} alt="" width={420} height={340} sizes="(max-width: 980px) 45vw, 22vw" />
          <figcaption>{piece.label}</figcaption>
        </figure>
      ))}
      <svg className="reg-mark r1" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="11" />
        <path d="M20 2v36M2 20h36" />
      </svg>
      <svg className="reg-mark r2" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="11" />
        <path d="M20 2v36M2 20h36" />
      </svg>
      <div className="cmyk-swatches">
        <i className="c">C</i>
        <i className="m">M</i>
        <i className="y">Y</i>
        <i className="k">K</i>
      </div>
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

export { ProductQuoteForm } from "./QuoteForm";

const materials = ["Lonas", "Viniles", "Tarjetas", "Roll ups", "Playeras DTF", "Volantes", "Trípticos", "Stickers", "Tazas", "Folders", "Branding", "Redes sociales"];

/** Cinta de materiales en movimiento, con los colores de imprenta. */
export function DesignVectorStrip() {
  return (
    <div className="cmyk-marquee" aria-hidden="true">
      <div>
        {[...materials, ...materials].map((item, i) => (
          <span key={`${item}-${i}`}>
            <i className={["c", "m", "y", "k"][i % 4]} /> {item}
          </span>
        ))}
      </div>
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
