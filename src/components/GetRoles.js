import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const GetRoles = async () => {
  const { getRoles } = getKindeServerSession();
  const role = await getRoles();
  return role;
};

export default GetRoles;
