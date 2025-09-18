"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import NavbarFlow from '@/components/ui/navbar-flow';
import Footer from '@/components/ui/footer';
import { navLinks } from '@/lib/data';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesignPage = pathname === '/diseno-grafico';

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

  if (isDesignPage) {
    return <main>{children}</main>;
  }

  return (
    <>
      <NavbarFlow emblem={emblem} links={navLinks} rightComponent={rightComponent} />
      <main>{children}</main>
      <Footer />
    </>
  );
}