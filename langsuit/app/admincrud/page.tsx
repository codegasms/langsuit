import dynamic from "next/dynamic";

import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminCrudPage = () => {
  const isAdmin = getIsAdmin();

  if (!isAdmin) redirect("/");

  return (
    <div>
      <App />
    </div>
  );
};

export default AdminCrudPage;
