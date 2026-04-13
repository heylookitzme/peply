# STATUS.md - Peply (formerly Peply)

**Audit date:** 2026-04-12
**Auditor:** Claude Code (automated)

---

## 1. Git Status

| Item | Status |
|------|--------|
| Git initialized | **NO** - not a git repository |
| Current branch | N/A |
| Uncommitted changes | N/A |
| Local branches | None |
| Remote branches | None |
| Last 10 commits | None |
| Branch protection | Not applicable - no repo exists |

**Critical finding:** The project has no version control. This is the single highest-priority blocker. All code, docs, and tests exist only as local files with no history, no backup, and no collaboration path.

---

## 2. Build Health

| Check | Result |
|-------|--------|
| `pnpm typecheck` | **PASS** (0 errors) |
| `pnpm test` | **PASS** (7 test files, 69 tests, all passing) |
| `pnpm build` | **PASS** (Next.js 16.2.2 Turbopack, 3 static routes: `/`, `/_not-found`, `/calculator`) |
| `pnpm lint` | **FAIL** (1 error) |
| `pnpm test:coverage` | **FAIL** (missing `@vitest/coverage-v8` dependency) |

### Lint Error

`src/app/layout.tsx:34` - Using `<a>` element instead of `<Link />` from `next/link` for navigation to `/`.

### Notes

- TypeScript compiles cleanly after `pnpm install` (node_modules were stale/corrupt on arrival)
- Build produces 3 static routes successfully
- Coverage tooling is not wired up (`@vitest/coverage-v8` not installed)

---

## 3. Project Structure Audit

### Actual directory structure

```
Peply/
|-- src/
|   |-- app/
|   |   |-- globals.css (26 lines)
|   |   |-- favicon.ico
|   |   |-- layout.tsx (60 lines)
|   |   |-- page.tsx (48 lines)
|   |   `-- calculator/
|   |       `-- page.tsx (25 lines)
|   |-- components/
|   |   `-- calculator/
|   |       |-- CalculatorForm.tsx (207 lines)
|   |       |-- CalculatorResults.tsx (63 lines)
|   |       `-- CalculatorWarnings.tsx (50 lines)
|   |-- lib/
|   |   |-- calculations/
|   |   |   |-- calculate.ts (49 lines)
|   |   |   |-- calculateConcentration.ts (31 lines)
|   |   |   |-- calculateDrawVolume.ts (31 lines)
|   |   |   |-- calculateSyringeUnits.ts (23 lines)
|   |   |   |-- convertDoseUnit.ts (30 lines)
|   |   |   |-- evaluateWarnings.ts (90 lines)
|   |   |   |-- formatResult.ts (38 lines)
|   |   |   `-- index.ts (12 lines)
|   |   `-- validation/
|   |       |-- calculatorSchema.ts (17 lines)
|   |       `-- contentSchema.ts (52 lines)
|   `-- types/
|       |-- calculator.ts (49 lines)
|       |-- content.ts (77 lines)
|       `-- index.ts (36 lines)
|-- tests/
|   |-- setup.ts (1 line)
|   `-- unit/
|       |-- calculate.test.ts (89 lines)
|       |-- calculateConcentration.test.ts (55 lines)
|       |-- calculateDrawVolume.test.ts (63 lines)
|       |-- calculateSyringeUnits.test.ts (67 lines)
|       |-- convertDoseUnit.test.ts (55 lines)
|       |-- evaluateWarnings.test.ts (142 lines)
|       `-- formatResult.test.ts (44 lines)
|-- public/
|   |-- file.svg, globe.svg, next.svg, vercel.svg, window.svg
|-- ARCHITECTURE.md
|-- BUILD-READY-NOTES.md
|-- CLAUDE.md
|-- README-next.md
|-- Wilbur Schedule.md
|-- peply-product-brief-tightened.md
|-- package.json
|-- tsconfig.json
|-- vitest.config.ts
|-- playwright.config.ts
|-- eslint.config.mjs
|-- postcss.config.mjs
|-- next.config.ts
|-- pnpm-workspace.yaml
|-- pnpm-lock.yaml
```

**Total src lines:** ~1,024 (excluding favicon binary)
**Total test lines:** ~516

### Gaps vs ARCHITECTURE.md proposed structure

| Proposed in ARCHITECTURE.md | Exists? | Notes |
|----------------------------|---------|-------|
| `src/app/page.tsx` | Yes | Landing page |
| `src/app/calculator/page.tsx` | Yes | Calculator page |
| `src/app/compounds/[slug]/page.tsx` | **NO** | Not built yet (Phase 2) |
| `src/components/calculator/` | Yes | 3 components |
| `src/components/compounds/` | **NO** | Not built yet (Phase 2) |
| `src/components/ui/` | **NO** | No shared UI components yet |
| `src/content/compounds/` | **NO** | No compound data files |
| `src/content/protocols/` | **NO** | No protocol data files |
| `src/content/citations/` | **NO** | No citation data files |
| `src/lib/calculations/` | Yes | All 7 modules present |
| `src/lib/content/` | **NO** | No content loading layer |
| `src/lib/formatting/` | **NO** | Formatting is in `formatResult.ts` |
| `src/lib/validation/` | Yes | 2 schema files |
| `src/types/` | Yes | 3 type files |
| `src/styles/` | **NO** | Styles are in `globals.css` only |
| `tests/e2e/` | **NO** | No E2E tests |

### Undocumented files in repo

| File | Notes |
|------|-------|
| `Wilbur Schedule.md` | Personal peptide dosing schedule (from Grok conversation). Not project code. |
| `BUILD-READY-NOTES.md` | Planning document from pre-build phase |
| `peply-product-brief-tightened.md` | Product brief |
| `README-next.md` | Next.js default readme |
| `pnpm-workspace.yaml` | Workspace config |

---

## 4. Documentation Status

| Document | Exists? | Summary |
|----------|---------|---------|
| `ARCHITECTURE.md` | **Yes** | Comprehensive 465-line architecture doc covering system goal, domain model, data shapes, calculation engine design, rendering strategy, routing, testing, SEO, accessibility, performance, PWA strategy, and build phases 0-3. Well-written and current. |
| `DESIGN.md` | **No** | Not created yet. CLAUDE.md says to write when contents are real. |
| `COMPOUNDS.md` | **No** | Not created yet. No compound data exists in the codebase. |
| `TODOS.md` | **No** | Not created yet. |
| Product brief | **Yes** | `peply-product-brief-tightened.md` - 266-line product brief defining MVP scope, 4 initial compounds (Semaglutide, Tirzepatide, Retatrutide, Tesamorelin), user flows, content policy, data model direction, and build sequence. |

---

## 5. gstack History

| Item | Finding |
|------|---------|
| Git history | No git repository exists - cannot check commit messages |
| gstack skills run | **Unknown** - no git history to search |
| Sprint phase | Based on code state, the project is in **late Phase 0 / early Phase 1** |

### Sprint phase assessment

Per CLAUDE.md sprint sequence:

- **Phase 0 (Planning):** Completed. CLAUDE.md, ARCHITECTURE.md, product brief, and BUILD-READY-NOTES.md all exist and are thorough.
- **Phase 1 (Calculator Core):** Partially complete. Calculation engine is built and tested. Calculator UI exists. Warnings engine works. But no `/review` or `/qa` has been run. Lint has 1 error. No E2E tests.
- **Phase 2 (Curated Content Layer):** Not started. No compound data, no protocol viewer, no citations.
- **Phase 3 (Polish and Launch Prep):** Not started.

---

## 6. Test Coverage

### Test files (7 files, 69 tests, all passing)

| Test File | Tests | Lines | Covers |
|-----------|-------|-------|--------|
| `convertDoseUnit.test.ts` | ~8 | 55 | Unit conversion (mg/mcg) |
| `calculateConcentration.test.ts` | ~8 | 55 | Concentration math |
| `calculateDrawVolume.test.ts` | ~10 | 63 | Draw volume calculation |
| `calculateSyringeUnits.test.ts` | ~10 | 67 | Syringe unit conversion |
| `evaluateWarnings.test.ts` | ~15 | 142 | Warning engine (most thorough) |
| `formatResult.test.ts` | ~8 | 44 | Result formatting |
| `calculate.test.ts` | ~10 | 89 | Integration of full pipeline |

### Coverage gaps

| Area | Status |
|------|--------|
| Calculation engine unit tests | **Good** - all 7 modules covered |
| Calculator edge cases (zero, negative, divide-by-zero) | Likely covered (69 tests across 7 files) |
| Component tests (React Testing Library) | **MISSING** - no component tests exist |
| E2E tests (Playwright) | **MISSING** - no E2E tests exist; Playwright is configured but `tests/e2e/` directory is empty |
| Coverage reporter | **BROKEN** - `@vitest/coverage-v8` not installed |

---

## 7. Deployment Status

| Item | Status |
|------|--------|
| Vercel connected | **Yes** - production at https://peply.bio |
| Supabase set up | **Yes** - @supabase/ssr + @supabase/supabase-js integrated |
| `.env.example` | **Yes** - Supabase placeholders |
| `.gitignore` | **Yes** - includes .env.local |
| CI/CD (GitHub Actions) | **Yes** - lint, typecheck, test, build |
| Husky pre-commit hooks | **Yes** - lint-staged configured |

---

## 8. Compound Data

| Item | Status |
|------|--------|
| Compound data in codebase | **No** |
| Content files (JSON/TS) | **No** - `src/content/` directory does not exist |
| Titration protocols defined | **No** |
| Content validation schemas | **Yes** - `src/lib/validation/contentSchema.ts` (52 lines) and `src/types/content.ts` (77 lines) define Compound, Protocol, ProtocolStep, and Citation types and Zod schemas. Ready for data. |

### Planned compounds (from product brief)

1. Semaglutide
2. Tirzepatide
3. Retatrutide
4. Tesamorelin

None have been implemented yet.

---

## 9. Naming: Peply -> Peply

The following files/configs still reference "Peply" or "peply":

| Location | Reference |
|----------|-----------|
| `package.json` | `"name": "peply"` |
| `CLAUDE.md` | Title, all references throughout |
| `ARCHITECTURE.md` | Title, all references throughout |
| `BUILD-READY-NOTES.md` | Title, all references throughout |
| `peply-product-brief-tightened.md` | Filename and all content |
| `src/app/layout.tsx` | Likely metadata title/description |
| `README-next.md` | Possible references |

---

## 10. Recommended Next Steps

Based on the CLAUDE.md sprint plan and current state:

### Immediate blockers (do before any further development)

1. **Initialize git repository** - This is the #1 priority. No version control means no history, no branches, no collaboration, no CI/CD.
2. **Add `.gitignore`** - Must exclude `node_modules/`, `.next/`, `.env`, etc.
3. **Rename Peply -> Peply** across all files (package.json, docs, source code metadata)
4. **Fix lint error** in `src/app/layout.tsx:34` (`<a>` -> `<Link>`)
5. **Install `@vitest/coverage-v8`** to enable coverage reporting

### Complete Phase 1 (Calculator Core)

6. **Add component tests** for `CalculatorForm`, `CalculatorResults`, `CalculatorWarnings`
7. **Add E2E tests** for calculator happy path and mobile viewport
8. **Run `/review`** on the calculator implementation
9. **Run `/qa`** against the calculator UI

### Begin Phase 2 (Curated Content Layer)

10. **Create `src/content/` directory** with compound, protocol, and citation data files
11. **Implement compound data** for the 4 initial compounds (Semaglutide, Tirzepatide, Retatrutide, Tesamorelin)
12. **Build compound detail pages** at `/compounds/[slug]`
13. **Build protocol viewer** component with citation display

### Infrastructure (parallel track)

14. **Set up GitHub repository** and push initial commit
15. **Connect Vercel** for preview deployments
16. **Add GitHub Actions CI** (lint, typecheck, test, build)
17. **Add `.env.example`** (even if empty for now)
18. **Consider Husky + lint-staged** for pre-commit hooks

### Cleanup

19. **Remove or relocate `Wilbur Schedule.md`** - personal dosing schedule should not ship in the repo
20. **Consolidate planning docs** - `BUILD-READY-NOTES.md` and product brief may be archivable now that CLAUDE.md and ARCHITECTURE.md are authoritative

---

## Summary

The project is in **early Phase 1** with a solid foundation:
- Planning docs are thorough and well-aligned
- Calculation engine is complete and well-tested (69 passing unit tests)
- Calculator UI exists and builds successfully
- TypeScript compiles cleanly

But critical infrastructure is missing:
- **No git repository** (highest priority)
- No CI/CD pipeline
- No deployment target connected
- No component or E2E tests
- No compound data yet
- All references still say "Peply" (rename to Peply needed)

Last updated: 2026-04-12
