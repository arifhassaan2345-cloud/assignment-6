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
};

export default function MyPlan() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const totalExercises = plan.length;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }
  }, []);

  function markAsDone(id: number) {
    if (completed.includes(id)) {
      setCompleted(
        completed.filter((workoutId) => workoutId !== id)
      );
    } else {
      setCompleted([...completed, id]);
    }
  }

  function removeWorkout(id: number) {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );
  }

  function removeAll() {
    setPlan([]);
    localStorage.removeItem("fitlog-plan");
  }

  function removeSaved(id: number) {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              My Plan
            </h1>

            <p className="mt-3 text-gray-600">
              Your selected workouts for today.
            </p>
          </div>

          {plan.length > 0 && (
            <button
              onClick={removeAll}
              className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              Remove All
            </button>
          )}
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalExercises}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Calories
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Today's Plan */}
        <section className="mt-10">
          {plan.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-600">
                No workouts added to your plan yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plan.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-900">
                      {workout.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      {workout.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">
                          Duration
                        </p>

                        <p className="font-semibold">
                          {workout.duration} min
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">
                          Calories
                        </p>

                        <p className="font-semibold">
                          {workout.caloriesBurned} kcal
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() =>
                          markAsDone(workout.id)
                        }
                        className={`flex-1 rounded-lg px-4 py-3 font-semibold text-white ${
                          completed.includes(workout.id)
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-black hover:bg-gray-800"
                        }`}
                      >
                        {completed.includes(workout.id)
                          ? "✓ Done"
                          : "Mark as Done"}
                      </button>

                      <button
                        onClick={() =>
                          removeWorkout(workout.id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved Workouts */}
        {saved.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Saved Workouts
            </h2>

            <p className="mt-2 text-gray-600">
              Workouts you saved for later.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((workout) => (
                <div
                  key={workout.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900">
                      {workout.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {workout.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">
                          Duration
                        </p>

                        <p className="font-semibold">
                          {workout.duration} min
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">
                          Calories
                        </p>

                        <p className="font-semibold">
                          {workout.caloriesBurned} kcal
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeSaved(workout.id)
                      }
                      className="mt-5 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                    >
                      Remove from Saved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}