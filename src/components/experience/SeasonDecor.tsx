"use client";

import { useEffect } from "react";
import { useSeason } from "@/lib/useSeason";

const papelColors = ["#ff4fa3", "#ffb703", "#2ec4b6", "#a855f7", "#ff6b35", "#3b82f6"];
const bulbColors = ["#ef4444", "#facc15", "#22c55e", "#3b82f6", "#f97316", "#ec4899"];

/**
 * Decoración de temporada (Día de Muertos o Navidad). Marca el documento con la
 * clase de la temporada para los acentos de color y no pinta nada fuera de ella.
 */
export function SeasonDecor() {
  const season = useSeason();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("muertos", season === "muertos");
    root.classList.toggle("navidad", season === "navidad");
    return () => root.classList.remove("muertos", "navidad");
  }, [season]);

  if (season === "muertos") {
    return (
      <div className="papel" aria-hidden="true">
        <svg className="papel-row" viewBox="0 0 1200 70" preserveAspectRatio="none">
          <path d="M0 6 Q600 22 1200 6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          {Array.from({ length: 24 }, (_, i) => {
            const x = i * 50 + 4;
            const y = 6 + Math.sin((i / 23) * Math.PI) * 14;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <g className="papel-flag" style={{ animationDelay: `${(i % 6) * 0.25}s` }}>
                  <path d="M0 0H42V40L35 46L28 40L21 46L14 40L7 46L0 40Z" fill={papelColors[i % papelColors.length]} />
                  <circle cx="21" cy="14" r="5" fill="#0d0623" opacity="0.55" />
                  <path d="M8 26h26M12 32h18" stroke="#0d0623" strokeOpacity="0.45" strokeWidth="3" strokeDasharray="3 3" />
                </g>
              </g>
            );
          })}
        </svg>
        <div className="petals">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ left: `${(i * 7.3) % 100}%`, animationDelay: `${(i * 1.7) % 9}s`, animationDuration: `${9 + (i % 5) * 2}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (season === "navidad") {
    return (
      <div className="xmas" aria-hidden="true">
        <svg className="xmas-lights" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0 4 Q150 30 300 6 T600 6 T900 6 T1200 4" stroke="#1f3b2b" strokeWidth="3" fill="none" />
          {Array.from({ length: 30 }, (_, i) => {
            const x = 20 + i * 40;
            const t = (x % 300) / 300;
            const y = 6 + Math.sin(t * Math.PI) * 18 + 4;
            const color = bulbColors[i % bulbColors.length];
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <rect x="-3" y="-2" width="6" height="6" rx="1" fill="#1f3b2b" />
                <ellipse className="xmas-bulb" cx="0" cy="11" rx="5.5" ry="8" fill={color} style={{ color, animationDelay: `${(i % 6) * 0.35}s` }} />
              </g>
            );
          })}
        </svg>
        <div className="snow">
          {Array.from({ length: 40 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 2.53) % 100}%`,
                width: `${3 + (i % 4) * 1.5}px`,
                height: `${3 + (i % 4) * 1.5}px`,
                animationDelay: `${(i * 1.13) % 12}s`,
                animationDuration: `${10 + (i % 6) * 2.5}s`,
                opacity: 0.45 + (i % 5) * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
