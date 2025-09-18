import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab";
import MainLayoutWrapper from "@/components/ui/main-layout-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrimeTech Solutions",
  description: "Soluciones Integrales 360",
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