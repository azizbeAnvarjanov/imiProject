"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  CalendarCheck,
  CheckCheck,
  File,
  LayoutList,
  LayoutPanelLeft,
  LogOut,
  PackageCheck,
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

 

  return (
    <div>
      <ul className="">
        {userDepartment === "Taminot" && userRole === "Admin" ? (
          <>
            <Link
              href="/axo-dashboard"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">AXO Dashboard</h1>
            </Link>
            <Link
              href="/branches"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Filiallar</h1>
            </Link>
            <Link
              href="/all-equipments"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Barcha jihozlar</h1>
            </Link>
            <Link
              href="/sozlamalar"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">AXO Sozlamalar</h1>
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
          </>
        ) : (
          <></>
        )}

        {userDepartment === "Marketing" && userRole === "Admin" ? (
          <>
            <Link
              href="/"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <LayoutList size="22px" />
              <h1 className="font-medium">Marketing Dashboard</h1>
            </Link>
            <Link
              href="/mening-ishlarim"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <CalendarCheck size="22px" />
              <h1 className="font-medium">Mening ishlarim</h1>
            </Link>
            <Link
              href="/ishlar-tasqsimlash"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <CheckCheck size="22px" />
              <h1 className="font-medium">Ishlarni taqsimlash</h1>
            </Link>
            <Link
              href="/talabnoma-yaratish"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <PackageCheck size="22px" />
              <h1 className="font-medium">Talabnoma yaratish</h1>
            </Link>
            <Link
              href="/mening-talabnomalarim"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <File size="22px" />
              <h1 className="font-medium">Mening talabnomalarim</h1>
            </Link>
          </>
        ) : (
          <></>
        )}

        {userDepartment === "IT" && userRole === "Admin" ? (
          <>
            <Link
              href="/axo-dashboard"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">AXO Dashboard</h1>
            </Link>
            <Link
              href="/branches"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Filiallar</h1>
            </Link>
            <Link
              href="/all-equipments"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">Barcha jihozlar</h1>
            </Link>
            <Link
              href="/sozlamalar"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <Settings size="22px" />
              <h1 className="font-medium">AXO Sozlamalar</h1>
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
            <br />
            <hr />
            <br />
            <Link
              href="/"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <LayoutList size="22px" />
              <h1 className="font-medium">Marketing Dashboard</h1>
            </Link>
            <Link
              href="/mening-ishlarim"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <CalendarCheck size="22px" />
              <h1 className="font-medium">Mening ishlarim</h1>
            </Link>
            <Link
              href="/ishlar-tasqsimlash"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <CheckCheck size="22px" />
              <h1 className="font-medium">Ishlarni taqsimlash</h1>
            </Link>
            <Link
              href="/talabnoma-yaratish"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <PackageCheck size="22px" />
              <h1 className="font-medium">Talabnoma yaratish</h1>
            </Link>
            <Link
              href="/mening-talabnomalarim"
              className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
            >
              <File size="22px" />
              <h1 className="font-medium">Mening talabnomalarim</h1>
            </Link>
          </>
        ) : (
          <></>
        )}
        

        <Link
          href="/mening-ishlarim"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <CalendarCheck size="22px" />
          <h1 className="font-medium">Mening ishlarim</h1>
        </Link>

        {/* <Link
          href="/tasdiqlangan-talabnomalar"
          className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
        >
          <Settings size="22px" />
          <h1 className="font-medium">Tasdiqlangan talabnomalar</h1>
        </Link> */}

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
