import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="FitLog"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            Home
          </Link>

          <Link
            href="/#workouts"
            className="text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            My Plan
          </Link>
        </div>
      </div>
    </nav>
  );
}