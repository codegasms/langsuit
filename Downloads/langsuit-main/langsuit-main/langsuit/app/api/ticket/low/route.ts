import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select({
        title: courses.title,
        visits: courses.visits
      })
      .from(courses)
      .orderBy(asc(courses.visits))
      .limit(1);

    if (!result.length) {
      return Response.json(
        { error: "No courses found" },
        { status: 404 }
      );
    }

    return Response.json({
      leastVisitedCourse: {
        title: result[0].title,
        visits: result[0].visits
      }
    });

  } catch (error) {
    console.error("Error fetching least visited course:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}