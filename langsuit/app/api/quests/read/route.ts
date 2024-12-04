import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { user, Quests, userQuests } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from '@clerk/nextjs/server'; // Correct server-side import

// Dummy Quest Data
export const DUMMY_QUESTS = [
  {
    id: 1,
    title: "Earn 20 XP",
    progress: 0,
    description: "Start your learning journey!",
    rewardPoints: 20,
    difficulty: "Easy",
    timeSpent: 0,
    completed: false,
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split('T')[0],
  },
  {
    id: 2,
    title: "Complete 5 Lessons",
    progress: 0,
    description: "Expand your knowledge by completing 5 lessons.",
    rewardPoints: 50,
    difficulty: "Medium",
    timeSpent: 0,
    completed: false,
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 14))
      .toISOString()
      .split('T')[0],
  },
  {
    id: 3,
    title: "Earn 100 XP in a Day",
    progress: 0,
    description: "Challenge yourself to earn 100 XP in a single day!",
    rewardPoints: 100,
    difficulty: "Hard",
    timeSpent: 0,
    completed: false,
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split('T')[0],
  },
  {
    id: 4,
    title: "Maintain a 3-Day Streak",
    progress: 0,
    description: "Stay consistent and keep learning for 3 consecutive days.",
    rewardPoints: 60,
    difficulty: "Medium",
    timeSpent: 0,
    completed: false,
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 2))
      .toISOString()
      .split('T')[0],
  },
  {
    id: 5,
    title: "Master a New Topic",
    progress: 0,
    description: "Dive deep into a topic and complete all its lessons.",
    rewardPoints: 80,
    difficulty: "Hard",
    timeSpent: 0,
    completed: false,
    expiresAt: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split('T')[0],
  },
  {
    id: 6,
    title: "Answer 10 Quiz Questions",
    progress: 0,
    description: "Test your knowledge by completing 10 quiz questions.",
    rewardPoints: 30,
    difficulty: "Easy",
    timeSpent: 0,
    completed: false,
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 10))
      .toISOString()
      .split('T')[0],
  },
];


// Function to fetch user ID by username
async function getUserIdByUsername(username: string): Promise<string | null> {
  try {
    const userList = await users.getUserList({
      query: {
        'publicMetadata.username': username, // Match your Clerk metadata schema
      },
      limit: 1,
    });

    if (userList.length === 0) {
      console.error(`User with username "${username}" not found.`);
      return null;
    }

    return userList[0].id;
  } catch (err) {
    console.error('Error fetching user ID:', err);
    return null;
  }
}

// Function to fetch quests for a user
async function getUserQuests(userId: string) {
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
      .innerJoin(Quests, eq(Quests.id, userQuests.questId))
      .where(eq(userQuests.userId, userId));

    return questsData.map((quest) => ({
      id: quest.questId,
      title: quest.title,
      description: quest.description,
      rewardPoints: quest.rewardPoints,
      expiresAt: quest.expiresAt.toISOString().split('T')[0],
      progress: quest.progress,
      completed: quest.completed,
      timeSpent: 0,
      difficulty: "Medium",
    }));
  } catch (err) {
    console.error('Error fetching user quests:', err);
    return [];
  }
}

// GET handler
export const GET = async (req: NextRequest) => {
  try {
    const username = req.nextUrl.searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { message: "Username not provided" },
        { status: 400 }
      );
    }

    const userId = await getUserIdByUsername(username);

    if (!userId) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    let quests = await getUserQuests(userId);

    if (quests.length === 0) {
      quests = DUMMY_QUESTS; // Fallback to dummy data
    }

    return NextResponse.json(quests, { status: 200 });
  } catch (err) {
    console.error('Error in GET method:', err);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
