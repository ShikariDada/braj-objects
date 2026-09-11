/**
 * Procedural concept artwork for the Braj Objects archive.
 *
 * These SVGs are AUTHOR placeholders — original geometric studies drawn in
 * code, not photographs of the manufactured product. Every usage is marked
 * provenance "render" until real sample photography replaces it.
 */

const PAPER = "#E7DFCC";
const PAPER_BRIGHT = "#F7F4EC";
const INK = "#181512";
const SAND = "#9B4435";
const SAND_DEEP = "#6E2F26";
const YAMUNA = "#183E3D";
const YAMUNA_SOFT = "#315452";
const BRASS = "#8A704B";
const BRASS_LIT = "#C99B5F";

function frame(inner: string): string {
  return (
    `<rect x="0" y="0" width="800" height="800" fill="${PAPER}"/>` +
    inner +
    `<rect x="34" y="34" width="732" height="732" fill="none" stroke="${INK}" stroke-opacity="0.45" stroke-width="2"/>`
  );
}

function obj001(): string {
  return frame(`
    <path d="M180,640 L180,400 Q180,278 400,218 Q620,278 620,400 L620,640"
      fill="none" stroke="${SAND_DEEP}" stroke-width="26"/>
    <path d="M250,640 L250,420 Q250,330 400,285 Q550,330 550,420 L550,640"
      fill="none" stroke="${SAND}" stroke-width="18"/>
    <path d="M315,640 L315,445 Q315,375 400,345 Q485,375 485,445 L485,640"
      fill="none" stroke="${INK}" stroke-width="8"/>
    <circle cx="400" cy="540" r="64" fill="${BRASS}" opacity="0.16"/>
    <rect x="368" y="560" width="64" height="14" fill="${BRASS}"/>
    <path d="M400,498 L417,533 L400,568 L383,533 Z" fill="${SAND}"/>
    <rect x="140" y="640" width="520" height="10" fill="${INK}"/>
    <rect x="180" y="660" width="440" height="10" fill="${INK}" opacity="0.55"/>
    <rect x="230" y="680" width="340" height="10" fill="${INK}" opacity="0.3"/>
  `);
}

function obj002(): string {
  const bands = [SAND_DEEP, SAND, INK, SAND_DEEP, SAND];
  let steps = "";
  bands.forEach((c, i) => {
    steps += `<rect x="0" y="${220 + i * 64}" width="800" height="60" fill="${c}"/>`;
  });
  return (
    `<rect x="0" y="0" width="800" height="800" fill="${PAPER}"/>` +
    `<circle cx="618" cy="118" r="42" fill="${SAND}"/>` +
    steps +
    `<rect x="0" y="540" width="800" height="260" fill="${YAMUNA}"/>` +
    [580, 622, 664, 706, 748].map((y, i) =>
      `<rect x="${60 + i * 37}" y="${y}" width="${180 - i * 12}" height="5" fill="${YAMUNA_SOFT}"/>` +
      `<rect x="${560 - i * 23}" y="${y + 16}" width="${120 + i * 18}" height="5" fill="${YAMUNA_SOFT}" opacity="0.7"/>`
    ).join("") +
    `<circle cx="400" cy="636" r="46" fill="${BRASS}" opacity="0.28"/>` +
    `<circle cx="400" cy="636" r="16" fill="${BRASS_LIT}"/>` +
    `<rect x="388" y="660" width="24" height="92" fill="${BRASS_LIT}" opacity="0.55"/>` +
    `<circle cx="248" cy="706" r="8" fill="${BRASS_LIT}" opacity="0.9"/>` +
    `<rect x="34" y="34" width="732" height="732" fill="none" stroke="${PAPER_BRIGHT}" stroke-opacity="0.5" stroke-width="2"/>`
  );
}

function obj003(): string {
  const tiers: Array<[number, string]> = [
    [300, SAND_DEEP], [252, SAND], [206, SAND_DEEP], [164, SAND], [126, SAND_DEEP],
  ];
  let tower = "";
  let y = 600;
  tiers.forEach(([w, c]) => {
    const x = 400 - w / 2;
    tower += `<path d="M${x + 12},${y} L${x},${y - 78} L${x + w},${y - 78} L${x + w - 12},${y} Z" fill="${c}"/>`;
    y -= 78;
  });
  return frame(`
    <circle cx="400" cy="360" r="158" fill="${SAND}" opacity="0.14"/>
    <rect x="120" y="596" width="560" height="26" fill="${INK}"/>
    <rect x="170" y="622" width="460" height="14" fill="${INK}" opacity="0.5"/>
    ${tower}
    <ellipse cx="400" cy="196" rx="72" ry="26" fill="${BRASS}"/>
    <rect x="394" y="120" width="12" height="52" fill="${SAND_DEEP}"/>
    <path d="M400,58 L430,122 L370,122 Z" fill="${SAND_DEEP}"/>
    <g opacity="0.85">
      <rect x="150" y="500" width="96" height="96" fill="${SAND}"/>
      <path d="M138,500 L198,448 L258,500 Z" fill="${SAND_DEEP}"/>
      <rect x="554" y="500" width="96" height="96" fill="${SAND}"/>
      <path d="M542,500 L602,448 L662,500 Z" fill="${SAND_DEEP}"/>
    </g>
  `);
}

function obj004(): string {
  return frame(`
    <circle cx="560" cy="180" r="70" fill="${SAND}"/>
    <path d="M212,168 q14,-14 28,0 q14,-14 28,0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M272,208 q11,-11 22,0 q11,-11 22,0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M0,470 Q150,378 320,440 T800,418 L800,800 L0,800 Z" fill="${YAMUNA_SOFT}"/>
    <path d="M0,545 Q200,470 420,522 T800,502 L800,800 L0,800 Z" fill="${YAMUNA}"/>
    <ellipse cx="400" cy="612" rx="262" ry="92" fill="none" stroke="${PAPER_BRIGHT}"
      stroke-width="9" stroke-dasharray="2 20" stroke-linecap="round"/>
    <rect x="0" y="724" width="800" height="76" fill="${INK}"/>
    ${[150, 300, 450, 560, 660].map((x, i) =>
      `<circle cx="${x}" cy="${752 + (i % 2) * 10}" r="7" fill="${PAPER_BRIGHT}" opacity="0.85"/>`
    ).join("")}
  `);
}

function obj005(): string {
  const pavilion = (flip: boolean, cols: string, dome: string, op: number) => `
    <g opacity="${op}">
      <rect x="250" y="${flip ? 452 : 288}" width="300" height="18" fill="${flip ? cols : INK}"/>
      ${[272, 348, 424, 500].map((x) =>
        `<rect x="${x}" y="${flip ? 348 : 200}" width="18" height="88" fill="${cols}"/>`
      ).join("")}
      <rect x="252" y="${flip ? 330 : 182}" width="296" height="20" fill="${cols}"/>
      <path d="M310,${flip ? 330 : 182} Q400,${flip ? 268 : 96} 490,${flip ? 330 : 182} Z" fill="${dome}"/>
      <rect x="394" y="${flip ? 246 : 96}" width="12" height="34" fill="${dome}"/>
      <circle cx="400" cy="${flip ? 240 : 90}" r="9" fill="${dome}"/>
    </g>`;
  return (
    `<rect x="0" y="0" width="800" height="800" fill="${PAPER}"/>` +
    pavilion(false, SAND_DEEP, SAND, 1) +
    `<rect x="0" y="392" width="800" height="10" fill="${INK}"/>` +
    `<rect x="0" y="402" width="800" height="398" fill="${YAMUNA}"/>` +
    pavilion(true, YAMUNA_SOFT, BRASS, 0.75) +
    [470, 560, 660, 740].map((y, i) =>
      `<rect x="${120 + i * 40}" y="${y}" width="240" height="5" fill="${YAMUNA_SOFT}"/>` +
      `<rect x="${440 - i * 30}" y="${y + 18}" width="200" height="5" fill="${YAMUNA_SOFT}" opacity="0.7"/>`
    ).join("") +
    `<rect x="34" y="34" width="732" height="732" fill="none" stroke="${INK}" stroke-opacity="0.45" stroke-width="2"/>`
  );
}

function obj006(): string {
  let ticks = "";
  let stations = "";
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const x1 = 400 + 288 * Math.cos(a), y1 = 400 + 288 * Math.sin(a);
    const x2 = 400 + 322 * Math.cos(a), y2 = 400 + 322 * Math.sin(a);
    ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${SAND_DEEP}" stroke-width="7"/>`;
    const sx = 400 + 218 * Math.cos(a), sy = 400 + 218 * Math.sin(a);
    const isMathura = i === 9;
    stations += isMathura
      ? `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="34" fill="${SAND_DEEP}" opacity="0.18"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="20" fill="${SAND_DEEP}"/>`
      : `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="10" fill="${SAND}"/>`;
  }
  return frame(`
    <circle cx="400" cy="400" r="305" fill="none" stroke="${INK}" stroke-width="3"/>
    <circle cx="400" cy="400" r="218" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="4 10"/>
    <circle cx="400" cy="400" r="138" fill="none" stroke="${INK}" stroke-width="2"/>
    ${ticks}${stations}
    <circle cx="400" cy="400" r="16" fill="${BRASS}"/>
    <circle cx="400" cy="400" r="5" fill="${INK}"/>
  `);
}

/** Abstract dusk plate for the place section — a study, not documentary. */
function brajDusk(): string {
  let lamps = "";
  const xs = [180, 420, 690, 980, 1290];
  xs.forEach((x, i) => {
    const y = 640 + (i % 2) * 36;
    lamps += `<circle cx="${x}" cy="${y}" r="30" fill="${BRASS}" opacity="0.25"/><circle cx="${x}" cy="${y}" r="9" fill="${BRASS_LIT}"/><rect x="${x - 5}" y="${y + 12}" width="10" height="${120 - (i % 2) * 30}" fill="${BRASS_LIT}" opacity="0.4"/>`;
  });
  return (
    `<rect x="0" y="0" width="1600" height="900" fill="#1B4442"/>` +
    `<circle cx="1230" cy="170" r="54" fill="${PAPER}" opacity="0.9"/>` +
    `<path d="M0,470 L90,470 L110,430 L150,430 L168,470 L330,470 L352,420 L380,420 L398,470 L700,470 L724,438 L760,438 L782,470 L1100,470 L1122,428 L1158,428 L1180,470 L1600,470 L1600,520 L0,520 Z" fill="${INK}" opacity="0.85"/>` +
    `<rect x="0" y="520" width="1600" height="380" fill="#0F2726"/>` +
    [560, 640, 730, 810].map((y, i) =>
      `<rect x="${80 + i * 120}" y="${y}" width="320" height="4" fill="${YAMUNA_SOFT}" opacity="0.8"/>`
    ).join("") + lamps
  );
}

export function artworkSvg(id: string): string | null {
  const body =
    id === "obj001" ? obj001() :
    id === "obj002" ? obj002() :
    id === "obj003" ? obj003() :
    id === "obj004" ? obj004() :
    id === "obj005" ? obj005() :
    id === "obj006" ? obj006() :
    id === "braj-dusk" ? brajDusk() : null;
  if (!body) return null;
  const vb = id === "braj-dusk" ? "0 0 1600 900" : "0 0 800 800";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img">${body}</svg>`;
}

export const ART_IDS = ["obj001", "obj002", "obj003", "obj004", "obj005", "obj006", "braj-dusk"];
