import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peply - Peptide Reconstitution Calculator",
  description:
    "Accurate peptide and injectable reconstitution calculations with concentration, draw volume, and syringe unit outputs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Peply
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link
                href="/calculator"
                className="hover:underline underline-offset-4"
              >
                Calculator
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-500">
          <div className="mx-auto max-w-4xl px-4 space-y-1">
            <p>
              Peply is a calculation tool, not medical advice. Always consult a
              qualified healthcare provider.
            </p>
            <p>Results should be verified independently before use.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
