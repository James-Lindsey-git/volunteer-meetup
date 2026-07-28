import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VolunteerMeetup",
  description: "Request a meeting activity and time with a volunteer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-md">Skip to main content</a>
        <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-black">V</span>
              <span className="text-lg font-black text-stone-900">Volunteer<span className="text-brand-600">Meetup</span></span>
            </a>
            <nav aria-label="Main navigation">
              <a href="/volunteers" className="text-sm font-bold text-stone-600 hover:text-brand-700">Browse Volunteers</a>
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="bg-stone-900 text-stone-200 py-10 mt-16">
          <div className="mx-auto max-w-6xl px-6 text-sm">
            <p style={{ color: "rgba(253,250,245,0.6)" }}>
              VolunteerMeetup connects students with disabilities to caring volunteers for friendship and activities. Questions or feedback? <a href="https://github.com/" className="underline hover:text-brand-400">Let us know on GitHub</a>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
