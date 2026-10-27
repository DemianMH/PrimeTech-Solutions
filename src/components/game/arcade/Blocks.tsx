"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ChevronsDown, RotateCw } from "lucide-react";
import { GameFrame, TouchKey, useCanvas, useHeldKeys, useKeyPress, useLoop, type GameProps } from "./shared";

const COLS = 10;
const ROWS = 18;
const CELL = 24;
const GOAL = 10; // líneas para ganar
const SPEED = 0.48; // segundos por caída (dificultad media)

const SHAPES: { cells: number[][]; color: string }[] = [
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0]], color: "#22d3ee" },
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1]], color: "#ffb703" },
  { cells: [[1, 0], [0, 1], [1, 1], [2, 1]], color: "#a855f7" },
  { cells: [[1, 0], [2, 0], [0, 1], [1, 1]], color: "#22c55e" },
  { cells: [[0, 0], [1, 0], [1, 1], [2, 1]], color: "#ef4444" },
  { cells: [[0, 0], [0, 1], [1, 1], [2, 1]], color: "#3b82f6" },
  { cells: [[2, 0], [0, 1], [1, 1], [2, 1]], color: "#ff6b1a" },
];

type Piece = { cells: number[][]; color: string; x: number; y: number };

const newPiece = (): Piece => {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  return { cells: shape.cells.map((c) => [...c]), color: shape.color, x: 3, y: 0 };
};

/** Bloques del Más Allá: completa 10 líneas para ganar. */
export function Blocks({ onWin, onLose }: GameProps) {
  const canvas = useCanvas(COLS * CELL, ROWS * CELL);
  const keys = useHeldKeys();
  const grid = useRef<(string | null)[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const piece = useRef<Piece>(newPiece());
  const next = useRef<Piece>(newPiece());
  const timer = useRef(0);
  const moveTimer = useRef(0);
  const linesRef = useRef(0);
  const [lines, setLines] = useState(0);
  const [state, setState] = useState<"play" | "win" | "lose">("play");

  const fits = (cells: number[][], x: number, y: number) =>
    cells.every(([cx, cy]) => {
      const gx = cx + x;
      const gy = cy + y;
      return gx >= 0 && gx < COLS && gy < ROWS && (gy < 0 || !grid.current[gy][gx]);
    });

  const lock = () => {
    const p = piece.current;
    p.cells.forEach(([cx, cy]) => {
      if (cy + p.y >= 0) grid.current[cy + p.y][cx + p.x] = p.color;
    });
    const kept = grid.current.filter((row) => row.some((cell) => !cell));
    const cleared = ROWS - kept.length;
    while (kept.length < ROWS) kept.unshift(Array(COLS).fill(null));
    grid.current = kept;
    if (cleared) {
      linesRef.current += cleared;
      setLines(linesRef.current);
      if (linesRef.current >= GOAL) {
        setState("win");
        onWin();
        return;
      }
    }
    piece.current = next.current;
    next.current = newPiece();
    if (!fits(piece.current.cells, piece.current.x, piece.current.y)) {
      setState("lose");
      onLose?.();
    }
  };

  const move = (dx: number) => {
    const p = piece.current;
    if (fits(p.cells, p.x + dx, p.y)) p.x += dx;
  };
  const drop = () => {
    const p = piece.current;
    if (fits(p.cells, p.x, p.y + 1)) p.y += 1;
    else lock();
  };
  const rotate = () => {
    const p = piece.current;
    const size = Math.max(...p.cells.flat()) + 1;
    const rotated = p.cells.map(([x, y]) => [size - 1 - y, x]);
    for (const kick of [0, -1, 1, -2, 2]) {
      if (fits(rotated, p.x + kick, p.y)) {
        p.cells = rotated;
        p.x += kick;
        return;
      }
    }
  };
  const hardDrop = () => {
    const p = piece.current;
    while (fits(p.cells, p.x, p.y + 1)) p.y += 1;
    lock();
  };

  useKeyPress((key) => {
    if (state !== "play") return;
    if (key === "arrowup" || key === "w" || key === "x") rotate();
    if (key === " ") hardDrop();
    if (key === "arrowleft" || key === "a" || key === "arrowright" || key === "d") {
      move(key === "arrowleft" || key === "a" ? -1 : 1);
      moveTimer.current = -0.1; // pausa antes de repetir al mantener
    }
  }, state === "play");

  useLoop((dt) => {
    const k = keys.current;
    // mover manteniendo la tecla
    moveTimer.current += dt;
    if (moveTimer.current > 0.11) {
      if (k["arrowleft"] || k["a"]) move(-1);
      if (k["arrowright"] || k["d"]) move(1);
      moveTimer.current = 0;
    }
    timer.current += dt;
    const interval = k["arrowdown"] || k["s"] ? 0.05 : SPEED;
    if (timer.current >= interval) {
      timer.current = 0;
      drop();
    }

    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0d0623";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, ROWS * CELL);
      ctx.stroke();
    }
    const cell = (x: number, y: number, color: string, alpha = 1) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, 4);
      ctx.globalAlpha = 1;
    };
    grid.current.forEach((row, y) => row.forEach((color, x) => color && cell(x, y, color)));
    // sombra de dónde caerá
    const p = piece.current;
    let gy = p.y;
    while (fits(p.cells, p.x, gy + 1)) gy++;
    p.cells.forEach(([cx, cy]) => cell(cx + p.x, cy + gy, p.color, 0.18));
    p.cells.forEach(([cx, cy]) => cy + p.y >= 0 && cell(cx + p.x, cy + p.y, p.color));
  }, state === "play");

  return (
    <GameFrame
      title="Bloques del Más Allá"
      goal={`Completa ${GOAL} líneas · ↑ girar · espacio soltar`}
      status={
        <span>
          Líneas <b>{Math.min(lines, GOAL)}/{GOAL}</b>
        </span>
      }
      controls={
        <>
          <TouchKey label="Izquierda" onTap={() => move(-1)}>
            <ArrowLeft size={20} />
          </TouchKey>
          <TouchKey label="Derecha" onTap={() => move(1)}>
            <ArrowRight size={20} />
          </TouchKey>
          <TouchKey label="Girar" onTap={rotate}>
            <RotateCw size={20} />
          </TouchKey>
          <TouchKey label="Bajar" keys={keys} keyName="arrowdown">
            <ArrowDown size={20} />
          </TouchKey>
          <TouchKey label="Soltar" onTap={hardDrop}>
            <ChevronsDown size={20} />
          </TouchKey>
        </>
      }
    >
      <canvas ref={canvas} className="arc-canvas" style={{ aspectRatio: `${COLS} / ${ROWS}` }} />
      {state === "lose" && <div className="arc-over">Se llenó el tablero. ¡Inténtalo otra vez!</div>}
    </GameFrame>
  );
}
