import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import { eq,and } from "drizzle-orm";
export const POST = async (req: Request) => {
  try {
    const { courseId } = await req.json();

    const availableTickets = await db
      .select({
        row: tickets.row,
        column: tickets.column,
      })
      .from(tickets)
      .where(and(eq(false,tickets.isBooked),eq(courseId,tickets.courseId)));

    const locations = availableTickets.map(ticket => `${ticket.row}${ticket.column}`);

    return Response.json({ availableTickets: locations }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
