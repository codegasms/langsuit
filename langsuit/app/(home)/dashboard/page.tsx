import { getIsAdmin } from "@/lib/admin";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  const isAdmin = await getIsAdmin();

  return <DashboardClient isAdmin={isAdmin} />;
};

export default DashboardPage;
