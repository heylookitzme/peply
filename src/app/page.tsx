import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function HomePage(): React.ReactElement {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 text-center">
        <div className="mx-auto max-w-[720px] px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-3">
            Reconstitution Calculator
          </p>
          <h1 className="font-serif text-[40px] sm:text-[56px] leading-[1.1] tracking-tight mb-6">
            Precise dosing.
            <br />
            Every <em className="text-accent">time</em>.
          </h1>
          <p className="text-lg text-text-secondary max-w-[520px] mx-auto mb-8 leading-relaxed">
            Calculate reconstitution math for peptides and injectable
            medications. Concentration, draw volume, and syringe units with
            smart warnings.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/calculator"
              className="inline-block rounded-lg bg-accent text-white px-8 py-3.5 text-[15px] font-medium hover:bg-accent-hover transition-colors duration-150"
            >
              Open Calculator
            </Link>
            <Link
              href="/compounds"
              className="inline-block rounded-lg border border-border text-text px-8 py-3.5 text-[15px] font-medium hover:border-text-secondary transition-colors duration-150"
            >
              View Compounds
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[720px] px-6">
        <hr className="border-border" />
      </div>

      {/* Features */}
      <section className="py-16">
        <div className="mx-auto max-w-[960px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <h2 className="text-base font-semibold mb-2">Accurate Math</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Concentration, mL draw, and syringe unit outputs from any vial
                and diluent combination.
              </p>
            </Card>
            <Card>
              <h2 className="text-base font-semibold mb-2">Smart Warnings</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Alerts for low-accuracy draws, syringe overflow, and awkward
                dilution ratios.
              </p>
            </Card>
            <Card>
              <h2 className="text-base font-semibold mb-2">
                Transparent Results
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every calculation shows the formula inputs and outputs so you
                can verify the math.
              </p>
            </Card>
            <Card>
              <h2 className="text-base font-semibold mb-2">
                Regulatory Tracker
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                FDA Category 1 and Category 2 peptide status with
                reclassification timeline and compound-level tracking.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
