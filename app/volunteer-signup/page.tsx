import VolunteerSignupForm from "@/components/VolunteerSignupForm";

export default function VolunteerSignupPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Become a volunteer
      </h1>
      <p className="mt-2 text-gray-600">
        Interested in volunteering? Submit your email below and we&apos;ll
        reach out to schedule a short interview and go over next steps.
      </p>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <VolunteerSignupForm />
      </div>
    </div>
  );
}
