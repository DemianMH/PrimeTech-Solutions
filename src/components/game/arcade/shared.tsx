"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type GameProps = { onWin: () => void; onLose?: () => void };

/** Teclas presionadas en este momento; evita que las flechas desplacen la página. */
export function useHeldKeys(active = true) {
  const keys = useRef<Record<string, boolean>>({});
  useEffect(() => {
    if (!active) return;
    const block = ["arrowleft", "arrowright", "arrowup", "arrowdown", " "];
    const down = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (block.includes(key)) event.preventDefault();
      keys.current[key] = true;
    };
    const up = (event: KeyboardEvent) => {
      keys.current[event.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      keys.current = {};
    };
  }, [active]);
  return keys;
}

/** Escucha pulsaciones individuales (rotar, soltar, disparar). */
export function useKeyPress(handler: (key: string) => void, active = true) {
  const saved = useRef(handler);
  saved.current = handler;
  useEffect(() => {
    if (!active) return;
    const down = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowright", "arrowup", "arrowdown", " "].includes(key)) event.preventDefault();
      saved.current(key);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [active]);
}

/** Bucle con requestAnimationFrame que entrega el delta en segundos. */
export function useLoop(step: (dt: number, now: number) => void, active: boolean) {
  const saved = useRef(step);
  saved.current = step;
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      saved.current(dt, now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}

/** Botón táctil que simula una tecla mientras se mantiene presionado. */
export function TouchKey({
  label,
  children,
  keys,
  keyName,
  onTap,
}: {
  label: string;
  children: ReactNode;
  keys?: React.MutableRefObject<Record<string, boolean>>;
  keyName?: string;
  onTap?: () => void;
}) {
  const set = (value: boolean) => {
    if (keys && keyName) keys.current[keyName] = value;
  };
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(event) => {
        event.preventDefault();
        set(true);
        onTap?.();
      }}
      onPointerUp={() => set(false)}
      onPointerLeave={() => set(false)}
      onPointerCancel={() => set(false)}
    >
      {children}
    </button>
  );
}

export function GameFrame({ title, goal, status, children, controls }: { title: string; goal: string; status: ReactNode; children: ReactNode; controls: ReactNode }) {
  return (
    <div className="arc-game">
      <header className="arc-head">
        <div>
          <b>{title}</b>
          <small>{goal}</small>
        </div>
        <div className="arc-status">{status}</div>
      </header>
      <div className="arc-board">{children}</div>
      <div className="arc-touch">{controls}</div>
    </div>
  );
}

export function useCanvas(width: number, height: number) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [width, height]);
  return ref;
}
