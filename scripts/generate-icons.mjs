#!/usr/bin/env node
/**
 * Renders the Peply brand SVGs and rasterizes them to PNG.
 *
 * Usage: node scripts/generate-icons.mjs
 *
 * Embeds the Instrument Serif font inline (base64) in the internal SVG used
 * for rasterization, so the resulting PNGs render the serif P exactly.
 * The SVG committed to public/icons/peply-logo.svg also embeds the font,
 * so it looks right when served directly (favicon, social previews that
 * use SVG, etc.).
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const iconsDir = resolve(root, "public/icons");
const publicDir = resolve(root, "public");
mkdirSync(iconsDir, { recursive: true });

const fontPath = resolve(
  root,
  "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
);
const fontBase64 = readFileSync(fontPath).toString("base64");
const fontFaceStyle = `
    @font-face {
      font-family: 'Instrument Serif';
      font-style: normal;
      font-weight: 400;
      src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
    }
  `.trim();

const BG = "#0C0C0C";
const ACCENT = "#C8572D";
const TEXT = "#F5F0EB";
const MUTED = "#9A9590";

function logoSvg(size = 512) {
  const radius = Math.round(size * 0.14);
  const fontSize = Math.round(size * 0.72);
  const baseline = Math.round(size * 0.74);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Peply">
  <style>${fontFaceStyle}</style>
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${BG}"/>
  <text x="50%" y="${baseline}" text-anchor="middle"
        font-family="Instrument Serif, Georgia, serif"
        font-size="${fontSize}"
        fill="${ACCENT}">P</text>
</svg>`;
}

function ogSvg() {
  const W = 1200;
  const H = 630;
  const iconSize = 120;
  const iconRadius = Math.round(iconSize * 0.14);
  const iconFontSize = Math.round(iconSize * 0.72);
  const iconBaseline = Math.round(iconSize * 0.74);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <style>${fontFaceStyle}</style>
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <!-- Hairline grid to evoke a calibrated instrument -->
  <rect x="80" y="80" width="${W - 160}" height="${H - 160}" fill="none" stroke="#2A2A2A" stroke-width="1"/>
  <!-- Logo icon, top-left -->
  <g transform="translate(96, 96)">
    <rect width="${iconSize}" height="${iconSize}" rx="${iconRadius}" ry="${iconRadius}" fill="${ACCENT}"/>
    <text x="${iconSize / 2}" y="${iconBaseline}" text-anchor="middle"
          font-family="Instrument Serif, Georgia, serif"
          font-size="${iconFontSize}"
          fill="${BG}">P</text>
  </g>
  <!-- Label -->
  <text x="240" y="168" font-family="Instrument Serif, Georgia, serif" font-size="28" fill="${MUTED}">Peply — peptide reference tool</text>
  <!-- Wordmark -->
  <text x="96" y="380" font-family="Instrument Serif, Georgia, serif" font-size="180" fill="${TEXT}">Peply</text>
  <!-- Tagline -->
  <text x="96" y="460" font-family="Instrument Serif, Georgia, serif" font-style="italic" font-size="46" fill="${ACCENT}">Precise dosing. Every time.</text>
  <!-- Meta row -->
  <text x="96" y="534" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="20" fill="${MUTED}">24 compounds · 5 stacks · Reconstitution calculator · peply.bio</text>
</svg>`;
}

async function writePng(svg, out, width) {
  await sharp(Buffer.from(svg), { density: 384 })
    .resize(width, null, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  wrote ${out}`);
}

async function main() {
  console.log("Writing SVG sources…");
  const logo512 = logoSvg(512);
  const og = ogSvg();
  writeFileSync(resolve(iconsDir, "peply-logo.svg"), logo512);
  writeFileSync(resolve(publicDir, "og-default.svg"), og);

  console.log("Rasterizing PNGs…");
  await writePng(logo512, resolve(iconsDir, "icon-512.png"), 512);
  await writePng(logo512, resolve(iconsDir, "icon-192.png"), 192);
  await writePng(logo512, resolve(iconsDir, "apple-touch-icon.png"), 180);
  await writePng(logo512, resolve(iconsDir, "favicon.png"), 48);
  await writePng(og, resolve(publicDir, "og-default.png"), 1200);

  console.log("Done.");
}

await main();
