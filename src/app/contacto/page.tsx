import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { paymentPolicy, services, siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contacto",
  description: "Contacta a PrimeTech Solutions para cotizar tecnología, sitios web, IA, CCTV, nube o soporte.",
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, quiero un diagnostico para mi negocio."
  )}`;

  return (
    <section className="contact-page">
      <div className="contact-copy">
        <span className="eyebrow">Contacto</span>
        <h1>Cuentalo simple. Te ayudamos a convertirlo en una ruta tecnica clara.</h1>
        <p>
          Envia que necesitas, que problema quieres resolver y que tan urgente es. Te responderemos
          con los siguientes pasos para cotizar sin vueltas.
        </p>
        <div className="contact-methods">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={20} /> WhatsApp
          </a>
          <a href={`mailto:${siteConfig.email}`}>
            <Mail size={20} /> {siteConfig.email}
          </a>
          <span>
            <MapPin size={20} /> {siteConfig.location}
          </span>
        </div>
      </div>

      <form className="contact-form" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
        <label>
          Nombre
          <input name="nombre" required placeholder="Tu nombre o empresa" />
        </label>
        <label>
          Servicio
          <select name="servicio" required defaultValue="">
            <option value="" disabled>
              Selecciona una opcion
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mensaje
          <textarea name="mensaje" required placeholder="Cuéntanos que necesitas, fechas y ciudad." />
        </label>
        <button type="submit" className="primary-action">
          Enviar información <Send size={18} />
        </button>
      </form>

      <aside className="payment-note">
        <h2>Condiciones claras desde el inicio</h2>
        {paymentPolicy.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </aside>
    </section>
  );
}
