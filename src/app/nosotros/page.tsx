import Link from "next/link";
import { ArrowRight, BadgeCheck, Compass, Gauge, ShieldCheck } from "lucide-react";
import { PrimeRobot } from "@/components/site/Visuals";

export const metadata = {
  title: "Nosotros",
  description: "Conoce el enfoque de PrimeTech Solutions para proyectos de tecnología, IA e infraestructura.",
};

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div>
          <span className="eyebrow">Nosotros</span>
          <h1>Somos el puente entre tecnología avanzada y operaciones reales.</h1>
          <p>
            PrimeTech Solutions nace para ayudar a negocios que necesitan verse profesionales,
            responder rápido, proteger información y operar con herramientas que sí se entienden.
          </p>
          <Link href="/contacto" className="primary-action">
            Hablar del proyecto <ArrowRight size={18} />
          </Link>
        </div>
        <PrimeRobot label="Equipo Prime" />
      </section>

      <section className="values-grid">
        <article>
          <Compass size={28} />
          <h2>Diagnostico antes de vender</h2>
          <p>No proponemos tecnología por moda. Primero revisamos el problema, el uso real y el retorno esperado.</p>
        </article>
        <article>
          <Gauge size={28} />
          <h2>Velocidad con control</h2>
          <p>Priorizamos entregas rápidas, pero con pruebas, alcance definido y cambios organizados.</p>
        </article>
        <article>
          <ShieldCheck size={28} />
          <h2>Seguridad y continuidad</h2>
          <p>Cuidamos accesos, respaldos, permisos y configuraciones para reducir riesgos.</p>
        </article>
        <article>
          <BadgeCheck size={28} />
          <h2>Explicacion clara</h2>
          <p>Entregamos información entendible para que no dependas de tecnicismos para operar.</p>
        </article>
      </section>
    </>
  );
}
