import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { MetaPixel } from "@/components/site/MetaPixel";
import { SiteFooter, SiteHeader, WhatsAppFloat } from "@/components/site/SiteShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "PrimeTech Solutions | Tecnología, IA, sitios web y soporte para negocios",
    template: "%s | PrimeTech Solutions",
  },
  description: siteConfig.description,
  keywords: [
    "PrimeTech Solutions",
    "automatización de procesos",
    "sitios web Guadalajara",
    "chatbots IA Mexico",
    "CCTV Guadalajara",
    "infraestructura de redes",
    "soporte tecnico empresas",
    "servicios tecnológicos Jalisco",
    "impresiones Guadalajara",
    "diseño gráfico para negocios",
    "marketing digital para redes",
  ],
  openGraph: {
    title: "PrimeTech Solutions",
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: "PrimeTech Solutions",
    locale: "es_MX",
    type: "website",
  },
  alternates: {
    canonical: siteConfig.domain,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.email,
    telephone: `+${siteConfig.phone}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guadalajara",
      addressRegion: "Jalisco",
      addressCountry: "MX",
    },
    areaServed: ["Guadalajara", "Zapopan", "Jalisco", "Mexico"],
    description: siteConfig.description,
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
    inLanguage: "es-MX",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.domain}/servicios?buscar={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="es">
      <body>
        <MetaPixel />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
