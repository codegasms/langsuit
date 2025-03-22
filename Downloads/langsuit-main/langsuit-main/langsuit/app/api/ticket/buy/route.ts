import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import redis from "@/lib/redis";
import { eq, and } from "drizzle-orm";

export const POST = async (req: Request) => {
  try {
    const { guidanceId, userId, row, column } = await req.json();

    // Check if the ticket is already booked
    const existingTicket = await db
      .select()
      .from(tickets)
      .where(
        and(
          eq(tickets.guidanceId, guidanceId), // Updated from courseId to guidanceId
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
      guidanceId, // Updated from courseId to guidanceId
      userId,
      row,
      column,
      isBooked: true,
      purchasedAt: new Date(),
    });

    // Remove from the cache
    await redis.del(`get_available_tickets_${guidanceId}`);
    await redis.del(`get_booked_tickets_${guidanceId}`);

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
