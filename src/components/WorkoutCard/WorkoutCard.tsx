import Link from "next/link";

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

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={workout.image}
        alt={workout.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {workout.name}
          </h3>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            ⭐ {workout.rating}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {muscle}
            </span>
          ))}
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {workout.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-semibold">{workout.duration} min</p>
          </div>

          <div>
            <p className="text-gray-500">Calories</p>
            <p className="font-semibold">
              {workout.caloriesBurned} kcal
            </p>
          </div>

          <div>
            <p className="text-gray-500">Difficulty</p>
            <p className="font-semibold">{workout.difficulty}</p>
          </div>

          <div>
            <p className="text-gray-500">Equipment</p>
            <p className="font-semibold">{workout.equipment}</p>
          </div>
        </div>

        <Link
          href={`/workouts/${workout.id}`}
          className="mt-5 block w-full rounded-lg bg-black px-4 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}