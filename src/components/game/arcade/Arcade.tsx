"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Camera, RotateCcw, Trophy } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site";
import { Blocks } from "./Blocks";
import { Maze } from "./Maze";
import { Rockets } from "./Rockets";

type GameId = "bloques" | "calaverita" | "cohetes";

const games: { id: GameId; name: string; prize: number; level: string; text: string; color: string; letter: string }[] = [
  { id: "bloques", name: "Bloques del Más Allá", prize: 200, level: "Medio", text: "Acomoda las piezas y completa 10 líneas.", color: "#22d3ee", letter: "B" },
  { id: "calaverita", name: "Calaverita Hambrienta", prize: 300, level: "Medio-alto", text: "Cómete todos los pétalos sin que te atrapen las almas.", color: "#ffb703", letter: "C" },
  { id: "cohetes", name: "Cohetes", prize: 500, level: "Alto", text: "Destruye la invasión completa con 3 vidas.", color: "#ff4fa3", letter: "K" },
];

type Bonus = { game: GameId; prize: number; code: string; date: string };

/** Código legible con fecha y un dígito de control para revisar capturas a simple vista. */
function makeCode(game: (typeof games)[number]) {
  const now = new Date();
  const ymd = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const random = Array.from({ length: 4 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  const body = `PT-${game.letter}${game.prize}-${ymd}-${random}`;
  const check = ([...body].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 36).toString(36).toUpperCase();
  return `${body}${check}`;
}

export function Arcade({ onExit }: { onExit: () => void }) {
  const [bonus, setBonus] = useState<Bonus | null>(null);
  const [playing, setPlaying] = useState<GameId | null>(null);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("pt-bono") || "null") as Bonus | null;
      if (saved?.code) setBonus(saved);
    } catch {
      // sin almacenamiento disponible
    }
  }, []);

  const start = (id: GameId) => {
    setPlaying(id);
    setResult(null);
    setRound((r) => r + 1);
  };

  const win = (id: GameId) => {
    setResult("win");
    if (bonus) {
      setRepeat(true);
      return;
    }
    const game = games.find((g) => g.id === id)!;
    const earned: Bonus = {
      game: id,
      prize: game.prize,
      code: makeCode(game),
      date: new Date().toLocaleString("es-MX", { dateStyle: "long", timeStyle: "short" }),
    };
    setBonus(earned);
    setRepeat(false);
    try {
      localStorage.setItem("pt-bono", JSON.stringify(earned));
    } catch {
      // sin almacenamiento disponible
    }
  };

  const current = games.find((g) => g.id === playing);
  const whatsapp = bonus
    ? `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
        `Hola PrimeTech, gané el bono de $${bonus.prize} en el arcade del portafolio. Código: ${bonus.code}. Te envío la captura.`
      )}`
    : "#";

  // Pantalla del premio
  if (result === "win" && bonus) {
    return (
      <div className="arcade">
        <div className="bonus-card">
          <Trophy size={42} />
          {repeat ? (
            <>
              <span className="game-pick-kicker">¡Lo lograste otra vez!</span>
              <h3 className="bonus-repeat">Ya tienes tu bono de ${bonus.prize} MXN</h3>
              <p>Solo aplica un bono por cliente, así que conservas el que ganaste primero.</p>
            </>
          ) : (
            <>
              <span className="game-pick-kicker">¡Ganaste!</span>
              <h3>
                ${bonus.prize} <small>MXN de descuento</small>
              </h3>
            </>
          )}
          <div className="bonus-code">
            <small>Código</small>
            <b>{bonus.code}</b>
            <small>{bonus.date}</small>
          </div>
          <p className="bonus-shot">
            <Camera size={18} /> Toma captura de esta pantalla y envíala por WhatsApp para aplicarlo.
          </p>
          <small className="bonus-terms">1 bono por cliente en tu próximo proyecto · sujeto a validación.</small>
          <div className="bonus-actions">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="pj-cta">
              <FaWhatsapp size={17} /> Enviar por WhatsApp
            </a>
            <button type="button" className="xp-ghost" onClick={() => setPlaying(null)}>
              Volver al arcade
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Jugando
  if (current) {
    const props = { onWin: () => win(current.id), onLose: () => setResult("lose") };
    return (
      <div className="arcade">
        <div className="arcade-bar">
          <button type="button" className="xp-ghost" onClick={() => setPlaying(null)}>
            <ArrowLeft size={16} /> Máquinas
          </button>
          <span>
            Premio: <b>${current.prize}</b>
          </span>
          {result === "lose" && (
            <button type="button" className="pj-cta" onClick={() => start(current.id)}>
              <RotateCcw size={16} /> Reintentar
            </button>
          )}
        </div>
        {current.id === "bloques" && <Blocks key={round} {...props} />}
        {current.id === "calaverita" && <Maze key={round} {...props} />}
        {current.id === "cohetes" && <Rockets key={round} {...props} />}
      </div>
    );
  }

  // Selección de máquina
  return (
    <div className="arcade">
      <span className="game-pick-kicker">Encontraste el arcade secreto</span>
      <h3>Gana un bono para tu proyecto</h3>
      <p className="arcade-intro">Elige una máquina y supera su nivel. Solo puedes ganar un bono, así que elige bien.</p>
      {bonus && (
        <p className="arcade-has">
          Ya ganaste <b>${bonus.prize}</b> con el código <b>{bonus.code}</b>.{" "}
          <button type="button" onClick={() => { setResult("win"); setRepeat(true); }}>
            Ver mi bono
          </button>
        </p>
      )}
      <div className="cabinets">
        {games.map((game) => (
          <button key={game.id} type="button" className="cabinet" style={{ ["--c" as string]: game.color }} onClick={() => start(game.id)}>
            <span className="cabinet-screen">
              <b>{game.name}</b>
            </span>
            <span className="cabinet-prize">${game.prize}</span>
            <small>{game.text}</small>
            <span className="cabinet-level">Dificultad: {game.level}</span>
            <span className="cabinet-play">Jugar</span>
          </button>
        ))}
      </div>
      <button type="button" className="arcade-exit" onClick={onExit}>
        Salir del arcade
      </button>
    </div>
  );
}
