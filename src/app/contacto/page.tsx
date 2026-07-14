import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const siteUrl = "https://www.primetechsolutions.com.mx";
const whatsappText = encodeURIComponent(
  "Hola Primetech, quiero cotizar una solución digital para mi negocio."
);
const whatsappUrl = `https://wa.me/523330620287?text=${whatsappText}`;

export const metadata: Metadata = {
  title: "Contacto | PrimeTech Solutions",
  description:
    "Contacta a PrimeTech Solutions en Zapopan y Guadalajara para sitios web, chatbots IA, automatización WhatsApp, diseño gráfico, ecommerce y soporte IT.",
  alternates: {
    canonical: `${siteUrl}/contacto`,
  },
};

export default function ContactoPage() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.9fr]">
        <div>
          <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
            Contacto PrimeTech Solutions
          </span>
          <h1 className="mt-6 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl">
            Cuéntame qué quieres mejorar y te doy una ruta clara.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Podemos ayudarte con sitio web, chatbot con IA, automatización WhatsApp, CRM, ecommerce, diseño gráfico o soporte IT para tu negocio en Jalisco.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-white"
            >
              Escribir por WhatsApp
              <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:contacto@primetechsolutions.com.mx"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10"
            >
              Enviar correo
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <MessageCircle className="mb-3 h-6 w-6 text-cyan-300" />
              <p className="font-black text-white">WhatsApp</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-1 block text-slate-300 hover:text-cyan-200">
                33 3062 0287
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <Mail className="mb-3 h-6 w-6 text-cyan-300" />
              <p className="font-black text-white">Correo</p>
              <a href="mailto:contacto@primetechsolutions.com.mx" className="mt-1 block text-slate-300 hover:text-cyan-200">
                contacto@primetechsolutions.com.mx
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <MapPin className="mb-3 h-6 w-6 text-cyan-300" />
              <p className="font-black text-white">Zona de atención</p>
              <p className="mt-1 text-slate-300">Zapopan, Guadalajara y Jalisco</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <p className="font-black text-white">Antes de cotizar revisamos:</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-200">
              {["Qué vendes", "Cómo te contactan", "Qué quieres automatizar", "Qué presupuesto tienes", "Qué urge resolver primero"].map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
