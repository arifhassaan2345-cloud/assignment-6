import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog"
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch workouts" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
