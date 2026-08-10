"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Palette, Rocket, Sparkles, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, type Dispatch, type SetStateAction } from "react";
import { navItems, services, siteConfig } from "@/lib/site";
import { designBrand, designNav } from "@/lib/prime-design";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDesign = pathname?.startsWith("/prime-design");
  const whatsappHref = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, quiero una cotización para mi negocio."
  )}`;

  if (isDesign) {
    return <DesignHeader open={open} setOpen={setOpen} pathname={pathname || ""} />;
  }

  return (
    <>
      <PullCord href="/prime-design" label="Jalar a Prime Design" variant="tech" />
      <header className="site-header">
        <Link href="/" className="brand-link" aria-label="PrimeTech Solutions inicio">
          <Image
            src="/logo-color.png"
            width={46}
            height={46}
            alt="PrimeTech Solutions"
            priority
            className="brand-mark"
          />
          <span className="brand-text">
            <strong>PrimeTech</strong>
            <small>Solutions</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegacion principal">
          <div className="nav-drop">
            <Link
              href="/servicios"
              className={`nav-pill ${pathname?.startsWith("/servicios") ? "active" : ""}`}
            >
              Servicios
            </Link>
            <div className="mega-menu" role="menu">
              <div className="mega-copy">
                <span>Soluciones PrimeTech</span>
                <strong>Elige un area y mira el alcance completo.</strong>
              </div>
              <div className="mega-grid">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link href={`/servicios/${service.slug}`} className="mega-item" key={service.slug}>
                      <span style={{ color: service.accent }}>
                        <Icon size={20} />
                      </span>
                      <span>{service.shortTitle}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-pill ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a className="quote-button desktop-quote" href={whatsappHref} target="_blank" rel="noreferrer">
          <FaWhatsapp size={20} />
          Cotizar
        </a>

        <button className="mobile-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {open && (
          <div className="mobile-menu">
            <Link href="/servicios" onClick={() => setOpen(false)}>
              <Rocket size={18} /> Servicios
            </Link>
            {services.map((service) => (
              <Link key={service.slug} href={`/servicios/${service.slug}`} onClick={() => setOpen(false)}>
                {service.shortTitle}
              </Link>
            ))}
            <Link href="/portafolio" onClick={() => setOpen(false)}>
              Portafolio
            </Link>
            <Link href="/nosotros" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>
              Contacto
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
      <span className="cord-chain">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="cord-handle">
        <Sparkles size={16} />
        <b>{variant === "tech" ? "Design" : "Tech"}</b>
      </span>
    </Link>
  );
}
