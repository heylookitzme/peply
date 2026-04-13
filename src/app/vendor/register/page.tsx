import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Vendor Portal",
  description: "Register as a vendor to submit compound quality data.",
};

export default function VendorRegisterPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[480px] px-6 py-12">
      <SectionHeader
        label="Vendors"
        title="Vendor Registration"
        emphasisWord="Registration"
        subtitle="Register to submit compound quality and testing data."
      />
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
