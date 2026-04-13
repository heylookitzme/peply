"use client";

import { useState, useCallback, useMemo } from "react";
import type { Stack } from "@/types/stack";
import type { Compound } from "@/types/content";
import type {
  CalculatorInput,
  CalculatorResult,
  DoseUnit,
  SyringeType,
} from "@/types/calculator";
import { SYRINGE_TYPES } from "@/types/calculator";
import { getCompoundBySlug } from "@/lib/constants/compounds";
import { calculate } from "@/lib/calculations";
import { formatDoseRange } from "@/lib/formatDoseRange";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CompoundRow {
  compound: Compound;
  role: string;
  dosing: string;
  vialAmount: string;
  vialAmountUnit: DoseUnit;
  diluentMl: string;
  targetDose: string;
  targetDoseUnit: DoseUnit;
}

interface CompoundResult {
  compoundName: string;
  result: CalculatorResult | null;
  error: string | null;
}

const SYRINGE_OPTIONS: { value: SyringeType; label: string }[] = (
  Object.entries(SYRINGE_TYPES) as [SyringeType, (typeof SYRINGE_TYPES)[SyringeType]][]
).map(([key, config]) => ({
  value: key,
  label: config.label,
}));

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

const selectClass =
  "rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text focus:border-accent focus:outline-none transition-colors duration-150";

function buildInitialRows(stack: Stack): CompoundRow[] {
  return stack.compounds
    .map((sc) => {
      const compound = getCompoundBySlug(sc.compoundId);
      if (!compound) return null;

      const vial = compound.commonVialSizes[0];
      const doseRange = compound.clinicalDoseRange;

      return {
        compound,
        role: sc.role,
        dosing: sc.dosing,
        vialAmount: vial ? String(vial.amount) : "",
        vialAmountUnit: vial ? vial.unit : ("mg" as DoseUnit),
        diluentMl: String(compound.defaultBacWaterMl),
        targetDose: String(doseRange.min),
        targetDoseUnit: doseRange.unit,
      } satisfies CompoundRow;
    })
    .filter((r): r is CompoundRow => r !== null);
}

interface StackCalculatorProps {
  stack: Stack;
}

export function StackCalculator({ stack }: StackCalculatorProps): React.ReactElement {
  const [rows, setRows] = useState<CompoundRow[]>(() => buildInitialRows(stack));
  const [syringeType, setSyringeType] = useState<SyringeType>("u100_1ml");
  const [results, setResults] = useState<CompoundResult[]>([]);
  const [calculated, setCalculated] = useState(false);

  const updateRow = useCallback(
    (index: number, field: keyof CompoundRow, value: string) => {
      setRows((prev) =>
        prev.map((row, i) =>
          i === index ? { ...row, [field]: value } : row,
        ),
      );
      setCalculated(false);
    },
    [],
  );

  const handleCalculate = useCallback(() => {
    const compoundResults: CompoundResult[] = rows.map((row) => {
      const vialNum = parseFloat(row.vialAmount);
      const diluentNum = parseFloat(row.diluentMl);
      const doseNum = parseFloat(row.targetDose);

      if (isNaN(vialNum) || isNaN(diluentNum) || isNaN(doseNum)) {
        return {
          compoundName: row.compound.name,
          result: null,
          error: "Fill in all fields",
        };
      }

      try {
        const input: CalculatorInput = {
          vialAmount: vialNum,
          vialAmountUnit: row.vialAmountUnit,
          diluentVolumeMl: diluentNum,
          targetDose: doseNum,
          targetDoseUnit: row.targetDoseUnit,
          syringeType,
        };
        return {
          compoundName: row.compound.name,
          result: calculate(input),
          error: null,
        };
      } catch {
        return {
          compoundName: row.compound.name,
          result: null,
          error: "Calculation error",
        };
      }
    });

    setResults(compoundResults);
    setCalculated(true);
  }, [rows, syringeType]);

  // Combined summary
  const summary = useMemo(() => {
    if (!calculated || results.length === 0) return null;

    const validResults = results.filter((r) => r.result !== null);
    if (validResults.length === 0) return null;

    const totalDrawMl = validResults.reduce(
      (sum, r) => sum + (r.result?.drawVolumeMl ?? 0),
      0,
    );

    const syringeConfig = SYRINGE_TYPES[syringeType];
    const injectionsNeeded = Math.ceil(totalDrawMl / syringeConfig.totalMl);
    const overflowWarning = totalDrawMl > syringeConfig.totalMl;

    // Check for different dosing frequencies
    const frequencies = new Set(rows.map((r) => r.compound.clinicalDoseRange.frequency));
    const mixedFrequencies = frequencies.size > 1;

    return {
      totalDrawMl,
      injectionsNeeded,
      overflowWarning,
      mixedFrequencies,
      validCount: validResults.length,
      totalCount: results.length,
    };
  }, [calculated, results, syringeType, rows]);

  return (
    <div className="space-y-6">
      {/* Per-compound inputs */}
      {rows.map((row, i) => (
        <Card key={row.compound.slug} padding="sm">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-medium">{row.compound.name}</h3>
              <p className="text-[11px] text-accent uppercase tracking-[0.08em]">
                {row.role}
              </p>
            </div>
            <span className="text-[11px] text-text-secondary">
              {formatDoseRange(row.compound.clinicalDoseRange)}{" "}
              {row.compound.clinicalDoseRange.frequencyLabel.toLowerCase()}
            </span>
          </div>

          <p className="text-[11px] text-text-secondary mb-3 italic">
            Protocol: {row.dosing}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">
                Vial
              </label>
              <select
                value={`${row.vialAmount}-${row.vialAmountUnit}`}
                onChange={(e) => {
                  const [amt, unit] = e.target.value.split("-");
                  updateRow(i, "vialAmount", amt);
                  updateRow(i, "vialAmountUnit", unit as DoseUnit);
                }}
                className={`w-full ${selectClass}`}
              >
                {row.compound.commonVialSizes.map((v) => (
                  <option key={v.label} value={`${v.amount}-${v.unit}`}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">
                BAC water (mL)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={row.diluentMl}
                onChange={(e) => updateRow(i, "diluentMl", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[11px] text-text-secondary mb-1">
                Target dose ({row.targetDoseUnit})
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={row.targetDose}
                onChange={(e) => updateRow(i, "targetDose", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Per-compound result */}
          {calculated && results[i] && (
            <div className="mt-3 pt-3 border-t border-border">
              {results[i].error ? (
                <p className="text-[12px] text-error">{results[i].error}</p>
              ) : results[i].result ? (
                <div className="flex flex-wrap gap-4 text-[12px]">
                  <span>
                    <span className="text-text-secondary">Concentration:</span>{" "}
                    <span className="font-mono font-medium">
                      {results[i].result!.concentrationPerMl.toFixed(2)}{" "}
                      {results[i].result!.concentrationUnit}/mL
                    </span>
                  </span>
                  <span>
                    <span className="text-text-secondary">Draw:</span>{" "}
                    <span className="font-mono font-medium">
                      {results[i].result!.drawVolumeMl.toFixed(2)} mL
                    </span>
                  </span>
                  <span>
                    <span className="text-text-secondary">Units:</span>{" "}
                    <span className="font-mono font-medium">
                      {Math.round(results[i].result!.syringeUnits)}
                    </span>
                  </span>
                </div>
              ) : null}
              {results[i].result?.warnings.map((w) => (
                <p
                  key={w.code}
                  className={`text-[11px] mt-1 ${
                    w.severity === "critical"
                      ? "text-error"
                      : w.severity === "warning"
                        ? "text-warning"
                        : "text-info"
                  }`}
                >
                  {w.message}
                </p>
              ))}
            </div>
          )}
        </Card>
      ))}

      {/* Syringe type */}
      <div className="flex items-center gap-3">
        <label className="text-[12px] text-text-secondary shrink-0">
          Syringe type:
        </label>
        <select
          value={syringeType}
          onChange={(e) => {
            setSyringeType(e.target.value as SyringeType);
            setCalculated(false);
          }}
          className={selectClass}
        >
          {SYRINGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Disclaimer + Calculate */}
      <p className="text-[12px] text-text-secondary text-center">
        This calculator performs mathematical conversions only. Verify all
        results independently. Not a substitute for professional medical
        guidance.
      </p>

      <Button type="button" variant="primary" fullWidth onClick={handleCalculate}>
        Calculate Stack
      </Button>

      {/* Combined Summary */}
      {summary && (
        <Card className="border-accent/20">
          <h3 className="text-sm font-semibold mb-3">Combined Summary</h3>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-3 py-2 border-b border-border">
                    Compound
                  </th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-3 py-2 border-b border-border">
                    Dose
                  </th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-3 py-2 border-b border-border">
                    Draw
                  </th>
                  <th className="text-[11px] uppercase tracking-[0.08em] text-text-secondary font-medium text-left px-3 py-2 border-b border-border">
                    Units
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 border-b border-border">
                      {r.compoundName}
                    </td>
                    <td className="px-3 py-2 border-b border-border font-mono">
                      {r.result
                        ? `${rows[i].targetDose} ${rows[i].targetDoseUnit}`
                        : "—"}
                    </td>
                    <td className="px-3 py-2 border-b border-border font-mono">
                      {r.result ? `${r.result.drawVolumeMl.toFixed(2)} mL` : "—"}
                    </td>
                    <td className="px-3 py-2 border-b border-border font-mono">
                      {r.result ? Math.round(r.result.syringeUnits) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-[13px]">
            <div>
              <span className="text-text-secondary">Total draw volume:</span>{" "}
              <span className="font-mono font-medium">
                {summary.totalDrawMl.toFixed(2)} mL
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Injections needed:</span>{" "}
              <span className="font-mono font-medium">
                {summary.injectionsNeeded}
              </span>
            </div>
          </div>

          {/* Stack-specific warnings */}
          {summary.overflowWarning && (
            <div className="mt-3 rounded-md border border-warning/25 bg-warning/[0.08] px-3 py-2 text-[12px] text-warning">
              Combined volume ({summary.totalDrawMl.toFixed(2)} mL) exceeds
              syringe capacity. Split into {summary.injectionsNeeded} separate
              injections.
            </div>
          )}
          {summary.mixedFrequencies && (
            <div className="mt-2 rounded-md border border-info/25 bg-info/[0.08] px-3 py-2 text-[12px] text-info">
              These compounds have different dosing schedules. Refer to the
              protocol above for timing.
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
