# InjectWise Build-Ready Notes

## Status

InjectWise is ready for planning and architecture work after the decisions in this document are adopted.

InjectWise is not ready for unrestricted implementation if the current scope still includes:

- real-time regulatory tracking without a verified source-of-record workflow
- broad compound coverage at launch
- personal tracking features in the MVP
- custom compounds in the first release
- inventory, reorder, and cost features in the first release

## Recommended MVP

The first public wedge should be a neutral, high-trust calculation product with a small curated protocol layer.

### Build now

- Universal reconstitution calculator
- Dose-to-draw conversion outputs in syringe units and mL
- Smart warnings for low-measurement accuracy and syringe capacity limits
- Small curated compound library for 3 to 5 compounds
- Protocol viewer for published dose-escalation schedules on supported compounds
- Public citations for every displayed protocol or dose range
- Mobile-first UI with no login required

### Defer

- User accounts
- Injection logging
- Site rotation maps
- Labs and charts
- Side-effect journal
- Protocol timeline
- Multi-compound stacks
- Export or PDF sharing
- Vial inventory and reorder logic
- Cost calculator
- Push or email notifications
- Regulatory watchlists
- User-entered custom compounds

## Product Positioning

InjectWise should present itself as:

- a calculator
- a protocol reference layer for a small curated set of compounds
- a neutral, citation-backed tool

InjectWise should not present itself as:

- a live legal-status authority
- a prescribing aid
- a sourcing directory
- a community platform

## Critical Product Decisions

### 1. Regulatory tracker is not MVP

The proposed regulatory tracker introduces the highest trust risk in the brief.

If a regulatory feature is added later, it must have:

- a defined source of record for every status field
- a manual editorial review step before publication
- a visible `last reviewed` date
- a citation attached to every status claim
- explicit uncertainty states such as `unverified`, `under review`, or `outdated`
- copy that avoids implying legal advice

Until then, remove language such as:

- "real-time dashboard"
- "single source of truth"
- speculative future reclassification timelines

### 2. Compound coverage must be narrow at launch

The current seed list is too broad and too heterogeneous for a first release.

Launch with a small set where the protocol logic is easy to explain and source:

- Semaglutide
- Tirzepatide
- Retatrutide
- Tesamorelin

Optional fifth compound only if sourcing and protocol presentation are clean.

Everything else should move to a later editorial backlog.

### 3. Custom compounds should be deferred

Custom compounds sound user-friendly but they create a content-moderation and trust problem immediately:

- users may treat app-generated math as protocol endorsement
- units and route assumptions become error-prone
- support burden rises before the core product is stable

If added later, custom compounds should be calculator-only and clearly separated from curated protocol content.

## Data Model Corrections

The current draft schema is not flexible enough for protocol, citation, and status complexity.

### Do not model protocol data as a single `clinicalDoseRange`

Replace one flat range with separate records:

- `compound`
- `protocol`
- `protocol_step`
- `citation`
- `regulatory_status`

### Minimum schema direction

```ts
interface Compound {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: CompoundCategory;
  summary: string;
  mechanism?: string;
  defaultRoute?: "subcutaneous" | "intramuscular" | "intranasal" | "other";
  approvalStatus: "approved" | "investigational" | "research";
}

interface Protocol {
  id: string;
  compoundId: string;
  name: string;
  protocolType: "label" | "trial" | "reference";
  route: "subcutaneous" | "intramuscular" | "intranasal" | "other";
  frequency: "daily" | "weekly" | "twice_weekly" | "other";
  targetPopulation?: string;
  evidenceLevel: "label" | "phase3" | "phase2" | "phase1" | "reference_only";
  citationIds: string[];
}

interface ProtocolStep {
  id: string;
  protocolId: string;
  stepOrder: number;
  dose: number;
  unit: "mg" | "mcg" | "units";
  durationWeeks?: number;
  notes?: string;
}

interface Citation {
  id: string;
  title: string;
  source: string;
  url?: string;
  publishedAt?: string;
  lastReviewedAt: string;
}

interface RegulatoryStatus {
  id: string;
  compoundId: string;
  jurisdiction: "US";
  statusType: "approval" | "compounding";
  statusValue: string;
  sourceCitationId: string;
  lastReviewedAt: string;
  confidence: "confirmed" | "needs_review";
}
```

## Compliance and Trust Requirements

These should be treated as build blockers for any public release.

- Every protocol must cite its source.
- Every regulatory statement must cite its source.
- Every citation must have a `lastReviewedAt` field.
- UI copy must separate calculation output from protocol reference content.
- The app must never imply physician supervision where none exists.
- The app must never imply legal clearance from a speculative or secondary source.
- Unsupported compounds must not display protocol recommendations.

## UX Rules For MVP

- Calculator must work without login.
- The fastest path to result should be under 30 seconds on mobile.
- Manual mode and supported-compound mode should be visually distinct.
- Warnings should be explicit and actionable, not just color-coded.
- The app should always show the formula inputs and outputs so the math is inspectable.
- Citation links should sit next to supported protocols, not buried in a footer.

## Architecture Checklist

Complete these before broad implementation starts:

1. Lock the MVP scope listed above.
2. Define the initial supported compound set.
3. Define citation source standards.
4. Define who can edit protocol and regulatory content.
5. Decide whether compound/protocol content ships from static files or Supabase tables first.
6. Define the exact rounding and warning rules for the calculation engine.
7. Write test vectors for calculator edge cases.
8. Write disclaimer copy for landing page, result screens, and footer.
9. Decide whether PWA support in v1 means installable shell only or true offline calculator mode.
10. Separate phase 1 public calculator architecture from future authenticated tracking architecture.

## Suggested Build Sequence

### Phase 0

- Scaffold Next.js app
- Add test setup
- Add calculation engine package structure
- Add static content model for compounds, protocols, and citations

### Phase 1

- Build universal calculator
- Add syringe warning rules
- Add supported compounds selector
- Add protocol viewer with citations

### Phase 2

- Add polish, responsive states, error handling, and offline support
- Add analytics and search-indexable content pages for supported compounds

### Phase 3

- Plan authenticated tracking as a separate product slice

## Bottom Line

InjectWise becomes build-ready once it is reframed as a high-trust calculator with a narrow, curated protocol layer.

If you keep the current broader scope and speculative regulatory framing, the project will accumulate product risk faster than code risk.
