"use client";

import { useState, useCallback } from "react";
import { z } from "zod/v4";
import type {
  CalculatorInput,
  CalculatorResult,
  DoseUnit,
  SyringeType,
} from "@/types/calculator";
import { SYRINGE_TYPES } from "@/types/calculator";
import type { Compound } from "@/types/content";
import { COMPOUNDS } from "@/lib/constants/compounds";
import { calculate } from "@/lib/calculations";
import { Button } from "@/components/ui/Button";
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

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-text-secondary/50 focus:border-accent focus:outline-none transition-colors duration-150";

const selectClass =
  "rounded-lg border border-border bg-surface px-3 py-3 text-[15px] text-text focus:border-accent focus:outline-none transition-colors duration-150";

export function CalculatorForm(): React.ReactElement {
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
  const [vialAmount, setVialAmount] = useState("");
  const [vialAmountUnit, setVialAmountUnit] = useState<DoseUnit>("mg");
  const [diluentVolumeMl, setDiluentVolumeMl] = useState("");
  const [targetDose, setTargetDose] = useState("");
  const [targetDoseUnit, setTargetDoseUnit] = useState<DoseUnit>("mg");
  const [syringeType, setSyringeType] = useState<SyringeType>("u100_1ml");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompoundChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const slug = e.target.value;
      if (!slug) {
        setSelectedCompound(null);
        return;
      }
      const compound = COMPOUNDS.find((c) => c.slug === slug) ?? null;
      setSelectedCompound(compound);
      if (compound) {
        const vial = compound.commonVialSizes[0];
        if (vial) {
          setVialAmount(String(vial.amount));
          setVialAmountUnit(vial.unit);
        }
        setDiluentVolumeMl(String(compound.defaultBacWaterMl));
        setTargetDoseUnit(compound.clinicalDoseRange.unit);
        setTargetDose("");
        setResult(null);
        setError(null);
      }
    },
    [],
  );

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
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message ?? "Invalid input.");
      } else {
        setError(err instanceof Error ? err.message : "Calculation failed.");
      }
    }
  }, [
    vialAmount,
    vialAmountUnit,
    diluentVolumeMl,
    targetDose,
    targetDoseUnit,
    syringeType,
  ]);

  const doseHint = selectedCompound
    ? `${selectedCompound.clinicalDoseRange.min}-${selectedCompound.clinicalDoseRange.max} ${selectedCompound.clinicalDoseRange.unit} ${selectedCompound.clinicalDoseRange.frequencyLabel.toLowerCase()}`
    : null;

  return (
    <div className="space-y-8">
      {/* Compound Selector */}
      <div className="space-y-1.5">
        <label
          htmlFor="compound"
          className="block text-[13px] font-medium text-text-secondary"
        >
          Compound (optional)
        </label>
        <select
          id="compound"
          value={selectedCompound?.slug ?? ""}
          onChange={handleCompoundChange}
          className={`w-full ${selectClass}`}
        >
          <option value="">Custom / Manual Entry</option>
          {COMPOUNDS.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} ({c.clinicalDoseRange.min}-{c.clinicalDoseRange.max} {c.clinicalDoseRange.unit})
            </option>
          ))}
        </select>
      </div>

      {/* Form Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Vial Amount */}
        <div className="space-y-1.5">
          <label
            htmlFor="vialAmount"
            className="block text-[13px] font-medium text-text-secondary"
          >
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
              className={`flex-1 ${inputClass}`}
            />
            <select
              aria-label="Vial amount unit"
              value={vialAmountUnit}
              onChange={(e) => setVialAmountUnit(e.target.value as DoseUnit)}
              className={`w-20 ${selectClass}`}
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
        <div className="space-y-1.5">
          <label
            htmlFor="diluentVolumeMl"
            className="block text-[13px] font-medium text-text-secondary"
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
            className={inputClass}
          />
        </div>

        {/* Target Dose */}
        <div className="space-y-1.5">
          <label
            htmlFor="targetDose"
            className="block text-[13px] font-medium text-text-secondary"
          >
            Target Dose
          </label>
          <div className="flex gap-2">
            <input
              id="targetDose"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder={
                selectedCompound
                  ? `e.g. ${selectedCompound.clinicalDoseRange.min}`
                  : "e.g. 0.25"
              }
              value={targetDose}
              onChange={(e) => setTargetDose(e.target.value)}
              className={`flex-1 ${inputClass}`}
            />
            <select
              aria-label="Target dose unit"
              value={targetDoseUnit}
              onChange={(e) => setTargetDoseUnit(e.target.value as DoseUnit)}
              className={`w-20 ${selectClass}`}
            >
              {DOSE_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {doseHint && (
            <p className="text-[12px] text-text-secondary">
              Clinical range: {doseHint}
            </p>
          )}
        </div>

        {/* Syringe Type */}
        <div className="space-y-1.5">
          <label
            htmlFor="syringeType"
            className="block text-[13px] font-medium text-text-secondary"
          >
            Syringe Type
          </label>
          <select
            id="syringeType"
            value={syringeType}
            onChange={(e) => setSyringeType(e.target.value as SyringeType)}
            className={`w-full ${selectClass}`}
          >
            {SYRINGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calculate Button */}
      <Button type="button" variant="primary" fullWidth onClick={handleCalculate}>
        Calculate
      </Button>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-error/25 bg-error/[0.08] px-5 py-4 text-sm text-error"
        >
          {error}
        </div>
      )}

      {/* Results + Warnings */}
      {result && (
        <div className="space-y-6">
          <CalculatorResults result={result} />
          <CalculatorWarnings warnings={result.warnings} />
        </div>
      )}
    </div>
  );
}
