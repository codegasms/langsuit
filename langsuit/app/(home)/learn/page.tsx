import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Header } from "./header";

import { getCourseById, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }
  const course = await getCourseById(userProgress.activeCourseId);


  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            // title: "English",
            // imageSrc: "/US - United States.svg",
            title: course.title,
            imageSrc: course.imageSrc,
          }}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={userProgress.hasActiveSubscription}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={course.title} />

      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
