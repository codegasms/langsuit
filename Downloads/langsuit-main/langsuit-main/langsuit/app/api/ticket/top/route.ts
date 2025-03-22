import { sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { courses, tickets } from "@/db/schema";

export async function GET() {
  try {
    // Query to get the course with the most tickets sold
    const result = await db
      .select({
        courseTitle: courses.title,
        ticketCount: sql<number>`count(${tickets.id})`.as('ticket_count')
      })
      .from(tickets)
      .innerJoin(courses, sql`${tickets.courseId} = ${courses.id}`)
      .groupBy(courses.id, courses.title)
      .orderBy(sql`ticket_count DESC`)
      .limit(1);

    // Check if we found any results
    if (!result.length) {
      return Response.json(
        { error: "No courses found with tickets" },
        { status: 404 }
      );
    }

    // Return the top selling course
    return Response.json({
      topCourse: {
        title: result[0].courseTitle,
        totalTickets: result[0].ticketCount
      }
    });

  } catch (error) {
    console.error("Error fetching top selling course:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}