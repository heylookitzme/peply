/**
 * Pure cost calculation helpers. No UI, no state — just math.
 */

export interface CompoundCostInput {
  compoundName: string;
  vialAmountMg: number;
  pricePerVial: number;
  targetDoseMg: number;
  dosesPerWeek: number;
  durationWeeks: number;
}

export interface CompoundCostResult {
  compoundName: string;
  totalMgNeeded: number;
  vialsNeeded: number;
  totalCost: number;
  costPerWeek: number;
}

export interface StackCostResult {
  compounds: CompoundCostResult[];
  grandTotal: number;
  totalPerWeek: number;
  totalPerMonth: number;
  durationWeeks: number;
}

export function calculateCompoundCost(input: CompoundCostInput): CompoundCostResult {
  const totalDoses = input.dosesPerWeek * input.durationWeeks;
  const totalMgNeeded = input.targetDoseMg * totalDoses;
  const vialsNeeded = Math.ceil(totalMgNeeded / input.vialAmountMg);
  const totalCost = vialsNeeded * input.pricePerVial;
  const costPerWeek = input.durationWeeks > 0 ? totalCost / input.durationWeeks : 0;

  return {
    compoundName: input.compoundName,
    totalMgNeeded,
    vialsNeeded,
    totalCost,
    costPerWeek,
  };
}

export function calculateStackCost(
  compounds: CompoundCostInput[],
  durationWeeks: number,
): StackCostResult {
  const results = compounds.map((c) =>
    calculateCompoundCost({ ...c, durationWeeks }),
  );

  const grandTotal = results.reduce((sum, r) => sum + r.totalCost, 0);
  const totalPerWeek = durationWeeks > 0 ? grandTotal / durationWeeks : 0;
  const totalPerMonth = totalPerWeek * (52 / 12);

  return {
    compounds: results,
    grandTotal,
    totalPerWeek,
    totalPerMonth,
    durationWeeks,
  };
}

/** Convert mcg dose to mg for consistent vial math. */
export function normalizeDoseToMg(dose: number, unit: "mg" | "mcg"): number {
  return unit === "mcg" ? dose / 1000 : dose;
}

/** Map frequency string to approximate doses per week. */
export function frequencyToDosesPerWeek(frequency: string): number {
  switch (frequency) {
    case "daily":
      return 7;
    case "twice_daily":
      return 14;
    case "3x_week":
      return 3;
    case "5x_week":
      return 5;
    case "weekly":
      return 1;
    case "twice_weekly":
      return 2;
    case "biweekly":
      return 0.5;
    default:
      return 7;
  }
}
