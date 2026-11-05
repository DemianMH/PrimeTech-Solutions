/**
 * Personajes originales en pixel art (16×24). Cada letra es un color de la paleta
 * y "." es transparente. El cuerpo es común y las piernas tienen dos cuadros para
 * la animación de caminar.
 */

export type CharacterId = "calaverita" | "catrina" | "xolo" | "duende";

export const SPRITE_W = 16;
export const SPRITE_H = 24;

type Sprite = {
  name: string;
  tagline: string;
  palette: Record<string, string>;
  body: string[];
  legs: [string[], string[]];
};

export const characters: Record<CharacterId, Sprite> = {
  calaverita: {
    name: "Calaverita",
    tagline: "Elegante, de traje y moño, con huesos de acero.",
    palette: {
      W: "#f4f1ea",
      w: "#c9c1ae",
      B: "#141018",
      P: "#ff4fa3",
      Y: "#ffb703",
      K: "#1f1b2e",
      k: "#3a3456",
      R: "#e11d48",
      G: "#facc15",
    },
    body: [
      ".....wWWWWw.....",
      "....WWWWWWWW....",
      "...WWWPWWPWWW...",
      "...WWPYPPYPWW...",
      "...WBBBWWBBBW...",
      "...WBPBWWBPBW...",
      "...WBBBwwBBBW...",
      "...wWWWBBWWWw...",
      "....wWBWBWBw....",
      ".....wWWWWw.....",
      "......wWWw......",
      "....KKKRRKKK....",
      "...KKkKRRKkKK...",
      "..KKkKWWWWKkKK..",
      "..KkKKwBBwKKkK..",
      ".wKKKKWWWWKKKKw.",
      ".WKkKKwBBwKKkKW.",
      ".W.KKKWWWWKKK.W.",
      "...KKKKGGKKKK...",
      "....KKKKKKKK....",
    ],
    legs: [
      ["....KKk..kKK....", "....KKk..kKK....", "....wWW..WWw....", "...WWWW..WWWW..."],
      ["...KKk....kKK...", "..KKk......kKK..", "..wWW......WWw..", ".WWWW......WWWW."],
    ],
  },
  catrina: {
    name: "Catrina",
    tagline: "Sombrero de rosas, collar de oro y vestido de gala.",
    palette: {
      M: "#2a1238",
      m: "#4c2266",
      R: "#ff3d6e",
      r: "#c0264d",
      Y: "#facc15",
      G: "#2f9e44",
      W: "#f4f1ea",
      w: "#c9c1ae",
      B: "#141018",
      P: "#7b2cbf",
      L: "#d00000",
      V: "#c2185b",
      v: "#86103f",
      F: "#f9c6dc",
      N: "#facc15",
    },
    body: [
      ".....mMMMMm.....",
      "...MMMMMMMMMM...",
      "..MMRrMYMMGRrMM.",
      "MMMMMMMMMMMMMMMM",
      "...mMMMMMMMMm...",
      "....WWWWWWWW....",
      "...WBBWWWWBBW...",
      "...WBPBWWBPBW...",
      "...WWBWwwWBWW...",
      "....WWWBBWWW....",
      "....WwLLLLwW....",
      ".....wWWWWw.....",
      "....FNFNNFNF....",
      "...VVFFFFFFVV...",
      "..WVVVVVVVVVVW..",
      "..WvVVVYYVVVvW..",
      "...vVVVVVVVVv...",
      "...VVVVVVVVVV...",
      "..VVvVVVVVVvVV..",
      ".VVVVvVVVVvVVVV.",
    ],
    legs: [
      [".VVVVVVVVVVVVVV.", "FFFFFFFFFFFFFFFF", "....WW....WW....", "...BBB....BBB..."],
      ["VVVVVVVVVVVVVVVV", "FFFFFFFFFFFFFFF.", "...WW......WW...", "..BBB......BBB.."],
    ],
  },
  xolo: {
    name: "Xolo",
    tagline: "Perrito xoloitzcuintle con collar naranja y placa dorada.",
    palette: {
      G: "#3a3540",
      g: "#57505f",
      d: "#24202a",
      E: "#ffe8a3",
      O: "#ff8c1a",
      N: "#0f0d12",
      T: "#facc15",
      P: "#ff6b8a",
    },
    body: [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "..........d..d..",
      "..........dd.dd.",
      ".........gGGGGd.",
      ".........GEGGGG.",
      ".........GGGGGGN",
      "..........GGGGP.",
      "g........OOTGG..",
      ".g.....gGGGGGG..",
      "..gGGGGGGGGGGG..",
      "..GGGgGGGGGGGd..",
      "..GGGGGGGGGGdd..",
      "..dGGGGGGGGGd...",
    ],
    legs: [
      ["..GG.G....G.GG..", "..GG.G....G.GG..", "..Gd.d....d.Gd..", "..NN.N....N.NN.."],
      ["..G.GG....GG.G..", ".G...G....G...G.", ".d....d..d....d.", "NN....NN.NN...NN"],
    ],
  },
  duende: {
    name: "Duende",
    tagline: "Ayudante navideño con gorro de cascabel y bufanda roja.",
    palette: {
      H: "#16a34a",
      h: "#0f6b33",
      Y: "#facc15",
      W: "#f8fafc",
      E: "#b45309",
      S: "#f2c29b",
      s: "#d99f78",
      B: "#141018",
      C: "#f87171",
      r: "#991b1b",
      R: "#dc2626",
      T: "#22c55e",
      t: "#15803d",
      K: "#1f1b2e",
      G: "#facc15",
      O: "#7c2d12",
    },
    body: [
      ".............Y..",
      "...........hHh..",
      ".........hHHH...",
      ".......hHHHHH...",
      ".....hHHHHHHh...",
      "....WWWWWWWWWW..",
      "...EESSSSSSSEE..",
      "..sSSBSSSSBSSSs.",
      ".sSSSBSSSSBSSSSs",
      "...SCSSSSSSCS...",
      "....SSSrrSSS....",
      ".....RRRRRR.....",
      "....RrRRRRrRR...",
      "...TTTRTTTTTT...",
      "..STTTRTTTTTTS..",
      "..sTtTTTTTTtTs..",
      "...KKKKGGKKKK...",
      "...TTTTTTTTTT...",
      "...TtTTTTTTtT...",
      "...tTtTtTtTtT...",
    ],
    legs: [
      ["....RW....WR....", "....WR....RW....", "...OOO....OOO...", "..OOOO...OOOO..."],
      ["...RW......WR...", "..WR........RW..", "..OOO......OOO..", ".OOOO......OOOO."],
    ],
  },
};

export const characterOrder: CharacterId[] = ["calaverita", "catrina", "xolo", "duende"];

export const isCharacter = (value: string | null): value is CharacterId => !!value && value in characters;

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
  const rows = [...sprite.body, ...sprite.legs[frame]];
  rows.forEach((row, r) => {
    for (let c = 0; c < SPRITE_W; c++) {
      const color = sprite.palette[row[c]];
      if (!color) continue;
      const col = flip ? SPRITE_W - 1 - c : c;
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x + col * scale), Math.round(y + r * scale), scale, scale);
    }
  });
}
