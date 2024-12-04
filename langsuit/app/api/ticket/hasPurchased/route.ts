import db from "@/db/drizzle";
import { tickets } from "@/db/schema";
import { eq,and } from "drizzle-orm";
export const POST = async (req: Request) => {
  try {
    const { courseId, userId } = await req.json();

    const userTicket = await db
      .select()
      .from(tickets)
      .where(
        and(and(eq(courseId,tickets.courseId),eq(userId,tickets.userId)),eq(true,tickets.isBooked))
      )
      .limit(1);

    const hasPurchased = userTicket.length > 0;

    return Response.json({ hasPurchased }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
