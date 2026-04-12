"use client";

import { useState, useCallback } from "react";
import type {
  CalculatorInput,
  CalculatorResult,
  DoseUnit,
  SyringeType,
} from "@/types/calculator";
import { SYRINGE_TYPES } from "@/types/calculator";
import { calculate } from "@/lib/calculations";
import { CalculatorResults } from "./CalculatorResults";
import { CalculatorWarnings } from "./CalculatorWarnings";

const SYRINGE_OPTIONS: { value: SyringeType; label: string }[] = (
  Object.entries(SYRINGE_TYPES) as [SyringeType, (typeof SYRINGE_TYPES)[SyringeType]][]
).map(([key, config]) => ({
  value: key,
  label: config.label,
}));

const DOSE_UNIT_OPTIONS: { value: DoseUnit; label: string }[] = [
  { value: "mg", label: "mg" },
  { value: "mcg", label: "mcg" },
];

export function CalculatorForm(): React.ReactElement {
  const [vialAmount, setVialAmount] = useState("");
  const [vialAmountUnit, setVialAmountUnit] = useState<DoseUnit>("mg");
  const [diluentVolumeMl, setDiluentVolumeMl] = useState("");
  const [targetDose, setTargetDose] = useState("");
  const [targetDoseUnit, setTargetDoseUnit] = useState<DoseUnit>("mg");
  const [syringeType, setSyringeType] = useState<SyringeType>("u100_1ml");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    setError(null);
    setResult(null);

    const vialNum = parseFloat(vialAmount);
    const diluentNum = parseFloat(diluentVolumeMl);
    const doseNum = parseFloat(targetDose);

    if (isNaN(vialNum) || isNaN(diluentNum) || isNaN(doseNum)) {
      setError("Please fill in all fields with valid numbers.");
      return;
    }

    const input: CalculatorInput = {
      vialAmount: vialNum,
      vialAmountUnit,
      diluentVolumeMl: diluentNum,
      targetDose: doseNum,
      targetDoseUnit,
      syringeType,
    };

    try {
      const calcResult = calculate(input);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed.");
    }
  }, [
    vialAmount,
    vialAmountUnit,
    diluentVolumeMl,
    targetDose,
    targetDoseUnit,
    syringeType,
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Vial Amount */}
        <div className="space-y-2">
          <label htmlFor="vialAmount" className="block text-sm font-medium">
            Vial Amount
          </label>
          <div className="flex gap-2">
            <input
              id="vialAmount"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="e.g. 5"
              value={vialAmount}
              onChange={(e) => setVialAmount(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <select
              aria-label="Vial amount unit"
              value={vialAmountUnit}
              onChange={(e) => setVialAmountUnit(e.target.value as DoseUnit)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            >
              {DOSE_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Diluent Volume */}
        <div className="space-y-2">
          <label
            htmlFor="diluentVolumeMl"
            className="block text-sm font-medium"
          >
            Diluent Volume (mL)
          </label>
          <input
            id="diluentVolumeMl"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="e.g. 2"
            value={diluentVolumeMl}
            onChange={(e) => setDiluentVolumeMl(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>

        {/* Target Dose */}
        <div className="space-y-2">
          <label htmlFor="targetDose" className="block text-sm font-medium">
            Target Dose
          </label>
          <div className="flex gap-2">
            <input
              id="targetDose"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="e.g. 0.25"
              value={targetDose}
              onChange={(e) => setTargetDose(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />
            <select
              aria-label="Target dose unit"
              value={targetDoseUnit}
              onChange={(e) => setTargetDoseUnit(e.target.value as DoseUnit)}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
            >
              {DOSE_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Syringe Type */}
        <div className="space-y-2">
          <label htmlFor="syringeType" className="block text-sm font-medium">
            Syringe Type
          </label>
          <select
            id="syringeType"
            value={syringeType}
            onChange={(e) => setSyringeType(e.target.value as SyringeType)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          >
            {SYRINGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full rounded-lg bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Calculate
      </button>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <CalculatorResults result={result} />
          <CalculatorWarnings warnings={result.warnings} />
        </div>
      )}
    </div>
  );
}
