"use client";

import { useEffect } from "react";

/**
 * Añade la clase `in` a cada `.reveal` cuando entra en pantalla (animaciones de entrada).
 * También vigila los elementos que aparecen después (pestañas, cambio de vista) para
 * que ningún contenido se quede oculto.
 */
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
      { threshold: 0, rootMargin: "0px 0px 10% 0px" }
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll(".reveal:not(.in)").forEach((node) => observer.observe(node));
    watch(document);
    const mutations = new MutationObserver(() => watch(document));
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
  return null;
}
