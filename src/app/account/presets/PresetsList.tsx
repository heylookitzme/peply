"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  deletePreset,
  type CalculatorPreset,
} from "@/lib/preferences/queries";
import { getCompoundBySlug } from "@/lib/constants/compounds";

export function PresetsList({
  presets: initial,
}: {
  presets: CalculatorPreset[];
}): React.ReactElement {
  const [presets, setPresets] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete(id: string): Promise<void> {
    setDeleting(id);
    try {
      await deletePreset(id);
      setPresets((prev) => prev.filter((p) => p.id !== id));
      startTransition(() => router.refresh());
    } finally {
      setDeleting(null);
    }
  }

  if (presets.length === 0) {
    return (
      <Card>
        <p className="text-[15px] mb-2">No saved presets yet.</p>
        <p className="text-[13px] text-text-secondary">
          Open the{" "}
          <Link href="/calculator" className="text-accent hover:underline">
            calculator
          </Link>
          , calculate a result, and tap &quot;Save this preset&quot; to store it
          here.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {presets.map((preset) => {
        const compound = preset.compound_slug
          ? getCompoundBySlug(preset.compound_slug)
          : null;
        return (
          <Card key={preset.id}>
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div>
                <h3 className="font-serif text-[22px] leading-tight">
                  {preset.name}
                </h3>
                {compound && (
                  <p className="text-[11px] uppercase tracking-[0.08em] text-accent font-semibold mt-1">
                    {compound.name}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/calculator?preset=${preset.id}`}
                  className="inline-flex items-center rounded-md border border-border px-3 py-2 text-[13px] text-text-secondary hover:text-text hover:border-text-secondary transition-colors duration-150"
                >
                  Load
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(preset.id)}
                  disabled={deleting === preset.id}
                  className="inline-flex items-center rounded-md border border-border px-3 py-2 text-[13px] text-text-secondary hover:text-error hover:border-error/50 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting === preset.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
                  Vial
                </dt>
                <dd className="font-mono mt-1">
                  {preset.vial_strength} {preset.vial_unit}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
                  BAC water
                </dt>
                <dd className="font-mono mt-1">{preset.diluent_volume} mL</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
                  Dose
                </dt>
                <dd className="font-mono mt-1">
                  {preset.target_dose} {preset.dose_unit}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-text-secondary">
                  Syringe
                </dt>
                <dd className="font-mono mt-1">
                  {preset.syringe_type ?? "—"}
                </dd>
              </div>
            </dl>
          </Card>
        );
      })}

      <div className="pt-2 flex justify-end">
        <Button type="button" variant="ghost" onClick={() => router.push("/calculator")}>
          Open calculator
        </Button>
      </div>
    </div>
  );
}
