import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PresetsList } from "./PresetsList";
import type { CalculatorPreset } from "@/lib/preferences/queries";

export const metadata: Metadata = {
  title: "Saved Presets",
  description: "Your saved calculator presets.",
  alternates: { canonical: "/account/presets" },
  robots: { index: false, follow: false },
};

export default async function PresetsPage(): Promise<React.ReactElement> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    redirect("/auth/login?next=/account/presets");
  }

  const { data } = await supabase
    .from("calculator_presets")
    .select("*")
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  const presets = (data ?? []) as CalculatorPreset[];

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-3">
        Account
      </p>
      <h1 className="font-serif text-[32px] leading-tight tracking-tight mb-3">
        Saved <em className="italic">Presets</em>
      </h1>
      <p className="text-[15px] text-text-secondary mb-8">
        Calculator configurations you&apos;ve saved. Load one to pre-fill the
        calculator.
      </p>

      <PresetsList presets={presets} />
    </div>
  );
}
