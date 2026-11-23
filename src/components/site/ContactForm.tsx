"use client";

import { useRef, useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { services, siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulario de contacto. «Enviar mensaje» lo manda por Netlify Forms y llega al correo
 * de contacto; «Mejor por WhatsApp» abre WhatsApp con el mismo mensaje ya escrito.
 * El registro del formulario para Netlify está en public/__forms.html.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("form-name", "contacto");
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const sendWhatsApp = () => {
    const form = formRef.current;
    if (form && !form.reportValidity()) return;
    const data = new FormData(form ?? undefined);
    const text = [
      "Hola PrimeTech, quiero un diagnóstico para mi negocio.",
      "",
      `• Nombre: ${data.get("nombre") ?? ""}`,
      `• Servicio: ${data.get("servicio") ?? ""}`,
      `• Mensaje: ${data.get("mensaje") ?? ""}`,
    ].join("\n");
    window.open(`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form ref={formRef} className="ct-form" name="contacto" onSubmit={submit}>
      <p className="ct-hp" aria-hidden="true">
        <label>
          No llenar
          <input name="empresa-web" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label>
        Nombre
        <input name="nombre" required placeholder="Tu nombre o empresa" autoComplete="name" />
      </label>
      <div className="ct-row">
        <label>
          Correo
          <input name="email" type="email" required placeholder="tu@correo.com" autoComplete="email" />
        </label>
        <label>
          <span>
            Teléfono <small>(opcional)</small>
          </span>
          <input name="telefono" type="tel" placeholder="33 1234 5678" autoComplete="tel" />
        </label>
      </div>
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
      <button type="submit" className="pj-cta ct-mail" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar mensaje"} <Send size={17} />
      </button>
      <button type="button" className="pj-cta" onClick={sendWhatsApp}>
        Mejor por WhatsApp <FaWhatsapp size={18} />
      </button>
      <div aria-live="polite">
        {status === "sent" && (
          <p className="ct-sent">
            ¡Listo! Recibimos tu mensaje y te respondemos a tu correo en menos de 24 horas hábiles.
          </p>
        )}
        {status === "error" && (
          <p className="ct-error">
            No se pudo enviar. Escríbenos a{" "}
            <a href={`mailto:${siteConfig.email}`}>
              <Mail size={14} /> {siteConfig.email}
            </a>{" "}
            o por WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}
