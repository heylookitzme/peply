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

function inlineFont(family, style, weight, relPath) {
  const b64 = readFileSync(resolve(root, relPath)).toString("base64");
  return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}

const fontFaceStyle = [
  inlineFont(
    "Instrument Serif",
    "normal",
    "400",
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
  ),
  inlineFont(
    "Instrument Serif",
    "italic",
    "400",
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
  ),
  inlineFont(
    "DM Sans",
    "normal",
    "400",
    "node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
  ),
].join("\n");

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

function xBannerSvg() {
  const W = 1500;
  const H = 500;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <style>${fontFaceStyle}</style>
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- Left block: wordmark + tagline -->
  <g>
    <text x="100" y="260"
          font-family="Instrument Serif, Georgia, serif"
          font-size="140"
          fill="${TEXT}">Peply</text>

    <!-- Thin terracotta rule, the one spot of colour -->
    <line x1="100" y1="298" x2="200" y2="298" stroke="${ACCENT}" stroke-width="2"/>

    <text x="100" y="348"
          font-family="DM Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="28"
          fill="#A1A1AA">Precise dosing. Every time.</text>
  </g>

  <!-- Right block: feature highlights, small and muted -->
  <g>
    <text x="${W - 100}" y="260"
          text-anchor="end"
          font-family="DM Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="22"
          letter-spacing="0.08em"
          fill="#A1A1AA">24 COMPOUNDS  ·  5 STACKS  ·  FDA TRACKER  ·  FREE</text>
    <text x="${W - 100}" y="298"
          text-anchor="end"
          font-family="DM Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="16"
          letter-spacing="0.12em"
          fill="${ACCENT}">PEPLY.BIO</text>
  </g>
</svg>`;
}

async function main() {
  console.log("Writing SVG sources…");
  const logo512 = logoSvg(512);
  const og = ogSvg();
  const banner = xBannerSvg();
  writeFileSync(resolve(iconsDir, "peply-logo.svg"), logo512);
  writeFileSync(resolve(publicDir, "og-default.svg"), og);

  mkdirSync(resolve(publicDir, "images"), { recursive: true });
  writeFileSync(resolve(publicDir, "images/x-banner.svg"), banner);

  console.log("Rasterizing PNGs…");
  await writePng(logo512, resolve(iconsDir, "icon-512.png"), 512);
  await writePng(logo512, resolve(iconsDir, "icon-192.png"), 192);
  await writePng(logo512, resolve(iconsDir, "apple-touch-icon.png"), 180);
  await writePng(logo512, resolve(iconsDir, "favicon.png"), 48);
  await writePng(og, resolve(publicDir, "og-default.png"), 1200);
  await writePng(banner, resolve(publicDir, "images/x-banner.png"), 1500);

  console.log("Done.");
}

await main();
