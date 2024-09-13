
import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { User } from "@/utils/dbOrchestrator";

export const POST = async (req: Request,res: Response) => {
    try{
        const body = await req.json();
        const { username,email,password,role } = body;
        await User.instance.insert(role,username,email,password);
        return Response.json({message: "User created successfully"},{status: 200});
    }catch(err){
        console.error(err);
        return Response.json({message: "Internal Server Error"},{status: 500});
    }
};