import checkUserInDatabase from "../components/checkUserInDatabase";
import GetUserFc from "../components/GetUserFS";
import GetRoles from "../components/GetRoles";

export default async function Home() {
  const user = await GetUserFc();
  const role = await GetRoles();

  return (
    <div className="p-5">
      Salom - {user?.family_name} {user?.given_name}
      {/* <Dashboard /> */}
    </div>
  );
}
