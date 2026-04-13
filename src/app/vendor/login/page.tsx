import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Vendor Portal",
  description: "Log in to your vendor account to submit compound quality data.",
};

export default function VendorLoginPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[480px] px-6 py-12">
      <SectionHeader
        label="Vendors"
        title="Vendor Login"
        emphasisWord="Login"
      />
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
