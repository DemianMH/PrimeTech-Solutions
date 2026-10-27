"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { services, siteConfig } from "@/lib/site";

/**
 * Formulario de contacto: arma el mensaje y abre WhatsApp. (Antes usaba mailto:,
 * que depende del programa de correo del visitante y de que el buzón reciba.)
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      "Hola PrimeTech, quiero un diagnóstico para mi negocio.",
      "",
      `• Nombre: ${data.get("nombre")}`,
      `• Servicio: ${data.get("servicio")}`,
      `• Mensaje: ${data.get("mensaje")}`,
    ].join("\n");
    window.open(`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="ct-form" onSubmit={submit}>
      <label>
        Nombre
        <input name="nombre" required placeholder="Tu nombre o empresa" autoComplete="name" />
      </label>
      <label>
        Servicio
        <select name="servicio" required defaultValue="">
          <option value="" disabled>
            Selecciona una opción
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
        <textarea name="mensaje" required placeholder="Cuéntanos qué necesitas, fechas y ciudad." />
      </label>
      <button type="submit" className="pj-cta">
        Enviar por WhatsApp <Send size={17} />
      </button>
      {sent && <p className="ct-sent">Abrimos WhatsApp con tu mensaje listo. Solo presiona enviar.</p>}
    </form>
  );
}
