# Peply - Tightened Product Brief

## One-Sentence Product

Peply is a public web app that helps users calculate peptide and injectable reconstitution math accurately and view a small set of citation-backed dosing protocols without vendor bias.

## Product Goal

Ship the fastest credible wedge:

- calculator-first
- mobile-first
- no-login
- citation-backed
- neutral in tone

The first release should win on trust, speed, and clarity, not breadth.

## Core Problem

Most existing peptide calculators are either:

- too rigid to handle real-world vial and dilution combinations
- too shallow to provide useful protocol context
- too commercially biased to feel trustworthy

Users need a tool that does three things well:

1. calculates the math correctly
2. explains the output clearly
3. shows supported protocol references with citations where available

## Non-Goals For v1

The first release will not include:

- user accounts
- personal tracking
- site rotation maps
- labs and charts
- side-effect journaling
- inventory or reorder reminders
- cost-per-dose tools
- custom compounds
- multi-compound stack planning
- real-time regulatory tracker
- notifications
- forums or community features

## MVP Scope

### Included

- Universal reconstitution calculator
- Inputs for vial strength, diluent volume, target dose, and syringe type
- Outputs for concentration, mL to draw, and syringe units
- Warnings for:
  - very small draw amounts
  - syringe capacity overflow
  - awkward dilution choices
- Supported compound selector for a small curated set
- Protocol reference view for supported compounds
- Citation display for every supported protocol or dose range
- Clear disclaimer and neutral language throughout

### Initial Supported Compounds

Start with a narrow editorial set:

- Semaglutide
- Tirzepatide
- Retatrutide
- Tesamorelin

Only add a fifth compound if sourcing and protocol presentation are clean enough to maintain the same trust standard.

## MVP User Flow

### Manual mode

User enters:

- vial amount
- total diluent added
- target dose
- syringe selection

Peply returns:

- concentration
- mL to draw
- syringe units to draw
- warnings if measurement is imprecise or exceeds device limits

### Supported compound mode

User selects a supported compound and sees:

- brief compound summary
- supported protocol options
- dose-escalation steps
- citations and last-reviewed date

The app still makes the math transparent and editable. Compound mode should not hide the underlying calculation inputs.

## Product Principles

- The calculator is the product, not a funnel into something else.
- Protocol content is editorial reference material, not medical advice.
- Every claim that is not pure arithmetic needs a citation.
- Manual mode and curated protocol mode must stay clearly separated.
- If a fact is uncertain, the UI should say so instead of smoothing over it.

## Content Policy

Peply will not:

- provide medical advice
- recommend sourcing or vendors
- host community discussion
- claim legal or regulatory authority

Peply may:

- present calculation outputs
- summarize published dosing protocols
- cite labels, trials, and other credible sources
- show approval or investigational status when citation-backed and date-stamped

## Regulatory Feature Position

Regulatory tracking is explicitly deferred from v1.

If added later, it must be treated as an editorial workflow problem rather than a UI feature. No regulatory status should appear in the product unless it has:

- a source citation
- a visible `last reviewed` date
- a defined owner for review
- language that avoids legal advice or speculative claims

## Data Model Direction

The first implementation should separate:

- compounds
- protocols
- protocol steps
- citations

Do not compress all protocol logic into one flat dose-range field.

### Suggested types

```ts
type CompoundCategory =
  | "glp1"
  | "dual-agonist"
  | "triple-agonist"
  | "growth-hormone"
  | "other";

interface Compound {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: CompoundCategory;
  summary: string;
  mechanism?: string;
  approvalStatus: "approved" | "investigational" | "research";
}

interface Protocol {
  id: string;
  compoundId: string;
  name: string;
  route: "subcutaneous" | "intramuscular" | "intranasal" | "other";
  frequencyLabel: string;
  evidenceLevel: "label" | "phase3" | "phase2" | "phase1" | "reference_only";
  citationIds: string[];
}

interface ProtocolStep {
  id: string;
  protocolId: string;
  order: number;
  dose: number;
  unit: "mg" | "mcg";
  durationWeeks?: number;
  notes?: string;
}

interface Citation {
  id: string;
  label: string;
  sourceUrl?: string;
  publishedAt?: string;
  lastReviewedAt: string;
}
```

## Technical Direction

- Next.js with TypeScript
- Tailwind CSS
- Vercel deployment
- PWA-friendly, with offline calculator support as a stretch within v1 only if it does not slow the wedge
- Static or repository-backed content for compounds, protocols, and citations before introducing admin tooling
- Supabase deferred until authenticated user features actually exist

This is important: Supabase should not be added on day one unless there is a concrete data requirement that cannot be handled more simply. The calculator and curated protocol layer can ship without auth infrastructure.

## Build Sequence

### Phase 1

- app scaffold
- calculation engine
- mobile-first calculator UI
- warning rules
- tests for edge cases and conversions

### Phase 2

- supported compounds content model
- protocol viewer
- citations and disclaimer system
- responsive and accessibility polish

### Phase 3

- optional offline support
- SEO pages for supported compounds
- analytics and iteration based on usage

### Phase 4

- plan authenticated tracking as a separate scope

## Success Criteria For v1

Peply v1 is successful if users can:

- compute any dilution and target dose quickly on mobile
- understand exactly how the result was produced
- trust the warnings
- browse a small set of supported, cited protocols

Peply v1 does not need to become a full protocol operating system.

## Open Decisions Before Build

1. Finalize the supported compound list.
2. Decide whether content ships from local files or a database in v1.
3. Define exact syringe presets and warning thresholds.
4. Write disclaimer copy.
5. Define citation source standards and review cadence.

## Summary

The wedge is not "all peptide tooling in one app."

The wedge is:

"the most trustworthy peptide reconstitution calculator on the web, with a small curated protocol layer."
