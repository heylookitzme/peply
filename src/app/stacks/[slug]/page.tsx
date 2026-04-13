import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STACKS, getStackBySlug } from "@/lib/constants/stacks";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import { Card } from "@/components/ui/Card";
import { STACK_CATEGORY_LABELS, EVIDENCE_STYLES } from "@/lib/constants/stacks/labels";
import { StackCalculatorSection } from "@/components/calculator/StackCalculatorSection";

interface StackPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return STACKS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: StackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) return { title: "Not Found" };
  return {
    title: stack.name,
    description: `${stack.name} stack protocol. ${stack.summary.slice(0, 120)}`,
  };
}

export default async function StackPage({
  params,
}: StackPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      {/* Back link */}
      <Link
        href="/stacks"
        className="text-[13px] text-text-secondary hover:text-text transition-colors duration-150 mb-6 inline-block"
      >
        &larr; All Stacks
      </Link>

      {/* Community-derived notice */}
      <p className="text-[12px] text-text-secondary mb-6">
        Community-derived protocol. No clinical trials have studied this specific
        combination. For educational reference only.
      </p>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <h1 className="font-serif text-[36px] leading-tight">{stack.name}</h1>
        <span
          className={`inline-block shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${EVIDENCE_STYLES[stack.evidenceLevel]}`}
        >
          {stack.evidenceLevel}
        </span>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
        {STACK_CATEGORY_LABELS[stack.category]} &middot; {stack.compounds.length}{" "}
        compounds
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
        {stack.summary}
      </p>
      <p className="text-[12px] text-warning/80 italic mb-8">
        {stack.evidenceDisclaimer}
      </p>

      <hr className="border-border mb-8" />

      {/* Why This Stack */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Why This Stack</h2>
        <Card>
          <p className="text-sm leading-relaxed">{stack.rationale}</p>
        </Card>
      </section>

      <hr className="border-border mb-8" />

      {/* Compounds */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Compounds</h2>
        <div className="space-y-4">
          {stack.compounds.map((sc) => {
            const compound = getCompoundBySlug(sc.compoundId);
            return (
              <Card key={sc.compoundId}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <Link
                      href={`/compounds/${sc.compoundId}`}
                      className="font-serif text-lg hover:text-accent transition-colors duration-150"
                    >
                      {compound?.name ?? sc.compoundId}
                    </Link>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mt-0.5">
                      {sc.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{sc.dosing}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <hr className="border-border mb-8" />

      {/* Protocol */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Protocol</h2>
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                Duration
              </dt>
              <dd className="text-sm mt-1">{stack.protocol.duration}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                Cycling
              </dt>
              <dd className="text-sm mt-1">{stack.protocol.cycling}</dd>
            </div>
            {stack.protocol.timing && (
              <div className="sm:col-span-2">
                <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                  Timing
                </dt>
                <dd className="text-sm mt-1">{stack.protocol.timing}</dd>
              </div>
            )}
            {stack.protocol.notes && (
              <div className="sm:col-span-2">
                <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                  Notes
                </dt>
                <dd className="text-sm mt-1 text-text-secondary">
                  {stack.protocol.notes}
                </dd>
              </div>
            )}
          </div>
        </Card>
      </section>

      <hr className="border-border mb-8" />

      {/* Reconstitution Quick Reference */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">
          Reconstitution Quick Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                  Compound
                </th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                  Vial
                </th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                  BAC Water
                </th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                  Concentration
                </th>
              </tr>
            </thead>
            <tbody>
              {stack.compounds.map((sc) => {
                const compound = getCompoundBySlug(sc.compoundId);
                if (!compound) return null;
                const vial = compound.commonVialSizes[0];
                if (!vial) return null;
                const concentration = vial.amount / compound.defaultBacWaterMl;
                return (
                  <tr key={sc.compoundId}>
                    <td className="text-sm px-4 py-3 border-b border-border">
                      {compound.name}
                    </td>
                    <td className="font-mono text-sm px-4 py-3 border-b border-border">
                      {vial.amount} {vial.unit}
                    </td>
                    <td className="font-mono text-sm px-4 py-3 border-b border-border">
                      {compound.defaultBacWaterMl} mL
                    </td>
                    <td className="font-mono text-sm px-4 py-3 border-b border-border">
                      {concentration.toFixed(2)} {vial.unit}/mL
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-border mb-8" />

      {/* Stack Calculator */}
      <StackCalculatorSection stack={stack} />

      <hr className="border-border mb-8" />

      {/* Citations */}
      <section>
        <h2 className="text-base font-semibold mb-4">Citations</h2>
        <ol className="space-y-3">
          {stack.citations.map((citation, i) => (
            <li key={citation.id} className="text-sm">
              <span className="text-text-secondary mr-2">[{i + 1}]</span>
              <span>{citation.title}. </span>
              <span className="text-text-secondary italic">
                {citation.source}.{" "}
              </span>
              {citation.sourceUrl && (
                <a
                  href={citation.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Link
                </a>
              )}
              <span className="text-[11px] text-text-secondary ml-2">
                (Reviewed: {citation.lastReviewedAt})
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
