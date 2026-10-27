"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Gamepad2, LayoutGrid } from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase";
import { PortfolioGame } from "./PortfolioGame";

type View = "juego" | "normal";

/** Alterna entre el modo juego y la vista normal del portafolio. */
export function PortfolioViews({ projects, children }: { projects: ShowcaseProject[]; children: ReactNode }) {
  const [view, setView] = useState<View>("juego");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("vista");
    if (fromUrl === "normal" || fromUrl === "juego") {
      setView(fromUrl);
      return;
    }
    try {
      const saved = localStorage.getItem("pt-vista");
      if (saved === "normal" || saved === "juego") setView(saved);
    } catch {
      // sin almacenamiento disponible
    }
  }, []);

  const change = (next: View) => {
    setView(next);
    try {
      localStorage.setItem("pt-vista", next);
    } catch {
      // sin almacenamiento disponible
    }
    const url = new URL(window.location.href);
    url.searchParams.set("vista", next);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <div className="view-switch" role="group" aria-label="Vista del portafolio">
        <button type="button" className={view === "juego" ? "on" : ""} onClick={() => change("juego")} aria-pressed={view === "juego"}>
          <Gamepad2 size={17} /> Modo juego
        </button>
        <button type="button" className={view === "normal" ? "on" : ""} onClick={() => change("normal")} aria-pressed={view === "normal"}>
          <LayoutGrid size={17} /> Vista normal
        </button>
      </div>
      {view === "juego" ? (
        <section id="juego" className="ch ch-game">
          <header className="game-title">
            <span className="xp-kicker">Portafolio interactivo · Noche de muertos</span>
            <h1>Recorre PrimeTech caminando.</h1>
            <p>
              Elige tu personaje, entra a la tienda de servicios y visita las galerías de proyectos. Acércate a un cuadro
              y presiona <kbd>E</kbd> para verlo o ir al sitio.
            </p>
          </header>
          <PortfolioGame projects={projects} />
        </section>
      ) : (
        children
      )}
    </>
  );
}
