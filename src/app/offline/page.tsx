import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Offline",
};

export default function OfflinePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[480px] px-6 py-24 text-center">
      <p className="font-serif italic text-4xl tracking-tight mb-6">Peply</p>
      <Card>
        <h1 className="text-base font-semibold mb-3">You are offline</h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          The calculator and compound reference are available offline.
          Features requiring an internet connection (Community submissions,
          Vendor Portal) will be available when you reconnect.
        </p>
        <Link
          href="/calculator"
          className="inline-block rounded-lg bg-accent text-white px-6 py-2.5 text-[14px] font-medium hover:bg-accent-hover transition-colors duration-150"
        >
          Open Calculator
        </Link>
      </Card>
    </div>
  );
}
