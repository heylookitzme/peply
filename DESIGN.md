# Design System - Peply

## Product Context

- **What this is:** Peptide and injectable medication reconstitution calculator with curated compound protocols, injection tracking, and bloodwork dashboards
- **Who it's for:** Informed adults using or considering injectable peptides: biohackers, GLP-1 users, TRT/HRT patients, athletes
- **Space/industry:** Health-tech, peptide/injectable medication tools
- **Project type:** Public web app (mobile-first, calculator-centric)
- **Reference:** Function Health (functionhealth.com) for aesthetic direction

## Aesthetic Direction

- **Direction:** Luxury/Refined with Industrial undertones
- **Decoration level:** Intentional (thin 1px borders on cards, horizontal rules as section dividers, no drop shadows)
- **Mood:** "Precision instrument wrapped in warm leather." The calculator should feel like a beautiful analog gauge, not a spreadsheet. Authoritative but human. Trustworthy, elegant, not cold.
- **Reference sites:** functionhealth.com (warm earth tones, editorial serif headlines, generous whitespace)
- **Anti-patterns:** No generic gradients, no purple-on-white, no generic SaaS card grids, no centered-everything with uniform spacing, no decorative blobs

## Typography

- **Display/Hero:** Instrument Serif (italic for emphasis words, e.g. "Every *time*", "Reconstitution *Calculator*")
- **Body:** DM Sans (clean, slightly humanist, not sterile)
- **UI/Labels:** DM Sans at 13px, uppercase with 0.08em letter-spacing for section labels
- **Data/Tables:** Geist Mono (already loaded via next/font, supports tabular-nums, perfect for calculator outputs)
- **Code:** Geist Mono
- **Loading:** Google Fonts for Instrument Serif and DM Sans. Geist/Geist Mono via next/font/google (already configured).
- **Scale:**

| Token | Size | Usage |
|-------|------|-------|
| xs | 11px | Uppercase labels, badges, metadata |
| sm | 13px | Captions, form labels, secondary text |
| base | 14-15px | Body text, table cells, form inputs |
| md | 16px | Body paragraphs, feature card text |
| lg | 18px | Subheadings, hero body text |
| xl | 24px | Section headings |
| 2xl | 32px | Page titles (section-title) |
| 3xl | 36px | Compound names |
| 4xl | 48px | Display headings, type specimen |
| 5xl | 56px | Hero headline |
| 6xl | 64px | Maximum display size |

## Color

- **Approach:** Restrained. One warm accent + warm neutrals. Color is rare and meaningful, reserved for CTAs, key data, interactive elements, and semantic states.
- **Dark mode (primary):**

| Token | Hex | Usage |
|-------|-----|-------|
| background | #0C0C0C | Page background (near-black, warm undertone) |
| surface | #161616 | Cards, elevated elements, form inputs |
| surface-alt | #1E1E1E | Hover states, secondary surfaces |
| border | #2A2A2A | Card borders, dividers, input borders |
| text | #F5F0EB | Primary text (warm off-white, not pure white) |
| text-secondary | #9A9590 | Labels, captions, placeholders |
| accent | #C8572D | CTAs, active states, emphasis (terracotta/copper) |
| accent-hover | #D4673F | Hover state for accent elements |

- **Light mode:**

| Token | Hex | Usage |
|-------|-----|-------|
| background | #FAF8F5 | Page background (warm cream) |
| surface | #FFFFFF | Cards, elevated elements |
| surface-alt | #F0ECE7 | Hover states, secondary surfaces |
| border | #E8E4DF | Card borders, dividers |
| text | #1A1816 | Primary text |
| text-secondary | #6B6560 | Labels, captions |
| accent | #C8572D | Same terracotta in both modes |
| accent-hover | #D4673F | Same hover in both modes |

- **Semantic colors (both modes):**

| Token | Hex | Usage |
|-------|-----|-------|
| success | #3D8B5E | Approved status badges, positive indicators |
| warning | #C49A2A | Warning cards, caution states, rounding alerts |
| error | #C43D3D | Critical warnings, syringe overflow, error states |
| info | #4A7FB5 | Informational cards, info-severity warnings |

- **Semantic color treatment in dark mode:** Use 8% opacity background fill with 25% opacity border (e.g., `rgba(196, 154, 42, 0.08)` background, `rgba(196, 154, 42, 0.25)` border for warning).

## Spacing

- **Base unit:** 4px
- **Density:** Comfortable (generous whitespace, breathing room between elements)
- **Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | Hairline gaps |
| xs | 4px | Tight internal padding |
| sm | 8px | Compact element spacing |
| md | 12px | Form label to input gap |
| lg | 16px | Card internal padding (compact), grid gap (detail cells) |
| xl | 24px | Card padding, grid gaps, nav link spacing |
| 2xl | 32px | Section padding, footer padding, results card padding |
| 3xl | 48px | Section vertical spacing, hr margins |
| 4xl | 64px | Hero bottom padding, feature section top margin |
| 5xl | 96px | Hero top padding |

## Layout

- **Approach:** Grid-disciplined. Clean, predictable alignment. No creative overlap or asymmetry.
- **Grid:** Single column at mobile. 2-column form grid at sm (640px+). 3-column feature cards at sm+. Content stacks vertically on mobile.
- **Max content width:** 720px for readable content (calculator, compound details). 960px for wider layouts (feature cards, header).
- **Breakpoints:** 375px (mobile baseline), 640px (sm, form grid kicks in), 768px (md), 1024px (lg), 1280px (xl, max desktop), 1440px (2xl)
- **Border radius:**

| Token | Value | Usage |
|-------|-------|-------|
| sm | 6px | Theme toggle, small buttons |
| md | 8px | Form inputs, warning cards, detail cells, select dropdowns |
| lg | 10px | Cards, results card, feature cards |
| full | 9999px | Status badges (pill shape) |

## Component Patterns

### Buttons
- **Primary:** `background: accent`, `color: #fff`, `padding: 14px 32px`, `border-radius: 8px`, `font-weight: 500`. Hover: `accent-hover`. No gradients.
- **Ghost:** `border: 1px solid border`, `color: text`, `background: transparent`. Hover: `border-color: text-secondary`.
- **Full-width (calculator):** Same as primary but `width: 100%`.

### Cards
- `background: surface`, `border: 1px solid border`, `border-radius: 10px`, `padding: 24px-32px`. No box-shadow. Elevation is communicated through background color shift only.

### Form Inputs
- `background: surface`, `border: 1px solid border`, `border-radius: 8px`, `padding: 12px 14px`, `font-size: 15px`. Focus: `border-color: accent`. Placeholder: `text-secondary` at 50% opacity.

### Section Headers
- Pattern: Uppercase accent-colored label (11px, 0.1em tracking) above an Instrument Serif title with italic `<em>` for emphasis word.
- Example: `CALCULATOR` label above "Reconstitution *Calculator*" title.

### Status Badges
- Pill shape (`border-radius: 9999px`), `font-size: 12px`, uppercase, `letter-spacing: 0.05em`.
- Approved: `success` at 15% opacity bg, 30% opacity border.
- Investigational: `warning` at 15% opacity bg, 30% opacity border.
- Research: `info` at 15% opacity bg, 30% opacity border.

### Warning Cards
- Severity-coded with semantic colors. `border-radius: 8px`, `padding: 16px 20px`.
- Layout: severity label (bold, nowrap) + body with message and recommendation (lighter opacity).
- Background: semantic color at 8% opacity. Border: semantic color at 25% opacity. Text: full semantic color.

### Data Display (Calculator Results)
- Definition list layout (`dl > dt + dd`). Labels: uppercase, 11px, `text-secondary`. Values: Geist Mono, 28px, `font-weight: 500`.
- Units shown as inline span at 14px in `text-secondary`.

### Tables (Protocol Data)
- `border-collapse: collapse`. Header: 11px uppercase, `text-secondary`, bottom border. Cells: 14px, bottom border. Numeric cells: Geist Mono.

### Horizontal Rules
- `border-top: 1px solid border`. `margin: 48px 0`. Used as section dividers.

## Motion

- **Approach:** Minimal-functional. Motion aids comprehension, never decorates.
- **Easing:** Enter: `ease-out`. Exit: `ease-in`. Move: `ease-in-out`.
- **Duration:**
  - Micro (hover states, focus rings): 150ms
  - Short (content reveals, accordion toggle): 250ms
  - Medium (page transitions, modal entry): 400ms
- **Rules:** No bouncing. No spring physics. No scroll-driven animation. Transitions on `background`, `border-color`, `color`, and `opacity` only.

## Page Layout Guidelines

### Landing Page
- Hero: centered text, section-label above Instrument Serif headline, body text, primary + ghost CTAs. 96px top padding.
- Features: 2-column card grid at sm (640px+), 4-column at lg (1024px+) at 960px max width. Stacks to single column on mobile.
- Footer: centered disclaimer text, 1px top border.

### Calculator Page
- Page title with section-label pattern. 2-column form grid (stacks on mobile). Full-width calculate button. Results card below with 3-column dl grid. Warning cards below results.
- "Show exact values" as a `<details>` element with monospace values.

### Compound Detail Pages
- Compound name (Instrument Serif, 36px) with status badge inline. Summary paragraph. 2-column detail grid for metadata (Category, Route, Frequency, Evidence Level). Protocol table with monospace dose values.

### Injection Tracker (future)
- Body map visualization as the focal point. Injection log as a timeline/list below. Cards for recent injections with compound, site, dose, date.

### Bloodwork Dashboard (future)
- Trend charts with thin lines, minimal decoration. Metric cards with current value + delta. Geist Mono for all numeric data. Semantic colors for in-range/out-of-range.

## Dark Mode Implementation

- Dark mode is primary (`prefers-color-scheme: dark` and explicit toggle).
- Use CSS custom properties for all color tokens. Toggle by switching `data-theme` attribute on `<html>`.
- Reduce semantic color saturation by 10-20% in light mode if needed for contrast.
- Accent color (`#C8572D`) stays the same in both modes.
- Pure white (`#FFFFFF`) is never used for text in dark mode. Always use `#F5F0EB` (warm off-white).
- Pure black (`#000000`) is never used for backgrounds. Always use `#0C0C0C` (warm near-black).

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-12 | Initial design system created | Created by /design-consultation. Inspired by Function Health aesthetic. Dark-primary with terracotta accent for differentiation from cold blue health-tech products. |
| 2026-04-12 | Instrument Serif for display | Editorial authority. Differentiates from all-sans-serif peptide vendor sites. Italic emphasis for key words adds personality. |
| 2026-04-12 | Terracotta/copper accent (#C8572D) | Warm, earthy, distinctive. Every competitor uses teal or blue. Terracotta says "human" not "hospital." |
| 2026-04-12 | Dark-mode primary | Users do calculations at desks/counters, often on phones. Dark reduces eye strain and signals "precision instrument" over "brochure." |
| 2026-04-12 | Geist Mono for data | Already loaded via next/font. Tabular-nums support. Clean monospace that reads as "scientific" not "developer." |
