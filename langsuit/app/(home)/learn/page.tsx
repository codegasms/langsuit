import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./header";

import {
  getCourseById,
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";

const LearnPage = async () => {
  // Fetch from the API's (mocked for now)
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ]);

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const course = await getCourseById(userProgress.activeCourseId);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            title: userProgress.title,
            imageSrc: course.imageSrc,
          }}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={userProgress.hasActiveSubscription}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={course.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mt-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
