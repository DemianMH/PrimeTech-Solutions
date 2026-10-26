"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { OrbitService } from "./HeroScene";

// three.js solo se descarga en el navegador y después del primer render.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export function HeroStage({ services }: { services: OrbitService[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const node = wrapper.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setMounted(true);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="hero-stage" aria-label="Servicios de PrimeTech en 3D: toca uno para ver su detalle">
      {/* Respaldo visible mientras carga el 3D o si WebGL no está disponible */}
      <div className="hero-stage-fallback" aria-hidden="true">
        <span className="core-glow" />
      </div>
      {mounted && <HeroScene services={services} active={visible} reducedMotion={reducedMotion} />}
    </div>
  );
}
