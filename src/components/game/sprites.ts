/**
 * Personajes originales en pixel art (16×24). Cada letra es un color de la paleta
 * y "." es transparente. El cuerpo es común y las piernas tienen dos cuadros para
 * la animación de caminar.
 */

export type CharacterId = "santa" | "duende" | "reno";

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
  santa: {
    name: "Santa",
    tagline: "Gorro con pompón, barba blanca y su traje rojo de siempre.",
    palette: {
      R: "#dc2626",
      r: "#991b1b",
      W: "#f8fafc",
      w: "#cbd5e1",
      S: "#f2c29b",
      s: "#d99f78",
      B: "#141018",
      C: "#f87171",
      K: "#1f1b2e",
      G: "#facc15",
    },
    body: [
      "...........WW...",
      "........rRRWW...",
      "......rRRRRr....",
      ".....rRRRRRRr...",
      "....WWWWWWWWWW..",
      "....wWWWWWWWWw..",
      "....SSBSSSSBSS..",
      "....SCSSssSSCS..",
      "...WWWSSSSSSWWW.",
      "...WWWWWssWWWWW.",
      "...WWWWwWWwWWWW.",
      "....WWWWWWWWWW..",
      ".....wWWWWWWw...",
      "...RRRRwWWwRRRR.",
      "..RRRRRRWWRRRRRR",
      ".KRRrRRRWWRRRrRK",
      ".KKRRRRRWWRRRRKK",
      "..KKKKKKGGKKKKK.",
      "..RRRRRRWWRRRRR.",
      "..rRRRRRWWRRRRr.",
    ],
    legs: [
      ["...RRR....RRR...", "...RRR....RRR...", "...KKK....KKK...", "..KKKK....KKKK.."],
      ["..RRR......RRR..", ".RRR........RRR.", ".KKK........KKK.", "KKKK........KKKK"],
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
  reno: {
    name: "Reno",
    tagline: "Cornamenta grande, collar con cascabel y patas veloces.",
    palette: {
      A: "#e7c9a0",
      a: "#b8946a",
      D: "#8b5a2b",
      d: "#5c3a1a",
      L: "#d6b48c",
      E: "#141018",
      N: "#1f1b2e",
      R: "#dc2626",
      G: "#facc15",
      H: "#2b1a10",
    },
    body: [
      "........a...a...",
      "........aA.aA...",
      ".........AaAa...",
      "..........AA....",
      "..........dDD...",
      ".........dDDDD..",
      ".........DEDDDD.",
      ".........DDDDDDN",
      "..........DDLL..",
      "..........RRGR..",
      ".........DDDDD..",
      "..d.....DDDDDD..",
      "..dDDDDDDDDDDD..",
      "..DDDDDDDDDDDD..",
      "..DDDLLLLLLDDD..",
      "..dDDLLLLLLDDd..",
      "...dDDDDDDDDd...",
      "...DD......DD...",
      "...DD......DD...",
      "...Dd......dD...",
    ],
    legs: [
      ["...Dd......dD...", "...dd......dd...", "...dd......dd...", "...HH......HH..."],
      ["..Dd........dD..", "..d..........d..", ".dd..........dd.", ".HH..........HH."],
    ],
  },
};

export const characterOrder: CharacterId[] = ["santa", "duende", "reno"];

export const isCharacter = (value: string | null): value is CharacterId =>
  !!value && Object.prototype.hasOwnProperty.call(characters, value);

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
