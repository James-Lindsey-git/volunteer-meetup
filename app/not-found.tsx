import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 text-gray-600">
        We couldn&apos;t find the volunteer or page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block font-semibold text-brand-600 hover:underline"
      >
        &larr; Back to all volunteers
      </Link>
    </div>
  );
}
