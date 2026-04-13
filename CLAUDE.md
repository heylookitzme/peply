# CLAUDE.md - Peply

## Purpose

This document is the operating contract for building, maintaining, and extending Peply (formerly Peply).

It defines:

- project scope
- product guardrails
- engineering standards
- workflow rules
- expectations for AI agents and human contributors

If this document conflicts with older planning notes, this document wins unless the owner explicitly approves a change.

## Project Identity

Peply is a public web application for peptide and injectable medication reconstitution calculations and a small citation-backed protocol reference layer.

Peply is:

- a neutral calculation tool
- a protocol reference product for a narrow curated set of compounds
- a public, mobile-first web app

Peply is not:

- a prescribing platform
- a medical advice product
- a vendor storefront
- a legal or regulatory authority
- a community platform

Owner: Wilbur Chu (@heylookitzme on GitHub)
Decision model: AI agents propose. Wilbur disposes. No code ships without explicit approval.

## Current Product Scope

### MVP

Build only the smallest credible public wedge:

- universal reconstitution calculator
- concentration, mL draw, and syringe unit outputs
- smart warnings for low-accuracy draws and syringe overflow
- a small curated compound set
- citation-backed protocol reference views for supported compounds
- clear disclaimers and neutral language

### Explicit Non-Goals For v1

Do not build these into the first release:

- user accounts
- personal tracking
- injection logs
- site rotation maps
- labs and charts
- side-effect journaling
- protocol timeline
- custom compounds
- cost calculator
- reorder reminders
- multi-compound stacking
- notifications
- forums or comments
- real-time regulatory tracker

## Product Principles

- The calculator is the product.
- Every non-arithmetic claim requires a citation.
- Manual calculator mode and curated protocol mode must remain distinct.
- If a fact is uncertain, present uncertainty explicitly.
- Do not imply physician supervision, legal clearance, or treatment endorsement.
- Do not widen scope silently during implementation.

## gstack

Use `/browse` from gstack for web browsing when external research is needed. Never use `mcp__claude-in-chrome__*` tools.

Available skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/retro`, `/investigate`, `/document-release`, `/codex`, `/cso`, `/autoplan`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`.

### Peply Sprint Process

Use the subset below for Peply.

### Vision And Planning

- `/office-hours` for wedge refinement before major feature work
- `/plan-ceo-review` to pressure-test scope and sequencing
- `/plan-eng-review` to lock architecture, data model, edge cases, and test plan before build

### Design

- `/design-consultation` once the MVP architecture is stable
- `/design-review` for major UI changes after a design direction exists

### Build And Review

- `/review` on every meaningful branch before merging
- `/investigate` for root-cause work when behavior is unclear
- `/careful` for work near migrations, destructive actions, or core calculation logic
- `/guard` for maximum safety around calculation engine changes

### QA And Security

- `/qa` before every ship
- `/cso` before any public launch or auth/security expansion

### Ship And Deploy

- `/ship` for final branch prep, testing, and PR flow
- `/land-and-deploy` after explicit approval
- `/document-release` after shipped behavior changes

### Recommended Phase Sequence

| Phase | gstack Skills Used | Deliverable |
|------|---------------------|-------------|
| 0 - Planning | `/office-hours` -> `/plan-ceo-review` -> `/plan-eng-review` | Locked wedge, architecture, test plan |
| 1 - Calculator Core | build -> `/review` -> `/qa` | Universal calculator, warnings, tests |
| 2 - Curated Content Layer | build -> `/review` -> `/qa` | Supported compounds, protocol viewer, citations |
| 3 - Polish And Launch Prep | `/benchmark` -> `/cso` -> `/qa` -> `/document-release` -> `/ship` | Perf, security, docs, launch readiness |
| 4 - Future Expansion | `/plan-eng-review` before new scope | Auth and tracking planning |

## Tech Stack

| Layer | Technology | Notes |
|------|------------|-------|
| Framework | Next.js 16 (App Router) | TypeScript strict mode enabled |
| Styling | Tailwind CSS | No external UI library by default |
| Deployment | Vercel | Preview deployments on PRs |
| Package Manager | pnpm | Preferred |
| Runtime | Node.js 20+ LTS | Use active LTS only |

### Deferred Technology

Supabase is deferred until authenticated or user-owned data features actually exist.

For the MVP, prefer:

- static or repository-backed compound content
- local content files for protocols and citations
- no auth dependency unless scope changes

## Code Standards

### TypeScript

- `strict: true` in `tsconfig.json` with no exceptions
- no `any`
- avoid unsafe assertions without checks
- no `@ts-ignore` or `@ts-expect-error` without a linked issue
- exported functions must declare parameter and return types
- prefer `as const` objects over enums

### React And Next.js

- server components by default
- use client components only when interactivity requires them
- do not use `useEffect` for data fetching
- keep components focused and reasonably small
- one component per file
- place custom hooks in `/hooks`, utilities in `/lib`, shared types in `/types`

### File Naming

- components: `PascalCase.tsx`
- hooks and utilities: `camelCase.ts`
- app routes: `kebab-case`
- types: `PascalCase.ts`

### Styling

- use Tailwind utility classes only
- no CSS modules or styled-components unless explicitly approved
- mobile-first responsive design
- layouts must work at 375px width
- do not hardcode color values when a token or variable is more appropriate

### Testing

- every new feature includes tests before merge
- unit tests: Vitest
- component tests: React Testing Library
- E2E tests: Playwright
- target at least 80 percent coverage on new code
- calculator math requires explicit edge-case test vectors

### Error Handling

- never swallow errors silently
- API responses must be typed and use correct status codes
- calculation errors must fail clearly and predictably
- unsupported states must be shown explicitly in the UI

## Content And Editorial Rules

These rules are mandatory because Peply includes health-adjacent reference content.

- every supported protocol must include at least one citation
- every displayed approval or investigational status must include a citation
- every citation record must include a `lastReviewedAt` value
- unsupported compounds must not display protocol recommendations
- protocol reference content must be visually distinct from raw calculator output
- do not use speculative regulatory language as if it were settled fact
- do not present future reclassification timelines as product truth

## Data Model Rules

- do not compress protocol data into one flat dose-range field
- separate `compound`, `protocol`, `protocol_step`, and `citation`
- keep calculation logic pure and isolated from UI code
- centralize unit conversions
- use explicit units rather than untyped numbers wherever practical

## Calculation Engine Rules

The dosing and reconstitution math is the core of Peply and must be extremely reliable.

- all calculation logic lives in `/lib/calculations/` as pure functions
- every function is unit tested, including zero, negative, divide-by-zero, and extreme inputs
- rounding rules must be defined centrally and tested
- warning rules must be deterministic and tested
- syringe warnings must cover:
  - too-small measurement ranges
  - syringe overflow
  - awkward dilution combinations when applicable
- the UI must always make the underlying math inspectable

## Git Workflow

### Branch Strategy

- `main` - production
- `develop` - integration branch if the project uses one
- `feature/*` - new features
- `fix/*` - bug fixes
- `chore/*` - tooling and config

### Commit Convention

Use Conventional Commits:

```text
feat(calculator): add syringe unit conversion
fix(protocols): correct semaglutide escalation steps
docs(scope): tighten MVP brief
test(calculations): add edge cases for low-volume draws
```

### PR Requirements

- title follows commit convention
- description explains what changed and why
- CI checks are green
- no stray logging, debug code, or commented-out code
- no TODO comments without a linked issue

## CI

Required checks on every PR:

1. lint
2. type check
3. unit tests with coverage
4. build
5. E2E tests

Pre-commit hooks via Husky and lint-staged are recommended once the repo is scaffolded.

## Deployment

- **Source of truth:** JAWC-HOLDINGS-LLC/inject-wise (GitHub, origin remote)
- **Vercel fork:** heylookitzme/peply (GitHub, vercel-fork remote)
- **Live URL:** https://peply-nine.vercel.app
- **Production branch:** main (auto-deploys on push to vercel-fork main)
- **Sync before deploying:** `git push vercel-fork main` after merging to main on origin
- **CI:** GitHub Actions on origin repo (lint, typecheck, test, build)

## Security And Secrets

- never commit secrets
- maintain `.env.example` with dummy values
- use Vercel environment variables for deployment secrets
- do not add auth or persistence infrastructure without a concrete scope need
- run `/cso` before public launch

## Performance Targets

- Lighthouse 90+ across Performance, Accessibility, Best Practices, and SEO
- First Contentful Paint under 1.5s on the landing and calculator experience
- Time to Interactive under 3s
- CLS under 0.1
- monitor bundle size and keep the calculator experience lean

### Offline Requirement

Offline support is desirable, but not at the cost of delaying the wedge.

For v1, this means:

- plan for PWA compatibility
- do not compromise calculator architecture with premature service-worker complexity
- ship true offline calculator support only if it fits cleanly in the delivery sequence

## AI Agent Guidelines

1. Read this file first at the start of every session.
2. Do not expand scope beyond the current product wedge without approval.
3. Do not delete files, functions, or tests without approval.
4. Do not refactor unrelated areas unless requested.
5. Explain tradeoffs when proposing architectural choices.
6. Keep calculation logic, content modeling, and UI concerns clearly separated.
7. Do not ship placeholder clinical or regulatory content.
8. Do not invent citations or source metadata.
9. Run relevant tests before proposing a commit.
10. If blocked after repeated attempts, stop and report the blocker clearly.

## Definition Of Done

A feature is complete only when all of the following are satisfied:

- code follows the standards in this document
- TypeScript compiles with zero errors
- new code meets the coverage target and tests pass
- lint and formatting checks pass
- mobile layout works at 375px, 768px, and 1440px
- warnings, empty states, and error states are handled
- non-arithmetic claims are citation-backed where applicable
- review feedback is addressed
- owner approval is received

## Documents Written After Planning

These documents should exist as the project matures:

- `ARCHITECTURE.md` - system design and implementation blueprint
- `DESIGN.md` - visual system and UI rules
- `COMPOUNDS.md` - curated compound reference and citations
- `TODOS.md` - active backlog and checkpoints

Write them when their contents are real. Do not create placeholder documents just to fill out structure.

## Design System

Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that does not match DESIGN.md.

Last updated: 2026-04-12
Owner: Wilbur Chu
