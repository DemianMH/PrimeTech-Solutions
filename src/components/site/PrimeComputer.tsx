"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Globe,
  Lock,
  Monitor,
  RotateCw,
  Smartphone,
  Sparkles,
  Wifi,
} from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase";

type View = "desktop" | "mobile";
type Mode = "live" | "capture";

/**
 * Computadora interactiva: un mini navegador dentro de una laptop 3D.
 * Si el sitio permite iframe se navega en vivo; si lo bloquea, se recorre una
 * captura completa con scroll y se ofrece abrir el sitio real.
 */
export function PrimeComputer({ projects, compact = false }: { projects: ShowcaseProject[]; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [cursor, setCursor] = useState(0);
  const [view, setView] = useState<View>("desktop");
  const [mode, setMode] = useState<Mode>(projects[0]?.embeddable ? "live" : "capture");
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [clock, setClock] = useState("");
  const viewport = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });

  const project = projects[index];
  const host = useMemo(() => new URL(project.url).host.replace(/^www\./, ""), [project.url]);
  const canEmbed = project.embeddable;
  const showLive = canEmbed && mode === "live";

  const open = useCallback(
    (next: number, push = true) => {
      setIndex(next);
      setMode(projects[next].embeddable ? "live" : "capture");
      setLoading(true);
      viewport.current?.scrollTo({ top: 0 });
      if (push) {
        setHistory((prev) => [...prev.slice(0, cursor + 1), next]);
        setCursor((prev) => prev + 1);
      }
    },
    [cursor, projects]
  );

  const back = () => {
    if (cursor === 0) return;
    setCursor(cursor - 1);
    open(history[cursor - 1], false);
  };
  const forward = () => {
    if (cursor >= history.length - 1) return;
    setCursor(cursor + 1);
    open(history[cursor + 1], false);
  };
  const reload = () => {
    setLoading(true);
    setReloadKey((key) => key + 1);
    viewport.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // En celulares la vista móvil del proyecto se aprecia mejor que la de escritorio.
  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) setView("mobile");
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  // El iframe se renderiza al ancho real del dispositivo y se escala a la pantalla.
  useEffect(() => {
    const node = device.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) =>
      setBox({ width: entry.contentRect.width, height: entry.contentRect.height })
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [view]);
  const frameWidth = view === "desktop" ? 1440 : 390;
  const frameScale = box.width ? box.width / frameWidth : 1;

  // Si el sitio en vivo no responde en 9 s, se muestra la captura para no dejar la pantalla en blanco.
  useEffect(() => {
    if (!showLive || !loading) return;
    const timer = window.setTimeout(() => setMode("capture"), 9000);
    return () => window.clearTimeout(timer);
  }, [showLive, loading, reloadKey, index]);

  // Flechas izquierda/derecha cambian de proyecto cuando la computadora tiene el foco.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.target instanceof HTMLIFrameElement) return;
    if (event.key === "ArrowRight") open((index + 1) % projects.length);
    if (event.key === "ArrowLeft") open((index - 1 + projects.length) % projects.length);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 5, y: x * 7 });
  };

  return (
    <div className={`pc ${compact ? "pc-compact" : ""}`} style={{ ["--accent" as string]: project.accent }}>
      <div
        ref={stage}
        className="pc-stage"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label="Computadora interactiva del portafolio. Usa las flechas para cambiar de proyecto."
      >
        <div className="pc-laptop" style={{ transform: `rotateX(${8 + tilt.x}deg) rotateY(${tilt.y}deg)` }}>
          <div className="pc-lid">
            <span className="pc-cam" aria-hidden="true" />
            <div className="pc-screen">
              <div className="pc-os-bar">
                <span className="pc-os-brand">
                  <Sparkles size={12} /> PrimeOS
                </span>
                <span className="pc-os-right">
                  <Wifi size={12} /> {clock}
                </span>
              </div>

              <div className="pc-browser">
                <div className="pc-tabs" role="tablist" aria-label="Proyectos abiertos">
                  {projects.slice(0, compact ? 3 : 4).map((item, itemIndex) => (
                    <button
                      key={item.slug}
                      role="tab"
                      aria-selected={itemIndex === index}
                      className={`pc-tab ${itemIndex === index ? "active" : ""}`}
                      onClick={() => open(itemIndex)}
                      type="button"
                    >
                      <i style={{ background: item.accent }} />
                      <span>{item.title}</span>
                    </button>
                  ))}
                  {!compact && projects.length > 4 && index >= 4 && (
                    <button className="pc-tab active" type="button" role="tab" aria-selected>
                      <i style={{ background: project.accent }} />
                      <span>{project.title}</span>
                    </button>
                  )}
                </div>

                <div className="pc-toolbar">
                  <button type="button" onClick={back} disabled={cursor === 0} aria-label="Atrás">
                    <ArrowLeft size={15} />
                  </button>
                  <button type="button" onClick={forward} disabled={cursor >= history.length - 1} aria-label="Adelante">
                    <ArrowRight size={15} />
                  </button>
                  <button type="button" onClick={reload} aria-label="Recargar">
                    <RotateCw size={14} className={loading ? "spin" : ""} />
                  </button>
                  <a className="pc-url" href={project.url} target="_blank" rel="noreferrer" title="Abrir sitio real">
                    <Lock size={12} />
                    <span>{host}</span>
                  </a>
                  <div className="pc-switch" role="group" aria-label="Dispositivo">
                    <button type="button" className={view === "desktop" ? "on" : ""} onClick={() => setView("desktop")} aria-label="Vista escritorio">
                      <Monitor size={14} />
                    </button>
                    <button type="button" className={view === "mobile" ? "on" : ""} onClick={() => setView("mobile")} aria-label="Vista celular">
                      <Smartphone size={14} />
                    </button>
                  </div>
                  {canEmbed && (
                    <div className="pc-switch" role="group" aria-label="Modo de vista">
                      <button type="button" className={mode === "live" ? "on" : ""} onClick={() => setMode("live")} aria-label="Sitio en vivo">
                        <Globe size={14} />
                      </button>
                      <button type="button" className={mode === "capture" ? "on" : ""} onClick={() => setMode("capture")} aria-label="Captura">
                        <Camera size={14} />
                      </button>
                    </div>
                  )}
                  <a className="pc-open" href={project.url} target="_blank" rel="noreferrer">
                    Entrar <ArrowUpRight size={14} />
                  </a>
                </div>

                <div className={`pc-viewport pc-view-${view}`}>
                  <div className="pc-device" ref={device}>
                    {showLive ? (
                      <iframe
                        key={`${project.slug}-${reloadKey}-${view}`}
                        src={project.url}
                        title={`Sitio en vivo de ${project.title}`}
                        referrerPolicy="strict-origin-when-cross-origin"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        onLoad={() => setLoading(false)}
                        style={{
                          width: frameWidth,
                          height: box.height / frameScale || "100%",
                          transform: `scale(${frameScale})`,
                        }}
                      />
                    ) : (
                      <div ref={viewport} className="pc-scroll" key={`${project.slug}-${reloadKey}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={view === "desktop" ? project.shots.desktop : project.shots.mobile}
                          alt={`Página de inicio de ${project.title} (${view === "desktop" ? "escritorio" : "celular"})`}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => setLoading(false)}
                        />
                      </div>
                    )}
                    {!showLive && (
                      <span className="pc-hint">
                        {canEmbed ? "Captura navegable" : "Vista navegable · el sitio real se abre con «Entrar»"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pc-dock" aria-label="Proyectos">
                {projects.map((item, itemIndex) => (
                  <button
                    key={item.slug}
                    type="button"
                    className={`pc-app ${itemIndex === index ? "active" : ""}`}
                    onClick={() => open(itemIndex)}
                    aria-label={`Abrir ${item.title}`}
                    title={item.title}
                    style={{ ["--app" as string]: item.accent }}
                  >
                    {item.title.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pc-base" aria-hidden="true">
            <span className="pc-notch" />
          </div>
        </div>
        <div className="pc-shadow" aria-hidden="true" />
      </div>

      <article className="pc-info" aria-live="polite">
        <div className="pc-info-head">
          <span className="pc-badge">{project.featured ? "Nuevo" : "Proyecto"}</span>
          <span className="pc-cat">{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {!compact && project.highlights.length > 0 && (
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <p className="pc-impact">
          <Sparkles size={16} /> {project.impact}
        </p>
        <div className="pc-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="pc-actions">
          <a href={project.url} target="_blank" rel="noreferrer" className="x-btn x-btn-primary">
            Visitar sitio <ArrowUpRight size={16} />
          </a>
          <div className="pc-nav">
            <button type="button" onClick={() => open((index - 1 + projects.length) % projects.length)} aria-label="Proyecto anterior">
              <ArrowLeft size={18} />
            </button>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => open((index + 1) % projects.length)} aria-label="Proyecto siguiente">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
