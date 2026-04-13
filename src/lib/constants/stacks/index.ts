import type { Stack } from "@/types/stack";
import { wolverine } from "./wolverine";
import { glow } from "./glow";
import { klow } from "./klow";
import { ghMuscle } from "./ghMuscle";
import { metabolicFatLoss } from "./metabolicFatLoss";

export const STACKS: readonly Stack[] = [
  wolverine,
  glow,
  klow,
  ghMuscle,
  metabolicFatLoss,
] as const;

export function getStackBySlug(slug: string): Stack | undefined {
  return STACKS.find((s) => s.slug === slug);
}

export { wolverine, glow, klow, ghMuscle, metabolicFatLoss };
