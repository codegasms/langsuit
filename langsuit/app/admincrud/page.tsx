import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminCrudPage = () => {
  return (
    <App />
  );
};

export default AdminCrudPage;
