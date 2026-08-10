import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">404</span>
      <h1>Esta ruta ya no forma parte de la primera fase.</h1>
      <p>El sitio fue limpiado para enfocarse en PrimeTech Solutions y sus servicios principales.</p>
      <Link href="/" className="primary-action">
        Volver al inicio
      </Link>
    </section>
  );
}
