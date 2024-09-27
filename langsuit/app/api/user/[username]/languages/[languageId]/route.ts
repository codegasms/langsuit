import db from '@/db/drizzle';
import { languageProgress, courses } from '@/db/drizzle';

export async function GET(req: Request) {
    const { username, languageId } = req.params;

    // Fetch progress of the specific language for the user
    const languageDetails = await db
        .select({
            progress: languageProgress.progress,
            languageName: 'Language Placeholder',  // Assuming you don't have a language name, you'll need to replace this
            courseTitle: courses.title,
        })
        .from(languageProgress)
        .join(courses, courses.id.eq(languageProgress.courseId))
        .where(languageProgress.userId.eq(username))
        .andWhere(languageProgress.languageId.eq(parseInt(languageId)));

    if (languageDetails.length === 0) {
        return new Response('No progress found', { status: 404 });
    }

    return new Response(JSON.stringify(languageDetails[0]));
}

