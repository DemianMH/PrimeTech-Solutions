"use client";

import { useEffect } from "react";

/** Añade la clase `in` a cada `.reveal` cuando entra en pantalla (animaciones de entrada). */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
