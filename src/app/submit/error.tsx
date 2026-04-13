"use client";

import { Card } from "@/components/ui/Card";

export default function SubmitError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <Card>
        <div className="text-center py-8">
          <h2 className="text-base font-semibold mb-2">
            Submission form unavailable
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            The submission service is temporarily unreachable. Your data has not
            been submitted. Please try again in a few minutes.
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
