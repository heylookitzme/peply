import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeedbackForm } from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Submit feature requests, compound requests, and bug reports for Peply.",
  alternates: { canonical: "/feedback" },
};

export default async function FeedbackPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const isSignedIn = Boolean(authData.user);

  return (
    <div className="mx-auto max-w-[640px] px-6 py-12">
      <SectionHeader
        label="Feedback"
        title="Help shape Peply"
        emphasisWord="Peply"
        subtitle="Suggest features, request compounds, report bugs. We read every submission."
      />

      <div className="mt-8">
        <FeedbackForm isSignedIn={isSignedIn} />
      </div>
    </div>
  );
}
