import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import { eq,and } from "drizzle-orm";

import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    console.log(req.body);
    const { courseId } = await req.json();

    const bookedTickets = await db
      .select({
        row: tickets.row,
        column: tickets.column,
      })
      .from(tickets)
      .where(and(eq(courseId,tickets.courseId),eq(true,tickets.isBooked)));

    const locations = bookedTickets.map(ticket => `${ticket.row}${ticket.column}`);

    return Response.json({ bookedTickets: locations }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export async function GET() {
  return NextResponse.json({ message: "API route works!" });
}
