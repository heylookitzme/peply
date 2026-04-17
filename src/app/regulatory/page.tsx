import type { Metadata } from "next";
import Link from "next/link";
import type { Compound } from "@/types/content";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { getRegulatoryBadge } from "@/lib/constants/compounds/regulatoryBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  TIMELINE_MILESTONES,
  REMAINING_RESTRICTED,
} from "@/lib/constants/regulatory";

export const metadata: Metadata = {
  title: "FDA Regulatory Tracker",
  description:
    "FDA peptide reclassification tracker. Category 2 removals, PCAC evaluation timeline, and compound-by-compound status for compounding pharmacies.",
};

const APPROVED_BRAND_NAMES: Record<string, string> = {
  semaglutide: "Ozempic, Wegovy, Rybelsus",
  tirzepatide: "Mounjaro, Zepbound",
  tesamorelin: "Egrifta SV",
};

const LIMITED_INDICATION_NOTES: Record<string, string> = {
  "pt-141": "Vyleesi — HSDD in premenopausal women only",
};

const INVESTIGATIONAL_NOTES: Record<string, string> = {
  retatrutide: "Eli Lilly — Phase 3 (TRIUMPH trials)",
};

interface StatusRow {
  key: string;
  name: string;
  href?: string;
  badgeLabel: string;
  badgeStyle: string;
  note: string;
}

function StatusSection({
  title,
  description,
  rows,
}: {
  title: string;
  description?: string;
  rows: StatusRow[];
}): React.ReactElement | null {
  if (rows.length === 0) return null;
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[12px] text-text-secondary mb-3">{description}</p>
      )}
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
              <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-4 py-3 border-b border-border">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td className="text-sm px-4 py-3 border-b border-border">
                  {row.href ? (
                    <Link
                      href={row.href}
                      className="text-accent hover:underline"
                    >
                      {row.name}
                    </Link>
                  ) : (
                    <span className="text-text-secondary">{row.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-border">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${row.badgeStyle}`}
                  >
                    {row.badgeLabel}
                  </span>
                </td>
                <td className="text-[12px] text-text-secondary px-4 py-3 border-b border-border leading-snug">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function compoundRow(compound: Compound, note: string): StatusRow {
  const badge = getRegulatoryBadge(compound);
  return {
    key: compound.slug,
    name: compound.name,
    href: `/compounds/${compound.slug}`,
    badgeLabel: badge.label,
    badgeStyle: badge.style,
    note,
  };
}

export default function RegulatoryPage(): React.ReactElement {
  const removedCompounds = COMPOUNDS.filter(
    (c) => c.regulatoryStatus.reclassificationStatus === "removed-from-cat2",
  );

  const remainingCat2Pending = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "cat2" &&
      c.regulatoryStatus.reclassificationStatus !== "removed-from-cat2",
  );

  const cat1Compounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "cat1" &&
      c.regulatoryStatus.reclassificationStatus === "stable",
  );

  const fdaApproved = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "approved" &&
      c.approvalStatus === "approved",
  );

  const limitedIndication = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "approved" &&
      c.approvalStatus === "limited-indication",
  );

  const investigationalCompounds = COMPOUNDS.filter(
    (c) =>
      c.regulatoryStatus.currentCategory === "investigational" &&
      c.regulatoryStatus.reclassificationStatus !== "removed-from-cat2",
  );

  const removedRows: StatusRow[] = removedCompounds.map((c) =>
    compoundRow(c, "PCAC evaluation begins July 2026"),
  );

  const pendingCat2Rows: StatusRow[] = remainingCat2Pending.map((c) =>
    compoundRow(c, "Pending FDA reclassification — announced 2026-02-27"),
  );

  const remainingRestrictedRows: StatusRow[] = REMAINING_RESTRICTED.map(
    (rc) => ({
      key: rc.name,
      name: rc.name,
      badgeLabel: "Remaining Restricted",
      badgeStyle: "bg-error/15 text-error border-error/30",
      note: rc.reason,
    }),
  );

  const cat1Rows: StatusRow[] = cat1Compounds.map((c) =>
    compoundRow(c, "Permitted for 503A compounding"),
  );

  const fdaApprovedRows: StatusRow[] = fdaApproved.map((c) =>
    compoundRow(
      c,
      APPROVED_BRAND_NAMES[c.slug] ?? `${c.manufacturer}`,
    ),
  );

  const limitedIndicationRows: StatusRow[] = limitedIndication.map((c) =>
    compoundRow(
      c,
      LIMITED_INDICATION_NOTES[c.slug] ??
        "FDA-approved for a limited indication only",
    ),
  );

  const investigationalRows: StatusRow[] = investigationalCompounds.map((c) =>
    compoundRow(
      c,
      INVESTIGATIONAL_NOTES[c.slug] ?? "In active clinical investigation",
    ),
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

      {/* Section 2 — Visual Timeline (single layout, vertical at all sizes) */}
      <section>
        <h2 className="text-base font-semibold mb-6">
          Reclassification Timeline
        </h2>
        <ol className="space-y-6">
          {TIMELINE_MILESTONES.map((milestone, i) => {
            const completed = milestone.status === "completed";
            const nextCompleted =
              TIMELINE_MILESTONES[i + 1]?.status === "completed";
            const isLast = i === TIMELINE_MILESTONES.length - 1;
            return (
              <li key={milestone.date} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                      completed
                        ? "bg-accent border-accent"
                        : "bg-surface border-text-secondary/40"
                    }`}
                  />
                  {!isLast && (
                    <div
                      className={`w-px flex-1 mt-1 ${
                        nextCompleted
                          ? "bg-accent"
                          : "border-l border-dashed border-text-secondary/40"
                      }`}
                    />
                  )}
                </div>
                <div className="pb-2">
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.08em] mb-0.5 ${
                      completed ? "text-accent" : "text-text-secondary"
                    }`}
                  >
                    {milestone.date}
                  </p>
                  <p className="text-sm font-medium">{milestone.label}</p>
                  <p className="text-[12px] text-text-secondary leading-snug">
                    {milestone.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <hr className="border-border my-8" />

      {/* Section 3 — Compound Status, grouped by regulatory bucket */}
      <section>
        <h2 className="text-base font-semibold mb-2">Compound Status</h2>
        <p className="text-[12px] text-text-secondary mb-6">
          Compounds grouped by current regulatory bucket. Linked names go to
          full detail pages with citations.
        </p>

        <StatusSection
          title="Removed from Category 2 (April 15, 2026)"
          description="Nominator-withdrawn peptides; await formal PCAC review."
          rows={removedRows}
        />

        <StatusSection
          title="Category 2 — Pending Review"
          description="Still restricted but flagged for return-to-Category-1 evaluation."
          rows={pendingCat2Rows}
        />

        <StatusSection
          title="Category 2 — Remaining Restricted"
          description="Not on the April 15 removal list. Compounding pharmacies may not prepare these."
          rows={remainingRestrictedRows}
        />

        <StatusSection
          title="Category 1 — Permitted for Compounding"
          description="May be legally compounded by licensed 503A and 503B pharmacies."
          rows={cat1Rows}
        />

        <StatusSection
          title="FDA Approved"
          description="Approved for one or more indications and commercially marketed."
          rows={fdaApprovedRows}
        />

        <StatusSection
          title="FDA Approved (Limited Indication)"
          description="Approved for a narrow patient population only."
          rows={limitedIndicationRows}
        />

        <StatusSection
          title="Investigational"
          description="In active clinical trials; not yet FDA-approved."
          rows={investigationalRows}
        />
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
