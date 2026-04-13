import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPOUNDS, getCompoundBySlug } from "@/lib/constants/compounds";
import { Card } from "@/components/ui/Card";
import { calculateSyringeUnits, formatSyringeUnits, convertDoseUnit } from "@/lib/calculations";
import { CATEGORY_LABELS } from "@/lib/constants/compounds/labels";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import { formatDoseRange } from "@/lib/formatDoseRange";

interface CompoundPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return COMPOUNDS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CompoundPageProps): Promise<Metadata> {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);
  if (!compound) return { title: "Not Found - Peply" };
  return {
    title: `${compound.name} - Peply`,
    description: compound.summary,
  };
}

export default async function CompoundPage({
  params,
}: CompoundPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const compound = getCompoundBySlug(slug);
  if (!compound) notFound();

  const defaultVial = compound.commonVialSizes[0];
  const defaultConcentration = defaultVial
    ? defaultVial.amount / compound.defaultBacWaterMl
    : 0;

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      {/* Back link */}
      <Link
        href="/compounds"
        className="text-[13px] text-text-secondary hover:text-text transition-colors duration-150 mb-6 inline-block"
      >
        &larr; All Compounds
      </Link>

      {/* Non-endorsement notice */}
      <p className="text-[12px] text-text-secondary mb-6">
        Inclusion of a compound does not constitute endorsement. Information
        sourced from published research and regulatory filings.
      </p>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <h1 className="font-serif text-[36px] leading-tight">{compound.name}</h1>
        {(() => {
          const badge = getRegulatoryBadge(compound);
          return (
            <span
              className={`inline-block shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide cursor-help ${badge.style}`}
              title={badge.tooltip}
            >
              {badge.label}
            </span>
          );
        })()}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-4">
        {CATEGORY_LABELS[compound.category]} &middot; {compound.manufacturer}
      </p>
      <p className="text-[15px] text-text-secondary leading-relaxed mb-8">
        {compound.summary}
      </p>

      <hr className="border-border mb-8" />

      {/* About */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">About</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card padding="sm">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
              Mechanism
            </dt>
            <dd className="text-sm mt-1">{compound.mechanism}</dd>
          </Card>
          <Card padding="sm">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
              Half-Life
            </dt>
            <dd className="text-sm mt-1">{compound.halfLife}</dd>
          </Card>
          <Card padding="sm">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
              Route
            </dt>
            <dd className="text-sm mt-1 capitalize">{compound.defaultRoute}</dd>
          </Card>
          <Card padding="sm">
            <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
              Frequency
            </dt>
            <dd className="text-sm mt-1">{compound.clinicalDoseRange.frequencyLabel}</dd>
          </Card>
        </div>
      </section>

      <hr className="border-border mb-8" />

      {/* Clinical Dosing */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Clinical Dosing</h2>
        <Card>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-2xl font-medium">
              {formatDoseRange(compound.clinicalDoseRange)}
            </span>
            <span className="text-sm text-text-secondary">
              {compound.clinicalDoseRange.frequencyLabel.toLowerCase()}
            </span>
          </div>
          {compound.regulatoryStatus.sourcingNote && (
            <p className="text-[13px] text-text-secondary mt-2">
              {compound.regulatoryStatus.sourcingNote}
            </p>
          )}
          {compound.dosingEvidenceNote && (
            <p className="text-[12px] text-warning/80 mt-3 italic">
              {compound.dosingEvidenceNote}
            </p>
          )}
        </Card>
      </section>

      {/* Regulatory Status (for non-approved compounds) */}
      {compound.regulatoryStatus.currentCategory !== "approved" && (
        <>
          <hr className="border-border mb-8" />
          <section className="mb-8">
            <h2 className="text-base font-semibold mb-4">Regulatory Status</h2>
            <Card>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                    FDA Category
                  </dt>
                  <dd className="text-sm mt-1">{compound.regulatoryStatus.fdaCategory}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                    Reclassification
                  </dt>
                  <dd className="text-sm mt-1 capitalize">{compound.regulatoryStatus.reclassificationStatus}</dd>
                </div>
                {compound.regulatoryStatus.dateRestricted && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                      Date Restricted
                    </dt>
                    <dd className="text-sm mt-1">{compound.regulatoryStatus.dateRestricted}</dd>
                  </div>
                )}
                {compound.regulatoryStatus.dateAnnouncedReturn && (
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium">
                      Announced Return
                    </dt>
                    <dd className="text-sm mt-1">{compound.regulatoryStatus.dateAnnouncedReturn}</dd>
                  </div>
                )}
              </div>
              <p className="text-[12px] text-text-secondary mt-4">
                Status based on publicly available FDA communications. Verify at{" "}
                <a
                  href="https://www.fda.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  FDA.gov
                </a>{" "}
                for authoritative guidance.
              </p>
              <Link
                href="/regulatory"
                className="inline-block text-[13px] text-accent hover:underline mt-3"
              >
                View full regulatory timeline &rarr;
              </Link>
            </Card>
          </section>
        </>
      )}

      <hr className="border-border mb-8" />

      {/* Titration Protocols */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Titration Protocols</h2>
        {compound.titrationProtocols.map((protocol) => (
          <div key={protocol.name} className="mb-6">
            <h3 className="text-sm font-medium mb-1">{protocol.name}</h3>
            <p className="text-[13px] text-text-secondary mb-3">
              Source: {protocol.sourceUrl ? (
                <a
                  href={protocol.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {protocol.source}
                </a>
              ) : (
                protocol.source
              )}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                      Dose
                    </th>
                    <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                      Duration
                    </th>
                    {defaultVial && (
                      <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                        Draw ({defaultVial.label} in {compound.defaultBacWaterMl}mL)
                      </th>
                    )}
                    <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {protocol.steps.map((step, i) => {
                    const normalizedDose =
                      defaultVial && step.unit !== defaultVial.unit
                        ? convertDoseUnit(step.dose, step.unit, defaultVial.unit)
                        : step.dose;
                    const drawMl =
                      defaultConcentration > 0
                        ? normalizedDose / defaultConcentration
                        : 0;
                    const units =
                      drawMl > 0
                        ? calculateSyringeUnits(drawMl, "u100_1ml")
                        : 0;
                    return (
                      <tr key={i}>
                        <td className="font-mono text-sm px-4 py-3 border-b border-border">
                          {step.dose} {step.unit}
                        </td>
                        <td className="text-sm px-4 py-3 border-b border-border">
                          {step.durationWeeks > 0
                            ? `${step.durationWeeks} weeks`
                            : "Maintenance"}
                        </td>
                        {defaultVial && (
                          <td className="font-mono text-sm px-4 py-3 border-b border-border">
                            {drawMl.toFixed(2)} mL ({formatSyringeUnits(units)} units)
                          </td>
                        )}
                        <td className="text-sm text-text-secondary px-4 py-3 border-b border-border">
                          {step.notes ?? ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <hr className="border-border mb-8" />

      {/* Vial Sizes */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Available Vial Sizes</h2>
        <div className="flex flex-wrap gap-3">
          {compound.commonVialSizes.map((vial) => (
            <Card key={vial.label} padding="sm" className="text-center min-w-[100px]">
              <p className="font-mono text-lg font-medium">
                {vial.amount} {vial.unit}
              </p>
              <p className="text-[11px] text-text-secondary mt-1">{vial.label}</p>
            </Card>
          ))}
        </div>
      </section>

      <hr className="border-border mb-8" />

      {/* Citations */}
      <section>
        <h2 className="text-base font-semibold mb-4">Citations</h2>
        <ol className="space-y-3">
          {compound.citations.map((citation, i) => (
            <li key={citation.id} className="text-sm">
              <span className="text-text-secondary mr-2">[{i + 1}]</span>
              <span>{citation.title}. </span>
              <span className="text-text-secondary italic">{citation.source}. </span>
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
