import db from '@/db/drizzle';
import {userProgress} from '@/db/schema';

export async function GET() {
    const leaderboard = await db
        .select()
        .from(userProgress)
        .orderBy(userProgress.points, 'desc');
    return new Response(JSON.stringify(leaderboard));
}

