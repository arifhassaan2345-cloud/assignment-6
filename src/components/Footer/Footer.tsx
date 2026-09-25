export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              FitLog
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track your workouts. Build a better you.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 FitLog. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
