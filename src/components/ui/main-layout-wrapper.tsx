"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NavbarFlow from '@/components/ui/navbar-flow';
import Footer from '@/components/ui/footer';
import { WhatsAppFAB } from "@/components/ui/whatsapp-fab"; // Importamos el FAB aquí
import { navLinks } from '@/lib/data';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Identificamos páginas especiales de tu sitio web principal
  const isHome = pathname === '/';
  const isDesignPage = pathname === '/diseno-grafico';
  
  // Lista de rutas que SÍ deben tener menú y footer (Páginas públicas de la empresa)
  const standardRoutes = [
    '/contacto', 
    '/servicios', 
    '/tienda', 
    '/portafolio', 
    '/cursos', 
    '/aviso-de-privacidad', 
    '/terminos-y-condiciones',
    '/invitaciones/crear' // El generador sí lleva menú
  ];

  // Verificamos si la ruta actual empieza con alguna de las rutas estándar
  const isStandardPage = standardRoutes.some(route => pathname.startsWith(route));

  // 2. Lógica para detectar si es una INVITACIÓN (o el panel de admin)
  // Si no es Home, no es Diseño, y no es una ruta estándar... entonces es una Invitación (slug)
  const isInvitationOrAdmin = !isHome && !isDesignPage && !isStandardPage;

  // --- COMPONENTES DEL NAVBAR ---
  const emblem = (
    <Image
      src="/logo-text-white.png"
      alt="Logo de PrimeTech Solutions"
      width={40}
      height={32}
      priority
    />
  );
  
  const rightComponent = (
    <a href="/contacto" className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors">
      Contáctanos
    </a>
  );

  // CASO 1: Invitaciones y Admin (Limpieza total)
  // Sin Navbar, sin Footer, sin botón flotante de WhatsApp
  if (isInvitationOrAdmin) {
    return <main>{children}</main>;
  }

  // CASO 2: Página de Diseño Gráfico
  // Tiene su propio menú interno, pero conservamos el botón de WhatsApp si quieres
  if (isDesignPage) {
    return (
        <>
            <main>{children}</main>
            <WhatsAppFAB />
        </>
    );
  }

  // CASO 3: Sitio Web Normal (Home, Servicios, Contacto...)
  // Lleva todo: Navbar, Contenido, Footer y WhatsApp
  return (
    <>
      <NavbarFlow emblem={emblem} links={navLinks} rightComponent={rightComponent} />
      <main>{children}</main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}