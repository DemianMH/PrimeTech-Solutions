import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ProductQuoteForm, SpecList } from "@/components/site/PrimeDesign";
import { designProducts, getDesignProduct } from "@/lib/prime-design";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return designProducts.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getDesignProduct(params.slug);
  return {
    title: `${product.title} | Prime Design`,
    description: product.use,
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = designProducts.find((item) => item.slug === params.slug);
  if (!product) {
    notFound();
  }

  return (
    <section className="design-product-detail">
      <Link href="/prime-design/catalogo" className="design-back">
        <ArrowLeft size={16} /> Volver al catálogo
      </Link>
      <div className="product-detail-grid">
        <div className="product-detail-media">
          <span className="floating-sticker">
            <Sparkles size={16} /> Cotizable
          </span>
          <Image
            src={product.image}
            alt={`${product.title} de Prime Design`}
            width={900}
            height={700}
            sizes="(max-width: 980px) 100vw, 50vw"
            className="product-detail-image"
            priority
          />
        </div>
        <div className="product-detail-copy">
          <span className="design-eyebrow">{product.category}</span>
          <h1>{product.title}</h1>
          <p>{product.use}</p>
          <SpecList product={product} />
        </div>
      </div>
      <ProductQuoteForm product={product} />
    </section>
  );
}
