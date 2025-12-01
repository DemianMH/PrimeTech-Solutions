// src/components/ui/snow-effect.tsx
"use client";

import { useEffect, useState } from "react";

export const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Generar 50 copos
    setSnowflakes(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((i) => {
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 10; // Entre 5 y 15 segundos
        const animationDelay = Math.random() * 5;
        const fontSize = 10 + Math.random() * 20; // Tamaño variable

        return (
          <div
            key={i}
            className="snowflake absolute text-white/50"
            style={{
              left: `${left}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
              fontSize: `${fontSize}px`,
            }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
};