import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import GetUserFS from "../components/GetUserFS";

const Navbar = async () => {
  const user = await GetUserFS();
  return (
    <div>
      {!user ? (
        <></>
      ) : (
        <div className="flex gap-5 items-center justify-end border-b bg-white z-50 p-3">
          {user ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="font-bold">
                  {user?.family_name} {user?.given_name}
                  <p className="text-gray-500 !font-light text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
