import { ProductCard } from "@/components/site/PrimeDesign";
import { designCategories, designProducts } from "@/lib/prime-design";

export const metadata = {
  title: "Catálogo de impresiones | Prime Design",
  description: "Catalogo de lonas, viniles, tarjetas, volantes, promocionales, papeleria y acabados.",
};

export default function DesignCatalogPage() {
  return (
    <section className="design-inner">
      <div className="design-section-head">
        <span className="design-eyebrow">Catalogo</span>
        <h1>Elige el producto y pide una cotización con los datos correctos.</h1>
        <p>
          Cada producto abre una ficha con usos, especificaciones y un formulario pequeño según lo que se necesita para cotizar.
        </p>
      </div>
      <div className="design-category-row">
        {designCategories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
      <div className="design-product-grid">
        {designProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
