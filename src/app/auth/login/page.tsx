import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to Peply with a magic link. Accounts store calculator presets and favorites only — no health data.",
  alternates: { canonical: "/auth/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[480px] px-6 py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent mb-3">
        Account
      </p>
      <h1 className="font-serif text-[32px] leading-tight tracking-tight mb-3">
        Sign in to <em className="italic">Peply</em>
      </h1>
      <p className="text-[15px] text-text-secondary mb-8">
        Enter your email and we&apos;ll send you a one-time sign-in link. No
        password to remember.
      </p>

      <LoginForm />

      <p className="mt-8 text-[12px] text-text-secondary leading-relaxed">
        Peply accounts store your favorites and calculator presets only. No
        health or medical data is collected.
      </p>
    </div>
  );
}
