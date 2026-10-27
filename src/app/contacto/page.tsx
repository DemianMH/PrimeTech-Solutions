import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/site/ContactForm";
import { paymentPolicy, siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contacto",
  description: "Contacta a PrimeTech Solutions para cotizar tecnología, sitios web, IA, CCTV, nube o soporte.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, quiero un diagnóstico para mi negocio."
  )}`;

  return (
    <div className="xp">
      <section className="ct">
        <div className="ct-copy">
          <span className="xp-kicker">Contacto</span>
          <h1>
            Cuéntalo simple. <em>Te damos una ruta clara.</em>
          </h1>
          <p>
            Dinos qué necesitas, qué problema quieres resolver y qué tan urgente es. Te respondemos con los siguientes
            pasos para cotizar sin vueltas.
          </p>
          <div className="ct-methods">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <FaWhatsapp size={19} /> WhatsApp
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail size={19} /> <span>{siteConfig.email}</span>
            </a>
            <span>
              <MapPin size={19} /> {siteConfig.location}
            </span>
          </div>
        </div>

        <ContactForm />

        <aside className="ct-terms">
          <h2>Condiciones claras desde el inicio</h2>
          <ul>
            {paymentPolicy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
