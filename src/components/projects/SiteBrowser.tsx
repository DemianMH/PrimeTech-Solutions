"use client";

/* eslint-disable @next/next/no-img-element -- capturas de página completa con alto variable */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Lock, Monitor, Pause, Play, Smartphone } from "lucide-react";

type Props = {
  url: string;
  desktop: string;
  mobile: string;
  title: string;
  /** Altura del área de la página (CSS). */
  height?: string;
  offline?: boolean;
};

/**
 * Mini navegador con la página completa del proyecto. Los sitios bloquean mostrarse
 * dentro de otra página (X-Frame-Options), así que se recorre una captura completa:
 * se desplaza sola, se puede deslizar con el dedo o la rueda y alternar escritorio/celular.
 */
export function SiteBrowser({ url, desktop, mobile, title, height = "min(58vh, 520px)", offline }: Props) {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [auto, setAuto] = useState(true);
  const [progress, setProgress] = useState(0);
  const screen = useRef<HTMLDivElement>(null);
  const host = new URL(url).host.replace(/^www\./, "");

  // En celulares la vista móvil del sitio se aprecia mejor.
  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) setView("mobile");
  }, []);

  // Desplazamiento automático suave; se detiene en cuanto el usuario interactúa.
  useEffect(() => {
    const node = screen.current;
    if (!node || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.3 });
    io.observe(node);
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (visible) {
        const max = node.scrollHeight - node.clientHeight;
        if (max > 0) node.scrollTop = node.scrollTop >= max - 1 ? 0 : node.scrollTop + dt * 0.06;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [auto, view]);

  useEffect(() => {
    screen.current?.scrollTo({ top: 0 });
  }, [view, desktop]);

  const stop = () => setAuto(false);

  return (
    <div className={`sb sb-${view}`}>
      <div className="sb-bar">
        <span className="sb-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="sb-url">
          <Lock size={11} /> {host}
        </span>
        <div className="sb-tools" role="group" aria-label="Vista">
          <button type="button" className={view === "desktop" ? "on" : ""} onClick={() => setView("desktop")} aria-label="Vista escritorio" aria-pressed={view === "desktop"}>
            <Monitor size={14} />
          </button>
          <button type="button" className={view === "mobile" ? "on" : ""} onClick={() => setView("mobile")} aria-label="Vista celular" aria-pressed={view === "mobile"}>
            <Smartphone size={14} />
          </button>
          <button type="button" onClick={() => setAuto((a) => !a)} aria-label={auto ? "Detener recorrido" : "Recorrer solo"}>
            {auto ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>
      <div className="sb-stage" style={{ height }}>
        <div
          ref={screen}
          className="sb-screen"
          tabIndex={0}
          aria-label={`Página de ${title}: desliza para recorrerla`}
          onWheel={stop}
          onTouchStart={stop}
          onPointerDown={stop}
          onKeyDown={stop}
          onScroll={(event) => {
            const el = event.currentTarget;
            const max = el.scrollHeight - el.clientHeight;
            setProgress(max > 0 ? el.scrollTop / max : 0);
          }}
        >
          <img key={view} src={view === "desktop" ? desktop : mobile} alt={`Sitio de ${title} (${view === "desktop" ? "escritorio" : "celular"})`} loading="lazy" decoding="async" draggable={false} />
        </div>
        <div className="sb-progress" aria-hidden="true">
          <i style={{ transform: `scaleY(${progress})` }} />
        </div>
      </div>
      <div className="sb-foot">
        <span>{auto ? "Recorriendo el sitio… toca para detener" : "Desliza dentro de la pantalla para recorrerlo"}</span>
        {offline ? (
          <span className="sb-off">Sitio archivado</span>
        ) : (
          <a href={url} target="_blank" rel="noreferrer">
            Abrir sitio real <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
