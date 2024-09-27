import { NextResponse } from 'next/server';
import db from '@/db/drizzle'; 
import { Quests, userQuests, user } from '@/db/schema'; // Import your schema
import { eq } from 'drizzle-orm'

async function getUserIdByUsername(username: string): Promise<number | null> {
    try {
        const self = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.username,username))
            .limit(1);

        return self.length > 0 ? self[0].id : null;
    } catch (err) {
        console.error('Error fetching user ID:', err);
        return null;
    }
}

// Function to get user-specific quests
async function getUserQuests(userId: number) {
    try {
        const questsData = await db
            .select({
                questId: Quests.id,
                title: Quests.title,
                description: Quests.description,
                rewardPoints: Quests.rewardPoints,
                expiresAt: Quests.expiresAt,
                progress: userQuests.progress,
                completed: userQuests.completed,
            })
            .from(userQuests)
            .innerJoin(Quests, eq(Quests.id,userQuests.questId))
            .where(eq(userQuests.userId,userId));

        return questsData.map((quest) => ({
            id: quest.questId,
            title: quest.title,
            description: quest.description,
            rewardPoints: quest.rewardPoints,
            expiresAt: quest.expiresAt.toISOString().split('T')[0], // Formatting date
            progress: quest.progress,
            completed: quest.completed,
            timeSpent: 0, // Placeholder for 'timeSpent', modify as per your actual data
            difficulty: "Medium", // Placeholder, modify based on your logic
        }));
    } catch (err) {
        console.error('Error fetching user quests:', err);
        return []; // Return an empty array in case of an error
    }
}

// Dummy data fallback in case of no data from DB
const dummyQuests = [
  {
    id: 1,
    title: "Learn JavaScript Basics",
    progress: 80,
    description: "Complete the beginner JavaScript quest.",
    rewardPoints: 100,
    difficulty: "Easy",
    timeSpent: 5,
    completed: false,
    expiresAt: "2024-10-01",
  },
  {
    id: 2,
    title: "Master React",
    progress: 50,
    description: "Learn advanced concepts in React.",
    rewardPoints: 150,
    difficulty: "Hard",
    timeSpent: 15,
    completed: false,
    expiresAt: "2024-11-01",
  },
  {
    id: 3,
    title: "Intro to Next.js",
    progress: 100,
    description: "Complete the Next.js introduction course.",
    rewardPoints: 200,
    difficulty: "Medium",
    timeSpent: 10,
    completed: true,
    expiresAt: "2024-12-01",
  },
];

// GET request handler for quests API
export const GET = async (req: Request) => {
    try {
        // Get the username from the query parameters
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { message: "Username not provided" },
                { status: 400 }
            );
        }

        // Get userId from the username
        const userId = await getUserIdByUsername(username);

        if (!userId) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Fetch quests for the user
        let quests = await getUserQuests(userId);

        // Fallback to dummy data if no quests are found
        if (quests.length === 0) {
            quests = dummyQuests;
        }

        // Return the quest data
        return NextResponse.json(quests, { status: 200 });
    } catch (err) {
        console.error('Error fetching user quests:', err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
