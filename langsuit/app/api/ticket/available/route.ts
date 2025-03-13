import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import { eq,and } from "drizzle-orm";
import { getCachedResponse } from "@/lib/cache";

export async function GET(req: Request) {
  try {
    const { courseId } = await req.json(); // Ensure this is inside try-catch
    
    return Response.json(
      await getCachedResponse(`get_available_tickets_${courseId}`, async () => {
        const availableTickets = await db
          .select({
            row: tickets.row,
            column: tickets.column,
          })
          .from(tickets)
          .where(and(eq(tickets.isBooked, false), eq(tickets.courseId, courseId))); // Fix `eq` order
    
        const locations = availableTickets.map(ticket => `${ticket.row}${ticket.column}`);

        return { availableTickets: locations };
      }),
      { status: 200 } // Explicit status
    );

  } catch (error) {
    console.error("Error fetching available tickets:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
