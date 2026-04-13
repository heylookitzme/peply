# ARCHITECTURE.md - Peply

Last updated: 2026-04-12

## Purpose

This document describes the **actual current architecture** of Peply (formerly Peply) as built. It reflects what exists in code today, not aspirational design. Planned-but-unbuilt features are noted in the "Not Yet Built" section.

## System Overview

Peply is a mostly-static Next.js application with a single interactive surface: the reconstitution calculator. All calculation logic is pure TypeScript with no framework dependencies. Content types and validation schemas are defined but no compound data exists yet.

### Current routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Static (Server Component) | Landing page with product description and feature cards |
| `/calculator` | Static shell + Client Component | Interactive reconstitution calculator |
| `/_not-found` | Static | Next.js 404 page |

## Tech Stack (Actual)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| Language | TypeScript (strict mode) | 5.9.3 |
| Runtime | React | 19.2.4 |
| Styling | Tailwind CSS | 4.2.2 |
| Validation | Zod | 4.3.6 |
| Unit testing | Vitest + React Testing Library | 4.1.2 |
| E2E testing | Playwright (configured, no tests) | 1.59.0 |
| Linting | ESLint + eslint-config-next | 9.39.4 |
| Fonts | Geist + Geist Mono (next/font/google) | — |
| Package manager | pnpm | 10.33.0 |
| Build | Turbopack | via Next.js 16 |

### Not installed / not connected

- Vercel (no deployment configured)
- Supabase (correctly deferred)
- GitHub Actions (no CI/CD)
- Husky / lint-staged (no pre-commit hooks)
- `@vitest/coverage-v8` (coverage reporting unavailable)

## Project Structure (Actual)

```
Peply/
├── src/
│   ├── app/
│   │   ├── globals.css              # Tailwind base + custom properties
│   │   ├── layout.tsx               # Root layout: header, nav, footer, disclaimer
│   │   ├── page.tsx                 # Landing page
│   │   └── calculator/
│   │       └── page.tsx             # Calculator page shell
│   ├── components/
│   │   └── calculator/
│   │       ├── CalculatorForm.tsx    # Client component: all inputs + calculate button
│   │       ├── CalculatorResults.tsx # Server-compatible: concentration, draw, units display
│   │       └── CalculatorWarnings.tsx# Server-compatible: severity-coded warning cards
│   ├── lib/
│   │   ├── calculations/            # Pure calculation engine (see below)
│   │   │   ├── calculate.ts         # Pipeline orchestrator
│   │   │   ├── calculateConcentration.ts
│   │   │   ├── calculateDrawVolume.ts
│   │   │   ├── calculateSyringeUnits.ts
│   │   │   ├── convertDoseUnit.ts
│   │   │   ├── evaluateWarnings.ts
│   │   │   ├── formatResult.ts
│   │   │   └── index.ts             # Public API barrel
│   │   └── validation/
│   │       ├── calculatorSchema.ts   # Zod schema for CalculatorInput
│   │       └── contentSchema.ts      # Zod schemas for Compound, Protocol, etc.
│   └── types/
│       ├── calculator.ts             # CalculatorInput, CalculatorResult, warnings, syringes
│       ├── content.ts                # Compound, Protocol, ProtocolStep, Citation
│       └── index.ts                  # Re-export barrel
├── tests/
│   ├── setup.ts                      # Test setup (minimal)
│   └── unit/                         # 7 test files, 69 tests
│       ├── calculate.test.ts
│       ├── calculateConcentration.test.ts
│       ├── calculateDrawVolume.test.ts
│       ├── calculateSyringeUnits.test.ts
│       ├── convertDoseUnit.test.ts
│       ├── evaluateWarnings.test.ts
│       └── formatResult.test.ts
├── public/                           # Default Next.js SVG assets
├── ARCHITECTURE.md                   # This file
├── CHANGELOG.md                      # Release history
├── CLAUDE.md                         # Project operating contract
├── STATUS.md                         # Project audit (2026-04-12)
├── TODOS.md                          # Sprint task backlog
├── BUILD-READY-NOTES.md              # Pre-build planning notes
├── peply-product-brief-tightened.md# Product brief
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── next.config.ts
└── pnpm-workspace.yaml
```

### Directories that do NOT exist yet

| Planned directory | Purpose | Sprint |
|-------------------|---------|--------|
| `src/content/compounds/` | Compound data files (TS modules) | Sprint 2 |
| `src/content/protocols/` | Protocol + step data | Sprint 2 |
| `src/content/citations/` | Citation records | Sprint 2 |
| `src/lib/content/` | Content loader functions | Sprint 2 |
| `src/components/compounds/` | CompoundCard, ProtocolViewer, CitationDisplay | Sprint 2 |
| `src/components/ui/` | Shared UI primitives | Sprint 3 |
| `src/app/compounds/[slug]/` | Compound detail pages | Sprint 2 |
| `tests/e2e/` | Playwright E2E tests | Sprint 1 (remaining) |

## Calculation Engine

The engine is the core of Peply. All functions are pure, framework-agnostic, and live in `src/lib/calculations/`.

### Pipeline

```
CalculatorInput
    │
    ▼
┌─────────────────────┐
│  Zod validation     │  calculatorInputSchema.parse(input)
│  (calculatorSchema) │  Rejects: negative, zero, invalid units
└─────────┬───────────┘
          │
          ▼
┌─────────────────────────┐
│  calculateConcentration  │  concentration = vialAmount / diluentVolumeMl
│                         │  Returns: { concentrationPerMl, unit (mg|mcg) }
└─────────┬───────────────┘
          │
          ▼
┌─────────────────────────┐
│  calculateDrawVolume     │  drawVolumeMl = targetDose / concentrationPerMl
│                         │  Auto-converts if targetDoseUnit ≠ concentrationUnit
│                         │  Uses: convertDoseUnit(value, from, to)
└─────────┬───────────────┘
          │
          ▼
┌─────────────────────────┐
│  calculateSyringeUnits   │  syringeUnits = drawVolumeMl × (totalUnits / totalMl)
│                         │  Syringe specs from SYRINGE_TYPES constant
└─────────┬───────────────┘
          │
          ▼
┌─────────────────────────┐
│  evaluateWarnings        │  Deterministic, code-driven warnings:
│                         │  - LOW_DRAW_VOLUME  (< 0.05 mL or < 5 syringe units)
│                         │  - SYRINGE_OVERFLOW (draw > syringe capacity)
│                         │  - ROUNDING_RISK    (> 10% loss when rounding to whole units)
│                         │  - DILUTION_AWKWARD (< 0.5 mL diluent)
└─────────┬───────────────┘
          │
          ▼
CalculatorResult
  { concentrationPerMl, concentrationUnit, drawVolumeMl, syringeUnits, warnings[] }
```

### Syringe types

| Key | Label | Total Units | Total mL | Units/mL |
|-----|-------|------------|----------|----------|
| `u100_1ml` | 1 mL (100 units) | 100 | 1.0 | 100 |
| `u50_0_5ml` | 0.5 mL (50 units) | 50 | 0.5 | 100 |
| `u30_0_3ml` | 0.3 mL (30 units) | 30 | 0.3 | 100 |

### Warning thresholds

| Warning | Threshold | Severity |
|---------|-----------|----------|
| LOW_DRAW_VOLUME | drawVolumeMl < 0.05 | warning |
| LOW_DRAW_VOLUME (units) | syringeUnits < 5 (but volume >= 0.05) | info |
| SYRINGE_OVERFLOW | drawVolumeMl > syringe totalMl | critical |
| ROUNDING_RISK | rounding loss > 10% | warning |
| DILUTION_AWKWARD | diluentVolumeMl < 0.5 | info |

### Rounding policy (implemented)

- **mL display:** 2 decimal places (`formatMl`)
- **Syringe units display:** rounded to whole numbers (`formatSyringeUnits`)
- **Concentration display:** 2 decimal places (`formatConcentration`)
- **Internal calculations:** full floating-point precision throughout pipeline, formatting applied only at display

### Unit conversion

- 1 mg = 1000 mcg
- `convertDoseUnit(value, fromUnit, toUnit)` handles bidirectional conversion
- `normalizeToMgInternal` and `normalizeToMcg` helpers for one-direction normalization
- Concentration preserves the unit of the vial amount (mg/mL or mcg/mL)

## Type System

### Calculator domain (`src/types/calculator.ts`)

```
DoseUnit = "mg" | "mcg"
VolumeUnit = "mL"
SyringeType = "u100_1ml" | "u50_0_5ml" | "u30_0_3ml"

CalculatorInput {
  vialAmount: number
  vialAmountUnit: DoseUnit
  diluentVolumeMl: number
  targetDose: number
  targetDoseUnit: DoseUnit
  syringeType: SyringeType
}

CalculatorResult {
  concentrationPerMl: number
  concentrationUnit: DoseUnit
  drawVolumeMl: number
  syringeUnits: number
  warnings: CalculatorWarning[]
}

CalculatorWarning {
  code: WarningCode
  severity: WarningSeverity
  message: string
  recommendation?: string
}
```

All constants use `as const` objects rather than enums, per project convention.

### Content domain (`src/types/content.ts`)

Types are defined and Zod schemas exist in `src/lib/validation/contentSchema.ts`, but **no data files have been created yet**. These types are ready for Sprint 2.

```
Compound { id, slug, name, aliases[], category, summary, mechanism?, defaultRoute?, approvalStatus }
Protocol { id, compoundId, name, protocolType, route, frequency, frequencyLabel, targetPopulation?, evidenceLevel, citationIds[] }
ProtocolStep { id, protocolId, order, dose, unit, durationWeeks?, notes? }
Citation { id, label, title, source, sourceUrl?, publishedAt?, lastReviewedAt }
```

## Component Architecture

### Rendering strategy

- **Server components** (default): `layout.tsx`, `page.tsx`, `calculator/page.tsx`, `CalculatorResults.tsx`, `CalculatorWarnings.tsx`
- **Client components** (`"use client"`): `CalculatorForm.tsx` only

The client boundary is narrow: only `CalculatorForm` needs client-side interactivity for form state and immediate recalculation. Results and warnings are passed as props from the form.

### Component tree

```
RootLayout (server)
├── Header + Nav
├── Main
│   ├── HomePage (server) — landing page at /
│   └── CalculatorPage (server) — at /calculator
│       └── CalculatorForm (client)
│           ├── CalculatorResults (via props)
│           └── CalculatorWarnings (via props)
└── Footer + Disclaimer
```

## Validation Strategy

- **Calculator input:** Validated at pipeline entry via Zod schema (`calculatorInputSchema`). Rejects non-positive numbers and invalid enum values. Additional guard clauses in individual functions for defense-in-depth.
- **Content models:** Zod schemas defined for Compound, Protocol, ProtocolStep, Citation. Will validate content files at build time once data exists.

## Testing Strategy (Current State)

| Layer | Framework | Status |
|-------|-----------|--------|
| Unit tests | Vitest | 7 files, 69 tests, all passing |
| Component tests | React Testing Library | Not written |
| E2E tests | Playwright | Configured, not written |
| Coverage | @vitest/coverage-v8 | Not installed |

Unit tests cover all calculation modules with edge cases (zero, negative, divide-by-zero, overflow, tiny values, unit cross-conversion).

## Open Architecture Decisions

These remain unresolved from the original ARCHITECTURE.md and should be addressed as work continues:

1. **Content file format:** TypeScript data modules vs JSON + validation. Leaning TS modules for type safety.
2. **Offline calculator support:** PWA-friendly architecture is in place (pure client-side calc), but no service worker exists.
3. **Disclaimer placement:** Footer disclaimer exists. Dedicated `/disclaimer` page planned but not built.
4. **Exact compound list:** Product brief specifies Semaglutide, Tirzepatide, Retatrutide, Tesamorelin. Final list needs owner confirmation.
