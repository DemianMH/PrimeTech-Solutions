/**
 * Personajes originales en pixel art (12×16). Cada letra es un color de la paleta
 * y "." es transparente. Hay dos cuadros por personaje para la animación de caminar.
 */

export type CharacterId = "calaverita" | "catrina" | "xolo" | "pirata";

type Sprite = { name: string; tagline: string; palette: Record<string, string>; frames: [string[], string[]] };

const pad = (rows: string[]) => rows.map((row) => row.padEnd(12, ".").slice(0, 12));

export const characters: Record<CharacterId, Sprite> = {
  calaverita: {
    name: "Calaverita",
    tagline: "El clásico: elegante y con huesos de acero.",
    palette: { W: "#f4f1ea", B: "#141018", P: "#ff4fa3", K: "#1f1b2e", Y: "#ffb703" },
    frames: [
      pad([
        "....WWWW....",
        "...WWWWWW...",
        "..WWWYWWWW..",
        "..WBBWWBBW..",
        "..WBPWWPBW..",
        "..WWWBBWWW..",
        "...WBWBWB...",
        "....WWWW....",
        "...KKKKKK...",
        "..KKWKKWKK..",
        "..KKKWWKKK..",
        "..WKKWWKKW..",
        "...KKWWKK...",
        "...KK..KK...",
        "...WW..WW...",
        "..WWW..WWW..",
      ]),
      pad([
        "....WWWW....",
        "...WWWWWW...",
        "..WWWYWWWW..",
        "..WBBWWBBW..",
        "..WBPWWPBW..",
        "..WWWBBWWW..",
        "...WBWBWB...",
        "....WWWW....",
        "...KKKKKK...",
        "..KKWKKWKK..",
        "..KKKWWKKK..",
        "..WKKWWKKW..",
        "...KKWWKK...",
        "..KK...KK...",
        ".WW.....WW..",
        "WWW.....WWW.",
      ]),
    ],
  },
  catrina: {
    name: "Catrina",
    tagline: "Sombrero de flores y paso firme.",
    palette: { M: "#3b1f4a", R: "#ff3d6e", Y: "#ffb703", W: "#f4f1ea", B: "#141018", P: "#7b2cbf", V: "#c2185b", L: "#d00000" },
    frames: [
      pad([
        "...MMMMMM...",
        ".MMMRMMYMMM.",
        "MMMMMMMMMMMM",
        "...WWWWWW...",
        "..WBBWWBBW..",
        "..WBPWWPBW..",
        "..WWWWWWWW..",
        "...WLLLLW...",
        "....WWWW....",
        "...VVVVVV...",
        "..VVVVVVVV..",
        "..WVVVVVVW..",
        "..VVVYVVVV..",
        ".VVVVVVVVVV.",
        ".VVVVVVVVVV.",
        "...WW..WW...",
      ]),
      pad([
        "...MMMMMM...",
        ".MMMRMMYMMM.",
        "MMMMMMMMMMMM",
        "...WWWWWW...",
        "..WBBWWBBW..",
        "..WBPWWPBW..",
        "..WWWWWWWW..",
        "...WLLLLW...",
        "....WWWW....",
        "...VVVVVV...",
        "..VVVVVVVV..",
        "..WVVVVVVW..",
        "..VVVYVVVV..",
        ".VVVVVVVVVV.",
        "VVVVVVVVVVVV",
        "..WW....WW..",
      ]),
    ],
  },
  xolo: {
    name: "Xolo",
    tagline: "Guía de las almas… y de tu portafolio.",
    palette: { G: "#3a3540", E: "#ffe8a3", O: "#ff8c1a", N: "#1b1720" },
    frames: [
      pad([
        "............",
        "............",
        "............",
        "............",
        "............",
        "..........G.",
        ".........GG.",
        "........GGG.",
        "........GEGG",
        "........GGGN",
        "GGGGGGGGOGG.",
        ".GGGGGGGGG..",
        ".GGGGGGGGG..",
        ".G.G....G.G.",
        ".G.G....G.G.",
        ".N.N....N.N.",
      ]),
      pad([
        "............",
        "............",
        "............",
        "............",
        "............",
        "..........G.",
        ".........GG.",
        "........GGG.",
        "........GEGG",
        "........GGGN",
        ".GGGGGGGOGG.",
        "GGGGGGGGGG..",
        ".GGGGGGGGG..",
        "..GG....GG..",
        ".G..G..G..G.",
        "N...N..N...N",
      ]),
    ],
  },
  pirata: {
    name: "Pirata",
    tagline: "Navega entre proyectos sin perder el rumbo.",
    palette: { R: "#d62828", S: "#e8b48a", B: "#141018", K: "#141018", W: "#f4f1ea", N: "#1d3557", Y: "#ffb703", H: "#5a3820" },
    frames: [
      pad([
        "...RRRRRR...",
        "..RRYRRRRR..",
        "..RSSSSSSRR.",
        "..SSBSSKKS..",
        "..SSSSSSSS..",
        "..SHHSSHHS..",
        "...SHHHHS...",
        "....SSSS....",
        "..WWRWWRWW..",
        ".SWRWWRWWRS.",
        ".SWWRWWRWWS.",
        "..WRWWRWWR..",
        "...NNNNNN...",
        "...NN..NN...",
        "...NN..NN...",
        "..HHH..HHH..",
      ]),
      pad([
        "...RRRRRR...",
        "..RRYRRRRR..",
        "..RSSSSSSRR.",
        "..SSBSSKKS..",
        "..SSSSSSSS..",
        "..SHHSSHHS..",
        "...SHHHHS...",
        "....SSSS....",
        "..WWRWWRWW..",
        ".SWRWWRWWRS.",
        ".SWWRWWRWWS.",
        "..WRWWRWWR..",
        "...NNNNNN...",
        "..NN...NN...",
        ".NN.....NN..",
        "HHH.....HHH.",
      ]),
    ],
  },
};

export const characterOrder: CharacterId[] = ["calaverita", "catrina", "xolo", "pirata"];

/** Dibuja un cuadro del personaje en el canvas, opcionalmente volteado. */
export function drawSprite(
  ctx: CanvasRenderingContext2D,
  id: CharacterId,
  frame: 0 | 1,
  x: number,
  y: number,
  scale: number,
  flip = false
) {
  const sprite = characters[id];
  const rows = sprite.frames[frame];
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const color = sprite.palette[row[c]];
      if (!color) continue;
      const col = flip ? row.length - 1 - c : c;
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x + col * scale), Math.round(y + r * scale), scale, scale);
    }
  });
}
