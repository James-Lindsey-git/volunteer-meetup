import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllVolunteers, getVolunteerById } from "@/lib/volunteers";
import RequestForm from "@/components/RequestForm";

export function generateStaticParams() {
  return getAllVolunteers().map((v) => ({ id: v.id }));
}

export default function VolunteerProfilePage({ params }: { params: { id: string } }) {
  const volunteer = getVolunteerById(params.id);

  if (!volunteer) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <Link href="/volunteers" className="text-sm font-bold text-brand-600 hover:underline">&larr; Back to all volunteers</Link>

      <div className="mt-4 bg-white rounded-2xl border border-stone-200 p-6">
        <div className="flex items-center gap-4">
          <Image src={volunteer.photo} alt="" width={72} height={72} unoptimized className="rounded-full bg-brand-50" />
          <div>
            <h1 className="text-xl font-black text-stone-900">{volunteer.name}</h1>
            <p className="text-sm text-stone-500 font-semibold">{volunteer.tagline}</p>
          </div>
        </div>

        <p className="mt-4 text-stone-700 leading-relaxed">{volunteer.bio}</p>

        <div className="mt-4">
          <p className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2">Activities they enjoy</p>
          <div className="flex flex-wrap gap-1.5">
            {volunteer.activities.map((activity) => (
              <span key={activity} className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent-100 text-accent-600">{activity}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-stone-200 p-6">
        <h2 className="text-lg font-black text-stone-900">Request a meeting with {volunteer.name}</h2>
        <p className="mt-1 text-sm text-stone-600">Fill this out and {volunteer.name} will get an email with your request. From there, you two can email back and forth to lock in the exact time and place.</p>
        <div className="mt-4">
          <RequestForm volunteerId={volunteer.id} volunteerName={volunteer.name} />
        </div>
      </div>
    </div>
  );
}
