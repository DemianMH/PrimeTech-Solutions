import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = "https://www.primetechsolutions.com.mx";
const whatsappNumber = "523330620287";
const whatsappText = encodeURIComponent(
  "Hola Primetech, quiero mejorar mi negocio con sitio web, WhatsApp, chatbot o automatización. ¿Me puedes orientar?"
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "PrimeTech Solutions | Sitios Web, Chatbots IA y Automatización WhatsApp en Guadalajara",
    template: "%s | PrimeTech Solutions",
  },
  description:
    "Creamos sitios web, catálogos digitales, chatbots con IA, automatizaciones WhatsApp, CRM GoHighLevel, ecommerce y soporte IT para negocios de Zapopan, Guadalajara y Jalisco.",
  keywords: [
    "sitios web Guadalajara",
    "sitios web Zapopan",
    "diseño web Guadalajara",
    "diseño web Zapopan",
    "chatbots WhatsApp Guadalajara",
    "chatbots con IA para WhatsApp",
    "automatización WhatsApp",
    "automatización de ventas con IA",
    "ManyChat México",
    "ManyChat Guadalajara",
    "GoHighLevel México",
    "GoHighLevel Guadalajara",
    "CRM para negocios",
    "agencia web Jalisco",
    "ecommerce Guadalajara",
    "catálogo digital WhatsApp",
    "landing pages Guadalajara",
  ],
  authors: [{ name: "PrimeTech Solutions" }],
  creator: "PrimeTech Solutions",
  publisher: "PrimeTech Solutions",
  category: "technology",
  applicationName: "PrimeTech Solutions",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "PrimeTech Solutions",
    title:
      "PrimeTech Solutions | IA, WhatsApp, sitios web y automatización para negocios",
    description:
      "Ayudamos a negocios de Jalisco a vender más rápido por WhatsApp con sitios web, catálogos, chatbots, CRM y automatizaciones.",
    images: [
      {
        url: "/logo-text-color.png",
        width: 1200,
        height: 1200,
        alt: "PrimeTech Solutions - Sitios web, IA y automatización WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeTech Solutions | Sitios web y automatización WhatsApp",
    description:
      "Soluciones digitales para captar clientes, vender por WhatsApp y automatizar procesos comerciales.",
    images: ["/logo-text-color.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const navItems = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#ia-whatsapp", label: "IA + WhatsApp" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/#paquetes", label: "Paquetes" },
  { href: "/contacto", label: "Contacto" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
      "@id": `${siteUrl}/#organization`,
      name: "PrimeTech Solutions",
      alternateName: "PrimeTech",
      url: siteUrl,
      logo: `${siteUrl}/logo-text-color.png`,
      image: `${siteUrl}/logo-text-color.png`,
      telephone: "+52 33 3062 0287",
      email: "contacto@primetechsolutions.com.mx",
      priceRange: "$$",
      areaServed: ["Zapopan", "Guadalajara", "Jalisco", "México"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zapopan",
        addressRegion: "Jalisco",
        addressCountry: "MX",
      },
      description:
        "Sitios web, chatbots con IA, automatización WhatsApp, CRM GoHighLevel, ecommerce y soporte IT para negocios de Jalisco.",
      sameAs: [
        "https://www.primetechsolutions.com.mx"
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sitios web para negocios en Guadalajara y Zapopan",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chatbots con IA para WhatsApp",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automatización ManyChat y WhatsApp",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CRM y automatizaciones GoHighLevel",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ecommerce y catálogos digitales",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "PrimeTech Solutions",
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "es-MX",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/25 bg-white/[0.06] shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 transition duration-300 group-hover:scale-105 group-hover:border-cyan-200/60 group-hover:bg-cyan-300/10">
        <span className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-md transition group-hover:bg-cyan-300/20" />
        <Image
          src="/logo-color.png"
          alt="Logotipo PrimeTech Solutions"
          width={44}
          height={44}
          priority
          className="relative h-8 w-8 object-contain"
        />
      </span>

      {!compact && (
        <span className="leading-tight">
          <span className="block text-base font-black tracking-tight text-white sm:text-lg">
            PrimeTech
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-200/85">
            Solutions
          </span>
        </span>
      )}
    </span>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <html lang="es-MX" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-50 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
            aria-label="Navegación principal"
          >
            <Link
              href="/"
              className="group flex items-center"
              aria-label="PrimeTech Solutions inicio"
            >
              <BrandLogo />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Cotizar por WhatsApp
              </a>
            </div>

            <details className="group relative lg:hidden">
              <summary className="list-none rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white marker:hidden">
                Menú
              </summary>
              <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="mb-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <BrandLogo compact={false} />
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            </details>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t border-white/10 bg-slate-950 px-4 py-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <Link href="/" className="group inline-flex items-center" aria-label="PrimeTech Solutions inicio">
                <BrandLogo />
              </Link>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                Tecnología comercial para negocios de Jalisco: sitios web,
                automatización WhatsApp, IA, ecommerce, CRM y soporte IT.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-cyan-100">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">
                  Zapopan
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">
                  Guadalajara
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1">
                  Jalisco
                </span>
              </div>
            </div>

            <div>
              <p className="font-bold text-white">Servicios</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-400">
                <Link href="/#servicios" className="hover:text-cyan-200">
                  Servicios digitales
                </Link>
                <Link href="/#ia-whatsapp" className="hover:text-cyan-200">
                  Chatbots IA
                </Link>
                <Link href="/portafolio" className="hover:text-cyan-200">
                  Portafolio
                </Link>
              </div>
            </div>

            <div>
              <p className="font-bold text-white">Contacto</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-400">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-200">
                  33 3062 0287
                </a>
                <a
                  href="mailto:contacto@primetechsolutions.com.mx"
                  className="hover:text-cyan-200"
                >
                  contacto@primetechsolutions.com.mx
                </a>
                <span>Zapopan y Guadalajara, Jalisco</span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-7xl text-xs text-slate-500">
            © {new Date().getFullYear()} PrimeTech Solutions. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
