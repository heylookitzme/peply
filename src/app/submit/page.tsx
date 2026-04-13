import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Submit anonymous peptide experience data. Structured compound reports reviewed privately to improve reference information.",
};

export default function SubmitPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Contribute"
        title="Contribute to Peply"
        emphasisWord="Peply"
        subtitle="Anonymous submissions are reviewed privately. No account required."
      />

      <p className="text-[12px] text-text-secondary mt-4 mb-8">
        This form collects anonymous experience data for educational reference
        purposes. Submissions are not published individually. Consult a licensed
        healthcare provider before using any compound.
      </p>

      <SubmitForm />

      <hr className="border-border my-12" />

      {/* Vendor entry point */}
      <Card>
        <h2 className="text-base font-semibold mb-2">
          For Compounding Pharmacies and Research Suppliers
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          Licensed compounding pharmacies and research suppliers can submit
          Certificate of Analysis (COA) data to help improve compound quality
          information. Vendor submissions are reviewed privately and are never
          published without explicit consent.
        </p>
        <div className="flex gap-3">
          <Link
            href="/vendor/register"
            className="inline-block rounded-lg bg-accent text-white px-6 py-2.5 text-[14px] font-medium hover:bg-accent-hover transition-colors duration-150"
          >
            Register as Vendor
          </Link>
          <Link
            href="/vendor/login"
            className="inline-block rounded-lg border border-border text-text px-6 py-2.5 text-[14px] font-medium hover:border-text-secondary transition-colors duration-150"
          >
            Vendor Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
