import db from '@/db/drizzle';
import {userProgress} from '@/db/schema';

export async function GET(req: Request) {
    const { username } = req.params;
    const progress = await db
        .select()
        .from(userProgress)
        .where(userProgress.userId.eq(username));

    return new Response(JSON.stringify(progress));
}