"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
};

type SortOption = "default" | "duration" | "calories" | "rating";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch("/api/workouts");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="mx-auto grid min-h-[500px] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          {/* Hero Text */}
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Your Fitness Journey
            </p>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Track Your Workouts.
              <br />
              Build a Better You.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Stay consistent, track your progress, and achieve your fitness
              goals with FitLog.
            </p>

            <a
              href="#workouts"
              className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Browse Workouts
            </a>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <img
              src="/banner.png"
              alt="FitLog workout banner"
              className="w-full max-w-lg rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Workout Library */}
      <section
        id="workouts"
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Workout Library
            </h2>

            <p className="mt-2 text-gray-600">
              Explore workouts and build your perfect training plan.
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm font-semibold text-gray-700"
            >
              Sort by:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-black"
            >
              <option value="default">Default</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-600">
            Loading workouts...
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
