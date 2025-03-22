import { sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { tickets } from "@/db/schema";

export async function GET() {
  try {
    // Query to count total tickets and multiply by 100
    const result = await db
      .select({
        ticketCount: sql<number>`count(${tickets.id})`.as('ticket_count'),
        totalRevenue: sql<number>`count(${tickets.id}) * 100`.as('total_revenue')
      })
      .from(tickets)
      .where(sql`${tickets.isBooked} = true`); // Only count booked tickets

    // Return the results
    return Response.json({
      statistics: {
        ticketCount: result[0].ticketCount,
        totalRevenue: result[0].totalRevenue,
        currency: "USD" // Assuming the currency is USD
      }
    });

  } catch (error) {
    console.error("Error calculating total revenue:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}