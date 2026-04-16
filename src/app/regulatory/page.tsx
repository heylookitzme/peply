import type { Metadata } from "next";
import Link from "next/link";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  TIMELINE_MILESTONES,
  REMAINING_RESTRICTED,
  REMOVED_NOT_IN_DATABASE,
} from "@/lib/constants/regulatory";

export const metadata: Metadata = {
  title: "FDA Regulatory Tracker",
  description:
    "FDA peptide reclassification tracker. Category 2 removals, PCAC evaluation timeline, and compound-by-compound status for compounding pharmacies.",
};

export default function RegulatoryPage(): React.ReactElement {
  const removedCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.reclassificationStatus === "removed-from-cat2",
  );

  const remainingCat2 = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "cat2" &&
      c.regulatoryStatus.reclassificationStatus !== "removed-from-cat2",
  );

  const cat1Compounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "cat1" &&
      c.regulatoryStatus.reclassificationStatus === "stable",
  );

  const approvedCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.currentCategory === "approved",
  );

  const investigationalCompounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "investigational" &&
      c.regulatoryStatus.reclassificationStatus !== "removed-from-cat2",
  );

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Regulatory"
        title="FDA Regulatory Tracker"
        emphasisWord="Tracker"
        subtitle="Compounding category status based on publicly available FDA communications."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the difference between FDA Category 1 and Category 2?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Category 1 bulk drug substances may be legally compounded by licensed 503A and 503B pharmacies under a physician prescription. Category 2 substances are restricted from compounding due to insufficient clinical data or unresolved adverse event profiles.",
              },
            },
            {
              "@type": "Question",
              name: "What does removed from Category 2 mean?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Removed from Category 2 means the FDA will no longer restrict compounding pharmacies from preparing these compounds. Each removed compound will undergo formal review by the Pharmacy Compounding Advisory Committee (PCAC) beginning July 2026. This does not mean FDA-approved — these remain off-label uses requiring a physician prescription.",
              },
            },
            {
              "@type": "Question",
              name: "When will peptides return to Category 1?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "On April 15, 2026, HHS Secretary Kennedy announced 12 peptides are being removed from Category 2. Formal PCAC evaluation begins July 2026. Category 1 reclassification depends on the PCAC outcome.",
              },
            },
            {
              "@type": "Question",
              name: "Does reclassification mean FDA approval?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Removal from Category 2 means a compound may be legally compounded. It does not mean the compound is FDA-approved for any specific indication. These remain off-label uses requiring a physician prescription from a licensed compounding pharmacy.",
              },
            },
          ],
        }}
      />

      {/* Verification notice */}
      <p className="text-[12px] text-text-secondary mt-4">
        Status information based on publicly available FDA communications.
        Verify at{" "}
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

      {/* Section 1 — Status Banner */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-[#2dd4bf]/15 text-[#2dd4bf] border-[#2dd4bf]/30">
              Update
            </span>
            <h2 className="text-base font-semibold">
              12 Peptides Removed from Category 2
            </h2>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            On April 15, 2026, HHS Secretary Kennedy announced that nominators
            withdrew 12 peptides from Category 2. Compounding pharmacies are no
            longer restricted from preparing these compounds. Each will undergo
            formal PCAC review beginning July 2026.
          </p>
          <p className="text-[11px] text-text-secondary mt-3">
            Last updated: April 15, 2026
          </p>
        </Card>
      </div>

      <hr className="border-border my-8" />

      {/* Section 2 — Visual Timeline */}
      <section>
        <h2 className="text-base font-semibold mb-6">
          Reclassification Timeline
        </h2>

        {/* Desktop: horizontal */}
        <div className="hidden sm:block">
          <div className="flex items-start">
            {TIMELINE_MILESTONES.map((milestone, i) => (
              <div
                key={milestone.date}
                className="flex-1 flex flex-col items-center text-center"
              >
                {/* Dot + line */}
                <div className="relative w-full flex items-center justify-center mb-3">
                  {i > 0 && (
                    <div
                      className={`absolute left-0 right-1/2 top-1/2 h-px ${
                        milestone.status === "completed"
                          ? "bg-accent"
                          : "border-t border-dashed border-text-secondary/40"
                      }`}
                    />
                  )}
                  {i < TIMELINE_MILESTONES.length - 1 && (
                    <div
                      className={`absolute left-1/2 right-0 top-1/2 h-px ${
                        TIMELINE_MILESTONES[i + 1].status === "completed"
                          ? "bg-accent"
                          : "border-t border-dashed border-text-secondary/40"
                      }`}
                    />
                  )}
                  <div
                    className={`relative z-10 w-3 h-3 rounded-full border-2 ${
                      milestone.status === "completed"
                        ? "bg-accent border-accent"
                        : "bg-surface border-text-secondary/40"
                    }`}
                  />
                </div>
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-1 ${
                    milestone.status === "completed"
                      ? "text-accent"
                      : "text-text-secondary"
                  }`}
                >
                  {milestone.date}
                </p>
                <p className="text-xs font-medium mb-1">{milestone.label}</p>
                <p className="text-[11px] text-text-secondary leading-snug max-w-[180px]">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="sm:hidden space-y-6">
          {TIMELINE_MILESTONES.map((milestone, i) => (
            <div key={milestone.date} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                    milestone.status === "completed"
                      ? "bg-accent border-accent"
                      : "bg-surface border-text-secondary/40"
                  }`}
                />
                {i < TIMELINE_MILESTONES.length - 1 && (
                  <div
                    className={`w-px flex-1 mt-1 ${
                      TIMELINE_MILESTONES[i + 1].status === "completed"
                        ? "bg-accent"
                        : "border-l border-dashed border-text-secondary/40"
                    }`}
                  />
                )}
              </div>
              <div className="pb-2">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-0.5 ${
                    milestone.status === "completed"
                      ? "text-accent"
                      : "text-text-secondary"
                  }`}
                >
                  {milestone.date}
                </p>
                <p className="text-sm font-medium">{milestone.label}</p>
                <p className="text-[12px] text-text-secondary leading-snug">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-border my-8" />

      {/* Section 3 — Compound Status Table */}
      <section>
        <h2 className="text-base font-semibold mb-4">
          Compound Status
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                  Compound
                </th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                  Status
                </th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border hidden sm:table-cell">
                  Restricted
                </th>
                <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border hidden sm:table-cell">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Removed from Cat 2 */}
              {removedCompounds.map((compound) => {
                const badge = getRegulatoryBadge(compound);
                return (
                  <tr key={compound.slug}>
                    <td className="text-sm px-4 py-3 border-b border-border">
                      <Link
                        href={`/compounds/${compound.slug}`}
                        className="text-accent hover:underline"
                      >
                        {compound.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.style}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                      {compound.regulatoryStatus.dateRestricted ?? "—"}
                    </td>
                    <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                      <span className="text-[11px] text-text-secondary">
                        PCAC evaluation begins July 2026
                      </span>
                    </td>
                  </tr>
                );
              })}

              {/* Not-in-database compounds from the removal announcement */}
              {REMOVED_NOT_IN_DATABASE.map((name) => (
                <tr key={name}>
                  <td className="text-sm px-4 py-3 border-b border-border text-text-secondary">
                    {name}
                  </td>
                  <td className="px-4 py-3 border-b border-border">
                    <span className="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide bg-[#2dd4bf]/15 text-[#2dd4bf] border-[#2dd4bf]/30">
                      Removed from Cat 2
                    </span>
                  </td>
                  <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                    2023-09-29
                  </td>
                  <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                    <span className="text-[11px] text-text-secondary italic">
                      No detail page yet
                    </span>
                  </td>
                </tr>
              ))}

              {/* Remaining Cat 2 restricted */}
              {remainingCat2.map((compound) => {
                const badge = getRegulatoryBadge(compound);
                return (
                  <tr key={compound.slug}>
                    <td className="text-sm px-4 py-3 border-b border-border">
                      <Link
                        href={`/compounds/${compound.slug}`}
                        className="text-accent hover:underline"
                      >
                        {compound.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.style}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                      {compound.regulatoryStatus.dateRestricted ?? "—"}
                    </td>
                    <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                  </tr>
                );
              })}

              {/* Remaining restricted (no detail pages) */}
              {REMAINING_RESTRICTED.map((compound) => (
                <tr key={compound.name}>
                  <td className="text-sm px-4 py-3 border-b border-border text-text-secondary">
                    {compound.name}
                  </td>
                  <td className="px-4 py-3 border-b border-border">
                    <span className="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide bg-error/15 text-error border-error/30">
                      Remaining Restricted
                    </span>
                  </td>
                  <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                    {compound.dateRestricted}
                  </td>
                  <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                    <span className="text-[11px] text-text-secondary italic">
                      Not in removal list: {compound.reason.toLowerCase()}
                    </span>
                  </td>
                </tr>
              ))}

              {/* Cat 1 compounds */}
              {cat1Compounds.map((compound) => {
                const badge = getRegulatoryBadge(compound);
                return (
                  <tr key={compound.slug}>
                    <td className="text-sm px-4 py-3 border-b border-border">
                      <Link
                        href={`/compounds/${compound.slug}`}
                        className="text-accent hover:underline"
                      >
                        {compound.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.style}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                    <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                  </tr>
                );
              })}

              {/* Approved compounds */}
              {approvedCompounds.map((compound) => {
                const badge = getRegulatoryBadge(compound);
                return (
                  <tr key={compound.slug}>
                    <td className="text-sm px-4 py-3 border-b border-border">
                      <Link
                        href={`/compounds/${compound.slug}`}
                        className="text-accent hover:underline"
                      >
                        {compound.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.style}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                    <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                  </tr>
                );
              })}

              {/* Investigational compounds */}
              {investigationalCompounds.map((compound) => {
                const badge = getRegulatoryBadge(compound);
                return (
                  <tr key={compound.slug}>
                    <td className="text-sm px-4 py-3 border-b border-border">
                      <Link
                        href={`/compounds/${compound.slug}`}
                        className="text-accent hover:underline"
                      >
                        {compound.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 border-b border-border">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.style}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="text-sm font-mono px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                    <td className="text-sm px-4 py-3 border-b border-border hidden sm:table-cell">
                      —
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-border my-8" />

      {/* Section 4 — What This Means */}
      <section>
        <h2 className="text-base font-semibold mb-4">
          What This Means
        </h2>
        <div className="space-y-4">
          <Card padding="sm">
            <h3 className="text-sm font-medium mb-1">
              Removed from Category 2
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Compounding pharmacies are no longer restricted from preparing
              these compounds. Nominators withdrew their Category 2 nominations,
              and the FDA will remove the compounds from the restricted list.
            </p>
          </Card>
          <Card padding="sm">
            <h3 className="text-sm font-medium mb-1">
              PCAC Review — July 2026
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Each removed compound will undergo formal evaluation by the
              Pharmacy Compounding Advisory Committee (PCAC) beginning July 2026.
              Formal reclassification to Category 1 depends on the PCAC outcome.
            </p>
          </Card>
          <Card padding="sm">
            <h3 className="text-sm font-medium mb-1">
              Not FDA-Approved
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Removal from Category 2 does not mean FDA-approved. These remain
              off-label uses that require a physician prescription from a
              licensed compounding pharmacy. They are not unregulated consumer
              products.
            </p>
          </Card>
          <Card padding="sm">
            <h3 className="text-sm font-medium mb-1">
              Remaining Restricted Compounds
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Compounds not on the April 15 removal list remain Category 2
              restricted. Compounding pharmacies may not prepare these
              substances until their status changes through separate FDA action.
            </p>
          </Card>
          <Card padding="sm">
            <h3 className="text-sm font-medium mb-1">
              Sourcing
            </h3>
            <p className="text-[13px] text-text-secondary leading-relaxed">
              Compounds sourced outside of licensed 503A/503B compounding
              pharmacies are unregulated and may contain contaminants,
              incorrect concentrations, or mislabeled substances. Peply does
              not endorse any vendor or sourcing channel.
            </p>
          </Card>
        </div>
      </section>

      <hr className="border-border my-8" />

      {/* Section 5 — Sources */}
      <section>
        <h2 className="text-base font-semibold mb-4">Sources</h2>
        <ol className="space-y-3">
          <li className="text-sm">
            <span className="text-text-secondary mr-2">[1]</span>
            <span>
              FDA Bulk Drug Substances Used in Compounding Under Section
              503A and 503B.{" "}
            </span>
            <a
              href="https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Link
            </a>
          </li>
          <li className="text-sm">
            <span className="text-text-secondary mr-2">[2]</span>
            <span>
              HHS Secretary Kennedy announcement on peptide reclassification,
              February 27, 2026.
            </span>
          </li>
          <li className="text-sm">
            <span className="text-text-secondary mr-2">[3]</span>
            <span>
              HHS Secretary Kennedy public statement on removal of 12 peptides
              from Category 2, April 15, 2026.
            </span>
          </li>
        </ol>
        <p className="text-[12px] text-text-secondary mt-4">
          Status information based on publicly available FDA communications.
          Verify at{" "}
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
      </section>
    </div>
  );
}
