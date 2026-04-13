"use client";

import { Card } from "@/components/ui/Card";

export default function VendorError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <div className="mx-auto max-w-[480px] px-6 py-12">
      <Card>
        <div className="text-center py-8">
          <h2 className="text-base font-semibold mb-2">
            Vendor service unavailable
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            The authentication service is temporarily unreachable. Please try
            again in a few minutes.
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-[13px] text-accent hover:underline"
          >
            Try again
          </button>
        </div>
      </Card>
    </div>
  );
}
