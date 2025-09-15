import HeroUI from "@/components/ui/heroui";

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
    </div>
  );
}