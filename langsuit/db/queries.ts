import db from "@/db/drizzle";
import { courses, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 1,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
  return data;
});

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getUserProgress = cache(async () => {
  // const { userId }: { userId: string | null } = await auth();

  // if (!userId) return null;

  let userId = "1";

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    // with: { activeCourse: true },
  });

  return data;
});

export const getCourseById = cache(async (id: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });

  return data;
});
