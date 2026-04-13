import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif, DM_Sans, Geist_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peply.bio"),
  title: {
    default: "Peply - Peptide Reconstitution Calculator",
    template: "%s | Peply",
  },
  description:
    "Accurate peptide and injectable reconstitution calculations with concentration, draw volume, and syringe unit outputs.",
  openGraph: {
    type: "website",
    siteName: "Peply",
    title: "Peply - Peptide Reconstitution Calculator",
    description:
      "Accurate peptide and injectable reconstitution calculations with concentration, draw volume, and syringe unit outputs.",
    url: "https://peply.bio",
  },
  twitter: {
    card: "summary",
    title: "Peply - Peptide Reconstitution Calculator",
    description:
      "Accurate peptide and injectable reconstitution calculations with concentration, draw volume, and syringe unit outputs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text font-sans">
        <header className="border-b border-border">
          <div className="mx-auto max-w-[960px] px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="font-serif italic text-2xl tracking-tight"
            >
              Peply
            </Link>
            <div className="flex items-center gap-6">
              <nav className="flex gap-6 text-sm">
                <Link
                  href="/calculator"
                  className="text-text-secondary hover:text-text transition-colors duration-150"
                >
                  Calculator
                </Link>
                <Link
                  href="/compounds"
                  className="text-text-secondary hover:text-text transition-colors duration-150"
                >
                  Compounds
                </Link>
                <Link
                  href="/stacks"
                  className="text-text-secondary hover:text-text transition-colors duration-150"
                >
                  Stacks
                </Link>
                <Link
                  href="/regulatory"
                  className="text-text-secondary hover:text-text transition-colors duration-150"
                >
                  Regulatory
                </Link>
                <Link
                  href="/submit"
                  className="text-text-secondary hover:text-text transition-colors duration-150"
                >
                  Submit Data
                </Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-8 text-center text-[13px] text-text-secondary">
          <div className="mx-auto max-w-[720px] px-6 space-y-1">
            <p>
              Peply is an educational reference tool for reconstitution
              calculations and published compound data. It does not provide
              medical advice, diagnosis, or treatment recommendations.
            </p>
            <p>
              Consult a licensed healthcare provider before using any compound.
              Peply has no affiliation with any manufacturer, pharmacy, or
              vendor.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <Link
                href="/terms"
                className="hover:text-text transition-colors duration-150"
              >
                Terms
              </Link>
              <span className="text-border">|</span>
              <Link
                href="/privacy"
                className="hover:text-text transition-colors duration-150"
              >
                Privacy
              </Link>
              <span className="text-border">|</span>
              <a
                href="mailto:privacy@peply.bio"
                className="hover:text-text transition-colors duration-150"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
