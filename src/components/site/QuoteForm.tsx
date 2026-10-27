"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, FileUp } from "lucide-react";
import { designBrand, type DesignProduct } from "@/lib/prime-design";

/**
 * Formulario de cotización: arma un mensaje con todos los datos y abre WhatsApp
 * con ese texto. (Antes el botón era un enlace y los datos capturados se perdían.)
 */
export function ProductQuoteForm({ product }: { product: DesignProduct }) {
  const [hasFile, setHasFile] = useState(false);
  const extraFields = product.formFields.slice(2);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [`Hola Prime Design, quiero cotizar: *${product.title}*`, ""];
    lines.push(`• Contacto: ${data.get("contacto") || "-"}`);
    lines.push(`• Cantidad: ${data.get("cantidad") || "-"}`);
    extraFields.forEach((field, i) => {
      if (field.toLowerCase().includes("subir")) return;
      const value = String(data.get(`campo-${i}`) || "").trim();
      if (value) lines.push(`• ${field}: ${value}`);
    });
    const comments = String(data.get("comentarios") || "").trim();
    if (comments) lines.push(`• Comentarios: ${comments}`);
    if (hasFile) lines.push("", "Tengo archivo de diseño, te lo envío por aquí.");
    const url = `https://wa.me/${designBrand.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="design-form" onSubmit={submit}>
      <div className="form-title">
        <FileUp size={22} />
        <div>
          <h2>Datos para cotizar</h2>
          <p>Llena lo que tengas y te abrimos WhatsApp con el mensaje listo para enviar.</p>
        </div>
      </div>
      <label>
        Nombre y WhatsApp
        <input name="contacto" required placeholder="Tu nombre y teléfono" autoComplete="name" />
      </label>
      <label>
        Cantidad aproximada
        <input name="cantidad" required placeholder="Ej. 100, 500, 1000 piezas" inputMode="numeric" />
      </label>
      {extraFields.map((field, i) => (
        <label key={field}>
          {field}
          {field.toLowerCase().includes("diseño") || field.toLowerCase().includes("diseno") ? (
            <select name={`campo-${i}`}>
              <option>Con diseño desde cero</option>
              <option>Con ajuste a diseño existente</option>
              <option>Sin diseño, ya tengo archivo listo</option>
            </select>
          ) : field.toLowerCase().includes("subir") ? (
            <span className="design-file-note">
              <input type="checkbox" checked={hasFile} onChange={(event) => setHasFile(event.target.checked)} /> Ya tengo
              archivo: te lo mando por WhatsApp
            </span>
          ) : (
            <input name={`campo-${i}`} placeholder="Escribe el dato si lo tienes" />
          )}
        </label>
      ))}
      <label>
        Comentarios
        <textarea name="comentarios" placeholder="Medidas, colores, referencias, instalación, urgencia o dudas." />
      </label>
      <button className="design-submit" type="submit">
        Enviar por WhatsApp <ArrowRight size={18} />
      </button>
    </form>
  );
}
