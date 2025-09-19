import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab";
import MainLayoutWrapper from "@/components/ui/main-layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  metadataBase: new URL('https://primetech-solutions.netlify.app/'),
  
  title: "PrimeTech Solutions",
  description: "Soluciones Integrales 360: Desarrollo de Software, Soporte IT y Diseño Gráfico.",
  

  openGraph: {
    title: "PrimeTech Solutions",
    description: "Soluciones Integrales 360",
    images: [
      {
        url: '/logo-text-white.png', 
        width: 1200, 
        height: 630, 
        alt: 'Logo de PrimeTech Solutions',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },

 
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeTech Solutions',
    description: 'Soluciones Integrales 360',
    images: ['/logo-text-white.png'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
          <WhatsAppFAB />
      </body>
    </html>
  );
}