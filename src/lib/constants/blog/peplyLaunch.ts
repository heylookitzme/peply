import type { BlogPost } from "@/types/blog";

export const peplyLaunch: BlogPost = {
  slug: "introducing-peply",
  title: "Introducing Peply: A Neutral Peptide Reference Tool",
  description:
    "Peply is a vendor-independent reconstitution calculator and reference layer for peptide and injectable medication data. 24 compounds, 5 stacks, regulatory tracking, zero vendor affiliations.",
  category: "announcement",
  publishedAt: "2026-04-14",
  author: "Peply Team",
  readingTime: "4 min read",
  tags: ["launch", "peptides", "calculator", "reference"],
  content: `Peply is a neutral reference tool for peptide and injectable medication reconstitution. It exists because the calculator most people use for this math is either buried inside a vendor storefront or scribbled on a notepad. Peply does the arithmetic, shows the citations, and stops there.

## What Peply is

At its core, Peply is two things:

- A **universal reconstitution calculator** that takes a vial strength, diluent volume, target dose, and syringe type, and returns concentration, draw volume, and syringe units.
- A **curated reference layer** of 24 peptide compounds with published dose ranges, regulatory status, titration protocols, and citations back to primary sources.

Everything is built on published clinical data. Every non-arithmetic claim has a citation with a \`lastReviewedAt\` date. Compounds that are investigational or restricted are labelled as such, not laundered into something that reads like FDA approval.

## What's available today

- [Reconstitution calculator](/calculator) with smart warnings for low-accuracy draws, syringe overflow, and awkward dilutions.
- [Stack calculator](/calculator/stacks) that walks through multi-compound protocols one compound at a time.
- [Cost calculator](/calculator/cost) for estimating a protocol's monthly and per-dose spend.
- [24 compounds](/compounds) spanning GLP-1 agonists, growth hormone secretagogues, neuropeptides, and metabolic compounds.
- [5 stacks](/stacks), community-derived combination protocols with rationale and evidence disclaimers.
- [Regulatory tracker](/regulatory) for FDA Category 2 status and reclassification timelines.

## Who it's for

Peply is built for informed adults who already understand what they're doing and want the math to be correct. That includes biohackers, GLP-1 patients running their own titration, TRT/HRT patients on compounded prescriptions, and athletes working with recovery peptides. It is also useful for healthcare providers who want a neutral reference that is not tied to a vendor.

## What Peply is not

This part matters, so it gets its own section. Peply is **not**:

- A prescribing platform. Nothing here is medical advice. Consult a licensed healthcare provider.
- A vendor storefront. Peply does not sell peptides and has zero affiliations with any compounding pharmacy or research supplier.
- A legal or regulatory authority. We surface the FDA's public communications. Verify at [FDA.gov](https://www.fda.gov) for anything that matters.
- A forum or community platform. There are no user-to-user comments. The product is calculator plus reference, nothing more.

## New in this release

Two additions rolled in alongside the launch:

- **User accounts** (optional, magic-link or Google sign-in). Accounts only store preferences: a display name, favorite compounds, favorite stacks, and saved calculator presets. No health data, no dosing history, no injection logs. Ever.
- **Feedback board** at [/feedback](/feedback), a one-way submission form for feature requests, new compound requests, bug reports, and general feedback. Submissions go to the product team, not to other users.

Both are additive. The calculator, compound pages, and stacks all work anonymously.

## Start here

- Try the [reconstitution calculator](/calculator).
- Browse the [compound library](/compounds).
- Review the [regulatory tracker](/regulatory) for current FDA status.
- Send us a [suggestion](/feedback). We read every one.

Peply is early. We will ship improvements based on what people actually need, not what looks good in a roadmap slide.`,
};
