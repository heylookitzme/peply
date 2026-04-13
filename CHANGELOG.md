# CHANGELOG.md - Peply

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.1.3.2] - 2026-04-12

Production deployment and dose display fix.

### Fixed

- Fixed-dose compounds (Tesamorelin) now display "2 mg" instead of "2-2 mg" everywhere (compound list, detail page, calculator selector)

### Added

- `formatDoseRange` utility for consistent dose range display across all pages
- Vercel deployment documentation in CLAUDE.md (fork, live URL, sync instructions)

---

## [0.1.3.1] - 2026-04-12

Sprint 3.0 deployment and CI infrastructure.

### Added

- GitHub Actions CI pipeline (lint, typecheck, test with coverage, build)
- Vercel deployment connected (peply.vercel.app)
- CI triggers on push to main/develop and PRs against both branches

---

## [0.1.3.0] - 2026-04-12

Sprint 2.5 compound data layer. Four launch compounds with clinical data, titration protocols, and regulatory status.

### Added

- Compound data types: `Compound`, `TitrationProtocol`, `TitrationStep`, `RegulatoryStatus`, `DoseRange`, `VialSize`
- 4 compound data modules: Semaglutide, Tirzepatide, Retatrutide, Tesamorelin
- Compound list page (`/compounds`) with cards, badges, and dose ranges
- Compound detail pages (`/compounds/[slug]`) with About, Clinical Dosing, Titration Protocols (with calculated draw volumes), Vial Sizes, and Citations
- Compound selector in calculator that auto-populates vial size, BAC water volume, and shows clinical dose range hint
- Shared label constants for compound categories and approval statuses
- 36 new compound data integrity tests (105 total)

### Fixed

- Deduplicated `CATEGORY_LABELS` and `STATUS_LABELS` into shared `labels.ts` (review finding)
- Protocol table now uses `formatSyringeUnits` for consistent sub-unit display (review finding)

---

## [0.1.2.0] - 2026-04-12

Sprint 2 design system and UI overhaul. Complete visual redesign based on DESIGN.md.

### Added

- `DESIGN.md` with complete design system: color tokens, typography scale, spacing, component patterns
- 8 UI primitive components in `src/components/ui/`: Button, Card, Input, Badge, Warning, SectionHeader, DataDisplay, ThemeToggle
- Instrument Serif font for display headlines (editorial authority)
- DM Sans font for body text (clean, humanist)
- Dark mode as primary theme with localStorage-persisted light/dark toggle
- CSS custom properties for all design tokens integrated with Tailwind `@theme inline`
- Terracotta/copper accent color (#C8572D) across CTAs and emphasis elements

### Changed

- Landing page redesigned: serif hero headline, feature cards with subtle borders, horizontal rule dividers
- Calculator page redesigned: SectionHeader with italic emphasis, 2-column form grid, DataDisplay with 28px mono results, severity-coded warning cards
- Root layout updated: new font stack, theme toggle in header, design token-based styling throughout
- Project renamed from InjectWise to Peply across all 30 files (package.json, metadata, docs, source)

---

## [0.1.1.0] - 2026-04-12

Sprint 1 QA and review pass. First formal review and QA cycle on the calculator.

### Fixed

- Home page "Open Calculator" link now uses Next.js `<Link>` instead of raw `<a>` tag (eliminates full page reload)
- Geist font now renders correctly (removed `font-family: Arial` override in globals.css)
- Duplicate `formatMl` function in `evaluateWarnings.ts` replaced with import from `formatResult.ts`
- Unreachable fallback in `convertDoseUnit` now throws instead of silently returning unconverted value
- Sub-centiliter draw volumes now display `< 0.01 mL` instead of misleading `0.00 mL`
- Sub-unit syringe draws now display `< 1 units` instead of misleading `0 units`
- Zod validation errors now show human-readable messages instead of raw JSON objects

### Added

- `.env.example` placeholder for future environment variables
- `VERSION` file (4-digit format)

---

## [Unreleased]

### Added

- Project status audit (`STATUS.md`) with full health check across all systems
- Structured task backlog (`TODOS.md`) organized by sprint
- This changelog

### Changed

- Project renamed from Peply to Peply (rename pass pending across codebase)

---

## [0.1.0] - 2026-03-31

Initial scaffolding and calculator core implementation.

### Added

#### Project Setup
- Next.js 15 App Router scaffold with TypeScript strict mode
- Tailwind CSS styling (mobile-first)
- Vitest + React Testing Library test setup
- Playwright configuration (E2E config only, no tests written)
- ESLint configuration
- Zod v4 for runtime validation
- Path alias `@/` mapped to `src/`

#### Type System
- `CalculatorInput` / `CalculatorResult` / `CalculatorWarning` types with `as const` enums
- `Compound` / `Protocol` / `ProtocolStep` / `Citation` content types
- Zod schemas for calculator input validation
- Zod schemas for content model validation (ready for compound data)

#### Calculation Engine (`src/lib/calculations/`)
- `convertDoseUnit` — mg/mcg bidirectional conversion
- `calculateConcentration` — vial amount / diluent volume
- `calculateDrawVolume` — target dose / concentration with unit normalization
- `calculateSyringeUnits` — mL to syringe units for 3 syringe types (U-100 1mL, U-50 0.5mL, U-30 0.3mL)
- `evaluateWarnings` — deterministic warning engine (LOW_DRAW_VOLUME, SYRINGE_OVERFLOW, ROUNDING_RISK, DILUTION_AWKWARD)
- `formatResult` — display formatters for mL (2dp), syringe units (whole), concentration, dose
- `calculate` — full pipeline orchestrator (validate -> concentrate -> draw -> units -> warnings)

#### Calculator UI
- `CalculatorForm` — client component with all inputs (vial amount, diluent, target dose, syringe type)
- `CalculatorResults` — displays concentration, draw volume, syringe units with exact-value toggle
- `CalculatorWarnings` — severity-coded warning cards (critical/warning/info) with recommendations
- `/calculator` page with metadata
- Landing page (`/`) with product description and feature cards

#### Layout
- Root layout with Geist font family, header with nav, footer with disclaimer
- Dark mode support via Tailwind

#### Tests (69 tests, all passing)
- Unit tests for all 7 calculation modules
- Edge case coverage: zero/negative inputs, divide-by-zero, overflow, tiny doses, rounding

#### Documentation
- `CLAUDE.md` — project operating contract
- `ARCHITECTURE.md` — system design and build plan
- Product brief and build-ready notes

### Known Issues
- Lint error in `layout.tsx:34`: `<a>` tag used for internal navigation (should be `<Link>`)
- `@vitest/coverage-v8` not installed (coverage reporting unavailable)
- No `.gitignore` (added in subsequent commit)
- All references still say "Peply" (rename to Peply pending)
