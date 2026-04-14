"use client";

import { useState, useCallback, useMemo } from "react";
import type { Stack } from "@/types/stack";
import type { Compound } from "@/types/content";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import {
  calculateStackCost,
  normalizeDoseToMg,
  frequencyToDosesPerWeek,
  type StackCostResult,
} from "@/lib/calculations/costCalculator";
import { formatDoseRange } from "@/lib/formatDoseRange";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CostRow {
  compound: Compound;
  role: string;
  vialAmountMg: number;
  vialLabel: string;
  pricePerVial: string;
  targetDoseMg: number;
  targetDoseDisplay: string;
  doseUnit: "mg" | "mcg";
  dosesPerWeek: number;
}

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

function buildRowsFromStack(stack: Stack): CostRow[] {
  return stack.compounds
    .map((sc) => {
      const compound = getCompoundBySlug(sc.compoundId);
      if (!compound) return null;

      const vial = compound.commonVialSizes[0];
      const dose = compound.clinicalDoseRange;
      const targetDose = dose.min;
      const vialMg = vial ? normalizeDoseToMg(vial.amount, vial.unit) : 0;

      return {
        compound,
        role: sc.role,
        vialAmountMg: vialMg,
        vialLabel: vial?.label ?? "",
        pricePerVial: "",
        targetDoseMg: normalizeDoseToMg(targetDose, dose.unit),
        targetDoseDisplay: String(targetDose),
        doseUnit: dose.unit,
        dosesPerWeek: frequencyToDosesPerWeek(dose.frequency),
      } satisfies CostRow;
    })
    .filter((r): r is CostRow => r !== null);
}

function buildRowFromCompound(compound: Compound): CostRow {
  const vial = compound.commonVialSizes[0];
  const dose = compound.clinicalDoseRange;
  const vialMg = vial ? normalizeDoseToMg(vial.amount, vial.unit) : 0;

  return {
    compound,
    role: "",
    vialAmountMg: vialMg,
    vialLabel: vial?.label ?? "",
    pricePerVial: "",
    targetDoseMg: normalizeDoseToMg(dose.min, dose.unit),
    targetDoseDisplay: String(dose.min),
    doseUnit: dose.unit,
    dosesPerWeek: frequencyToDosesPerWeek(dose.frequency),
  };
}

interface CostCalculatorProps {
  stack?: Stack;
  compound?: Compound;
}

export function CostCalculator({
  stack,
  compound,
}: CostCalculatorProps): React.ReactElement {
  const [rows, setRows] = useState<CostRow[]>(() => {
    if (stack) return buildRowsFromStack(stack);
    if (compound) return [buildRowFromCompound(compound)];
    return [];
  });

  const [durationWeeks, setDurationWeeks] = useState("8");
  const [result, setResult] = useState<StackCostResult | null>(null);

  const updateRow = useCallback(
    (index: number, field: string, value: string) => {
      setRows((prev) =>
        prev.map((row, i) => {
          if (i !== index) return row;

          if (field === "pricePerVial") {
            return { ...row, pricePerVial: value };
          }
          if (field === "targetDose") {
            const num = parseFloat(value) || 0;
            return {
              ...row,
              targetDoseDisplay: value,
              targetDoseMg: normalizeDoseToMg(num, row.doseUnit),
            };
          }
          if (field === "vialSize") {
            const vial = row.compound.commonVialSizes.find(
              (v) => v.label === value,
            );
            if (vial) {
              return {
                ...row,
                vialAmountMg: normalizeDoseToMg(vial.amount, vial.unit),
                vialLabel: vial.label,
              };
            }
          }
          return row;
        }),
      );
      setResult(null);
    },
    [],
  );

  const resetDefaults = useCallback(() => {
    if (stack) {
      setRows(buildRowsFromStack(stack));
    } else if (compound) {
      setRows([buildRowFromCompound(compound)]);
    }
    setDurationWeeks("8");
    setResult(null);
  }, [stack, compound]);

  const handleCalculate = useCallback(() => {
    const dur = parseInt(durationWeeks, 10);
    if (isNaN(dur) || dur <= 0) return;

    const missingPrice = rows.some(
      (r) => !r.pricePerVial || parseFloat(r.pricePerVial) <= 0,
    );
    if (missingPrice) return;

    const inputs = rows.map((r) => ({
      compoundName: r.compound.name,
      vialAmountMg: r.vialAmountMg,
      pricePerVial: parseFloat(r.pricePerVial),
      targetDoseMg: r.targetDoseMg,
      dosesPerWeek: r.dosesPerWeek,
      durationWeeks: dur,
    }));

    setResult(calculateStackCost(inputs, dur));
  }, [rows, durationWeeks]);

  const allPricesFilled = rows.every(
    (r) => r.pricePerVial && parseFloat(r.pricePerVial) > 0,
  );

  return (
    <div className="space-y-6">
      {/* Per-compound inputs */}
      {rows.map((row, i) => (
        <Card key={row.compound.slug} padding="sm">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-medium">{row.compound.name}</h3>
              {row.role && (
                <p className="text-[11px] text-accent uppercase tracking-[0.08em]">
                  {row.role}
                </p>
              )}
            </div>
            <span className="text-[11px] text-text-secondary">
              {formatDoseRange(row.compound.clinicalDoseRange)}{" "}
              {row.compound.clinicalDoseRange.frequencyLabel.toLowerCase()}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">
                Vial size
              </label>
              <select
                value={row.vialLabel}
                onChange={(e) => updateRow(i, "vialSize", e.target.value)}
                className={`w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text focus:border-accent focus:outline-none transition-colors duration-150`}
              >
                {row.compound.commonVialSizes.map((v) => (
                  <option key={v.label} value={v.label}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">
                Target dose ({row.doseUnit})
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={row.targetDoseDisplay}
                onChange={(e) => updateRow(i, "targetDose", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">
                Price per vial ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={row.pricePerVial}
                onChange={(e) => updateRow(i, "pricePerVial", e.target.value)}
                placeholder="e.g. 45.00"
                className={inputClass}
              />
            </div>
          </div>
        </Card>
      ))}

      {/* Duration */}
      <div className="flex items-center gap-3">
        <label className="text-[12px] text-text-secondary shrink-0">
          Protocol duration:
        </label>
        <input
          type="number"
          inputMode="numeric"
          min="1"
          max="52"
          value={durationWeeks}
          onChange={(e) => {
            setDurationWeeks(e.target.value);
            setResult(null);
          }}
          className="w-20 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text focus:border-accent focus:outline-none transition-colors duration-150"
        />
        <span className="text-[12px] text-text-secondary">weeks</span>
        <button
          type="button"
          onClick={resetDefaults}
          className="ml-auto text-[12px] text-text-secondary hover:text-accent transition-colors duration-150"
        >
          Reset defaults
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-[12px] text-text-secondary text-center">
        Prices vary by vendor and location. Peply does not sell compounds or
        endorse vendors. This is an estimation tool only.
      </p>

      <Button
        type="button"
        variant="primary"
        fullWidth
        onClick={handleCalculate}
        disabled={!allPricesFilled}
      >
        {allPricesFilled ? "Estimate Cost" : "Enter prices to estimate"}
      </Button>

      {/* Results */}
      {result && (
        <Card className="border-accent/20">
          <h3 className="text-sm font-semibold mb-3">Cost Estimate</h3>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-3 py-2 border-b border-border">
                    Compound
                  </th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-right px-3 py-2 border-b border-border">
                    Total needed
                  </th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-right px-3 py-2 border-b border-border">
                    Vials
                  </th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-right px-3 py-2 border-b border-border">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.compounds.map((r) => (
                  <tr key={r.compoundName}>
                    <td className="px-3 py-2 border-b border-border">
                      {r.compoundName}
                    </td>
                    <td className="px-3 py-2 border-b border-border font-mono text-right">
                      {r.totalMgNeeded < 1
                        ? `${(r.totalMgNeeded * 1000).toFixed(0)} mcg`
                        : `${r.totalMgNeeded.toFixed(1)} mg`}
                    </td>
                    <td className="px-3 py-2 border-b border-border font-mono text-right">
                      {r.vialsNeeded}
                    </td>
                    <td className="px-3 py-2 border-b border-border font-mono text-right">
                      ${r.totalCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-[13px]">
            <div className="text-center p-3 rounded-md bg-surface-alt/50">
              <p className="text-[11px] text-text-secondary uppercase tracking-[0.08em] mb-1">
                Total
              </p>
              <p className="font-mono text-lg font-medium">
                ${result.grandTotal.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-3 rounded-md bg-surface-alt/50">
              <p className="text-[11px] text-text-secondary uppercase tracking-[0.08em] mb-1">
                Per week
              </p>
              <p className="font-mono text-lg font-medium">
                ${result.totalPerWeek.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-3 rounded-md bg-surface-alt/50">
              <p className="text-[11px] text-text-secondary uppercase tracking-[0.08em] mb-1">
                Per month
              </p>
              <p className="font-mono text-lg font-medium">
                ${result.totalPerMonth.toFixed(2)}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-text-secondary mt-3 text-center">
            {result.durationWeeks}-week protocol. Vial counts rounded up.
          </p>
        </Card>
      )}
    </div>
  );
}
