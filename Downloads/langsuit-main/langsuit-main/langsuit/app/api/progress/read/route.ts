import db from '@/db/drizzle';
import { userProgress, courses } from '@/db/schema';
import { eq, isNotNull } from 'drizzle-orm/expressions';

export const GET = async (req: Request) => {
    try {
        // Extract userId from query parameters
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return new Response(JSON.stringify({
                message: "UserId not provided",
            }), { status: 400 });
        }

        // Fetch user's progress details
        const progressData = await db
            .select({
                hearts: userProgress.hearts,
                points: userProgress.points,
                activeCourseID: userProgress.activeCourseID,
            })
            .from(userProgress)
            .where(eq(userProgress.userId, Number(userId)))
            .limit(1)
            .execute();

        if (progressData.length === 0) {
            return new Response(JSON.stringify({
                message: "User not found or no progress data",
                hearts: 5,
                points: 1000,
                activeCourseID: 'N/A',
                totalLanguages: 3, // Default value for demonstration
            }), { status: 404 });
        }

        const progress = progressData[0];

        
        let courseName = 'N/A';
        if (progress.activeCourseID) {
            const courseData = await db
                .select({
                    title: courses.title,
                })
                .from(courses)
                .where(eq(courses.id, progress.activeCourseID))
                .limit(1)
                .execute();

            if (courseData.length > 0) {
                courseName = courseData[0].title;
            }
        }

        // Calculate total number of unique active courses
        const totalLanguagesData = await db
            .select({ count: courses.id })
            .from(courses)
            .where(isNotNull(courses.id))
            .execute();

        const totalLanguages = totalLanguagesData.length;

        return new Response(JSON.stringify({
            message: "User progress fetched successfully",
            hearts: progress.hearts,
            points: progress.points,
            activeCourseID: courseName,
            totalLanguages, // Computed value
        }), { status: 200 });
    } catch (err) {
        console.error('Error fetching user progress:', err);
        return new Response(JSON.stringify({
            message: "Internal Server Error",
        }), { status: 500 });
    }
};
