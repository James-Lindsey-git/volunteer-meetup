"use client";

import { useState } from "react";

type Props = {
  volunteerId: string;
  volunteerName: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function RequestForm({ volunteerId, volunteerName }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      volunteerId,
      studentName: formData.get("studentName"),
      studentEmail: formData.get("studentEmail"),
      activity: formData.get("activity"),
      proposedTime: formData.get("proposedTime"),
      notes: formData.get("notes"),
    };

    try {
      const res = await fetch("/api/request-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
      >
        <p className="font-semibold">Request sent!</p>
        <p className="mt-1 text-sm">
          {volunteerName} will reach out to your email to confirm the exact
          time and place. You can also email them directly if you don&apos;t
          hear back within a few days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm font-medium text-green-700 underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="studentName"
          className="block text-sm font-medium text-gray-700"
        >
          Your name
        </label>
        <input
          id="studentName"
          name="studentName"
          type="text"
          required
          autoComplete="name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="studentEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Your email
        </label>
        <input
          id="studentEmail"
          name="studentEmail"
          type="email"
          required
          autoComplete="email"
          aria-describedby="studentEmail-hint"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
        />
        <p id="studentEmail-hint" className="mt-1 text-xs text-gray-500">
          {volunteerName} will reply to this email to confirm details.
        </p>
      </div>

      <div>
        <label
          htmlFor="activity"
          className="block text-sm font-medium text-gray-700"
        >
          Activity you&apos;d like to do
        </label>
        <input
          id="activity"
          name="activity"
          type="text"
          required
          placeholder="e.g. Play board games, get homework help, shoot hoops"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="proposedTime"
          className="block text-sm font-medium text-gray-700"
        >
          Proposed date &amp; time
        </label>
        <input
          id="proposedTime"
          name="proposedTime"
          type="text"
          required
          placeholder="e.g. Saturday, Aug 2nd around 2pm"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          This is just a starting point &mdash; you and {volunteerName} can
          adjust the exact time and location over email.
        </p>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Anything else they should know? (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Accessibility needs, location preferences, etc."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-brand-500 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending request..." : "Send meeting request"}
      </button>
    </form>
  );
}
