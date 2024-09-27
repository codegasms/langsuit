import db from '@/db/drizzle';
import { languageProgress } from '@/db/drizzle';

export async function GET(req: Request) {
    const { username } = req.params;
    const languages = await db
        .select()
        .from(languageProgress)
        .where(languageProgress.userId.eq(username));  // Ensure the correct user filter

    return new Response(JSON.stringify(languages));
}

