/**
 * Temporadas decorativas del sitio. Cambian solas según la fecha del visitante:
 * - Día de Muertos: 20 de octubre al 2 de noviembre.
 * - Navidad: 3 de noviembre al 6 de enero (Día de Reyes).
 * El resto del año el sitio se ve sin decoración de temporada.
 */
export type Season = "muertos" | "navidad" | "ninguna";

export function getSeason(date = new Date()): Season {
  const month = date.getMonth(); // 0 = enero
  const day = date.getDate();
  if ((month === 9 && day >= 20) || (month === 10 && day <= 2)) return "muertos";
  if ((month === 10 && day >= 3) || month === 11 || (month === 0 && day <= 6)) return "navidad";
  return "ninguna";
}

/** Textos que cambian con la temporada en el juego del portafolio. */
export const seasonCopy: Record<
  Season,
  { night: string; street: string; goal: (total: number) => string; done: string; doneTitle: (total: number) => string }
> = {
  muertos: {
    night: "Noche de Día de Muertos",
    street: "Calle de las Ofrendas",
    goal: (total) => `Visita los ${total} proyectos: cada uno enciende una vela en la ofrenda.`,
    done: "¡Ofrenda completa!",
    doneTitle: (total) => `Visitaste los ${total} proyectos.`,
  },
  navidad: {
    night: "Noche de Navidad",
    street: "Calle de los Regalos",
    goal: (total) => `Visita los ${total} proyectos: cada uno abre un regalo bajo el árbol.`,
    done: "¡Abriste todos los regalos!",
    doneTitle: (total) => `Visitaste los ${total} proyectos.`,
  },
  ninguna: {
    night: "Noche en PrimeTech",
    street: "Calle Principal",
    goal: (total) => `Visita los ${total} proyectos y enciende todas las luces de la calle.`,
    done: "¡Recorrido completo!",
    doneTitle: (total) => `Visitaste los ${total} proyectos.`,
  },
};
