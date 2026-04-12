export default function HomePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Peptide Reconstitution Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Calculate accurate reconstitution math for peptides and injectable
          medications. Get concentration, draw volume, and syringe unit outputs
          with smart warnings.
        </p>
        <div className="pt-4">
          <a
            href="/calculator"
            className="inline-block rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Open Calculator
          </a>
        </div>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <div className="space-y-2">
          <h2 className="font-semibold">Accurate Math</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Concentration, mL draw, and syringe unit outputs from any vial and
            diluent combination.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold">Smart Warnings</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Alerts for low-accuracy draws, syringe overflow, and awkward
            dilution ratios.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold">Transparent Results</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Every calculation shows the formula inputs and outputs so you can
            verify the math.
          </p>
        </div>
      </div>
    </div>
  );
}
