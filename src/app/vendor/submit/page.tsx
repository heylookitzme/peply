import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VendorSubmitForm } from "./VendorSubmitForm";

export const metadata: Metadata = {
  title: "Vendor Portal",
  description: "Submit compound quality and testing data as a verified vendor.",
};

export default async function VendorSubmitPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/vendor/login");
  }

  // Check vendor account exists and verification status
  const { data: vendor } = await supabase
    .from("vendor_accounts")
    .select("business_name, verified")
    .eq("id", user.id)
    .single();

  if (!vendor) {
    redirect("/vendor/register");
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Vendor Portal"
        title="Submit Quality Data"
        emphasisWord="Quality"
        subtitle={`Logged in as ${vendor.business_name}`}
      />

      {!vendor.verified ? (
        <div className="mt-8 rounded-lg border border-warning/25 bg-warning/[0.08] px-5 py-6 text-center">
          <p className="text-sm font-medium text-warning mb-1">
            Account pending verification
          </p>
          <p className="text-[13px] text-text-secondary">
            Your vendor account is awaiting verification. You will be able to
            submit data once verified.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <VendorSubmitForm />
        </div>
      )}
    </div>
  );
}
