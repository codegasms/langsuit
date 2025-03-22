import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getCachedResponse } from "@/lib/cache";
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { guidanceId } = await req.json(); // Changed from courseId to guidanceId
    console.log(guidanceId);
    return Response.json(
      await getCachedResponse(`get_booked_tickets_${guidanceId}`, async () => {

        const bookedTickets = await db
          .select({
            row: tickets.row,
            column: tickets.column,
          })
          .from(tickets)
          .where(and(eq(guidanceId, tickets.guidanceId), eq(true, tickets.isBooked))); // Updated field names
    
        const locations = bookedTickets.map(ticket => `${ticket.row}${ticket.column}`);
    
        return { bookedTickets: locations };
      })
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export async function GET() {
  return NextResponse.json({ message: "API route works!" });
}
