"use client";

import { useEffect, useState } from "react";

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
  instructions: string[];
};

export default function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadWorkout() {
      const { id } = await params;

      try {
        const response = await fetch(
         `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [params]);

  function addToPlan() {
    if (!workout) return;

    const existingPlan = localStorage.getItem("fitlog-plan");

    const plan: Workout[] = existingPlan
      ? JSON.parse(existingPlan)
      : [];

    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      setMessage("This workout is already in your plan.");
      return;
    }

    const updatedPlan = [...plan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setMessage("Workout added to your plan!");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading workout...
        </p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-600">
          Workout not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid md:grid-cols-2">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full min-h-[400px] w-full object-cover"
          />

          <div className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {workout.name}
              </h1>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                ⭐ {workout.rating}
              </span>
            </div>

            <p className="leading-7 text-gray-600">
              {workout.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold">
                  {workout.duration} min
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-semibold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Sets</p>
                <p className="font-semibold">{workout.sets}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Reps</p>
                <p className="font-semibold">{workout.reps}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm text-gray-500">
                Muscle Groups
              </p>

              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Equipment
              </p>

              <p className="font-semibold">
                {workout.equipment}
              </p>
            </div>

            <button
              onClick={addToPlan}
              className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Add to Today's Plan
            </button>
            <button
  onClick={() => {
    if (!workout) return;

    const existingSaved = localStorage.getItem("fitlog-saved");

    const saved: Workout[] = existingSaved
      ? JSON.parse(existingSaved)
      : [];

    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      setMessage("This workout is already saved.");
      return;
    }

    const updatedSaved = [...saved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setMessage("Workout saved for later!");
  }}
  className="mt-3 w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100">

  Save for Later
</button>

            {message && (
              <p className="mt-4 text-center text-sm font-medium text-green-600">
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t p-8">
          <h2 className="text-2xl font-bold">
            Instructions
          </h2>

          <ol className="mt-5 space-y-4">
            {workout.instructions.map(
              (instruction, index) => (
                <li
                  key={instruction}
                  className="flex gap-3"
                >
                  <span className="font-bold">
                    {index + 1}.
                  </span>

                  <span className="text-gray-600">
                    {instruction}
                  </span>
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    </main>
  );
}