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

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

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
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Workout Library
          </h2>

          <p className="mt-2 text-gray-600">
            Explore workouts and build your perfect training plan.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      </section>
    </>
  );
}
