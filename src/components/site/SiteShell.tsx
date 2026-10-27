"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Palette, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, type Dispatch, type SetStateAction } from "react";
import { siteConfig } from "@/lib/site";
import { designBrand, designNav } from "@/lib/prime-design";
import { FloatingNav } from "@/components/experience/FloatingNav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDesign = pathname?.startsWith("/prime-design");

  if (isDesign) {
    return <DesignHeader open={open} setOpen={setOpen} pathname={pathname || ""} />;
  }

  return (
    <>
      <PullCord href="/prime-design" label="Jalar a Prime Design" variant="tech" />
      <FloatingNav />
    </>
  );
}

function DesignHeader({
  open,
  setOpen,
  pathname,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}) {
  const whatsappHref = `https://wa.me/${designBrand.whatsapp}?text=${encodeURIComponent(
    "Hola Prime Design, quiero una cotización de diseño o impresión."
  )}`;

  return (
    <>
      <PullCord href="/" label="Volver a PrimeTech" variant="design" />
      <header className="design-header">
        <Link href="/prime-design" className="design-brand" aria-label="Prime Design inicio">
          <span className="design-brand-mark"><Palette size={22} /></span>
          <span>
            <strong>Prime</strong>
            <small>Design</small>
          </span>
        </Link>
        <nav className="design-nav" aria-label="Navegacion Prime Design">
          {designNav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "active" : ""}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="design-quote" href={whatsappHref} target="_blank" rel="noreferrer">
          <FaWhatsapp size={19} /> Cotizar
        </a>
        <button className="mobile-menu-button design-mobile-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        {open && (
          <div className="mobile-menu design-mobile-menu">
            {designNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/" onClick={() => setOpen(false)}>
              PrimeTech
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mobile-whatsapp-link">
              <FaWhatsapp size={18} /> WhatsApp
            </a>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/prime-design")) {
    return (
      <footer className="design-footer">
        <div>
          <strong>Prime Design</strong>
          <p>Diseño, impresiones, marca y marketing visual para que tu negocio se vea listo para vender.</p>
        </div>
        <div className="footer-links">
          {designNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div>
        <span className="footer-brand">
          <Image src="/logo-color.png" width={42} height={42} alt="PrimeTech Solutions" />
          <span>
            <strong>PrimeTech</strong>
            <small>Solutions</small>
          </span>
        </span>
        <p>Software, IA, infraestructura y soporte para negocios que necesitan tecnología clara.</p>
      </div>
      <div className="footer-links">
        <Link href="/servicios">Servicios</Link>
        <Link href="/portafolio">Portafolio</Link>
        <Link href="/nosotros">Nosotros</Link>
        <Link href="/contacto">Contacto</Link>
      </div>
      <a className="footer-whatsapp" href={`https://wa.me/${siteConfig.phone}`} target="_blank" rel="noreferrer">
        <FaWhatsapp size={18} /> WhatsApp
      </a>
    </footer>
  );
}

export function WhatsAppFloat() {
  const pathname = usePathname();
  const isDesign = pathname?.startsWith("/prime-design");
  const message = isDesign ? "Hola Prime Design, quiero una cotización." : "Hola PrimeTech, quiero información.";
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}

function PullCord({ href, label, variant }: { href: string; label: string; variant: "tech" | "design" }) {
  return (
    <Link href={href} className={`pull-cord pull-cord-${variant}`} aria-label={label}>
      <span className="cord-string" aria-hidden="true" />
      <span className="cord-knot" aria-hidden="true" />
      <span className="cord-bob" aria-hidden="true" />
      <span className="cord-hint" aria-hidden="true">
        {variant === "tech" ? "Cambiar a diseño" : "Cambiar a tech"} <ArrowRight size={14} />
      </span>
    </Link>
  );
}
