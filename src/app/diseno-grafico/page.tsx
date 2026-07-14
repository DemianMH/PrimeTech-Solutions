import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Brush,
  CheckCircle2,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Palette,
  PenTool,
  Sparkles,
  Store,
} from "lucide-react";

const siteUrl = "https://www.primetechsolutions.com.mx";
const whatsappText = encodeURIComponent(
  "Hola Primetech, quiero cotizar diseño gráfico para mi negocio y conectarlo con web o WhatsApp."
);
const whatsappUrl = `https://wa.me/523330620287?text=${whatsappText}`;

export const metadata: Metadata = {
  title: "Diseño gráfico para negocios en Guadalajara y Zapopan",
  description:
    "Diseño gráfico comercial para negocios de Jalisco: identidad visual, flyers, menús, catálogos, banners, redes sociales y piezas listas para vender por WhatsApp.",
  alternates: {
    canonical: `${siteUrl}/diseno-grafico`,
  },
  openGraph: {
    title: "Diseño gráfico para vender más | PrimeTech Solutions",
    description:
      "Diseños profesionales conectados a tu estrategia digital: web, WhatsApp, catálogo, campañas y redes sociales.",
    url: `${siteUrl}/diseno-grafico`,
    siteName: "PrimeTech Solutions",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/logo-text-color.png",
        width: 1200,
        height: 1200,
        alt: "PrimeTech Solutions - Diseño gráfico para negocios",
      },
    ],
  },
};

const services = [
  {
    icon: Palette,
    title: "Identidad visual",
    description:
      "Logo, colores, tipografías, estilo visual y guía básica para que tu marca se vea profesional en todos lados.",
  },
  {
    icon: Megaphone,
    title: "Promociones y campañas",
    description:
      "Flyers, banners, posts y anuncios para descuentos, lanzamientos, temporadas y campañas de venta.",
  },
  {
    icon: Store,
    title: "Catálogos y menús",
    description:
      "Diseño de catálogos, menús digitales, listas de precios y material para vender por WhatsApp más rápido.",
  },
  {
    icon: LayoutDashboard,
    title: "Diseño para web y ecommerce",
    description:
      "Banners, portadas, secciones visuales, tarjetas de servicio y recursos para sitios web o tiendas online.",
  },
  {
    icon: ImageIcon,
    title: "Contenido para redes",
    description:
      "Plantillas y publicaciones para Instagram, Facebook y WhatsApp Business con estilo consistente.",
  },
  {
    icon: Bot,
    title: "Diseño conectado a automatización",
    description:
      "Piezas visuales pensadas para llevar al cliente a WhatsApp, formulario, chatbot, catálogo o CRM.",
  },
];

const deliverables = [
  "Diseños adaptados a celular",
  "Formatos para WhatsApp, Instagram y Facebook",
  "Versiones para web, historias, posts y banners",
  "Textos comerciales claros y llamados a la acción",
  "Entrega ordenada por carpetas y tamaños",
  "Opcional: conexión con landing page, chatbot o catálogo",
];

const packages = [
  {
    name: "Diseño Express",
    price: "Desde $950 MXN",
    description: "Para una promoción, flyer, banner o pieza puntual.",
    features: ["1 a 3 diseños", "Adaptación a redes", "Texto comercial", "Entrega digital"],
  },
  {
    name: "Kit Comercial",
    price: "Desde $2,500 MXN",
    description: "Para negocios que quieren verse mejor y vender por WhatsApp.",
    featured: true,
    features: ["Flyers y posts", "Portadas o banners", "Catálogo/menú base", "Botones y CTA a WhatsApp"],
  },
  {
    name: "Marca + Web",
    price: "Desde $6,500 MXN",
    description: "Para alinear diseño, sitio web, catálogo y automatización.",
    features: ["Identidad visual", "Diseño web inicial", "Catálogo o landing", "Preparado para chatbot"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diseño gráfico para negocios en Guadalajara y Zapopan",
  provider: {
    "@type": "LocalBusiness",
    name: "PrimeTech Solutions",
    url: siteUrl,
    image: `${siteUrl}/logo-text-color.png`,
    telephone: "+52 33 3062 0287",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zapopan",
      addressRegion: "Jalisco",
      addressCountry: "MX",
    },
  },
  areaServed: ["Zapopan", "Guadalajara", "Jalisco"],
  serviceType: "Diseño gráfico comercial, branding, redes sociales, catálogo digital y diseño para WhatsApp",
  url: `${siteUrl}/diseno-grafico`,
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
      {children}
    </span>
  );
}

export default function DisenoGraficoPage() {
  return (
    <div className="overflow-hidden bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-8 top-40 -z-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Badge>
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Diseño gráfico + ventas digitales
            </Badge>
            <h1 className="mt-7 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Diseño gráfico para que tu negocio se vea profesional y venda más por{" "}
              <span className="gradient-text">WhatsApp, web y redes</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              En PrimeTech Solutions no hacemos diseños sueltos sin estrategia. Creamos piezas visuales para campañas,
              catálogos, menús, promociones, redes sociales y páginas web con llamados claros para generar mensajes,
              cotizaciones y ventas.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-white"
              >
                Cotizar diseño gráfico
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/portafolio"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Ver portafolio
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-cyan-200">Kit visual comercial</p>
                    <p className="mt-1 text-xs text-slate-400">Listo para web, WhatsApp y redes</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950">
                    <Brush className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {["Promoción con CTA", "Catálogo visual", "Banner para sitio web", "Post para redes", "Respuesta visual para WhatsApp"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                        <span className="text-sm font-semibold text-slate-200">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge>Servicios de diseño</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Diseño que acompaña tu sistema de ventas, no solo “algo bonito”.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Lo adaptamos a tu esencia principal: tecnología, IA, WhatsApp, web y automatización; el diseño gráfico queda como complemento para convertir mejor.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8">
            <Badge>Entregables</Badge>
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
              Todo listo para publicar, compartir y vender.
            </h2>
            <p className="mt-4 text-slate-300">
              El objetivo es que cada diseño tenga una acción clara: escribir por WhatsApp, pedir cotización, ver catálogo, reservar cita o comprar.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              Pedir recomendación
              <MessageCircle className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <BadgeCheck className="mb-3 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <Badge>Paquetes</Badge>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">
              Opciones claras para empezar sin complicarte.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pack) => (
              <article
                key={pack.name}
                className={`rounded-[2rem] border p-6 ${
                  pack.featured
                    ? "border-cyan-300/40 bg-cyan-300/10 shadow-2xl shadow-cyan-500/10"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                {pack.featured && <Badge>Recomendado</Badge>}
                <h3 className="mt-4 text-2xl font-black text-white">{pack.name}</h3>
                <p className="mt-2 text-3xl font-black text-cyan-200">{pack.price}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{pack.description}</p>
                <div className="mt-6 grid gap-3">
                  {pack.features.map((feature) => (
                    <p key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                      {feature}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 to-purple-500/15 p-8 text-center shadow-2xl shadow-cyan-500/10 sm:p-12">
          <PenTool className="mx-auto h-10 w-10 text-cyan-200" />
          <h2 className="mt-5 text-3xl font-black text-white sm:text-5xl">
            ¿Quieres que tu marca se vea más fuerte sin perder el enfoque tecnológico?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Te puedo recomendar qué piezas visuales te convienen según tu negocio: web, redes, WhatsApp, catálogo o campañas.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-4 text-base font-black text-slate-950 transition hover:-translate-y-1 hover:bg-white"
          >
            Cotizar por WhatsApp
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
