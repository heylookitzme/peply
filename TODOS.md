# TODOS.md - Peply

Last updated: 2026-04-13

---

## Sprint 0 — Project Setup

- [x] Scaffold Next.js 15 app with App Router
- [x] Configure TypeScript strict mode
- [x] Configure Tailwind CSS
- [x] Configure Vitest + React Testing Library
- [x] Configure Playwright (config only, no tests yet)
- [x] Configure ESLint
- [x] Configure path aliases (`@/` -> `src/`)
- [x] Define calculator types (`CalculatorInput`, `CalculatorResult`, `CalculatorWarning`)
- [x] Define content types (`Compound`, `Protocol`, `ProtocolStep`, `Citation`)
- [x] Define Zod validation schemas for calculator input
- [x] Define Zod validation schemas for content models
- [x] Write CLAUDE.md (project operating contract)
- [x] Write ARCHITECTURE.md (system design)
- [x] Write product brief (`peply-product-brief-tightened.md`)
- [x] Write build-ready notes (`BUILD-READY-NOTES.md`)
- [x] Initialize git repository and push to GitHub (v0.1.0)
- [x] Add `.env.example` (v0.1.1.0)
- [x] Set up Husky + lint-staged pre-commit hooks (v0.1.0)
- [x] Install `@vitest/coverage-v8` for coverage reporting (v0.1.1.0)
- [x] Set up GitHub Actions CI pipeline (lint, typecheck, test, build) (v0.1.3.1)
- [x] Connect Vercel for preview deployments (v0.1.3.1, peply-nine.vercel.app)
- [x] Rename all references to Peply (v0.1.1.0)

## Sprint 1 — Calculator MVP

### Done

- [x] Implement `convertDoseUnit.ts` (mg/mcg conversion)
- [x] Implement `calculateConcentration.ts` (vialAmount / diluentVolume)
- [x] Implement `calculateDrawVolume.ts` (targetDose / concentration)
- [x] Implement `calculateSyringeUnits.ts` (mL to syringe units)
- [x] Implement `evaluateWarnings.ts` (LOW_DRAW_VOLUME, SYRINGE_OVERFLOW, ROUNDING_RISK, DILUTION_AWKWARD)
- [x] Implement `formatResult.ts` (display formatting for mL, units, concentration, dose)
- [x] Implement `calculate.ts` (full pipeline: validate -> concentrate -> draw -> units -> warnings)
- [x] Build `CalculatorForm.tsx` (client component with all inputs)
- [x] Build `CalculatorResults.tsx` (concentration, draw volume, syringe units display + exact values)
- [x] Build `CalculatorWarnings.tsx` (severity-coded warning cards)
- [x] Build `/calculator` page with metadata
- [x] Build landing page (`/`) with product description and feature cards
- [x] Build root layout with header, nav, footer, and disclaimer
- [x] Write unit tests for `convertDoseUnit` (8 tests)
- [x] Write unit tests for `calculateConcentration` (8 tests)
- [x] Write unit tests for `calculateDrawVolume` (10 tests)
- [x] Write unit tests for `calculateSyringeUnits` (10 tests)
- [x] Write unit tests for `evaluateWarnings` (15 tests)
- [x] Write unit tests for `formatResult` (8 tests)
- [x] Write integration tests for `calculate` pipeline (10 tests)
- [x] Fix lint error: `page.tsx:14` — use `<Link>` instead of `<a>` for internal navigation (v0.1.1.0)
- [x] Run `/review` on calculator implementation (v0.1.1.0)
- [x] Run `/qa` against calculator UI (v0.1.1.0)

### Remaining

- [ ] Add component tests for `CalculatorForm` (input behavior, validation, error states)
- [ ] Add component tests for `CalculatorResults` (rendering all output fields)
- [ ] Add component tests for `CalculatorWarnings` (severity styles, empty state)
- [ ] Add E2E test: calculator happy path (fill form, submit, verify results)
- [ ] Add E2E test: calculator edge cases (zero inputs, overflow, tiny doses)
- [ ] Add E2E test: mobile viewport behavior (375px)
- [ ] Achieve 80%+ coverage on `src/lib/` and `src/components/`

## Sprint 2 — Curated Content Layer

### Done

- [x] Create compound data directory (`src/lib/constants/compounds/`) with TypeScript data modules (v0.1.3.0)
- [x] Add compound data: Semaglutide (GLP-1, approved) (v0.1.3.0)
- [x] Add compound data: Tirzepatide (dual-agonist, approved) (v0.1.3.0)
- [x] Add compound data: Retatrutide (triple-agonist, investigational) (v0.1.3.0)
- [x] Add compound data: Tesamorelin (growth-hormone, approved) (v0.1.3.0)
- [x] Add protocol records with dose-escalation/titration steps for each compound (v0.1.3.0)
- [x] Add citations with `lastReviewedAt` for every protocol (v0.1.3.0)
- [x] Build compound list page (`/compounds`) with cards, badges, dose ranges (v0.1.3.0)
- [x] Build `/compounds/[slug]` dynamic route with compound detail pages (v0.1.3.0)
- [x] Add compound selector to calculator (auto-populates vial size, BAC water, dose hint) (v0.1.3.0)
- [x] Build `CompoundFilters.tsx` with category filter pills (v0.2.0.0)
- [x] Write compound data integrity tests (v0.1.3.0)
- [x] Fix single-dose display (`formatDoseRange` utility) (v0.1.3.2)

### Remaining

- [ ] Add component tests for compound/protocol UI
- [ ] Add E2E test: compound detail page flow
- [ ] Add E2E test: compound selector -> calculator pre-fill
- [ ] Write `COMPOUNDS.md` documenting the curated set and citation sources

## Sprint 3 — Design System and Polish

### Done

- [x] Create `DESIGN.md` with design system rules (v0.1.2.0)
- [x] Build shared UI components (`src/components/ui/`) — 8 primitives: Button, Card, Input, Badge, Warning, SectionHeader, DataDisplay, ThemeToggle (v0.1.2.0)
- [x] Add Instrument Serif + DM Sans font stack (v0.1.2.0)
- [x] Dark mode as primary theme with localStorage-persisted toggle (v0.1.2.0)
- [x] CSS custom properties for all design tokens integrated with Tailwind (v0.1.2.0)
- [x] Redesign landing page, calculator page, and root layout (v0.1.2.0)

### Remaining

- [ ] Responsive polish pass: 375px, 768px, 1440px
- [ ] Accessibility audit (keyboard navigation, ARIA labels, contrast)
- [ ] Add disclaimer page (`/disclaimer`) — directory exists but no implementation
- [ ] Add SEO metadata for all pages
- [ ] Run `/design-review` on final UI
- [ ] Run `/benchmark` for performance baseline

## Sprint 4 — Compound Expansion + Stacks

### Done

- [x] Expand to 21 compounds across 8 categories (v0.2.0.0, v0.3.0.0):
  - Growth & Recovery: BPC-157, TB-500, GHK-Cu, AOD-9604, Thymosin Alpha-1, IGF-1 LR3
  - GH Secretagogues: Ipamorelin, CJC-1295 (no DAC), CJC-1295 (with DAC)
  - Neuropeptides: Semax, Selank, DSIP
  - Longevity & Immune: Epitalon, MOTS-C, KPV, Kisspeptin-10
  - Metabolic: 5-Amino-1MQ
  - Original 4: Semaglutide, Tirzepatide, Retatrutide, Tesamorelin
- [x] FDA Category 2 regulatory tracker with badge colors (green/yellow/red/blue) (v0.2.0.0)
- [x] Regulatory status section on compound detail pages (v0.2.0.0)
- [x] Tooltips on regulatory status badges (v0.2.1.0)
- [x] Independent compound data audit with corrections (v0.2.1.0):
  - BPC-157 half-life, Kisspeptin-10 dose range, GHK-Cu default BAC water
  - Titration table mcg->mg dose unit conversion fix
  - Missing citation sourceUrls added to 7 compounds
- [x] Dosing evidence disclaimers on all 15 research compounds (v0.2.1.0)
- [x] COMPOUND_AUDIT.md with full verbatim data extraction (v0.2.1.0)
- [x] Stacks system with 5 curated combination protocols (v0.3.0.0):
  - Wolverine Stack (BPC-157 + TB-500, recovery)
  - Glow Stack (+ GHK-Cu, collagen/skin)
  - Klow Stack (+ KPV, anti-inflammatory)
  - GH/Muscle Growth Stack (CJC-1295 no DAC + Ipamorelin)
  - Metabolic/Fat-Loss Stack (Semaglutide + 5-Amino-1MQ)
- [x] `/stacks` list page with evidence level badges and compound chips (v0.3.0.0)
- [x] `/stacks/[slug]` detail pages with rationale, protocol, reconstitution reference, citations (v0.3.0.0)
- [x] 62 new tests across stacks and compound audit (v0.2.1.0, v0.3.0.0)

## Sprint 5 — Launch Prep

- [ ] Run `/cso` security audit
- [ ] Run `/qa` full-site sweep
- [ ] Performance pass: Lighthouse 90+ on all categories
- [ ] FCP < 1.5s, TTI < 3s, CLS < 0.1
- [ ] PWA assessment (installable shell if it fits cleanly)
- [ ] Final disclaimer copy review
- [ ] Run `/document-release`
- [ ] Run `/ship` for launch PR
- [ ] Run `/land-and-deploy` after approval

## Sprint 6 — Future Expansion (Deferred)

- [ ] Plan authenticated tracking as a separate product slice
- [ ] Evaluate Supabase for user-owned data
- [ ] User accounts and personal tracking
- [ ] Injection logging
- [ ] Custom compounds (calculator-only, separated from curated content)
- [ ] Offline calculator support (service worker)

---

## Blockers

1. ~~**No git repository on GitHub**~~ — Resolved (v0.1.0)
2. ~~**Rename pending**~~ — Resolved (fe6a31c)
3. ~~**No coverage tooling**~~ — Resolved (v0.1.1.0)

No active blockers.
