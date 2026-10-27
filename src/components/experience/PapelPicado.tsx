"use client";

import { useEffect, useState } from "react";

/** Temporada de Día de Muertos: del 20 de octubre al 5 de noviembre. */
export function isMuertosSeason(date = new Date()) {
  const month = date.getMonth();
  const day = date.getDate();
  return (month === 9 && day >= 20) || (month === 10 && day <= 5);
}

const colors = ["#ff4fa3", "#ffb703", "#2ec4b6", "#a855f7", "#ff6b35", "#3b82f6"];

/**
 * Guirnalda de papel picado y pétalos de cempasúchil. Solo aparece en temporada
 * y marca el documento con `muertos` para los acentos de color.
 */
export function PapelPicado() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const active = isMuertosSeason();
    setOn(active);
    document.documentElement.classList.toggle("muertos", active);
    return () => document.documentElement.classList.remove("muertos");
  }, []);

  if (!on) return null;

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
              <path d="M0 0H42V40L35 46L28 40L21 46L14 40L7 46L0 40Z" fill={colors[i % colors.length]} />
              <circle cx="21" cy="14" r="5" fill="#0d0623" opacity="0.55" />
              <path d="M8 26h26M12 32h18" stroke="#0d0623" strokeOpacity="0.45" strokeWidth="3" strokeDasharray="3 3" />
              </g>
            </g>
          );
        })}
      </svg>
      <div className="petals">
        {Array.from({ length: 14 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 7.3) % 100}%`,
              animationDelay: `${(i * 1.7) % 9}s`,
              animationDuration: `${9 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
