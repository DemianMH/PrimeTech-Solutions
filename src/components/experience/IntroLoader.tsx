"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const IntroParticles = dynamic(() => import("./IntroParticles"), { ssr: false, loading: () => null });

const DURATION = 2600;

/**
 * Pantalla de entrada: las partículas se ensamblan en el núcleo de PrimeTech
 * mientras corre el contador. Se muestra una vez por sesión y se puede saltar.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"hidden" | "running" | "leaving">("hidden");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("pt-intro") === "1";
      sessionStorage.setItem("pt-intro", "1");
    } catch {
      // sin almacenamiento: mostramos la intro igualmente
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("running");
    document.documentElement.classList.add("intro-lock");
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setPhase("leaving");
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    document.documentElement.classList.remove("intro-lock");
    const timer = window.setTimeout(() => setPhase("hidden"), 900);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div className={`intro ${phase === "leaving" ? "is-leaving" : ""}`} role="presentation">
      <IntroParticles duration={DURATION} />
      <div className="intro-copy">
        <span className="intro-brand">
          PRIME<b>TECH</b>
        </span>
        <span className="intro-line">
          <i style={{ transform: `scaleX(${count / 100})` }} />
        </span>
        <span className="intro-count">{String(count).padStart(3, "0")}</span>
      </div>
      <button type="button" className="intro-skip" onClick={() => setPhase("leaving")}>
        Saltar intro
      </button>
    </div>
  );
}
