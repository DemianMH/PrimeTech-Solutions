import Link from "next/link";
import { ArrowRight, ImagePlus } from "lucide-react";

export const metadata = {
  title: "Portafolio de diseño | Prime Design",
  description: "Portafolio de branding, impresos, redes sociales y diseño gráfico.",
};

export default function DesignPortfolioPage() {
  return (
    <section className="design-inner">
      <div className="design-section-head">
        <span className="design-eyebrow">Portafolio de diseño</span>
        <h1>Espacio listo para tus proyectos de marca, impresos y redes.</h1>
        <p>
          Aun no agregamos casos reales aqui, pero ya esta preparada la estructura para mostrar
          imagen, categoría, descripción, piezas incluidas y resultado visual.
        </p>
      </div>

      <div className="empty-design-portfolio">
        <ImagePlus size={46} />
        <h2>Agrega tus imagenes en `public/prime-design-portfolio`</h2>
        <p>
          Cuando tengas trabajos de branding, flyers, publicaciones, menus, lonas o identidad visual,
          se pueden agregar como tarjetas igual que el portafolio de tecnología.
        </p>
        <Link href="/prime-design/catalogo" className="design-primary">
          Ver catálogo mientras tanto <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
