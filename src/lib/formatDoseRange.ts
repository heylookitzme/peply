import type { DoseRange } from "@/types/content";

export function formatDoseRange(range: DoseRange): string {
  const value =
    range.min === range.max
      ? `${range.min}`
      : `${range.min}-${range.max}`;
  return `${value} ${range.unit}`;
}
