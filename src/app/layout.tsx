import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif, DM_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/ui/Header";
import { ServiceWorkerRegistration } from "@/components/ui/ServiceWorkerRegistration";
import { InstallPrompt } from "@/components/ui/InstallPrompt";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peply.bio"),
  alternates: {
    canonical: "/",
    languages: { en: "/" },
  },
  title: {
    default: "Peply — Peptide Reference Tool",
    template: "%s — Peply",
  },
  description:
    "Peptide reconstitution calculator with published compound data, stack protocols, FDA regulatory tracking, and community submissions. Zero vendor affiliations.",
  openGraph: {
    type: "website",
    siteName: "Peply",
    title: "Peply — Peptide Reference Tool",
    description:
      "Peptide reconstitution calculator with published compound data, stack protocols, FDA regulatory tracking, and community submissions.",
    url: "https://peply.bio",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Peply — Precise dosing. Every time." }],
  },
  twitter: {
    card: "summary",
    title: "Peply — Peptide Reference Tool",
    description:
      "Peptide reconstitution calculator with published compound data, stack protocols, FDA regulatory tracking, and community submissions.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  let initialUser = null;
  let initialDisplayName: string | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    initialUser = data.user;
    if (initialUser) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("display_name")
        .eq("id", initialUser.id)
        .maybeSingle<{ display_name: string | null }>();
      initialDisplayName = profile?.display_name ?? null;
    }
  } catch {
    // Supabase misconfigured or unreachable — render as unauthenticated
  }

  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0C0C0C" />
        <meta name="google-site-verification" content="ASHCvXTC_CS11PY947F5xO3kMj2tVzLho9YzYMVmOME" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" type="image/svg+xml" href="/icons/peply-logo.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text font-sans">
        <AuthProvider initialUser={initialUser} initialDisplayName={initialDisplayName}>
          <ServiceWorkerRegistration />
          <InstallPrompt />
          <Header />
          <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          {/* About line */}
          <div className="mx-auto max-w-[960px] px-6 pt-10 pb-6">
            <p className="text-[13px] text-text-secondary text-center mb-8">
              Peply is a neutral, vendor-independent peptide reference tool
              built on published clinical data.
            </p>

            {/* Link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[13px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
                  Tools
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/calculator" className="text-text-secondary hover:text-text transition-colors duration-150">Calculator</Link>
                  <Link href="/compounds" className="text-text-secondary hover:text-text transition-colors duration-150">Compounds</Link>
                  <Link href="/stacks" className="text-text-secondary hover:text-text transition-colors duration-150">Stacks</Link>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
                  Resources
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/regulatory" className="text-text-secondary hover:text-text transition-colors duration-150">Regulatory</Link>
                  <Link href="/blog" className="text-text-secondary hover:text-text transition-colors duration-150">Blog</Link>
                  <Link href="/submit" className="text-text-secondary hover:text-text transition-colors duration-150">Contribute</Link>
                  <Link href="/feedback" className="text-text-secondary hover:text-text transition-colors duration-150">Feedback</Link>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
                  Legal
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/disclaimer" className="text-text-secondary hover:text-text transition-colors duration-150">Disclaimer</Link>
                  <Link href="/terms" className="text-text-secondary hover:text-text transition-colors duration-150">Terms</Link>
                  <Link href="/privacy" className="text-text-secondary hover:text-text transition-colors duration-150">Privacy</Link>
                  <Link href="/contact" className="text-text-secondary hover:text-text transition-colors duration-150">Contact</Link>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">
                  For Vendors
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/vendor/login" className="text-text-secondary hover:text-text transition-colors duration-150">Vendor Portal</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border py-6">
            <div className="mx-auto max-w-[720px] px-6 text-center text-[12px] text-text-secondary space-y-1">
              <p>
                Peply does not provide medical advice, diagnosis, or treatment
                recommendations. Consult a licensed healthcare provider before
                using any compound.
              </p>
              <p>
                21 compounds · 5 protocols · Published clinical data ·
                Community-driven · Zero vendor affiliations
              </p>
            </div>
          </div>
        </footer>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
