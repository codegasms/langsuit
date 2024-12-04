import db from "@/db/drizzle";
import { courses, units, userProgress } from "@/db/schema";
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

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    // orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        // orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            // orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              // challengeProgress: {
              //   where: eq(challengeProgress.userId, userId),
              // },
              challengeProgress: true,
            },
          },
        },
      },
    },
  });
  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

export const getCourseById = cache(async (id: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });

  return data;
});
