"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Crosshair } from "lucide-react";
import { GameFrame, TouchKey, useCanvas, useHeldKeys, useKeyPress, useLoop, type GameProps } from "./shared";

const W = 360;
const H = 440;
const ROWS = 4;
const COLS = 7;
const PLAYER_Y = H - 34;
const rowColors = ["#ff4fa3", "#ffb703", "#2ec4b6", "#a855f7"];

type Enemy = { x: number; y: number; alive: boolean; row: number };
type Shot = { x: number; y: number };

const makeEnemies = (): Enemy[] =>
  Array.from({ length: ROWS * COLS }, (_, i) => ({ x: 40 + (i % COLS) * 44, y: 50 + Math.floor(i / COLS) * 34, alive: true, row: Math.floor(i / COLS) }));

/** Cohetes: destruye la invasión de calaveras antes de que llegue al suelo. */
export function Rockets({ onWin, onLose }: GameProps) {
  const canvas = useCanvas(W, H);
  const keys = useHeldKeys();
  const player = useRef({ x: W / 2, cooldown: 0, invulnerable: 0 });
  const enemies = useRef<Enemy[]>(makeEnemies());
  const shots = useRef<Shot[]>([]);
  const enemyShots = useRef<Shot[]>([]);
  const march = useRef({ dir: 1, fireTimer: 0, frame: 0, frameTimer: 0 });
  const stars = useRef(Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, s: Math.random() * 1.5 + 0.4 })));
  const livesRef = useRef(3);
  const [lives, setLives] = useState(3);
  const [left, setLeft] = useState(ROWS * COLS);
  const [state, setState] = useState<"play" | "win" | "lose">("play");

  const fire = () => {
    const p = player.current;
    if (p.cooldown > 0 || shots.current.length >= 2) return;
    shots.current.push({ x: p.x, y: PLAYER_Y - 18 });
    p.cooldown = 0.38;
  };

  useKeyPress((key) => {
    if (key === " " || key === "arrowup" || key === "w") fire();
  }, state === "play");

  const lose = () => {
    setState("lose");
    onLose?.();
  };

  useLoop((dt, now) => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    const p = player.current;
    const k = keys.current;
    if (k["arrowleft"] || k["a"]) p.x -= 230 * dt;
    if (k["arrowright"] || k["d"]) p.x += 230 * dt;
    if (k["fire"]) fire();
    p.x = Math.max(18, Math.min(W - 18, p.x));
    p.cooldown -= dt;
    p.invulnerable -= dt;

    // Marcha de la invasión: más rápida mientras quedan menos
    const alive = enemies.current.filter((e) => e.alive);
    const speed = 24 + (ROWS * COLS - alive.length) * 3.4;
    const m = march.current;
    const minX = Math.min(...alive.map((e) => e.x));
    const maxX = Math.max(...alive.map((e) => e.x));
    if ((m.dir > 0 && maxX + 14 + speed * dt > W - 6) || (m.dir < 0 && minX - 14 - speed * dt < 6)) {
      m.dir *= -1;
      enemies.current.forEach((e) => (e.y += 16));
    } else {
      enemies.current.forEach((e) => (e.x += m.dir * speed * dt));
    }
    m.frameTimer += dt;
    if (m.frameTimer > 0.45) {
      m.frameTimer = 0;
      m.frame ^= 1;
    }
    if (alive.some((e) => e.y > PLAYER_Y - 30)) return lose();

    // Disparos enemigos desde la fila más baja de cada columna
    m.fireTimer += dt;
    if (m.fireTimer > 0.85 && enemyShots.current.length < 3 && alive.length) {
      m.fireTimer = Math.random() * 0.3;
      const shooter = alive[Math.floor(Math.random() * alive.length)];
      const lowest = alive.filter((e) => Math.abs(e.x - shooter.x) < 10).sort((a, b) => b.y - a.y)[0];
      enemyShots.current.push({ x: lowest.x, y: lowest.y + 12 });
    }

    shots.current.forEach((s) => (s.y -= 430 * dt));
    enemyShots.current.forEach((s) => (s.y += 205 * dt));
    shots.current = shots.current.filter((s) => {
      if (s.y < 0) return false;
      const hit = enemies.current.find((e) => e.alive && Math.abs(e.x - s.x) < 15 && Math.abs(e.y - s.y) < 12);
      if (hit) {
        hit.alive = false;
        const remaining = enemies.current.filter((e) => e.alive).length;
        setLeft(remaining);
        if (remaining === 0) {
          setState("win");
          onWin();
        }
        return false;
      }
      return true;
    });
    enemyShots.current = enemyShots.current.filter((s) => {
      if (s.y > H) return false;
      if (p.invulnerable <= 0 && Math.abs(s.x - p.x) < 15 && Math.abs(s.y - PLAYER_Y) < 14) {
        livesRef.current -= 1;
        setLives(livesRef.current);
        p.invulnerable = 1.4;
        if (livesRef.current <= 0) lose();
        return false;
      }
      return true;
    });

    // Dibujo
    ctx.fillStyle = "#0b0520";
    ctx.fillRect(0, 0, W, H);
    stars.current.forEach((s) => {
      s.y = (s.y + s.s * 20 * dt) % H;
      ctx.fillStyle = "rgba(255,246,216,0.7)";
      ctx.fillRect(s.x, s.y, s.s, s.s);
    });
    ctx.fillStyle = "#3a1a3f";
    ctx.fillRect(0, H - 12, W, 12);

    enemies.current.forEach((e) => {
      if (!e.alive) return;
      const c = rowColors[e.row];
      // calaverita invasora (dos cuadros de animación)
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(e.x, e.y - 2, 11, Math.PI, 0);
      ctx.fillRect(e.x - 11, e.y - 2, 22, 8);
      ctx.fill();
      ctx.fillRect(e.x - 8, e.y + 6, 4, m.frame ? 6 : 3);
      ctx.fillRect(e.x + 4, e.y + 6, 4, m.frame ? 3 : 6);
      ctx.fillStyle = "#0b0520";
      ctx.fillRect(e.x - 6, e.y - 4, 4, 4);
      ctx.fillRect(e.x + 2, e.y - 4, 4, 4);
      ctx.fillRect(e.x - 3, e.y + 2, 6, 2);
    });

    ctx.fillStyle = "#c6f432";
    shots.current.forEach((s) => ctx.fillRect(s.x - 1.5, s.y - 8, 3, 12));
    ctx.fillStyle = "#ff4fa3";
    enemyShots.current.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Cohete del jugador
    if (p.invulnerable <= 0 || Math.floor(now / 100) % 2 === 0) {
      ctx.fillStyle = "#ffb703";
      ctx.beginPath();
      ctx.moveTo(p.x - 6, PLAYER_Y + 12);
      ctx.lineTo(p.x, PLAYER_Y + 20 + Math.random() * 6);
      ctx.lineTo(p.x + 6, PLAYER_Y + 12);
      ctx.fill();
      ctx.fillStyle = "#e8eefc";
      ctx.beginPath();
      ctx.moveTo(p.x, PLAYER_Y - 18);
      ctx.quadraticCurveTo(p.x + 10, PLAYER_Y - 4, p.x + 8, PLAYER_Y + 12);
      ctx.lineTo(p.x - 8, PLAYER_Y + 12);
      ctx.quadraticCurveTo(p.x - 10, PLAYER_Y - 4, p.x, PLAYER_Y - 18);
      ctx.fill();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.moveTo(p.x - 8, PLAYER_Y + 2);
      ctx.lineTo(p.x - 15, PLAYER_Y + 14);
      ctx.lineTo(p.x - 7, PLAYER_Y + 12);
      ctx.moveTo(p.x + 8, PLAYER_Y + 2);
      ctx.lineTo(p.x + 15, PLAYER_Y + 14);
      ctx.lineTo(p.x + 7, PLAYER_Y + 12);
      ctx.fill();
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(p.x, PLAYER_Y - 4, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, state === "play");

  return (
    <GameFrame
      title="Cohetes"
      goal="Destruye toda la invasión · espacio para disparar"
      status={
        <span>
          Quedan <b>{left}</b> · Vidas <b>{"♥".repeat(Math.max(0, lives))}</b>
        </span>
      }
      controls={
        <>
          <TouchKey label="Izquierda" keys={keys} keyName="arrowleft">
            <ArrowLeft size={20} />
          </TouchKey>
          <TouchKey label="Disparar" keys={keys} keyName="fire">
            <Crosshair size={20} />
          </TouchKey>
          <TouchKey label="Derecha" keys={keys} keyName="arrowright">
            <ArrowRight size={20} />
          </TouchKey>
        </>
      }
    >
      <canvas ref={canvas} className="arc-canvas" style={{ aspectRatio: `${W} / ${H}` }} />
      {state === "lose" && <div className="arc-over">La invasión ganó esta vez. ¡Inténtalo otra vez!</div>}
    </GameFrame>
  );
}
