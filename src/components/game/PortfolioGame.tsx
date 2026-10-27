"use client";

/* eslint-disable @next/next/no-img-element -- capturas de página completa dentro del modal */
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Flame, Hand, PartyPopper, Users, X } from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase";
import { automationProjects, services, siteConfig } from "@/lib/site";
import { characterOrder, characters, drawSprite, type CharacterId } from "./sprites";
import {
  drawAlebrijes,
  drawAltar,
  drawBanner,
  drawBubble,
  drawFarLayer,
  drawFrame,
  drawGallery,
  drawGround,
  drawHQ,
  drawMinimap,
  drawPapelPicado,
  drawSky,
  drawSpirits,
  drawTown,
  stepParticles,
  type Exhibit,
  type Particle,
  type Zone,
} from "./scene";

/* ------------------------------------------------------------------ */
/* Mundo                                                               */
/* ------------------------------------------------------------------ */

const GROUND = 96; // alto del suelo
const SCALE = 5; // tamaño de cada pixel del personaje
const FRAME_GAP = 250;
const ALTAR_GAP = 240;

const zonesFor: { id: string; label: string; color: string; slugs: string[] }[] = [
  { id: "plataformas", label: "Plataformas y portales", color: "#ff4fa3", slugs: ["flotilla-nacional", "constructora-444", "bere-cardenas", "inapecc"] },
  { id: "ventas", label: "Catálogos y ventas", color: "#ffb703", slugs: ["abisai-handbags", "rifas-el-guero", "sorteo-mike", "3a-rent"] },
  { id: "corporativos", label: "Sitios corporativos", color: "#2ec4b6", slugs: ["czc-projects", "tersus-clean", "revive-the-fire", "portofino-conway", "sadaca-industrial"] },
];

const keyOf = (item: Exhibit) =>
  item.kind === "project" ? item.project.slug : item.kind === "automation" ? `auto-${item.index}` : "store";

function buildWorld(projects: ShowcaseProject[]) {
  const zones: Zone[] = [];
  const exhibits: Exhibit[] = [];
  const altars: number[] = [];
  let x = 220;

  zones.push({ id: "hq", label: "PrimeTech · Servicios", color: "#3b82f6", x, width: 620 });
  exhibits.push({ kind: "store", x: x + 310 });
  x += 620;

  const gallery = (id: string, label: string, color: string, items: Exhibit[]) => {
    altars.push(x + ALTAR_GAP / 2);
    x += ALTAR_GAP;
    const width = 160 + items.length * FRAME_GAP + 40;
    zones.push({ id, label, color, x, width });
    items.forEach((item, i) => exhibits.push({ ...item, x: x + 160 + i * FRAME_GAP + FRAME_GAP / 2 } as Exhibit));
    x += width;
  };

  for (const zone of zonesFor) {
    const items = zone.slugs
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter(Boolean)
      .map((project) => ({ kind: "project", x: 0, project }) as Exhibit);
    gallery(zone.id, zone.label, zone.color, items);
  }
  gallery(
    "automatizaciones",
    "Automatizaciones y bots",
    "#a855f7",
    automationProjects.map((p, index) => ({ kind: "automation", x: 0, index, client: p.client, steps: p.steps }) as Exhibit)
  );
  altars.push(x + ALTAR_GAP / 2);
  x += ALTAR_GAP + 120;

  return { zones, exhibits, altars, width: x };
}

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

type Panel =
  | { type: "store" }
  | { type: "project"; project: ShowcaseProject }
  | { type: "automation"; index: number }
  | { type: "done" }
  | null;

export function PortfolioGame({ projects }: { projects: ShowcaseProject[] }) {
  const world = useMemo(() => buildWorld(projects), [projects]);
  const total = world.exhibits.filter((e) => e.kind !== "store").length;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const player = useRef({ x: 330, y: 0, vy: 0, facing: 1, step: 0, onGround: true, squash: 0 });
  const near = useRef<Exhibit | null>(null);
  const images = useRef<Record<string, HTMLImageElement>>({});
  const particles = useRef<Particle[]>([]);
  const banner = useRef<{ text: string; color: string; start: number } | null>(null);
  const lastZone = useRef<string>("");
  const visitedRef = useRef<Set<string>>(new Set());

  const [character, setCharacter] = useState<CharacterId | null>(null);
  const [picking, setPicking] = useState(true);
  const [panel, setPanel] = useState<Panel>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [zoneLabel, setZoneLabel] = useState("");
  const [visited, setVisited] = useState<string[]>([]);
  const celebrated = useRef(false);

  // Personaje y visitas recordados entre visitas.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pt-character") as CharacterId | null;
      if (saved && characters[saved]) setCharacter(saved);
      const seen = JSON.parse(localStorage.getItem("pt-visited") || "[]") as string[];
      if (Array.isArray(seen)) {
        visitedRef.current = new Set(seen);
        setVisited(seen);
        celebrated.current = seen.length >= total;
      }
    } catch {
      // sin almacenamiento disponible
    }
  }, [total]);

  // Precarga de capturas para los cuadros.
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.shots.desktop;
      images.current[project.slug] = img;
    });
  }, [projects]);

  const markVisited = useCallback(
    (key: string) => {
      if (key === "store" || visitedRef.current.has(key)) return;
      visitedRef.current.add(key);
      const list = [...visitedRef.current];
      setVisited(list);
      try {
        localStorage.setItem("pt-visited", JSON.stringify(list));
      } catch {
        // sin almacenamiento disponible
      }
    },
    []
  );

  const closePanel = useCallback(() => {
    setPanel(null);
    // al cerrar el último proyecto pendiente, festejo
    if (!celebrated.current && visitedRef.current.size >= total) {
      celebrated.current = true;
      setPanel({ type: "done" });
    }
    canvasRef.current?.focus();
  }, [total]);

  const interact = useCallback(() => {
    const item = near.current;
    if (!item || panel) return;
    markVisited(keyOf(item));
    if (item.kind === "store") setPanel({ type: "store" });
    if (item.kind === "project") setPanel({ type: "project", project: item.project });
    if (item.kind === "automation") setPanel({ type: "automation", index: item.index });
  }, [markVisited, panel]);

  // Teclado
  useEffect(() => {
    const isInView = () => {
      const rect = wrapRef.current?.getBoundingClientRect();
      return !!rect && rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
    };
    const down = (event: KeyboardEvent) => {
      if (picking) return;
      if (panel) {
        if (event.key === "Escape") closePanel();
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
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [closePanel, interact, panel, picking]);

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
    let dustTimer = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
      const left = !panel && (k["arrowleft"] || k["a"]);
      const right = !panel && (k["arrowright"] || k["d"]);
      if (left) {
        p.x -= 320 * dt;
        p.facing = -1;
      }
      if (right) {
        p.x += 320 * dt;
        p.facing = 1;
      }
      if (!panel && (k[" "] || k["w"] || k["arrowup"]) && p.onGround) {
        p.vy = -640;
        p.onGround = false;
      }
      p.vy += 1750 * dt;
      p.y += p.vy * dt;
      if (p.y >= 0) {
        if (!p.onGround) {
          p.squash = 1;
          for (let i = 0; i < 8; i++) {
            particles.current.push({ x: p.x, y: groundY - 4, vx: (Math.random() - 0.5) * 220, vy: -Math.random() * 160, life: 0, max: 0.5, color: "#ffb703", size: 4 });
          }
        }
        p.y = 0;
        p.vy = 0;
        p.onGround = true;
      }
      p.squash = Math.max(0, p.squash - dt * 5);
      p.x = Math.max(40, Math.min(world.width - 60, p.x));
      if (left || right) {
        p.step += dt * 9;
        dustTimer += dt;
        if (p.onGround && dustTimer > 0.09) {
          dustTimer = 0;
          particles.current.push({ x: p.x - p.facing * 18, y: groundY - 6, vx: -p.facing * 60, vy: -80, life: 0, max: 0.45, color: "rgba(255, 214, 160, 0.8)", size: 4 });
        }
      }

      const camX = Math.max(0, Math.min(world.width - width, p.x - width / 2));

      // Fondo (parallax)
      drawSky(ctx, width, height, camX, now);
      drawFarLayer(ctx, width, groundY, camX);
      drawAlebrijes(ctx, width, height, camX, now);
      drawTown(ctx, width, groundY, camX, now);
      drawPapelPicado(ctx, width, camX, now);

      ctx.save();
      ctx.translate(-camX, 0);

      world.zones.forEach((zone) => {
        if (zone.x + zone.width < camX - 300 || zone.x > camX + width + 300) return;
        if (zone.id === "hq") drawHQ(ctx, zone, groundY, now);
        else drawGallery(ctx, zone, groundY, now, FRAME_GAP);
      });
      world.altars.forEach((ax) => {
        if (ax > camX - 200 && ax < camX + width + 200) drawAltar(ctx, ax, groundY, now);
      });

      // Cuadros y el más cercano
      near.current = null;
      let nearest = 110;
      world.exhibits.forEach((item) => {
        const dist = Math.abs(item.x - p.x);
        if (dist < nearest) {
          nearest = dist;
          near.current = item;
        }
      });
      world.exhibits.forEach((item) => {
        if (item.kind === "store") return;
        if (item.x < camX - 220 || item.x > camX + width + 220) return;
        const img = item.kind === "project" ? images.current[item.project.slug] : undefined;
        drawFrame(ctx, item, groundY, img, near.current === item, visitedRef.current.has(keyOf(item)), now);
      });

      drawGround(ctx, camX, width, groundY, height, now);

      // Personaje: sombra, respiración, aplastado al caer
      const moving = left || right;
      const frame = (p.onGround && moving ? Math.floor(p.step) % 2 : 0) as 0 | 1;
      const breathe = !moving && p.onGround ? Math.sin(now / 380) * 1.5 : 0;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(p.x, groundY + 2, 24 - Math.min(10, -p.y / 12), 6, 0, 0, Math.PI * 2);
      ctx.fill();
      const glow = ctx.createRadialGradient(p.x, groundY - 30, 4, p.x, groundY - 30, 70);
      glow.addColorStop(0, "rgba(255, 183, 3, 0.18)");
      glow.addColorStop(1, "rgba(255, 183, 3, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(p.x - 70, groundY - 100, 140, 140);
      ctx.save();
      const sq = p.squash * 0.18;
      ctx.translate(p.x, groundY + p.y);
      ctx.scale(1 + sq, 1 - sq + breathe / 80);
      drawSprite(ctx, character, frame, -spriteW / 2, -spriteH, SCALE, p.facing < 0);
      ctx.restore();

      stepParticles(ctx, particles.current, dt);
      if (near.current && !panel) drawBubble(ctx, p.x + p.facing * 46, groundY - 36 + p.y, now);

      ctx.restore();
      drawSpirits(ctx, camX, width, groundY, now);

      // Cartel al entrar a una zona y minimapa
      const zone = world.zones.find((z) => p.x >= z.x && p.x <= z.x + z.width);
      if (zone && zone.id !== lastZone.current) {
        lastZone.current = zone.id;
        banner.current = { text: zone.label, color: zone.color, start: now };
      }
      if (banner.current) {
        const t = (now - banner.current.start) / 2200;
        if (t >= 1) banner.current = null;
        else drawBanner(ctx, width, height, banner.current.text, banner.current.color, t);
      }
      drawMinimap(ctx, width, height, world.zones, world.width, p.x);

      // Indicaciones en React (solo cuando cambian)
      const item = near.current as Exhibit | null;
      const nextPrompt = item
        ? item.kind === "store"
          ? "Entrar a la tienda de servicios"
          : item.kind === "project"
            ? `Ver ${item.project.title}`
            : `Ver ${item.client}`
        : null;
      setPrompt((prev) => (prev === nextPrompt ? prev : nextPrompt));
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
    window.setTimeout(() => canvasRef.current?.focus(), 50);
  };

  const teleport = (zone: Zone) => {
    player.current.x = zone.x + 90;
    canvasRef.current?.focus();
  };

  const hold = (key: string, value: boolean) => () => {
    keys.current[key] = value;
  };

  const whatsapp = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hola PrimeTech, recorrí su portafolio y quiero cotizar un proyecto."
  )}`;

  return (
    <div ref={wrapRef} className="game">
      <div className="game-hud">
        <span className="game-zone">{zoneLabel || "Calle de las Ofrendas"}</span>
        <span className="game-count" title="Proyectos visitados">
          <Flame size={15} /> {visited.filter((v) => v !== "store").length}/{total}
        </span>
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
            <p className="game-pick-goal">
              Visita los {total} proyectos: cada uno enciende una vela en la ofrenda.
            </p>
            <div className="game-pick-grid">
              {characterOrder.map((id) => (
                <button key={id} type="button" className={character === id ? "on" : ""} onClick={() => choose(id)}>
                  <span className="sprite-stage">
                    <SpritePreview id={id} />
                  </span>
                  <b>{characters[id].name}</b>
                  <small>{characters[id].tagline}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {panel && (
          <div className="game-panel" role="dialog" aria-modal="true">
            <button type="button" className="game-close" onClick={closePanel} aria-label="Cerrar">
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
            {panel.type === "done" && (
              <div className="game-done">
                <div className="confetti" aria-hidden="true">
                  {Array.from({ length: 36 }, (_, i) => (
                    <i key={i} style={{ left: `${(i * 2.8) % 100}%`, animationDelay: `${(i % 9) * 0.12}s`, background: ["#ff4fa3", "#ffb703", "#2ec4b6", "#a855f7", "#ff6b35"][i % 5] }} />
                  ))}
                </div>
                <PartyPopper size={44} />
                <span className="game-pick-kicker">¡Ofrenda completa!</span>
                <h3>Visitaste los {total} proyectos.</h3>
                <p>Ya viste lo que hacemos. ¿Hablamos del tuyo?</p>
                <a href={whatsapp} target="_blank" rel="noreferrer" className="pj-cta">
                  Cotizar por WhatsApp <ArrowUpRight size={17} />
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
    let raf = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, 72, 104);
      const bob = Math.round(Math.sin(now / 300) * 2);
      drawSprite(ctx, id, (Math.floor(now / 260) % 2) as 0 | 1, 0, 6 + bob, 6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [id]);
  return <canvas ref={ref} width={72} height={104} className="sprite-preview" aria-hidden="true" />;
}
