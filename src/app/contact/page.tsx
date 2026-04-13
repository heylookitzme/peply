import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact - Peply",
  description:
    "Contact Peply for general inquiries, vendor partnerships, data requests, or bug reports.",
};

export default function ContactPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[480px] px-6 py-12">
      <SectionHeader
        label="Contact"
        title="Get in Touch"
        emphasisWord="Touch"
        subtitle="Questions, feedback, or partnership inquiries."
      />
      <p className="text-[12px] text-text-secondary mt-2 mb-8">
        For privacy and data requests specifically, you can also reach us at{" "}
        <a href="mailto:privacy@peply.bio" className="text-accent hover:underline">
          privacy@peply.bio
        </a>
      </p>
      <ContactForm />
    </div>
  );
}
