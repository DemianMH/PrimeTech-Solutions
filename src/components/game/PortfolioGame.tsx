"use client";

/* eslint-disable @next/next/no-img-element -- capturas de página completa dentro del modal */
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Hand, Users, X } from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase";
import { automationProjects, services } from "@/lib/site";
import { characterOrder, characters, drawSprite, type CharacterId } from "./sprites";

/* ------------------------------------------------------------------ */
/* Mundo                                                               */
/* ------------------------------------------------------------------ */

type Exhibit =
  | { kind: "project"; x: number; project: ShowcaseProject }
  | { kind: "automation"; x: number; index: number }
  | { kind: "store"; x: number };

type Zone = { id: string; label: string; color: string; x: number; width: number };

const GROUND = 86; // alto del suelo
const SCALE = 5; // tamaño de cada pixel del personaje
const FRAME_W = 168;
const FRAME_GAP = 230;

const zonesFor: { id: string; label: string; color: string; slugs: string[] }[] = [
  { id: "plataformas", label: "Plataformas y portales", color: "#ff4fa3", slugs: ["flotilla-nacional", "constructora-444", "bere-cardenas", "inapecc"] },
  { id: "ventas", label: "Catálogos y ventas", color: "#ffb703", slugs: ["abisai-handbags", "rifas-el-guero", "sorteo-mike", "3a-rent"] },
  { id: "corporativos", label: "Sitios corporativos", color: "#2ec4b6", slugs: ["czc-projects", "tersus-clean", "revive-the-fire", "portofino-conway", "sadaca-industrial"] },
];

function buildWorld(projects: ShowcaseProject[]) {
  const zones: Zone[] = [];
  const exhibits: Exhibit[] = [];
  let x = 260;

  // Edificio central de PrimeTech: tienda de servicios.
  zones.push({ id: "hq", label: "PrimeTech · Servicios", color: "#3b82f6", x, width: 560 });
  exhibits.push({ kind: "store", x: x + 280 });
  x += 560 + 160;

  for (const zone of zonesFor) {
    const items = zone.slugs.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean) as ShowcaseProject[];
    const width = 140 + items.length * FRAME_GAP;
    zones.push({ id: zone.id, label: zone.label, color: zone.color, x, width });
    items.forEach((project, i) => exhibits.push({ kind: "project", x: x + 140 + i * FRAME_GAP, project }));
    x += width + 160;
  }

  const autoWidth = 140 + automationProjects.length * FRAME_GAP;
  zones.push({ id: "automatizaciones", label: "Automatizaciones y bots", color: "#a855f7", x, width: autoWidth });
  automationProjects.forEach((_, i) => exhibits.push({ kind: "automation", x: x + 140 + i * FRAME_GAP, index: i }));
  x += autoWidth + 260;

  return { zones, exhibits, width: x };
}

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

type Panel = { type: "store" } | { type: "project"; project: ShowcaseProject } | { type: "automation"; index: number } | null;

export function PortfolioGame({ projects }: { projects: ShowcaseProject[] }) {
  const world = useMemo(() => buildWorld(projects), [projects]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const player = useRef({ x: 300, y: 0, vy: 0, facing: 1, step: 0, onGround: true });
  const near = useRef<Exhibit | null>(null);
  const images = useRef<Record<string, HTMLImageElement>>({});

  const [character, setCharacter] = useState<CharacterId | null>(null);
  const [picking, setPicking] = useState(true);
  const [panel, setPanel] = useState<Panel>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [zoneLabel, setZoneLabel] = useState("");

  // Personaje recordado entre visitas.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pt-character") as CharacterId | null;
      if (saved && characters[saved]) setCharacter(saved);
    } catch {
      // sin almacenamiento disponible
    }
  }, []);

  // Precarga de capturas para los cuadros de la galería.
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.shots.desktop;
      images.current[project.slug] = img;
    });
  }, [projects]);

  const interact = useCallback(() => {
    const item = near.current;
    if (!item || panel) return;
    if (item.kind === "store") setPanel({ type: "store" });
    if (item.kind === "project") setPanel({ type: "project", project: item.project });
    if (item.kind === "automation") setPanel({ type: "automation", index: item.index });
  }, [panel]);

  // Teclado
  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (picking) return;
      if (panel) {
        if (event.key === "Escape") setPanel(null);
        return;
      }
      const target = event.target as HTMLElement;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "a", "d", " ", "w", "arrowup"].includes(key) && isInView()) event.preventDefault();
      keys.current[key] = true;
      if ((key === "e" || key === "enter") && isInView()) interact();
    };
    const up = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
    };
    const isInView = () => {
      const rect = wrapRef.current?.getBoundingClientRect();
      return !!rect && rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [interact, panel, picking]);

  // Bucle del juego
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !character || picking) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let width = 0;
    let height = 0;
    const stars = Array.from({ length: 120 }, () => ({ x: Math.random(), y: Math.random() * 0.6, r: Math.random() * 1.6 + 0.3, t: Math.random() * 6 }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = player.current;
      const k = keys.current;
      const groundY = height - GROUND;
      const spriteH = 16 * SCALE;
      const spriteW = 12 * SCALE;

      // Física
      const left = k["arrowleft"] || k["a"];
      const right = k["arrowright"] || k["d"];
      const speed = 300;
      if (!panel) {
        if (left) {
          p.x -= speed * dt;
          p.facing = -1;
        }
        if (right) {
          p.x += speed * dt;
          p.facing = 1;
        }
        if ((k[" "] || k["w"] || k["arrowup"]) && p.onGround) {
          p.vy = -620;
          p.onGround = false;
        }
      }
      p.vy += 1700 * dt;
      p.y += p.vy * dt;
      if (p.y >= 0) {
        p.y = 0;
        p.vy = 0;
        p.onGround = true;
      }
      p.x = Math.max(40, Math.min(world.width - 60, p.x));
      if (left || right) p.step += dt * 8;

      const camX = Math.max(0, Math.min(world.width - width, p.x - width / 2));

      // Cielo de Día de Muertos
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#0d0623");
      sky.addColorStop(0.6, "#2b0f4c");
      sky.addColorStop(1, "#5a1a5e");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.globalAlpha = 0.5 + Math.sin(now / 700 + s.t) * 0.4;
        ctx.fillStyle = "#fff6d8";
        ctx.beginPath();
        ctx.arc(((s.x * width * 2 - camX * 0.05) % width + width) % width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      // Luna
      ctx.fillStyle = "#ffe8a3";
      ctx.shadowColor = "#ffe8a3";
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(width * 0.82 - camX * 0.02, height * 0.18, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cerros y panteón lejano (parallax)
      ctx.fillStyle = "#1c0a33";
      ctx.beginPath();
      ctx.moveTo(0, groundY - 40);
      for (let i = 0; i <= width + 80; i += 80) {
        const wx = i + camX * 0.3;
        ctx.lineTo(i, groundY - 70 - Math.sin(wx / 210) * 34 - Math.cos(wx / 97) * 14);
      }
      ctx.lineTo(width, groundY);
      ctx.lineTo(0, groundY);
      ctx.fill();

      // Papel picado
      const flagColors = ["#ff4fa3", "#ffb703", "#2ec4b6", "#a855f7", "#ff6b35", "#3b82f6"];
      for (let row = 0; row < 2; row++) {
        const y0 = 34 + row * 46;
        const offset = (camX * (0.55 + row * 0.15)) % 46;
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(width, y0);
        ctx.stroke();
        for (let i = -1; i < width / 46 + 2; i++) {
          const fx = i * 46 - offset;
          const idx = Math.abs(Math.floor((fx + camX * (0.55 + row * 0.15)) / 46) + row) % flagColors.length;
          ctx.fillStyle = flagColors[idx];
          const sway = Math.sin(now / 600 + i) * 2;
          ctx.beginPath();
          ctx.moveTo(fx, y0);
          ctx.lineTo(fx + 38, y0);
          ctx.lineTo(fx + 38 + sway, y0 + 26);
          ctx.lineTo(fx + 30 + sway, y0 + 32);
          ctx.lineTo(fx + 19 + sway, y0 + 26);
          ctx.lineTo(fx + 8 + sway, y0 + 32);
          ctx.lineTo(fx + sway, y0 + 26);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "rgba(13,6,35,0.55)";
          ctx.fillRect(fx + 15 + sway, y0 + 9, 8, 8);
        }
      }

      ctx.save();
      ctx.translate(-camX, 0);

      // Edificios y galerías
      world.zones.forEach((zone) => {
        if (zone.x + zone.width < camX - 50 || zone.x > camX + width + 50) return;
        const top = zone.id === "hq" ? groundY - 330 : groundY - 270;
        const h = groundY - top;
        // fachada
        const facade = ctx.createLinearGradient(0, top, 0, groundY);
        facade.addColorStop(0, zone.id === "hq" ? "#1b2a6b" : "#2a1240");
        facade.addColorStop(1, zone.id === "hq" ? "#0d1440" : "#1a0b2b");
        ctx.fillStyle = facade;
        roundRect(ctx, zone.x, top, zone.width, h, 18);
        ctx.fill();
        ctx.strokeStyle = zone.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = zone.color;
        ctx.shadowBlur = 18;
        roundRect(ctx, zone.x, top, zone.width, h, 18);
        ctx.stroke();
        ctx.shadowBlur = 0;
        // letrero neón
        ctx.font = "700 22px 'Space Grotesk', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#0d0623";
        const labelW = ctx.measureText(zone.label).width + 40;
        roundRect(ctx, zone.x + zone.width / 2 - labelW / 2, top - 22, labelW, 44, 22);
        ctx.fill();
        ctx.strokeStyle = zone.color;
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.shadowColor = zone.color;
        ctx.shadowBlur = 14;
        ctx.fillText(zone.label, zone.x + zone.width / 2, top + 8);
        ctx.shadowBlur = 0;

        if (zone.id === "hq") {
          // ventanas iluminadas
          for (let wx = zone.x + 40; wx < zone.x + zone.width - 60; wx += 70) {
            for (let wy = top + 50; wy < groundY - 140; wy += 56) {
              ctx.fillStyle = (wx + wy) % 3 === 0 ? "rgba(125, 211, 252, 0.85)" : "rgba(125, 211, 252, 0.25)";
              ctx.fillRect(wx, wy, 40, 30);
            }
          }
          // puerta de la tienda
          const dx = zone.x + zone.width / 2 - 55;
          ctx.fillStyle = "#ffb703";
          roundRect(ctx, dx, groundY - 120, 110, 120, 12);
          ctx.fill();
          ctx.fillStyle = "#0d0623";
          ctx.font = "800 14px Inter, system-ui, sans-serif";
          ctx.fillText("TIENDA DE", dx + 55, groundY - 74);
          ctx.fillText("SERVICIOS", dx + 55, groundY - 54);
        }
      });

      // Cuadros de proyectos
      near.current = null;
      let nearest = 120;
      world.exhibits.forEach((item) => {
        const dist = Math.abs(item.x - p.x);
        if (dist < nearest) {
          nearest = dist;
          near.current = item;
        }
        if (item.kind === "store") return;
        if (item.x < camX - 200 || item.x > camX + width + 200) return;
        const fy = groundY - 230;
        const fx = item.x - FRAME_W / 2;
        const active = near.current === item;
        ctx.fillStyle = active ? "#ffb703" : "#c08a3e";
        roundRect(ctx, fx - 10, fy - 10, FRAME_W + 20, 120, 8);
        ctx.fill();
        if (item.kind === "project") {
          const img = images.current[item.project.slug];
          ctx.fillStyle = "#fff";
          ctx.fillRect(fx, fy, FRAME_W, 100);
          if (img?.complete && img.naturalWidth) {
            const sh = (img.naturalWidth * 100) / FRAME_W;
            ctx.drawImage(img, 0, 0, img.naturalWidth, Math.min(sh, img.naturalHeight), fx, fy, FRAME_W, 100);
          }
        } else {
          ctx.fillStyle = "#1b0f2e";
          ctx.fillRect(fx, fy, FRAME_W, 100);
          const steps = automationProjects[item.index].steps.slice(0, 4);
          steps.forEach((_, i) => {
            ctx.fillStyle = flagColors[i % flagColors.length];
            ctx.beginPath();
            ctx.arc(fx + 24 + i * 40, fy + 50, 10, 0, Math.PI * 2);
            ctx.fill();
            if (i < steps.length - 1) {
              ctx.strokeStyle = "rgba(255,255,255,0.5)";
              ctx.beginPath();
              ctx.moveTo(fx + 34 + i * 40, fy + 50);
              ctx.lineTo(fx + 54 + i * 40, fy + 50);
              ctx.stroke();
            }
          });
        }
        // placa con el nombre
        const title = item.kind === "project" ? item.project.title : automationProjects[item.index].client;
        ctx.font = "700 13px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#0d0623";
        const tw = Math.min(FRAME_W + 20, ctx.measureText(title).width + 20);
        roundRect(ctx, item.x - tw / 2, fy + 118, tw, 24, 6);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillText(title, item.x, fy + 135, FRAME_W + 10);
      });

      // Suelo: empedrado con camino de cempasúchil
      ctx.fillStyle = "#24122f";
      ctx.fillRect(camX, groundY, width, GROUND);
      ctx.fillStyle = "#ff8c1a";
      for (let gx = Math.floor(camX / 22) * 22; gx < camX + width; gx += 22) {
        const wobble = ((gx * 37) % 9) - 4;
        ctx.beginPath();
        ctx.arc(gx + 11, groundY + 10 + wobble * 0.4, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      // velas
      for (let cx = Math.floor(camX / 180) * 180 + 90; cx < camX + width; cx += 180) {
        ctx.fillStyle = "#f4f1ea";
        ctx.fillRect(cx, groundY - 22, 8, 22);
        ctx.fillStyle = "#ffb703";
        ctx.shadowColor = "#ffb703";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.ellipse(cx + 4, groundY - 28 + Math.sin(now / 120 + cx) * 1.5, 3.5, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Personaje
      const frame = (p.onGround && (left || right) ? Math.floor(p.step) % 2 : 0) as 0 | 1;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(p.x, groundY + 2, 22, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      drawSprite(ctx, character, frame, p.x - spriteW / 2, groundY - spriteH + p.y, SCALE, p.facing < 0);

      ctx.restore();

      // HUD: indicaciones fuera del canvas (React) se actualizan con menor frecuencia
      const item = near.current as Exhibit | null;
      const nextPrompt = item
        ? item.kind === "store"
          ? "Entrar a la tienda de servicios"
          : item.kind === "project"
            ? `Ver ${item.project.title}`
            : `Ver ${automationProjects[item.index].client}`
        : null;
      setPrompt((prev) => (prev === nextPrompt ? prev : nextPrompt));
      const zone = world.zones.find((z) => p.x >= z.x - 80 && p.x <= z.x + z.width + 80);
      const label = zone?.label ?? "Calle de las Ofrendas";
      setZoneLabel((prev) => (prev === label ? prev : label));

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [character, picking, panel, world]);

  const choose = (id: CharacterId) => {
    setCharacter(id);
    setPicking(false);
    try {
      localStorage.setItem("pt-character", id);
    } catch {
      // sin almacenamiento disponible
    }
    canvasRef.current?.focus();
  };

  const teleport = (zone: Zone) => {
    player.current.x = zone.x + 80;
    canvasRef.current?.focus();
  };

  const hold = (key: string, value: boolean) => () => {
    keys.current[key] = value;
  };

  return (
    <div ref={wrapRef} className="game">
      <div className="game-hud">
        <span className="game-zone">{zoneLabel || "Calle de las Ofrendas"}</span>
        <div className="game-zones" role="group" aria-label="Ir a una zona">
          {world.zones.map((zone) => (
            <button key={zone.id} type="button" onClick={() => teleport(zone)} style={{ ["--z" as string]: zone.color }}>
              {zone.label}
            </button>
          ))}
        </div>
        <button type="button" className="game-change" onClick={() => setPicking(true)}>
          <Users size={15} /> Cambiar personaje
        </button>
      </div>

      <div className="game-screen">
        <canvas
          ref={canvasRef}
          className="game-canvas"
          tabIndex={0}
          aria-label="Juego del portafolio: camina con las flechas, salta con espacio y presiona E para entrar."
        />

        {prompt && !panel && !picking && (
          <button type="button" className="game-prompt" onClick={interact}>
            <kbd>E</kbd> {prompt}
          </button>
        )}

        <div className="game-keys" aria-hidden="true">
          <span>
            <kbd>←</kbd>
            <kbd>→</kbd> caminar
          </span>
          <span>
            <kbd>Espacio</kbd> saltar
          </span>
          <span>
            <kbd>E</kbd> entrar
          </span>
        </div>

        <div className="game-touch">
          <button type="button" aria-label="Izquierda" onPointerDown={hold("arrowleft", true)} onPointerUp={hold("arrowleft", false)} onPointerLeave={hold("arrowleft", false)}>
            <ArrowLeft size={22} />
          </button>
          <button type="button" aria-label="Derecha" onPointerDown={hold("arrowright", true)} onPointerUp={hold("arrowright", false)} onPointerLeave={hold("arrowright", false)}>
            <ArrowRight size={22} />
          </button>
          <span />
          <button type="button" aria-label="Saltar" onPointerDown={hold(" ", true)} onPointerUp={hold(" ", false)} onPointerLeave={hold(" ", false)}>
            <ArrowUp size={22} />
          </button>
          <button type="button" aria-label="Entrar" className="act" onClick={interact}>
            <Hand size={20} />
          </button>
        </div>

        {picking && (
          <div className="game-pick" role="dialog" aria-label="Elige tu personaje">
            <span className="game-pick-kicker">Noche de Día de Muertos</span>
            <h3>Elige tu personaje</h3>
            <div className="game-pick-grid">
              {characterOrder.map((id) => (
                <button key={id} type="button" className={character === id ? "on" : ""} onClick={() => choose(id)}>
                  <SpritePreview id={id} />
                  <b>{characters[id].name}</b>
                  <small>{characters[id].tagline}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {panel && (
          <div className="game-panel" role="dialog" aria-modal="true">
            <button type="button" className="game-close" onClick={() => setPanel(null)} aria-label="Cerrar">
              <X size={20} />
            </button>
            {panel.type === "store" && (
              <div className="store">
                <span className="game-pick-kicker">Tienda de servicios PrimeTech</span>
                <h3>¿Qué necesita tu negocio?</h3>
                <div className="store-grid">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link key={service.slug} href={`/servicios/${service.slug}`} style={{ ["--c" as string]: service.accent }}>
                        <Icon size={22} />
                        <b>{service.shortTitle}</b>
                        <small>{service.hook}</small>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {panel.type === "project" && (
              <div className="exhibit">
                <div className="exhibit-shot">
                  <img src={panel.project.shots.desktop} alt={`Página de ${panel.project.title}`} />
                </div>
                <div className="exhibit-info">
                  <span className="game-pick-kicker">{panel.project.category}</span>
                  <h3>{panel.project.title}</h3>
                  <p>{panel.project.description}</p>
                  <p className="exhibit-impact">{panel.project.impact}</p>
                  {panel.project.offline ? (
                    <span className="exhibit-archived">Proyecto archivado · el sitio ya no está en línea</span>
                  ) : (
                    <a href={panel.project.url} target="_blank" rel="noreferrer" className="pj-cta">
                      Ir al sitio <ArrowUpRight size={17} />
                    </a>
                  )}
                </div>
              </div>
            )}
            {panel.type === "automation" && (
              <div className="exhibit-info solo">
                <span className="game-pick-kicker">{automationProjects[panel.index].category}</span>
                <h3>{automationProjects[panel.index].title}</h3>
                <p>{automationProjects[panel.index].description}</p>
                <p className="exhibit-impact">{automationProjects[panel.index].result}</p>
                <small>{automationProjects[panel.index].stack}</small>
                <a href={automationProjects[panel.index].url} target="_blank" rel="noreferrer" className="pj-cta">
                  Ver {automationProjects[panel.index].client} <ArrowUpRight size={17} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SpritePreview({ id }: { id: CharacterId }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 72, 96);
    drawSprite(ctx, id, 0, 0, 0, 6);
  }, [id]);
  return <canvas ref={ref} width={72} height={96} className="sprite-preview" aria-hidden="true" />;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
