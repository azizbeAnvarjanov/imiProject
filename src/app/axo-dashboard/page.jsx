import checkUserInDatabase from "@/components/checkUserInDatabase";
import GetUserFc from "@/components/GetUserFS";
import GetRoles from "@/components/GetRoles";
import Dashboard from "@/components/Dashboard";

export default async function AXODASHBOARD() {
  const user = await GetUserFc();
  const role = await GetRoles();
  checkUserInDatabase(user, role);

  return (
    <>
      <Dashboard />
    </>
  );
}
