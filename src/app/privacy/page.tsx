import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacy Policy - Peply",
  description:
    "Privacy policy for Peply. What data is collected, how it is stored, and how it is used.",
};

export default function PrivacyPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-12">
      <SectionHeader
        label="Legal"
        title="Privacy Policy"
        emphasisWord="Privacy"
      />
      <p className="text-[12px] text-text-secondary mt-2 mb-8">
        Last updated: April 13, 2026
      </p>

      <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            What Data Is Collected
          </h2>
          <p className="mb-2">
            <strong className="text-text">Anonymous submissions:</strong>{" "}
            Compound selection, dosing details, reported effects, and optional
            bloodwork data. A hashed version of your IP address is stored for
            rate limiting only. The raw IP address is never stored.
          </p>
          <p>
            <strong className="text-text">Vendor accounts:</strong>{" "}
            Email address, password (encrypted by Supabase Auth), business
            name, license number, and contact email. Submitted quality data
            including batch numbers, purity percentages, and certificates of
            analysis.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            How Data Is Stored
          </h2>
          <p>
            All data is stored in Supabase (PostgreSQL), hosted in the United
            States. Data is encrypted in transit (TLS) and at rest. Anonymous
            submissions are stored in a private table with no public read
            access. Vendor data is accessible only to the vendor who submitted
            it and to Peply administrators.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            How Data Is Used
          </h2>
          <p>
            Submission data may be used in aggregate to improve compound
            reference information and identify data quality patterns.
            Individual submissions are never published. Vendor identities are
            never disclosed without explicit consent.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            What We Do Not Do
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>We do not sell or share individual submission data</li>
            <li>We do not track users beyond rate-limit IP hashing</li>
            <li>We do not use third-party analytics or advertising trackers</li>
            <li>We do not correlate anonymous submissions with identities</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Cookies and Sessions
          </h2>
          <p>
            Peply uses a theme preference cookie (localStorage) for dark/light
            mode. Vendor accounts use Supabase Auth session cookies for
            authentication. No third-party cookies are used. The calculator and
            compound reference pages function without any cookies.
          </p>
        </Card>

        <Card>
          <h2 className="text-base font-semibold text-text mb-3">
            Data Requests
          </h2>
          <p>
            To request deletion of vendor account data or to inquire about
            data practices, contact:{" "}
            <a
              href="mailto:privacy@peply.bio"
              className="text-accent hover:underline"
            >
              privacy@peply.bio
            </a>
          </p>
          <p className="mt-2">
            Anonymous submissions cannot be traced to individuals and therefore
            cannot be individually deleted.
          </p>
        </Card>
      </div>
    </div>
  );
}
