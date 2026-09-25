"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      const plan = localStorage.getItem("fitlog-plan");
      const saved = localStorage.getItem("fitlog-saved");

      setPlanCount(plan ? JSON.parse(plan).length : 0);
      setSavedCount(saved ? JSON.parse(saved).length : 0);
    }

    updateCounts();

    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

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
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            My Plan

            <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            Saved

            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
              {savedCount}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
