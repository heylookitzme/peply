# TODOS.md - Peply

Last updated: 2026-04-12

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
- [ ] Set up GitHub Actions CI pipeline (lint, typecheck, test, build)
- [ ] Connect Vercel for preview deployments
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

### Remaining

- [x] Fix lint error: `page.tsx:14` — use `<Link>` instead of `<a>` for internal navigation (v0.1.1.0)
- [ ] Add component tests for `CalculatorForm` (input behavior, validation, error states)
- [ ] Add component tests for `CalculatorResults` (rendering all output fields)
- [ ] Add component tests for `CalculatorWarnings` (severity styles, empty state)
- [ ] Add E2E test: calculator happy path (fill form, submit, verify results)
- [ ] Add E2E test: calculator edge cases (zero inputs, overflow, tiny doses)
- [ ] Add E2E test: mobile viewport behavior (375px)
- [x] Run `/review` on calculator implementation (v0.1.1.0)
- [x] Run `/qa` against calculator UI (v0.1.1.0)
- [ ] Achieve 80%+ coverage on `src/lib/` and `src/components/`

## Sprint 2 — Curated Content Layer

- [ ] Create `src/content/compounds/` directory with TypeScript data modules
- [ ] Add compound data: Semaglutide (GLP-1, approved)
- [ ] Add compound data: Tirzepatide (dual-agonist, approved)
- [ ] Add compound data: Retatrutide (triple-agonist, investigational)
- [ ] Add compound data: Tesamorelin (growth-hormone, approved)
- [ ] Add protocol records with dose-escalation steps for each compound
- [ ] Add citations with `lastReviewedAt` for every protocol
- [ ] Build `src/lib/content/` loader functions (getCompound, getProtocol, listCompounds)
- [ ] Build `src/components/compounds/` (CompoundCard, ProtocolViewer, CitationDisplay)
- [ ] Build `/compounds/[slug]` dynamic route with compound detail pages
- [ ] Add compound selector to calculator (optional pre-fill from compound mode)
- [ ] Write unit tests for content loaders
- [ ] Write component tests for compound/protocol UI
- [ ] Add E2E test: compound detail page flow
- [ ] Add E2E test: compound selector -> calculator pre-fill
- [ ] Run `/review` on content layer
- [ ] Run `/qa` on compound pages
- [ ] Write `COMPOUNDS.md` documenting the curated set and citation sources

## Sprint 3 — Design System and Polish

- [ ] Run `/design-consultation` to establish visual direction
- [ ] Create `DESIGN.md` with design system rules
- [ ] Build shared UI components (`src/components/ui/`)
- [ ] Responsive polish pass: 375px, 768px, 1440px
- [ ] Accessibility audit (keyboard navigation, ARIA labels, contrast)
- [ ] Add disclaimer page (`/disclaimer`)
- [ ] Add SEO metadata for all pages
- [ ] Run `/design-review` on final UI
- [ ] Run `/benchmark` for performance baseline

## Sprint 4 — Launch Prep

- [ ] Run `/cso` security audit
- [ ] Run `/qa` full-site sweep
- [ ] Performance pass: Lighthouse 90+ on all categories
- [ ] FCP < 1.5s, TTI < 3s, CLS < 0.1
- [ ] PWA assessment (installable shell if it fits cleanly)
- [ ] Final disclaimer copy review
- [ ] Run `/document-release`
- [ ] Run `/ship` for launch PR
- [ ] Run `/land-and-deploy` after approval

## Sprint 5 — Future Expansion (Deferred)

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
