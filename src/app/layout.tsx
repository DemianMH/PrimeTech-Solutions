import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarFlow, { FeatureItem } from "@/components/ui/navbar-flow";
import Image from "next/image";
import Footer from "@/components/ui/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrimeTech Solutions",
  description: "Soluciones Integrales 360",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "PrimeTech",
  },
};

const navLinks = [
  { text: "Inicio", url: "/" },
  {
    text: "Servicios",
    submenu: (
      <div className="grid grid-cols-1 gap-4">
        <FeatureItem 
          heading="Desarrollo de Software" 
          url="/servicios/desarrollo" 
          info="Páginas, apps y software a medida." 
        />
        <FeatureItem 
          heading="Soporte IT y Help Desk" 
          url="/servicios/soporte-it" 
          info="Asistencia técnica especializada." 
        />
        <FeatureItem 
          heading="Hardware" 
          url="/servicios/hardware" 
          info="Compra, venta y reparación de equipos." 
        />
        <FeatureItem 
          heading="Ciberseguridad" 
          url="/servicios/ciberseguridad" 
          info="Protegemos tus activos digitales." 
        />
        <FeatureItem 
          heading="Infraestructura de Redes" 
          url="/servicios/redes" 
          info="Conectividad robusta y segura." 
        />
      </div>
    ),
  },
  { text: "Diseño Gráfico", url: "/diseno-grafico" },
  { text: "Cursos", url: "/cursos" },
  { text: "Portafolio", url: "/portafolio" },
];


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarFlow
            emblem={
              <>
                <Image
                  src="/logo-text-color.png"
                  alt="Logo de PrimeTech Solutions"
                  width={50}
                  height={40}
                  className="dark:hidden"
                  priority
                />
                <Image
                  src="/logo-text-white.png"
                  alt="Logo de PrimeTech Solutions"
                  width={50}
                  height={40}
                  className="hidden dark:block"
                  priority
                />
              </>
            }
            links={navLinks}
            rightComponent={
              <a href="/contacto" className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors">
                Contáctanos
              </a>
            }
          />
          
          <main>{children}</main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}