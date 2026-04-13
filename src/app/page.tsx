import Link from "next/link";
import {
  Beaker,
  Dna,
  Layers,
  ShieldCheck,
  Users,
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    title: "Reconstitution Calculator",
    description:
      "Vial strength, diluent volume, target dose — get exact concentration, draw volume, and syringe units. Smart warnings for measurement accuracy and syringe capacity.",
    href: "/calculator",
    cta: "Open Calculator",
    icon: Beaker,
  },
  {
    title: "21 Compounds",
    description:
      "Published dose ranges, titration protocols, mechanisms, and citations from FDA labels, NEJM trials, and peer-reviewed research. Not vendor marketing copy.",
    href: "/compounds",
    cta: "Browse Compounds",
    icon: Dna,
  },
  {
    title: "Stack Protocols",
    description:
      "Wolverine, Glow, Klow, GH/Muscle, and Metabolic — community-derived multi-compound protocols with coordinated dosing and per-compound reconstitution math.",
    href: "/stacks",
    cta: "View Stacks",
    icon: Layers,
  },
  {
    title: "FDA Regulatory Tracker",
    description:
      "Category 2 to Category 1 reclassification status. Timeline, compound-by-compound tracking, and sourcing guidance based on published FDA communications.",
    href: "/regulatory",
    cta: "View Tracker",
    icon: ShieldCheck,
  },
  {
    title: "Community Data",
    description:
      "Anonymous experience submissions from real users. Structured data, not forums or opinions. Helping build a more complete reference.",
    href: "/submit",
    cta: "Submit Data",
    icon: Users,
  },
  {
    title: "Vendor Portal",
    description:
      "Licensed compounding pharmacies and suppliers can submit Certificate of Analysis data to improve compound quality information.",
    href: "/vendor/register",
    cta: "Register as Vendor",
    icon: Building2,
  },
] as const;

const STATS = [
  "21 compounds",
  "5 protocols",
  "Published clinical data",
  "Community-driven",
  "Zero vendor affiliations",
] as const;

export default function HomePage(): React.ReactElement {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 text-center">
        <div className="mx-auto max-w-[720px] px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-3">
            Peptide Reference Tool
          </p>
          <h1 className="font-serif text-[40px] sm:text-[56px] leading-[1.1] tracking-tight mb-6">
            Precise dosing.
            <br />
            Every <em className="text-accent">time</em>.
          </h1>
          <p className="text-lg text-text-secondary max-w-[560px] mx-auto mb-10 leading-relaxed">
            The peptide reference tool built on published clinical data.
            Calculator, compound database, stack protocols, regulatory tracking,
            and community data — with zero vendor affiliations.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/calculator"
              className="inline-block rounded-lg bg-accent text-white px-8 py-3.5 text-[15px] font-medium hover:bg-accent-hover transition-colors duration-150"
            >
              Open Calculator
            </Link>
            <Link
              href="/compounds"
              className="inline-block rounded-lg border border-border text-text px-8 py-3.5 text-[15px] font-medium hover:border-text-secondary transition-colors duration-150"
            >
              Browse Compounds
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[720px] px-6">
        <hr className="border-border" />
      </div>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="flex flex-col">
                  <Icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.5} />
                  <h2 className="font-serif text-xl mb-3">{feature.title}</h2>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="text-[13px] text-accent hover:underline self-start"
                  >
                    {feature.cta} &rarr;
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-8 bg-surface-alt/30 border-y border-border">
        <div className="mx-auto max-w-[960px] px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-text-secondary">
            {STATS.map((stat, i) => (
              <span key={stat} className="flex items-center gap-6">
                {i > 0 && (
                  <span className="text-border hidden sm:inline">&middot;</span>
                )}
                <span>{stat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
