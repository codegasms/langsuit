import FeedbackForm from "./feedbackForm";

const HomePage = () => {
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold to-neutral-700">Feedback Page</h1>
      <FeedbackForm />
    </div>
  );
};

export default HomePage;
