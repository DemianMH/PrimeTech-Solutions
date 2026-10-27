"use client";

/* eslint-disable @next/next/no-img-element -- capturas con proporciones variables */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Gamepad2 } from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase";

/** Portada del carrusel: los proyectos destacados usan su mejor foto, el resto su captura. */
const covers: Record<string, string> = {
  "flotilla-nacional": "/proyectos/cfn/van.webp",
  "constructora-444": "/proyectos/c444/noche.webp",
  "abisai-handbags": "/proyectos/abisai/campana.webp",
};

/**
 * Carrusel en anillo 3D con todos los proyectos. Gira solo, se arrastra
 * y la tarjeta del frente muestra su ficha y accesos.
 */
export function ProjectsCarousel({ projects }: { projects: ShowcaseProject[] }) {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(560);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const paused = useRef(false);
  const step = 360 / projects.length;
  const active = ((Math.round(-rotation / step) % projects.length) + projects.length) % projects.length;
  const project = projects[active];

  useEffect(() => {
    const resize = () => setRadius(window.innerWidth < 640 ? 400 : window.innerWidth < 1040 ? 520 : 680);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Avanza solo cada pocos segundos mientras nadie lo toca.
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused.current && !drag.current) setRotation((r) => Math.round(r / step) * step - step);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [step]);

  const go = (dir: number) => setRotation((r) => Math.round(r / step) * step - dir * step);

  return (
    <div
      className="proj-ring"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      style={{ ["--accent" as string]: project.accent }}
    >
      <div
        className="ring-stage"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, start: rotation };
          setDragging(true);
          (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current) setRotation(drag.current.start + (event.clientX - drag.current.x) * 0.25);
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
          setRotation((r) => Math.round(r / step) * step);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        aria-label="Carrusel de proyectos. Arrastra o usa las flechas."
      >
        <div
          className="ring-track"
          style={{
            transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`,
            transition: dragging ? "none" : undefined,
          }}
        >
          {projects.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              className={`ring-card ${i === active ? "on" : ""}`}
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
              onClick={() => setRotation(-i * step)}
              aria-label={`Ver ${item.title}`}
              tabIndex={-1}
            >
              <img src={covers[item.slug] ?? item.shots.desktop} alt="" loading="lazy" draggable={false} />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="ring-info" aria-live="polite">
        <button type="button" onClick={() => go(-1)} aria-label="Proyecto anterior" className="ring-arrow">
          <ArrowLeft size={20} />
        </button>
        <div>
          <span className="ring-cat">
            {project.featured ? "Nuevo · " : ""}
            {project.category}
          </span>
          <h3>{project.title}</h3>
          <p>{project.impact}</p>
          <div className="ring-actions">
            {project.offline ? (
              <span className="ring-archived">Proyecto archivado</span>
            ) : (
              <a href={project.url} target="_blank" rel="noreferrer" className="pj-cta">
                Visitar sitio <ArrowUpRight size={16} />
              </a>
            )}
            <Link href="/portafolio?vista=juego" className="xp-ghost">
              <Gamepad2 size={17} /> Recorrer en modo juego
            </Link>
          </div>
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Proyecto siguiente" className="ring-arrow">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
