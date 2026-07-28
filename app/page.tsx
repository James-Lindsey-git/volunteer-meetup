import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Connect with a volunteer for a meetup
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Volunteer Meetup helps high school students with disabilities
          connect with volunteers for shared activities &mdash; from board
          games to homework help to shooting hoops. Browse volunteer
          profiles, pick an activity, and send a request to get started.
        </p>
        <Link
          href="/volunteers"
          className="mt-8 inline-block rounded-md bg-brand-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600"
        >
          Meet the volunteers
        </Link>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold text-gray-900">1. Browse profiles</h2>
          <p className="mt-1.5 text-sm text-gray-600">
            See volunteers&apos; interests and the activities they enjoy.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold text-gray-900">2. Send a request</h2>
          <p className="mt-1.5 text-sm text-gray-600">
            Propose an activity and time right from their profile page.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold text-gray-900">3. Confirm by email</h2>
          <p className="mt-1.5 text-sm text-gray-600">
            You and the volunteer coordinate the exact details together.
          </p>
        </div>
      </div>
    </div>
  );
}
