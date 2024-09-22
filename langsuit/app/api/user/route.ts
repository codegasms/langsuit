import { UserOrchestrator } from "@/utils/dbOrchestrator";

export const POST = async (req: Request,res: Response) => {
    try{
        const body = await req.json();
        const { username,role } = body;
        console.log(body);
        const user = await UserOrchestrator.get(role).getSelfByUsername(username);
        return Response.json({user},{status: 200});
    }catch(err){
        console.error(err);
        return Response.json({message: "Internal Server Error"},{status: 500});
    }
};