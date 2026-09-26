export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-sm">
        
        {/* Spinner */}
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Loading FitLog
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Preparing your workout library...
        </p>

        {/* Loading bars */}
        <div className="mt-6 space-y-3">
          <div className="h-3 animate-pulse rounded-full bg-gray-200" />
          <div className="h-3 w-4/5 animate-pulse rounded-full bg-gray-200" />
          <div className="h-3 w-3/5 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
