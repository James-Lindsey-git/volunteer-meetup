import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllVolunteers, getVolunteerById } from "@/lib/volunteers";
import RequestForm from "@/components/RequestForm";

export function generateStaticParams() {
  return getAllVolunteers().map((v) => ({ id: v.id }));
}

export default function VolunteerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const volunteer = getVolunteerById(params.id);

  if (!volunteer) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/volunteers"
        className="text-sm font-medium text-brand-600 hover:underline"
      >
        &larr; Back to all volunteers
      </Link>

      <div className="mt-4 rounded-xl border border-orange-100 bg-white/90 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src={volunteer.photo}
            alt=""
            width={72}
            height={72}
            unoptimized
            className="rounded-full bg-brand-50"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {volunteer.name}
            </h1>
            <p className="text-sm text-gray-500">{volunteer.tagline}</p>
          </div>
        </div>

        <p className="mt-4 text-gray-700">{volunteer.bio}</p>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">
            Activities they enjoy:
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {volunteer.activities.map((activity) => (
              <span
                key={activity}
                className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-orange-100 bg-white/90 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Request a meeting with {volunteer.name}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Fill this out and {volunteer.name} will get an email with your
          request. From there, you two can email back and forth to lock in
          the exact time and place.
        </p>
        <div className="mt-4">
          <RequestForm
            volunteerId={volunteer.id}
            volunteerName={volunteer.name}
          />
        </div>
      </div>
    </div>
  );
}
