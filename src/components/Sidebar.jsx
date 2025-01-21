import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import GetUserFS from "./GetUserFS";

const AdminSidebar = async () => {
  const user = await GetUserFS();
  return (
    <div>
      <div className="border border-r-2 fixed left-0 top-0 h-screen w-[35vh] p-5">
      <h1 className="text-center w-full">{user && user.given_name +" " + user.family_name}</h1>
        <Link
          href="/"
          className="p-3 hover:bg-muted rounded-md w-full flex font-bold"
        >
          Main page
        </Link>
        <ul className="mt-4">
          <li className="p-3 hover:bg-muted rounded-md">
            <Link href="/branches">
              <h1 className="font-bold">Filiallar</h1>
            </Link>
          </li>
          <li className="p-3 hover:bg-muted rounded-md">
            <Link href="/admin/all-equipments">
              <h1 className="font-bold">Barcha jihozlar</h1>
            </Link>
          </li>
          <li className="p-3 hover:bg-muted rounded-md">
            <Link href="/all-equipments">
              <h1 className="font-bold">Xonalar</h1>
            </Link>
          </li>
          <li className="p-3 hover:bg-muted rounded-md">
            <Link href="/all-equipments">
              <h1 className="font-bold">Skladlar</h1>
            </Link>
          </li>
          <li className="p-3 hover:bg-muted rounded-md">
            <Link href="/equipment-history">
              <h1 className="font-bold">Qabul tarixlari</h1>
            </Link>
          </li>
          <li className="p-3 hover:bg-muted rounded-md">
            <Link href="/sozlamalar">
              <h1 className="font-bold">Sozlamalar</h1>
            </Link>
          </li>
          <LogoutLink>
            <Button
              className="w-[90%] left-[50%] absolute bottom-5 -translate-x-[50%]"
              variant="destructive"
            >
              Logout
            </Button>{" "}
          </LogoutLink>
          <br />
          {/* {user ? <>{user.uid}</>:<>n</>} */}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
