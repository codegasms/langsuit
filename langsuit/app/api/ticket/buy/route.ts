import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const POST = async (req: Request) => {
  try {
    const { courseId, userId, row, column } = await req.json();

    // Check if the ticket is already booked
    const existingTicket = await db
      .select()
      .from(tickets)
      .where(
        and(
          eq(tickets.courseId, courseId),
          eq(tickets.row, row),
          eq(tickets.column, column)
        )
      )
      .limit(1);

    if (existingTicket.length && existingTicket[0].isBooked) {
      return new Response(
        JSON.stringify({ message: "Ticket is already booked" }),
        { status: 400 }
      );
    }

    // Insert the new ticket
    await db.insert(tickets).values({
      courseId,
      userId,
      row,
      column,
      isBooked: true,
      purchasedAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Ticket booked successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
