import Link from "next/link";
import Image from "next/image";
import { getAllVolunteers } from "@/lib/volunteers";

export default function VolunteersPage() {
  const volunteers = getAllVolunteers();

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-brand-600">
          Find Your Match
        </span>
        <h1 className="text-3xl sm:text-4xl font-black mt-3 text-stone-900">
          Meet our volunteers
        </h1>
        <p className="mt-2 text-stone-600 max-w-2xl">
          When you find someone you&apos;d like to meet, open their profile
          to send a meeting request with your preferred activity and time.
        </p>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
        {volunteers.map((volunteer) => (
          <li key={volunteer.id}>
            <Link
              href={`/volunteer/${volunteer.id}`}
              className="block h-full bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6 flex items-start gap-4">
                <Image
                  src={volunteer.photo}
                  alt=""
                  width={56}
                  height={56}
                  unoptimized
                  className="rounded-full bg-brand-50 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-black text-stone-900 truncate">
                    {volunteer.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-semibold mt-0.5">
                    {volunteer.tagline}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-4">
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {volunteer.bio}
                </p>
              </div>
              <div className="px-6 pb-6 flex flex-wrap gap-1.5">
                {volunteer.activities.map((activity) => (
                  <span
                    key={activity}
                    className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-100 text-accent-600"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
