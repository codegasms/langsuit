import db from "@/db/drizzle";
import { tickets, courses } from "@/db/schema";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const courseSales = await db
      .select({
        name: courses.title,
        value: sql<number>`count(*) * 100`
      })
      .from(tickets)
      .innerJoin(courses, eq(tickets.courseId, courses.id))
      .where(sql`${tickets.isBooked} = true`)
      .groupBy(courses.title)
      .orderBy(sql`count(*) DESC`); // Order by highest sales first

    return Response.json(
      { data: courseSales },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating course sales:", error);
    return Response.json(
      { error: "Failed to calculate course sales" },
      { status: 500 }
    );
  }
}