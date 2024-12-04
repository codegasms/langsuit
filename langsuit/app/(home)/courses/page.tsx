// import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

// Mocking database queries
const getCourses = async () => {
  return [
    { id: 1, title: "English", description: "Learn English basics", imageSrc: "/US - United States.svg" },
    { id: 2, title: "Spanish", description: "Master Spanish vocabulary", imageSrc: "/ES - Spain.svg" },
    { id: 3, title: "French", description: "Explore French culture", imageSrc: "/FR - France.svg" },
  ];
};

const getUserProgress = async () => {
  return {
    hearts: 15,
    points: 900,
    hasActiveSubscription: true,
    activeCourseId: 2,
    userName: "Akshat",
  };
};

// CoursesPage Component
const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold to-neutral-700">Courses Page</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;

