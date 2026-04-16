import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack Calculator",
  description:
    "Calculate reconstitution for multi-compound stack protocols. Get concentration, draw volume, and syringe units for every compound in a stack.",
};

export default function StackCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
