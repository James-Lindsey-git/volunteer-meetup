import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Volunteer Meetup",
  description:
    "Request a meeting activity and time with a volunteer. Built for high school students with disabilities to connect with volunteers for shared activities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-md"
        >
          Skip to main content
        </a>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold text-brand-700">
              Volunteer Meetup
            </a>
            <nav aria-label="Main navigation">
              <a
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-brand-700"
              >
                Browse Volunteers
              </a>
            </nav>
          </div>
        </header>
        <main id="main-content" className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-sm text-gray-500">
          <p>
            Volunteer Meetup helps students and volunteers connect for shared
            activities. Questions or feedback?{" "}
            <a
              href="https://github.com/"
              className="underline hover:text-brand-700"
            >
              Let us know on GitHub
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
