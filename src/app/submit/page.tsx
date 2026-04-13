import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Submit Data - Peply",
  description:
    "Submit anonymous compound experience data. Contributions are reviewed privately and may be used to improve reference information.",
};

export default function SubmitPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Community Data"
        title="Submit Experience Data"
        emphasisWord="Data"
        subtitle="Anonymous submissions are reviewed privately. No account required."
      />

      <p className="text-[12px] text-text-secondary mt-4 mb-8">
        This form collects anonymous experience data for educational reference
        purposes. Submissions are not published individually. Consult a licensed
        healthcare provider before using any compound.
      </p>

      <SubmitForm />
    </div>
  );
}
