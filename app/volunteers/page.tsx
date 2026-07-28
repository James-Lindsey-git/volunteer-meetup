import Link from "next/link";
import Image from "next/image";
import { getAllVolunteers } from "@/lib/volunteers";

export default function VolunteersPage() {
  const volunteers = getAllVolunteers();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Meet the volunteers
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Browse volunteer profiles below. When you find someone you&apos;d
          like to meet, open their profile to send a meeting request with
          your preferred activity and time. The volunteer will follow up by
          email to confirm details.
        </p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {volunteers.map((volunteer) => (
          <li key={volunteer.id}>
            <Link
              href={`/volunteer/${volunteer.id}`}
              className="block h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-brand-500 focus-visible:shadow-md"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={volunteer.photo}
                  alt=""
                  width={56}
                  height={56}
                  unoptimized
                  className="rounded-full bg-brand-50"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {volunteer.name}
                  </p>
                  <p className="text-sm text-gray-500">{volunteer.tagline}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                {volunteer.bio}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {volunteer.activities.map((activity) => (
                  <span
                    key={activity}
                    className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
                  >
                    {activity}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                View profile &amp; request a meeting &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


