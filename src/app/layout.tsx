import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarFlow from "@/components/ui/navbar-flow";
import Image from "next/image";
import Footer from "@/components/ui/footer";
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab";
import { navLinks } from "@/lib/data";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
          <NavbarFlow
            emblem={
              <Image
                src="/logo-text-white.png"
                alt="Logo de PrimeTech Solutions"
                width={40}
                height={32}
                priority
              />
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
          <WhatsAppFAB />
      </body>
    </html>
  );
}