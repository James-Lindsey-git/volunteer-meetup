import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Browse Profiles",
    description:
      "Explore volunteer profiles. See their interests and the activities they enjoy doing with students.",
  },
  {
    number: "02",
    title: "Send a Request",
    description:
      "Propose an activity and a time right from their profile. It only takes a minute.",
  },
  {
    number: "03",
    title: "Meet Up & Thrive",
    description:
      "Confirm the details by email, then meet up for your activity together.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600">
            Welcome
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mt-3 text-stone-900 leading-tight">
            Connect with a volunteer
            <br />
            for a meetup
          </h1>
          <p className="mt-5 text-stone-600 text-lg leading-relaxed max-w-xl mx-auto">
            VolunteerMeetup helps high school students with disabilities
            connect with volunteers for shared activities &mdash; from board
            games to homework help to shooting hoops.
          </p>
          <Link
            href="/volunteers"
            className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3.5 font-black text-white shadow-lg hover:bg-brand-600 transition-colors"
          >
            Browse Volunteers
          </Link>
        </div>
      </section>

      <section className="py-20 bg-stone-100/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-brand-600">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3 text-stone-900">
              Three steps to your first meetup
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-stone-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-2 text-7xl font-black leading-none text-stone-100 select-none">
                  {step.number}
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-500">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to make your first connection?
          </h2>
          <p className="text-brand-50 text-lg mb-8">
            Browse real volunteer profiles and reach out in minutes.
          </p>
          <Link
            href="/volunteers"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-700 font-black hover:bg-accent-50 transition-colors shadow-lg"
          >
            Browse Volunteers &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
