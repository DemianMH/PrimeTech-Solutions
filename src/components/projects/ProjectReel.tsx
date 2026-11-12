"use client";

/* eslint-disable @next/next/no-img-element -- capturas de página completa con alto variable */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase";
import { SiteBrowser } from "./SiteBrowser";

/** Un proyecto por pantalla: dispositivo con la página navegable y su ficha. */
export function ProjectReel({ projects }: { projects: ShowcaseProject[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const screen = useRef<HTMLDivElement>(null);
  const project = projects[index];

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setIndex((value) => (value + step + projects.length) % projects.length);
    },
    [projects.length]
  );

  useEffect(() => {
    screen.current?.scrollTo({ top: 0 });
  }, [index]);

  // Deslizar con el dedo cambia de proyecto.
  const touch = useRef<number | null>(null);

  return (
    <div
      className="reel"
      style={{ ["--accent" as string]: project.accent }}
      onTouchStart={(event) => (touch.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touch.current === null) return;
        const delta = event.changedTouches[0].clientX - touch.current;
        if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div key={project.slug} className={`reel-slide ${dir > 0 ? "from-right" : "from-left"}`}>
        <div className="reel-device">
          <SiteBrowser url={project.url} desktop={project.shots.desktop} mobile={project.shots.mobile} title={project.title} offline={project.offline} />
        </div>

        <div className="reel-info">
          <span className="reel-count">
            {String(index + 1).padStart(2, "0")} <small>/ {String(projects.length).padStart(2, "0")}</small>
          </span>
          <span className="reel-cat">{project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p className="reel-impact">{project.impact}</p>
          <div className="reel-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {project.offline ? (
            <span className="reel-archived">Proyecto archivado · el sitio ya no está en línea</span>
          ) : (
            <a href={project.url} target="_blank" rel="noreferrer" className="pj-cta">
              Entrar al sitio <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>

      <div className="reel-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Proyecto anterior">
          <ArrowLeft size={20} />
        </button>
        <div className="reel-dots">
          {projects.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              className={i === index ? "on" : ""}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={item.title}
              title={item.title}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Proyecto siguiente">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
