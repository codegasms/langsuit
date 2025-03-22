import db  from "@/db/drizzle";
import { courses } from "@/db/schema";

interface VisitData {
  title: string;   // Changed from month
  visits: number;  // Changed from sales
}

export async function GET() {
  try {
    const result = await db
      .select({
        title: courses.title,
        visits: courses.visits,
      })
      .from(courses)
      .orderBy(courses.visits);

    const visitData: VisitData[] = result.map(course => ({
      title: course.title,
      visits: course.visits,
    }));

    return Response.json({
      data: visitData
    });

  } catch (error) {
    console.error("Error fetching course visits:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}