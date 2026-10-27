/**
 * Dibujo del escenario del juego: noche de Día de Muertos en un pueblo mexicano.
 * Todo se pinta con primitivas de canvas, sin imágenes externas (salvo las capturas
 * de los proyectos en los cuadros).
 */

import type { ShowcaseProject } from "@/lib/showcase";

export type Exhibit =
  | { kind: "project"; x: number; project: ShowcaseProject }
  | { kind: "automation"; x: number; index: number; client: string; steps: string[] }
  | { kind: "store"; x: number }
  | { kind: "arcade"; x: number };

export type Zone = { id: string; label: string; color: string; x: number; width: number };

export type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number };

export const FRAME_W = 176;
export const FRAME_H = 110;

const palette = {
  rosa: "#e4007c",
  turquesa: "#14b8a6",
  amarillo: "#ffb703",
  morado: "#7b2cbf",
  naranja: "#ff6b1a",
  azul: "#2563eb",
};
const facadeColors = [palette.rosa, palette.turquesa, palette.amarillo, palette.morado, palette.naranja, palette.azul];

/** Pseudoaleatorio estable para que el pueblo no "parpadee" entre cuadros. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ------------------------------------------------------------------ */
/* Fondo                                                               */
/* ------------------------------------------------------------------ */

export function drawSky(ctx: CanvasRenderingContext2D, w: number, h: number, camX: number, now: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#080318");
  sky.addColorStop(0.45, "#1f0b3d");
  sky.addColorStop(0.8, "#4a1452");
  sky.addColorStop(1, "#7a2350");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // estrellas
  for (let i = 0; i < 140; i++) {
    const sx = ((rand(i) * w * 3 - camX * 0.04) % w + w) % w;
    const sy = rand(i + 500) * h * 0.55;
    ctx.globalAlpha = 0.35 + Math.sin(now / 800 + i) * 0.3 + 0.3;
    ctx.fillStyle = i % 9 === 0 ? "#ffd6f0" : "#fff6d8";
    ctx.fillRect(sx, sy, rand(i + 900) > 0.85 ? 2.2 : 1.3, rand(i + 900) > 0.85 ? 2.2 : 1.3);
  }
  ctx.globalAlpha = 1;

  // luna con halo
  const mx = w * 0.78 - camX * 0.02;
  const my = h * 0.2;
  const halo = ctx.createRadialGradient(mx, my, 10, mx, my, 120);
  halo.addColorStop(0, "rgba(255, 232, 163, 0.45)");
  halo.addColorStop(1, "rgba(255, 232, 163, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(mx - 120, my - 120, 240, 240);
  ctx.fillStyle = "#ffeec2";
  ctx.beginPath();
  ctx.arc(mx, my, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(200, 170, 120, 0.35)";
  [[-10, -8, 7], [9, 6, 5], [4, -14, 3]].forEach(([dx, dy, r]) => {
    ctx.beginPath();
    ctx.arc(mx + dx, my + dy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // nubes lentas
  ctx.fillStyle = "rgba(255, 214, 240, 0.06)";
  for (let i = 0; i < 4; i++) {
    const cx = ((i * 520 + now * 0.008 - camX * 0.08) % (w + 400)) - 200;
    const cy = 70 + i * 34;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 140, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 70, cy - 10, 90, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Cerros, panteón con cruces y la iglesia del pueblo a lo lejos. */
export function drawFarLayer(ctx: CanvasRenderingContext2D, w: number, groundY: number, camX: number) {
  const par = camX * 0.15;
  ctx.fillStyle = "#2a0f45";
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  for (let i = 0; i <= w + 60; i += 30) {
    const wx = i + par;
    ctx.lineTo(i, groundY - 120 - Math.sin(wx / 260) * 40 - Math.cos(wx / 120) * 16);
  }
  ctx.lineTo(w, groundY);
  ctx.fill();

  // iglesia y cruces del panteón (se repiten a lo largo del mundo)
  ctx.fillStyle = "#1c0933";
  const period = 1400;
  for (let base = Math.floor(par / period) * period - period; base < par + w + period; base += period) {
    const x = base - par + 300;
    const y = groundY - 150;
    // iglesia
    ctx.fillRect(x, y - 40, 120, 90);
    ctx.fillRect(x + 90, y - 110, 34, 160);
    ctx.beginPath();
    ctx.arc(x + 45, y - 40, 34, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(x + 104, y - 135, 6, 26);
    ctx.fillRect(x + 97, y - 126, 20, 6);
    ctx.fillStyle = "rgba(255, 183, 3, 0.55)";
    ctx.fillRect(x + 100, y - 90, 14, 20);
    ctx.fillRect(x + 36, y - 10, 18, 26);
    ctx.fillStyle = "#1c0933";
    // cruces
    for (let c = 0; c < 7; c++) {
      const cx = x + 180 + c * 46;
      const cy = groundY - 112 + (c % 2) * 8;
      ctx.fillRect(cx, cy - 26, 5, 26);
      ctx.fillRect(cx - 7, cy - 19, 19, 5);
    }
  }
}

/** Siluetas del pueblo con ventanas cálidas encendidas. */
export function drawTown(ctx: CanvasRenderingContext2D, w: number, groundY: number, camX: number, now: number) {
  const par = camX * 0.35;
  const start = Math.floor(par / 90) - 1;
  for (let i = start; i < start + w / 90 + 3; i++) {
    const x = i * 90 - par;
    const hgt = 70 + rand(i) * 80;
    ctx.fillStyle = "#33124f";
    ctx.fillRect(x, groundY - 40 - hgt, 84, hgt + 40);
    if (rand(i + 3) > 0.6) {
      ctx.beginPath();
      ctx.moveTo(x - 4, groundY - 40 - hgt);
      ctx.lineTo(x + 42, groundY - 66 - hgt);
      ctx.lineTo(x + 88, groundY - 40 - hgt);
      ctx.fill();
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        const lit = rand(i * 7 + r * 3 + c) > 0.45;
        if (!lit) continue;
        const flicker = 0.75 + Math.sin(now / 900 + i + r) * 0.15;
        ctx.fillStyle = `rgba(255, 190, 90, ${flicker})`;
        ctx.fillRect(x + 14 + c * 36, groundY - 30 - hgt + 16 + r * 30, 16, 18);
      }
    }
  }
}

/** Alebrijes: criaturas de colores que vuelan en el fondo. */
export function drawAlebrijes(ctx: CanvasRenderingContext2D, w: number, h: number, camX: number, now: number) {
  const creatures = [
    { speed: 0.035, y: 0.24, colors: ["#ff4fa3", "#ffb703", "#14b8a6"], scale: 1 },
    { speed: 0.025, y: 0.36, colors: ["#7b2cbf", "#2ec4b6", "#ff6b1a"], scale: 0.8 },
  ];
  creatures.forEach((c, i) => {
    const span = w + 600;
    const x = ((now * c.speed + i * 700 - camX * 0.5) % span + span) % span - 300;
    const y = h * c.y + Math.sin(now / 700 + i) * 18;
    const flap = Math.sin(now / 120 + i) * 0.6;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(c.scale, c.scale);
    // alas
    ctx.fillStyle = c.colors[1];
    ctx.beginPath();
    ctx.ellipse(-6, -10, 26, 10, -0.6 - flap, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.colors[2];
    ctx.beginPath();
    ctx.ellipse(-2, -8, 16, 6, -0.6 - flap, 0, Math.PI * 2);
    ctx.fill();
    // cuerpo y cola
    ctx.fillStyle = c.colors[0];
    ctx.beginPath();
    ctx.ellipse(0, 0, 30, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = c.colors[0];
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.quadraticCurveTo(-48, -14 + flap * 10, -60, 4);
    ctx.stroke();
    // cabeza con cuernos
    ctx.beginPath();
    ctx.arc(30, -4, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = c.colors[1];
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, -12);
    ctx.lineTo(26, -24);
    ctx.moveTo(35, -12);
    ctx.lineTo(39, -23);
    ctx.stroke();
    // patrón de puntos
    ctx.fillStyle = "#fff";
    [-14, -4, 6, 16].forEach((px, k) => {
      ctx.beginPath();
      ctx.arc(px, k % 2 ? -3 : 3, 2.4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#0d0623";
    ctx.beginPath();
    ctx.arc(34, -6, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

export function drawPapelPicado(ctx: CanvasRenderingContext2D, w: number, camX: number, now: number) {
  for (let row = 0; row < 2; row++) {
    const y0 = 26 + row * 44;
    const par = camX * (0.55 + row * 0.15);
    const offset = par % 46;
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);
    ctx.stroke();
    for (let i = -1; i < w / 46 + 2; i++) {
      const fx = i * 46 - offset;
      const idx = Math.abs(Math.floor((fx + par) / 46) + row * 2) % facadeColors.length;
      const sway = Math.sin(now / 650 + i + row) * 2.4;
      ctx.fillStyle = facadeColors[idx];
      ctx.beginPath();
      ctx.moveTo(fx, y0);
      ctx.lineTo(fx + 38, y0);
      ctx.lineTo(fx + 38 + sway, y0 + 26);
      ctx.lineTo(fx + 31 + sway, y0 + 32);
      ctx.lineTo(fx + 25 + sway, y0 + 26);
      ctx.lineTo(fx + 19 + sway, y0 + 32);
      ctx.lineTo(fx + 13 + sway, y0 + 26);
      ctx.lineTo(fx + 7 + sway, y0 + 32);
      ctx.lineTo(fx + sway, y0 + 26);
      ctx.closePath();
      ctx.fill();
      // calado
      ctx.fillStyle = "rgba(13,6,35,0.5)";
      ctx.beginPath();
      ctx.arc(fx + 19 + sway * 0.6, y0 + 12, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(fx + 8 + sway * 0.8, y0 + 20, 4, 3);
      ctx.fillRect(fx + 26 + sway * 0.8, y0 + 20, 4, 3);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Edificios                                                           */
/* ------------------------------------------------------------------ */

const serviceDots = ["#3b82f6", "#a855f7", "#14b8a6", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#64748b"];

/** Torre de PrimeTech con letrero de neón y servicios en holograma. */
export function drawHQ(ctx: CanvasRenderingContext2D, zone: Zone, groundY: number, now: number) {
  const x = zone.x + 60;
  const w = zone.width - 120;
  const top = groundY - 360;
  // torre
  const glass = ctx.createLinearGradient(x, top, x + w, groundY);
  glass.addColorStop(0, "#1e3a8a");
  glass.addColorStop(0.5, "#0f1d5c");
  glass.addColorStop(1, "#0a1240");
  ctx.fillStyle = glass;
  ctx.fillRect(x, top, w, groundY - top);
  // remate escalonado
  ctx.fillRect(x + 40, top - 30, w - 80, 30);
  ctx.fillRect(x + w / 2 - 6, top - 70, 12, 40);
  ctx.fillStyle = Math.sin(now / 300) > 0 ? "#ff4fa3" : "#7b2cbf";
  ctx.beginPath();
  ctx.arc(x + w / 2, top - 72, 5, 0, Math.PI * 2);
  ctx.fill();
  // ventanas de cristal con reflejo que recorre la fachada
  const sweep = ((now / 18) % (w + 200)) - 100;
  for (let wy = top + 24; wy < groundY - 150; wy += 34) {
    for (let wx = x + 20; wx < x + w - 30; wx += 44) {
      const lit = rand(wx * 3 + wy) > 0.35;
      ctx.fillStyle = lit ? "rgba(125, 211, 252, 0.55)" : "rgba(125, 211, 252, 0.14)";
      ctx.fillRect(wx, wy, 32, 22);
      if (Math.abs(wx - x - sweep) < 40) {
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(wx, wy, 32, 22);
      }
    }
  }
  // contorno neón
  ctx.strokeStyle = "#60a5fa";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#60a5fa";
  ctx.shadowBlur = 16;
  ctx.strokeRect(x, top, w, groundY - top);
  ctx.shadowBlur = 0;

  // letrero PRIMETECH
  const flicker = Math.sin(now / 90) > 0.97 ? 0.3 : 1;
  ctx.font = "800 30px 'Space Grotesk', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.globalAlpha = flicker;
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "#38bdf8";
  ctx.shadowBlur = 24;
  ctx.fillText("PRIMETECH", x + w / 2, top + 4 - 40 + 30);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;

  // entrada con toldo
  const dx = x + w / 2 - 70;
  ctx.fillStyle = "#0b1130";
  ctx.fillRect(dx - 10, groundY - 140, 160, 140);
  for (let s = 0; s < 8; s++) {
    ctx.fillStyle = s % 2 ? "#ffb703" : "#ff4fa3";
    ctx.beginPath();
    ctx.moveTo(dx - 16 + s * 21.5, groundY - 150);
    ctx.lineTo(dx + 5.5 + s * 21.5, groundY - 150);
    ctx.lineTo(dx - 5 + s * 21.5, groundY - 128);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "#ffb703";
  roundRect(ctx, dx + 20, groundY - 120, 100, 120, 10);
  ctx.fill();
  ctx.fillStyle = "#0d0623";
  ctx.font = "800 13px Inter, system-ui, sans-serif";
  ctx.fillText("TIENDA DE", dx + 70, groundY - 74);
  ctx.fillText("SERVICIOS", dx + 70, groundY - 56);

  // holograma de servicios girando sobre la entrada
  const hx = dx + 70;
  const hy = groundY - 200;
  ctx.strokeStyle = "rgba(125, 211, 252, 0.35)";
  ctx.beginPath();
  ctx.ellipse(hx, hy, 70, 16, 0, 0, Math.PI * 2);
  ctx.stroke();
  serviceDots.forEach((color, i) => {
    const a = now / 1200 + (i / serviceDots.length) * Math.PI * 2;
    const px = hx + Math.cos(a) * 70;
    const py = hy + Math.sin(a) * 16;
    const front = Math.sin(a) > 0;
    ctx.globalAlpha = front ? 1 : 0.45;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = front ? 14 : 0;
    ctx.beginPath();
    ctx.arc(px, py, front ? 7 : 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  const beam = ctx.createLinearGradient(0, hy, 0, groundY - 150);
  beam.addColorStop(0, "rgba(125,211,252,0.25)");
  beam.addColorStop(1, "rgba(125,211,252,0)");
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.moveTo(hx - 70, hy);
  ctx.lineTo(hx + 70, hy);
  ctx.lineTo(hx + 30, groundY - 150);
  ctx.lineTo(hx - 30, groundY - 150);
  ctx.fill();
}

/** Arco de cempasúchil con el nombre de la galería. */
function drawArch(ctx: CanvasRenderingContext2D, x: number, groundY: number, label: string, color: string, now: number) {
  const w = 190;
  const top = groundY - 230;
  ctx.fillStyle = "#5a3820";
  ctx.fillRect(x - w / 2, top + 40, 12, groundY - top - 40);
  ctx.fillRect(x + w / 2 - 12, top + 40, 12, groundY - top - 40);
  for (let i = 0; i <= 26; i++) {
    const a = Math.PI + (i / 26) * Math.PI;
    const px = x + Math.cos(a) * (w / 2 - 6);
    const py = top + 60 + Math.sin(a) * 60;
    ctx.fillStyle = i % 3 === 0 ? "#ffd166" : "#ff8c1a";
    ctx.beginPath();
    ctx.arc(px, py, 9 + Math.sin(now / 400 + i) * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  // letrero colgante
  ctx.font = "800 17px 'Space Grotesk', system-ui, sans-serif";
  ctx.textAlign = "center";
  const lw = ctx.measureText(label).width + 28;
  ctx.fillStyle = "#0d0623";
  roundRect(ctx, x - lw / 2, top - 32, lw, 36, 18);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.fillText(label, x, top - 9);
  ctx.shadowBlur = 0;
}

/** Galería: hilera de casitas de colores con tejas, ventanas y foquitos. */
export function drawGallery(ctx: CanvasRenderingContext2D, zone: Zone, groundY: number, now: number, gap: number) {
  const top = groundY - 250;
  const houses = Math.max(1, Math.floor((zone.width - 160) / gap));
  for (let i = 0; i < houses; i++) {
    const hx = zone.x + 160 + i * gap + 6;
    const hw = gap - 12;
    const color = facadeColors[(i + zone.id.length) % facadeColors.length];
    const hTop = top + (i % 2) * 18;
    ctx.fillStyle = color;
    ctx.fillRect(hx, hTop, hw, groundY - hTop);
    // sombra interior
    const shade = ctx.createLinearGradient(0, hTop, 0, groundY);
    shade.addColorStop(0, "rgba(13,6,35,0.15)");
    shade.addColorStop(1, "rgba(13,6,35,0.55)");
    ctx.fillStyle = shade;
    ctx.fillRect(hx, hTop, hw, groundY - hTop);
    // tejas
    ctx.fillStyle = "#8a3b1f";
    ctx.fillRect(hx - 8, hTop - 14, hw + 16, 16);
    ctx.fillStyle = "#a8502a";
    for (let t = hx - 8; t < hx + hw + 8; t += 14) {
      ctx.beginPath();
      ctx.arc(t + 7, hTop + 2, 7, 0, Math.PI);
      ctx.fill();
    }
    // ventanitas con macetas
    [0.18, 0.82].forEach((fx) => {
      const wx = hx + hw * fx - 14;
      const wy = hTop + 26;
      ctx.fillStyle = "rgba(255, 200, 110, 0.85)";
      ctx.fillRect(wx, wy, 28, 30);
      ctx.strokeStyle = "#3b1f0f";
      ctx.lineWidth = 3;
      ctx.strokeRect(wx, wy, 28, 30);
      ctx.fillStyle = "#2f7d32";
      ctx.fillRect(wx - 2, wy + 30, 32, 6);
      ctx.fillStyle = "#ff4fa3";
      ctx.beginPath();
      ctx.arc(wx + 8, wy + 28, 4, 0, Math.PI * 2);
      ctx.arc(wx + 20, wy + 28, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    // puerta
    ctx.fillStyle = "#3b1f0f";
    roundRect(ctx, hx + hw / 2 - 18, groundY - 64, 36, 64, 16);
    ctx.fill();
  }
  // foquitos colgando a lo largo de la galería
  const y0 = top - 4;
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let lx = zone.x + 40; lx <= zone.x + zone.width - 20; lx += 8) {
    const ly = y0 + Math.sin((lx - zone.x) / 40) * 8 + 8;
    if (lx === zone.x + 40) ctx.moveTo(lx, ly);
    else ctx.lineTo(lx, ly);
  }
  ctx.stroke();
  for (let lx = zone.x + 52; lx < zone.x + zone.width - 20; lx += 32) {
    const ly = y0 + Math.sin((lx - zone.x) / 40) * 8 + 12;
    const c = facadeColors[Math.floor(lx / 32) % facadeColors.length];
    ctx.fillStyle = c;
    ctx.globalAlpha = 0.7 + Math.sin(now / 300 + lx) * 0.3;
    ctx.shadowColor = c;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(lx, ly, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  drawArch(ctx, zone.x + 40, groundY, zone.label, zone.color, now);
}

/** Altar de ofrenda entre zonas: escalones, velas, pan de muerto y calaverita. */
export function drawAltar(ctx: CanvasRenderingContext2D, x: number, groundY: number, now: number) {
  const tiers = [
    { w: 140, h: 26, c: "#7b2cbf" },
    { w: 104, h: 24, c: "#e4007c" },
    { w: 70, h: 22, c: "#ff6b1a" },
  ];
  let y = groundY;
  tiers.forEach((t) => {
    y -= t.h;
    ctx.fillStyle = t.c;
    ctx.fillRect(x - t.w / 2, y, t.w, t.h);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = x - t.w / 2; i < x + t.w / 2; i += 10) ctx.fillRect(i, y, 5, 4);
  });
  // calaverita de azúcar
  ctx.fillStyle = "#f4f1ea";
  ctx.beginPath();
  ctx.arc(x, y - 14, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x - 8, y - 6, 16, 6);
  ctx.fillStyle = "#e4007c";
  ctx.beginPath();
  ctx.arc(x - 5, y - 15, 4, 0, Math.PI * 2);
  ctx.arc(x + 5, y - 15, 4, 0, Math.PI * 2);
  ctx.fill();
  // pan de muerto
  ctx.fillStyle = "#c9802f";
  ctx.beginPath();
  ctx.ellipse(x - 38, groundY - 56, 14, 9, 0, Math.PI, 0);
  ctx.fill();
  ctx.ellipse(x + 38, groundY - 56, 14, 9, 0, Math.PI, 0);
  ctx.fill();
  // velas
  [-62, -24, 24, 62].forEach((dx, i) => {
    const vx = x + dx;
    const vy = groundY - 26 - (Math.abs(dx) < 30 ? 24 : 0);
    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(vx - 3, vy - 18, 6, 18);
    drawFlame(ctx, vx, vy - 22, now, i);
  });
  // cempasúchil en el piso
  for (let i = -3; i <= 3; i++) {
    ctx.fillStyle = i % 2 ? "#ffd166" : "#ff8c1a";
    ctx.beginPath();
    ctx.arc(x + i * 22, groundY - 4, 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawFlame(ctx: CanvasRenderingContext2D, x: number, y: number, now: number, seed: number) {
  const s = 1 + Math.sin(now / 90 + seed * 3) * 0.12;
  ctx.fillStyle = "#ffb703";
  ctx.shadowColor = "#ffb703";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.ellipse(x, y, 3.6 * s, 7 * s, Math.sin(now / 200 + seed) * 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff4c2";
  ctx.beginPath();
  ctx.ellipse(x, y + 2, 1.6, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

/* ------------------------------------------------------------------ */
/* Cuadros de proyectos                                                */
/* ------------------------------------------------------------------ */

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  item: Extract<Exhibit, { kind: "project" | "automation" }>,
  groundY: number,
  img: HTMLImageElement | undefined,
  active: boolean,
  visited: boolean,
  now: number
) {
  const lift = active ? Math.sin(now / 250) * 2 - 6 : 0;
  const fy = groundY - 236 + lift;
  const fx = item.x - FRAME_W / 2;

  // lámpara y cono de luz
  ctx.fillStyle = "#2b1a12";
  ctx.fillRect(item.x - 2, fy - 46, 4, 18);
  ctx.fillRect(item.x - 14, fy - 30, 28, 8);
  const cone = ctx.createLinearGradient(0, fy - 22, 0, fy + FRAME_H + 40);
  cone.addColorStop(0, active ? "rgba(255, 220, 140, 0.45)" : "rgba(255, 220, 140, 0.22)");
  cone.addColorStop(1, "rgba(255, 220, 140, 0)");
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(item.x - 12, fy - 22);
  ctx.lineTo(item.x + 12, fy - 22);
  ctx.lineTo(item.x + FRAME_W * 0.7, fy + FRAME_H + 40);
  ctx.lineTo(item.x - FRAME_W * 0.7, fy + FRAME_H + 40);
  ctx.closePath();
  ctx.fill();

  // marco dorado con guirnalda
  ctx.shadowColor = active ? "#ffb703" : "transparent";
  ctx.shadowBlur = active ? 26 : 0;
  const gold = ctx.createLinearGradient(fx, fy, fx + FRAME_W, fy + FRAME_H);
  gold.addColorStop(0, "#f6d27a");
  gold.addColorStop(0.5, "#b8862e");
  gold.addColorStop(1, "#f0c35a");
  ctx.fillStyle = gold;
  roundRect(ctx, fx - 12, fy - 12, FRAME_W + 24, FRAME_H + 24, 6);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#7a5418";
  ctx.lineWidth = 2;
  ctx.strokeRect(fx - 4, fy - 4, FRAME_W + 8, FRAME_H + 8);

  if (item.kind === "project") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(fx, fy, FRAME_W, FRAME_H);
    if (img?.complete && img.naturalWidth) {
      const srcH = Math.min(img.naturalHeight, (img.naturalWidth * FRAME_H) / FRAME_W);
      ctx.drawImage(img, 0, 0, img.naturalWidth, srcH, fx, fy, FRAME_W, FRAME_H);
    }
  } else {
    // automatización: mini diagrama de flujo
    const bg = ctx.createLinearGradient(fx, fy, fx, fy + FRAME_H);
    bg.addColorStop(0, "#1b0f2e");
    bg.addColorStop(1, "#2b1450");
    ctx.fillStyle = bg;
    ctx.fillRect(fx, fy, FRAME_W, FRAME_H);
    const steps = item.steps.slice(0, 4);
    steps.forEach((_, i) => {
      const cx = fx + 26 + i * 41;
      const cy = fy + FRAME_H / 2;
      if (i < steps.length - 1) {
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + 12, cy);
        ctx.lineTo(cx + 29, cy);
        ctx.stroke();
        // pulso viajando por el flujo
        const t = (now / 900 + i * 0.3) % 1;
        ctx.fillStyle = "#ffb703";
        ctx.beginPath();
        ctx.arc(cx + 12 + t * 17, cy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = facadeColors[i % facadeColors.length];
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // guirnalda de cempasúchil sobre el marco
  for (let i = 0; i <= 10; i++) {
    const gx = fx - 8 + (i / 10) * (FRAME_W + 16);
    const gy = fy - 14 + Math.sin((i / 10) * Math.PI) * 10;
    ctx.fillStyle = i % 2 ? "#ffd166" : "#ff8c1a";
    ctx.beginPath();
    ctx.arc(gx, gy, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // placa con nombre
  const title = item.kind === "project" ? item.project.title : item.client;
  ctx.font = "700 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  const tw = Math.min(FRAME_W + 30, ctx.measureText(title).width + 22);
  ctx.fillStyle = "#0d0623";
  roundRect(ctx, item.x - tw / 2, fy + FRAME_H + 18, tw, 26, 7);
  ctx.fill();
  ctx.strokeStyle = visited ? "#22c55e" : "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.fillText(title, item.x, fy + FRAME_H + 36, FRAME_W + 20);

  // vela encendida cuando ya lo visitaste
  if (visited) {
    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(item.x + FRAME_W / 2 + 18, fy + FRAME_H - 12, 7, 20);
    drawFlame(ctx, item.x + FRAME_W / 2 + 21.5, fy + FRAME_H - 17, now, item.x);
  }
}

/* ------------------------------------------------------------------ */
/* Suelo, partículas y HUD dentro del canvas                           */
/* ------------------------------------------------------------------ */

export function drawGround(ctx: CanvasRenderingContext2D, camX: number, w: number, groundY: number, h: number, now: number) {
  const g = ctx.createLinearGradient(0, groundY, 0, h);
  g.addColorStop(0, "#3a1a3f");
  g.addColorStop(1, "#160a1d");
  ctx.fillStyle = g;
  ctx.fillRect(camX, groundY, w, h - groundY);
  // empedrado
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  for (let gx = Math.floor(camX / 34) * 34; gx < camX + w; gx += 34) {
    for (let r = 0; r < 3; r++) {
      roundRect(ctx, gx + (r % 2) * 17 + 2, groundY + 24 + r * 18, 28, 13, 5);
      ctx.fill();
    }
  }
  // camino de pétalos
  for (let gx = Math.floor(camX / 20) * 20; gx < camX + w; gx += 20) {
    const wob = rand(gx) * 6 - 3;
    ctx.fillStyle = rand(gx + 1) > 0.5 ? "#ff8c1a" : "#ffb703";
    ctx.beginPath();
    ctx.arc(gx + 10, groundY + 9 + wob * 0.5, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // velas a lo largo de la calle
  for (let cx = Math.floor(camX / 200) * 200 + 100; cx < camX + w; cx += 200) {
    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(cx - 4, groundY - 20, 8, 20);
    drawFlame(ctx, cx, groundY - 26, now, cx);
  }
}

/** Luciérnagas / almas: puntos de luz que flotan alrededor. */
export function drawSpirits(ctx: CanvasRenderingContext2D, camX: number, w: number, groundY: number, now: number) {
  for (let i = 0; i < 26; i++) {
    const baseX = rand(i + 40) * 3000;
    const x = ((baseX + now * 0.012 * (i % 3 + 1) - camX * 0.9) % (w + 100) + w + 100) % (w + 100) - 50;
    const y = groundY - 40 - rand(i + 70) * 220 + Math.sin(now / 600 + i) * 14;
    const a = 0.4 + Math.sin(now / 400 + i * 2) * 0.35;
    ctx.globalAlpha = Math.max(0, a);
    ctx.fillStyle = i % 4 === 0 ? "#ff9ad5" : "#ffe08a";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

export function stepParticles(ctx: CanvasRenderingContext2D, particles: Particle[], dt: number) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life += dt;
    if (p.life >= p.max) {
      particles.splice(i, 1);
      continue;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 400 * dt;
    ctx.globalAlpha = 1 - p.life / p.max;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

export function drawMinimap(ctx: CanvasRenderingContext2D, w: number, h: number, zones: Zone[], worldW: number, px: number) {
  const mw = Math.min(360, w - 40);
  const mx = w - mw - 20;
  const my = h - 26;
  ctx.fillStyle = "rgba(13,6,35,0.75)";
  roundRect(ctx, mx - 10, my - 12, mw + 20, 24, 12);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(mx, my - 1, mw, 2);
  zones.forEach((z) => {
    ctx.fillStyle = z.color;
    ctx.fillRect(mx + (z.x / worldW) * mw, my - 3, (z.width / worldW) * mw, 6);
  });
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(mx + (px / worldW) * mw, my, 5, 0, Math.PI * 2);
  ctx.fill();
}

export function drawBanner(ctx: CanvasRenderingContext2D, w: number, h: number, text: string, color: string, t: number) {
  // t de 0 a 1: entra, se mantiene y se desvanece
  const alpha = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1;
  const y = h * 0.3 - (1 - Math.min(1, t / 0.15)) * 20;
  ctx.globalAlpha = Math.max(0, alpha);
  ctx.textAlign = "center";
  ctx.font = "700 14px Inter, system-ui, sans-serif";
  ctx.fillStyle = color;
  ctx.fillText("ENTRASTE A", w / 2, y - 34);
  ctx.font = `800 ${Math.round(Math.min(44, w / 13))}px 'Space Grotesk', system-ui, sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.shadowColor = color;
  ctx.shadowBlur = 30;
  ctx.fillText(text, w / 2, y + 10);
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}

/** Burbuja "E" sobre el personaje cuando hay algo cerca. */
export function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, now: number) {
  const bob = Math.sin(now / 220) * 3;
  ctx.fillStyle = "#ffb703";
  roundRect(ctx, x - 15, y - 30 + bob, 30, 26, 8);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 4 + bob);
  ctx.lineTo(x + 5, y - 4 + bob);
  ctx.lineTo(x, y + 3 + bob);
  ctx.fill();
  ctx.fillStyle = "#0d0623";
  ctx.font = "800 15px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("E", x, y - 12 + bob);
}

/** Callejón oscuro con la maquinita secreta del arcade. */
export function drawSecretArcade(ctx: CanvasRenderingContext2D, x: number, groundY: number, now: number, active: boolean) {
  // muro del callejón
  ctx.fillStyle = "#140a22";
  ctx.fillRect(x - 200, groundY - 300, 400, 300);
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  for (let by = groundY - 290; by < groundY; by += 22) {
    for (let bx = x - 196 + ((by / 22) % 2) * 20; bx < x + 196; bx += 40) ctx.fillRect(bx, by, 36, 18);
  }
  // halo de la pantalla
  const glow = ctx.createRadialGradient(x, groundY - 110, 10, x, groundY - 110, 190);
  glow.addColorStop(0, active ? "rgba(255, 79, 163, 0.35)" : "rgba(168, 85, 247, 0.22)");
  glow.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(x - 200, groundY - 300, 400, 300);
  // gabinete
  ctx.fillStyle = "#2a0f45";
  ctx.beginPath();
  ctx.moveTo(x - 46, groundY);
  ctx.lineTo(x - 46, groundY - 150);
  ctx.lineTo(x - 36, groundY - 196);
  ctx.lineTo(x + 36, groundY - 196);
  ctx.lineTo(x + 46, groundY - 150);
  ctx.lineTo(x + 46, groundY);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#ff4fa3";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#ff4fa3";
  ctx.shadowBlur = active ? 22 : 10;
  ctx.stroke();
  ctx.shadowBlur = 0;
  // marquesina
  ctx.fillStyle = "#ffb703";
  ctx.fillRect(x - 36, groundY - 196, 72, 20);
  ctx.fillStyle = "#0d0623";
  ctx.font = "800 11px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("ARCADE", x, groundY - 182);
  // pantalla con estática y bloques
  ctx.fillStyle = "#0b0520";
  ctx.fillRect(x - 32, groundY - 168, 64, 50);
  const colors = ["#22d3ee", "#ffb703", "#ff4fa3", "#a855f7"];
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = colors[(i + Math.floor(now / 400)) % colors.length];
    ctx.fillRect(x - 26 + (i % 3) * 18, groundY - 160 + Math.floor(i / 3) * 18 + ((now / 30 + i * 7) % 6), 14, 14);
  }
  // controles
  ctx.fillStyle = "#3b1f5c";
  ctx.fillRect(x - 40, groundY - 112, 80, 20);
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(x - 18, groundY - 106, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(x + 16, groundY - 104, 4, 0, Math.PI * 2);
  ctx.arc(x + 26, groundY - 104, 4, 0, Math.PI * 2);
  ctx.fill();
  // letrero de premio
  ctx.fillStyle = "#c6f432";
  ctx.font = "800 13px Inter, system-ui, sans-serif";
  ctx.fillText("¿Bono secreto?", x, groundY - 214 + Math.sin(now / 300) * 3);
}
