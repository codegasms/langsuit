import db from "@/db/drizzle";
import { ticket } from "@/db/schema";

export const POST = async (req: Request,res: Response) => {
    try{
        const body = await req.json();
        // const { title:text,date:date } = body;
        const newTicket : typeof ticket.$inferInsert = {
            streamId: 1,
            userId: 1
        }
        await db.insert(ticket).values(newTicket);
        return Response.json({message: "Ticket created successfully"},{status: 200});
    }catch(err){
        console.error(err);
        return Response.json({message: "Internal Server Error"},{status: 500});
    }
};