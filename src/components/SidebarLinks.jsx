"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  File,
  FolderKanban,
  GalleryVerticalEnd,
  LayoutDashboard,
  LayoutPanelLeft,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import FetchUser from "./talabnoma-yaratish/FetchUser";
import { Button } from "./ui/button";

const SidebarLinks = ({ user }) => {
  const dbUser = FetchUser(user?.id);
  const userDepartment = dbUser?.department;
  const userRole = dbUser?.role;

  // if (userDepartment === "Marketing" && userRole === "Admin") {
  //   return (
  //     <>
  //       <Link
  //         href="/marketing-dashboard"
  //         className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
  //       >
  //         <LayoutDashboard size="22px"/>
  //         <h1 className="font-medium">Marketing Dashboard</h1>
  //       </Link>
  //       <Link
  //         href="/marketing-projects"
  //         className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
  //       >
  //         <FolderKanban size="22px"/>
  //         <h1 className="font-medium">Loyixalar</h1>
  //       </Link>
  //     </>
  //   );
  // }
  // if (userDepartment === "Taminot" && userRole === "Employee") {
  //   return (
  //     <>
  //       <Link
  //         href="/talabnoma-yaratish"
  //         className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
  //       >
  //         <LayoutPanelLeft size="22px" />
  //         <h1 className="font-medium">Talabnoma yaratish</h1>
  //       </Link>
  //       <Link
  //         href="/mening-talabnomalarim"
  //         className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
  //       >
  //         <File size="22px" />
  //         <h1 className="font-medium">Mening talabnomalarim</h1>
  //       </Link>
  //     </>
  //   );
  // }
  // if (userDepartment === "Taminot" && userRole === "Admin") {
  //   return (
  //     <>
  //       <Link
  //         href="/talabnoma-yaratish"
  //         className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
  //       >
  //         <LayoutPanelLeft size="22px" />
  //         <h1 className="font-medium">Taminot dashboard</h1>
  //       </Link>
  //     </>
  //   );
  // }
  

  return (
    <div>
      <ul className="">
        <Link
          href="/branches"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <LayoutPanelLeft size="22px" />
          <h1 className="font-medium">Filiallar</h1>
        </Link>
        <Link
          href="/talabnoma-yaratish"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <LayoutPanelLeft size="22px" />
          <h1 className="font-medium">Talabnoma yaratish</h1>
        </Link>
        <Link
          href="/mening-talabnomalarim"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <File size="22px" />
          <h1 className="font-medium">Mening talabnomalarim</h1>
        </Link>
        <Link
          href="/all-equipments"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <GalleryVerticalEnd size="22px" />
          <h1 className="font-medium">Barcha jihozlar</h1>
        </Link>
        {userDepartment === "Taminot" && userRole === "Admin" ? (
          <>
            <Link
              href="/sozlamalar"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Sozlamalar</h1>
            </Link>
            <Link
              href="/talabnomalar"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Talabnomalar</h1>
            </Link>
          </>
        ) : (
          <></>
        )}
        {userDepartment === "Marketing" && userRole === "Admin" ? (
          <>
            <Link
              href="/marketing-dashboard"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Marketing Dashboard</h1>
            </Link>
            <Link
              href="/marketing-projects"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Loyixalar</h1>
            </Link>
          </>
        ) : (
          <></>
        )}

        <Link
          href="/tasdiqlangan-talabnomalar"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <Settings size="22px" />
          <h1 className="font-medium">Tasdiqlangan talabnomalar</h1>
        </Link>

        <LogoutLink>
          <Button
            className="w-[90%] left-[50%] absolute bottom-5 -translate-x-[50%]"
            variant="destructive"
          >
            <LogOut />
            Tizimdan chiqish
          </Button>{" "}
        </LogoutLink>
        <br />
      </ul>
    </div>
  );
};

export default SidebarLinks;
