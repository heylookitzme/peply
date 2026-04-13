import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Terms of Service - Peply",
  description:
    "Terms of service for Peply, an educational reference tool for reconstitution calculations and published compound data.",
};

export default function TermsPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Legal"
        title="Terms of Service"
        emphasisWord="Service"
      />
      <p className="text-[12px] text-text-secondary mt-2 mb-8">
        Last updated: April 13, 2026
      </p>

      <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Educational Reference Only
          </h2>
          <p>
            Peply is an educational reference tool for reconstitution
            calculations and published compound data. It does not provide
            medical advice, diagnosis, or treatment recommendations. All
            information is presented for informational purposes only. Consult
            a licensed healthcare provider before using any compound.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Content Accuracy
          </h2>
          <p>
            Compound data, dosing information, and regulatory status are sourced
            from published clinical trials, FDA communications, and documented
            community protocols. While we strive for accuracy, Peply does not
            guarantee the completeness or currency of any information. Users are
            responsible for independently verifying all data before acting on it.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Anonymous Submissions
          </h2>
          <p>
            Anonymous experience submissions are voluntary. By submitting, you
            confirm that the data you provide is truthful to the best of your
            knowledge. Submissions are reviewed privately and may be used in
            aggregate to improve compound reference information. Individual
            submissions are never published. Peply reserves the right to
            discard any submission without notice.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Vendor Submissions
          </h2>
          <p>
            Vendor accounts require registration and manual verification.
            Submitted quality data (batch numbers, purity, certificates of
            analysis) is reviewed privately and may be used in aggregate to
            improve compound quality information. Individual vendor submissions
            and vendor identities are never published without explicit consent.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Limitation of Liability
          </h2>
          <p>
            Peply is provided &ldquo;as is&rdquo; without warranties of any
            kind. In no event shall Peply or its contributors be liable for any
            direct, indirect, incidental, or consequential damages arising from
            use of this tool, including but not limited to damages from
            incorrect calculations, outdated information, or reliance on
            reference data. Users assume full responsibility for how they use
            the information provided.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            No Endorsement
          </h2>
          <p>
            Inclusion of any compound, protocol, or vendor data does not
            constitute endorsement or recommendation for use. Peply has no
            affiliation with any compound manufacturer, pharmacy, or vendor.
          </p>
        </Card>
      </div>
    </div>
  );
}
