import db from "@/db/drizzle";
import { liveStream } from "@/db/schema";

export const POST = async (req: Request,res: Response) => {
    try{
        const body = await req.json();
        // const { title:text,date:date } = body;
        const newStream : typeof liveStream.$inferInsert = {
            instructorId: 1,
            ...body
        }
        await db.insert(liveStream).values(newStream);
        return Response.json({message: "liveStream created successfully"},{status: 200});
    }catch(err){
        console.error(err);
        return Response.json({message: "Internal Server Error"},{status: 500});
    }
};