"use client";

import { useEffect, useState } from "react";
import { getSeason, type Season } from "./season";

/**
 * Temporada según la fecha del visitante. Se calcula en el navegador para que una
 * página generada hace semanas no se quede con la temporada anterior.
 */
export function useSeason(): Season {
  const [season, setSeason] = useState<Season>("ninguna");
  useEffect(() => setSeason(getSeason()), []);
  return season;
}
