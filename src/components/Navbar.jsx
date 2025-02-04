"use client";
import React from "react";
import FetchUser from "./talabnoma-yaratish/FetchUser";

const Navbar = ({ user }) => {
  const dbUser = FetchUser(user?.id);

  return (
    <div>
      {!dbUser ? (
        <></>
      ) : (
        <div className="flex gap-5 items-center justify-end border-b bg-white z-50 p-3">
          {dbUser ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="font-bold">
                  {dbUser?.name} {dbUser?.surname}
                  <p className="text-gray-500 !font-light text-sm">
                    {dbUser?.email} - {dbUser?.department}
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
