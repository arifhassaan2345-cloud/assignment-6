"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
          ⚠️
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-600">
          We couldn't load this page. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
