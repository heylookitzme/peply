import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimers for Peply. This tool is an educational reference only and does not provide medical advice.",
};

export default function DisclaimerPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Legal"
        title="Disclaimer"
        emphasisWord="Disclaimer"
      />
      <p className="text-[12px] text-text-secondary mt-2 mb-8">
        Last updated: April 15, 2026
      </p>

      <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Educational Reference Only
          </h2>
          <p>
            Peply is an educational reference tool for peptide reconstitution
            calculations and published compound data. It does not provide
            medical advice, diagnosis, or treatment recommendations. All
            calculator outputs, compound information, protocol references, and
            stack descriptions are presented for informational purposes only.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Not a Substitute for Professional Guidance
          </h2>
          <p>
            Nothing on this site should be interpreted as a recommendation to
            use, purchase, or administer any compound. Consult a licensed
            healthcare provider before using any peptide or injectable
            medication. Self-administration of any compound carries inherent
            risks that this tool cannot assess or mitigate.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Calculator Accuracy
          </h2>
          <p>
            The reconstitution calculator performs arithmetic based on the
            values you provide. It does not verify whether those values are
            appropriate for any compound, individual, or clinical scenario.
            Incorrect inputs produce incorrect outputs. Always independently
            verify calculations before acting on them.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Compound &amp; Protocol Data
          </h2>
          <p>
            Compound information, dose ranges, and titration protocols are
            sourced from published clinical trials, FDA labels, and
            peer-reviewed research. Community-derived protocols (stacks) are
            not sourced from clinical trials and are labeled accordingly.
            While Peply strives for accuracy, it does not guarantee the
            completeness or currency of any reference data.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Regulatory Information
          </h2>
          <p>
            FDA approval status and regulatory classifications are sourced
            from published FDA communications and are current as of each
            compound&apos;s last review date. Regulatory status can change.
            Verify current status at{" "}
            <a
              href="https://www.fda.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              FDA.gov
            </a>{" "}
            before making decisions based on regulatory information displayed
            here.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            No Endorsement
          </h2>
          <p>
            Inclusion of any compound, stack protocol, or vendor data on
            Peply does not constitute endorsement, recommendation, or
            encouragement to use. Peply has no affiliation with any compound
            manufacturer, compounding pharmacy, or vendor.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Limitation of Liability
          </h2>
          <p>
            Peply is provided &ldquo;as is&rdquo; without warranties of any
            kind, express or implied. In no event shall Peply or its
            contributors be liable for any direct, indirect, incidental, or
            consequential damages arising from use of this tool, including
            but not limited to damages from incorrect calculations, outdated
            information, or reliance on reference data. Users assume full
            responsibility for how they use the information provided.
          </p>
        </Card>

        <div className="text-center pt-4 space-y-2">
          <p className="text-[13px]">
            For questions about this disclaimer, contact{" "}
            <a
              href="mailto:legal@peply.bio"
              className="text-accent hover:underline"
            >
              legal@peply.bio
            </a>
          </p>
          <p className="text-[13px]">
            See also:{" "}
            <Link href="/terms" className="text-accent hover:underline">
              Terms of Service
            </Link>
            {" · "}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
