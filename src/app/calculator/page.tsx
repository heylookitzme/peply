import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CalculatorForm,
  type CalculatorInitialValues,
} from "@/components/calculator/CalculatorForm";
import { createClient } from "@/utils/supabase/server";
import type { DoseUnit, SyringeType } from "@/types/calculator";

export const metadata: Metadata = {
  title: "Reconstitution Calculator",
  description:
    "Peptide reconstitution calculator. Enter vial amount, diluent volume, and target dose for concentration, draw volume, and syringe unit outputs.",
};

interface CalculatorPageProps {
  searchParams: Promise<{ preset?: string; compound?: string }>;
}

async function loadPreset(
  presetId: string,
): Promise<CalculatorInitialValues | null> {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return null;
  const { data } = await supabase
    .from("calculator_presets")
    .select("*")
    .eq("id", presetId)
    .eq("user_id", authData.user.id)
    .maybeSingle();
  if (!data) return null;
  return {
    compoundSlug: data.compound_slug,
    vialAmount: String(data.vial_strength),
    vialAmountUnit: data.vial_unit as DoseUnit,
    diluentVolumeMl: String(data.diluent_volume),
    targetDose: String(data.target_dose),
    targetDoseUnit: data.dose_unit as DoseUnit,
    syringeType: (data.syringe_type as SyringeType) ?? "u100_1ml",
  };
}

export default async function CalculatorPage({
  searchParams,
}: CalculatorPageProps): Promise<React.ReactElement> {
  const { preset, compound } = await searchParams;
  const initialValues = preset ? await loadPreset(preset) : null;
  const compoundSlug = !initialValues && compound ? compound : undefined;

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Calculator"
        title="Reconstitution Calculator"
        emphasisWord="Calculator"
        subtitle="Enter your vial and dosing details to calculate concentration, draw volume, and syringe units."
      />
      {initialValues && (
        <p className="mt-4 text-[13px] text-text-secondary">
          Loaded from preset. Edit values below and recalculate if needed.
        </p>
      )}
      <div className="mt-8">
        <CalculatorForm
          initialValues={
            initialValues ?? (compoundSlug ? { compoundSlug } : undefined)
          }
        />
      </div>

      <div className="mt-12 flex items-center justify-center gap-6 text-[13px]">
        <Link href="/calculator/stacks" className="text-accent hover:underline">
          Calculate a full stack &rarr;
        </Link>
        <Link href="/calculator/cost" className="text-accent hover:underline">
          Estimate protocol costs &rarr;
        </Link>
      </div>
    </div>
  );
}
