"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { services, siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

/** Navegación sin barra: logo, cotizar y un menú que ocupa toda la pantalla. */
export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsapp = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, quiero cotizar un proyecto."
  )}`;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Link href="/" className="fn-logo" aria-label="PrimeTech Solutions inicio">
        <Image src="/logo-color.png" width={40} height={40} alt="" priority />
        <span>
          Prime<b>Tech</b>
        </span>
      </Link>

      <div className="fn-actions">
        <a href={whatsapp} target="_blank" rel="noreferrer" className="fn-quote">
          <FaWhatsapp size={16} /> <span>Cotizar</span>
        </a>
        <button
          type="button"
          className={`fn-burger ${open ? "is-open" : ""}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="fn-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <i />
          <i />
        </button>
      </div>

      <div id="fn-menu" className={`fn-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Principal">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
              tabIndex={open ? 0 : -1}
            >
              <small>0{index + 1}</small>
              {link.label}
            </Link>
          ))}
        </nav>
        <aside>
          <span>Servicios</span>
          {services.map((service) => (
            <Link key={service.slug} href={`/servicios/${service.slug}`} tabIndex={open ? 0 : -1}>
              {service.shortTitle} <ArrowUpRight size={14} />
            </Link>
          ))}
          <Link href="/prime-design" className="fn-design" tabIndex={open ? 0 : -1}>
            Prime Design <ArrowUpRight size={14} />
          </Link>
          <p>
            {siteConfig.location}
            <br />
            {siteConfig.email}
          </p>
        </aside>
      </div>
    </>
  );
}
