import HeroUI from "@/components/ui/heroui";
import { FeaturesSection } from "@/components/ui/features-section";
import { ScrollingLogos } from "@/components/ui/scrolling-logos";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

export default function HomePage() {
  return (
    <div>
      <HeroUI 
        title="PrimeTech Solutions"
        subtitle="Tecnología y Creatividad Sin Límites"
        description="Transformamos ideas en soluciones digitales robustas, seguras y a la medida de tus necesidades."
        badgeText="✨ Soluciones Integrales 360"
        primaryCTA="Explorar Servicios"
        secondaryCTA="Ver Portafolio"
        features={[
          "Desarrollo de Software",
          "Soporte IT",
          "Diseño Gráfico",
          "Ciberseguridad",
        ]}
      />
      <FeaturesSection />
      <ScrollingLogos />
      <TestimonialsSection />
    </div>
  );
}