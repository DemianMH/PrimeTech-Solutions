"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { GameFrame, TouchKey, useCanvas, useKeyPress, useLoop, type GameProps } from "./shared";

const MAP = [
  "###############",
  "#o.....#.....o#",
  "#.##.#.#.#.##.#",
  "#....#...#....#",
  "##.#.##.##.#.##",
  "#..#...G...#..#",
  "#.##.##.##.##.#",
  "#......P......#",
  "#.##.#####.##.#",
  "#....#...#....#",
  "#.##.#.#.#.##.#",
  "#o.....#.....o#",
  "###############",
];
const T = 26;
const W = MAP[0].length;
const H = MAP.length;
const PLAYER_SPEED = 5.2;
const GHOST_SPEED = 4.3; // dificultad media
const SCARED_SPEED = 2.8;
const SCARED_TIME = 6;

type Dir = [number, number];
const DIRS: Dir[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
type Mob = { x: number; y: number; dir: Dir; next: Dir; sx: number; sy: number };
type Ghost = Mob & { color: string; wait: number; eaten: boolean };

const find = (ch: string) => {
  const y = MAP.findIndex((row) => row.includes(ch));
  return { x: MAP[y].indexOf(ch), y };
};
const wall = (x: number, y: number) => MAP[y]?.[x] === "#" || MAP[y]?.[x] === undefined;

/** Calaverita Hambrienta: cómete todos los pétalos sin que te atrapen las almas. */
export function Maze({ onWin, onLose }: GameProps) {
  const canvas = useCanvas(W * T, H * T);
  const start = find("P");
  const home = find("G");
  const pellets = useRef<Set<string>>(
    new Set(MAP.flatMap((row, y) => [...row].map((c, x) => (c === "." || c === "o" ? `${x},${y}` : "")).filter(Boolean)))
  );
  const powers = useRef<Set<string>>(new Set(MAP.flatMap((row, y) => [...row].map((c, x) => (c === "o" ? `${x},${y}` : "")).filter(Boolean))));
  const total = useRef(pellets.current.size);
  const player = useRef<Mob>({ x: start.x, y: start.y, dir: [0, 0], next: [0, 0], sx: start.x, sy: start.y });
  const ghosts = useRef<Ghost[]>(
    ["#ff4fa3", "#22d3ee", "#a855f7"].map((color, i) => ({
      x: home.x,
      y: home.y,
      dir: DIRS[i % 2] as Dir,
      next: [0, 0],
      sx: home.x,
      sy: home.y,
      color,
      wait: i * 2.2,
      eaten: false,
    }))
  );
  const scared = useRef(0);
  const [eaten, setEaten] = useState(0);
  const [lives, setLives] = useState(3);
  const livesRef = useRef(3);
  const [state, setState] = useState<"play" | "win" | "lose">("play");
  const pause = useRef(1.2);

  const turn = (dir: Dir) => {
    player.current.next = dir;
  };

  useKeyPress((key) => {
    if (key === "arrowleft" || key === "a") turn([-1, 0]);
    if (key === "arrowright" || key === "d") turn([1, 0]);
    if (key === "arrowup" || key === "w") turn([0, -1]);
    if (key === "arrowdown" || key === "s") turn([0, 1]);
  }, state === "play");

  /** Avanza una entidad sobre la cuadrícula; en el centro de cada casilla decide el giro. */
  const advance = (mob: Mob, speed: number, dt: number, decide: (mob: Mob) => void) => {
    let remaining = speed * dt;
    while (remaining > 0) {
      const cx = Math.round(mob.x);
      const cy = Math.round(mob.y);
      const dist = Math.abs(mob.x - cx) + Math.abs(mob.y - cy);
      const atCenter = dist < 0.001;
      if (atCenter) {
        mob.x = cx;
        mob.y = cy;
        decide(mob);
        if (wall(cx + mob.dir[0], cy + mob.dir[1]) || (mob.dir[0] === 0 && mob.dir[1] === 0)) {
          mob.dir = [0, 0];
          return;
        }
      }
      // distancia hasta el siguiente centro
      const tx = atCenter ? cx + mob.dir[0] : mob.dir[0] > 0 ? Math.ceil(mob.x) : mob.dir[0] < 0 ? Math.floor(mob.x) : mob.x;
      const ty = atCenter ? cy + mob.dir[1] : mob.dir[1] > 0 ? Math.ceil(mob.y) : mob.dir[1] < 0 ? Math.floor(mob.y) : mob.y;
      const gap = Math.abs(tx - mob.x) + Math.abs(ty - mob.y);
      const stepLen = Math.min(gap, remaining);
      mob.x += mob.dir[0] * stepLen;
      mob.y += mob.dir[1] * stepLen;
      remaining -= stepLen;
      if (stepLen === 0) return;
    }
  };

  const resetRound = () => {
    Object.assign(player.current, { x: start.x, y: start.y, dir: [0, 0], next: [0, 0] });
    ghosts.current.forEach((g, i) => Object.assign(g, { x: home.x, y: home.y, wait: i * 2.2, eaten: false, dir: DIRS[i % 2] }));
    scared.current = 0;
    pause.current = 1.2;
  };

  useLoop((dt, now) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;

    if (pause.current > 0) pause.current -= dt;
    else {
      const p = player.current;
      // dar media vuelta es inmediato, sin esperar al centro de la casilla
      if (p.next[0] === -p.dir[0] && p.next[1] === -p.dir[1] && (p.dir[0] || p.dir[1])) p.dir = p.next;
      advance(p, PLAYER_SPEED, dt, (mob) => {
        const [nx, ny] = mob.next;
        if ((nx || ny) && !wall(Math.round(mob.x) + nx, Math.round(mob.y) + ny)) mob.dir = [nx, ny];
      });
      const key = `${Math.round(p.x)},${Math.round(p.y)}`;
      if (pellets.current.has(key)) {
        pellets.current.delete(key);
        if (powers.current.has(key)) {
          powers.current.delete(key);
          scared.current = SCARED_TIME;
        }
        setEaten(total.current - pellets.current.size);
        if (pellets.current.size === 0) {
          setState("win");
          onWin();
          return;
        }
      }
      if (scared.current > 0) scared.current -= dt;

      ghosts.current.forEach((g) => {
        if (g.wait > 0) {
          g.wait -= dt;
          return;
        }
        const frightened = scared.current > 0 && !g.eaten;
        advance(g, frightened ? SCARED_SPEED : GHOST_SPEED, dt, (mob) => {
          const cx = Math.round(mob.x);
          const cy = Math.round(mob.y);
          const options = DIRS.filter(([dx, dy]) => !wall(cx + dx, cy + dy) && !(dx === -mob.dir[0] && dy === -mob.dir[1] && (mob.dir[0] || mob.dir[1])));
          const choices = options.length ? options : DIRS.filter(([dx, dy]) => !wall(cx + dx, cy + dy));
          if (!frightened && Math.random() < 0.72) {
            // persecución: elige la dirección que más acerca al jugador
            choices.sort((a, b) => Math.hypot(cx + a[0] - p.x, cy + a[1] - p.y) - Math.hypot(cx + b[0] - p.x, cy + b[1] - p.y));
            mob.dir = choices[0];
          } else {
            mob.dir = choices[Math.floor(Math.random() * choices.length)];
          }
        });
        if (Math.hypot(g.x - p.x, g.y - p.y) < 0.6) {
          if (frightened) {
            Object.assign(g, { x: home.x, y: home.y, wait: 3, eaten: false });
          } else {
            livesRef.current -= 1;
            setLives(livesRef.current);
            if (livesRef.current <= 0) {
              setState("lose");
              onLose?.();
            } else resetRound();
          }
        }
      });
    }

    // Dibujo
    ctx.fillStyle = "#0d0623";
    ctx.fillRect(0, 0, W * T, H * T);
    MAP.forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c !== "#") return;
        ctx.fillStyle = "#2a1250";
        ctx.fillRect(x * T + 2, y * T + 2, T - 4, T - 4);
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x * T + 3, y * T + 3, T - 6, T - 6);
      })
    );
    pellets.current.forEach((key) => {
      const [x, y] = key.split(",").map(Number);
      const big = powers.current.has(key);
      ctx.fillStyle = big ? "#ff8c1a" : "#ffd166";
      ctx.beginPath();
      ctx.arc(x * T + T / 2, y * T + T / 2, big ? 7 + Math.sin(now / 200) : 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Calaverita (jugador)
    const p = player.current;
    const px = p.x * T + T / 2;
    const py = p.y * T + T / 2;
    const jaw = Math.abs(Math.sin(now / 90)) * 3;
    ctx.fillStyle = "#f4f1ea";
    ctx.beginPath();
    ctx.arc(px, py - 1, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(px - 6, py + 5, 12, 4 + jaw);
    ctx.fillStyle = "#e4007c";
    ctx.beginPath();
    ctx.arc(px - 4, py - 2, 3, 0, Math.PI * 2);
    ctx.arc(px + 4, py - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Almas
    ghosts.current.forEach((g) => {
      const gx = g.x * T + T / 2;
      const gy = g.y * T + T / 2;
      const frightened = scared.current > 0;
      const blink = frightened && scared.current < 1.5 && Math.floor(now / 150) % 2 === 0;
      ctx.fillStyle = frightened ? (blink ? "#f4f1ea" : "#3b82f6") : g.color;
      ctx.globalAlpha = g.wait > 0 ? 0.45 : 1;
      ctx.beginPath();
      ctx.arc(gx, gy - 2, 10, Math.PI, 0);
      ctx.lineTo(gx + 10, gy + 10);
      for (let i = 0; i < 4; i++) ctx.lineTo(gx + 10 - (i + 0.5) * 5, gy + 10 - (i % 2 ? 0 : 4 + Math.sin(now / 120) * 1.5));
      ctx.lineTo(gx - 10, gy + 10);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(gx - 4, gy - 3, 3, 0, Math.PI * 2);
      ctx.arc(gx + 4, gy - 3, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    if (pause.current > 0) {
      ctx.fillStyle = "#ffb703";
      ctx.font = "800 18px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("¡Listos!", (W * T) / 2, start.y * T - 8);
    }
  }, state === "play");

  return (
    <GameFrame
      title="Calaverita Hambrienta"
      goal="Cómete todos los pétalos · las flores asustan a las almas"
      status={
        <span>
          Pétalos <b>{eaten}/{total.current}</b> · Vidas <b>{"♥".repeat(Math.max(0, lives))}</b>
        </span>
      }
      controls={
        <>
          <TouchKey label="Izquierda" onTap={() => turn([-1, 0])}>
            <ArrowLeft size={20} />
          </TouchKey>
          <TouchKey label="Arriba" onTap={() => turn([0, -1])}>
            <ArrowUp size={20} />
          </TouchKey>
          <TouchKey label="Abajo" onTap={() => turn([0, 1])}>
            <ArrowDown size={20} />
          </TouchKey>
          <TouchKey label="Derecha" onTap={() => turn([1, 0])}>
            <ArrowRight size={20} />
          </TouchKey>
        </>
      }
    >
      <canvas ref={canvas} className="arc-canvas" style={{ aspectRatio: `${W} / ${H}` }} />
      {state === "lose" && <div className="arc-over">Te atraparon las almas. ¡Inténtalo otra vez!</div>}
    </GameFrame>
  );
}
