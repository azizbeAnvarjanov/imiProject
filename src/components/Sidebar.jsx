import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import {
  GalleryVerticalEnd,
  LayoutPanelLeft,
  LogOut,
  Settings,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AdminSidebar = async () => {
  return (
    <div>
      <div className="border-r bg-white fixed left-0 top-0 h-screen w-[35vh] p-4">
        <div className="flex gap-4 items-center p-3">
          <div className="w-[40px] h-[40px] border rounded-full shadow-lg relative">
            <Link href="/">
              <Image src="/logo.png" alt="" fill />
            </Link>
          </div>

          <div className="flex flex-col">
            <Link href="/" className="font-medium">
              Impuls Tibbiyot
            </Link>
            <Link href="/" className="font-medium">
              Instituti platformasi
            </Link>
          </div>
        </div>
        <ul className="">
          <Link
            href="/branches"
            className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
          >
            <LayoutPanelLeft size="22px" />
            <h1 className="font-medium">Filiallar</h1>
          </Link>
          <Link
            href="/all-equipments"
            className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
          >
            <GalleryVerticalEnd size="22px" />
            <h1 className="font-medium">Barcha jihozlar</h1>
          </Link>

          <Link
            href="/sozlamalar"
            className="flex items-center justify-start gap-3 p-3 rounded-md hover:bg-muted"
          >
            <Settings size="22px" />
            <h1 className="font-medium">Sozlamalar</h1>
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
          {/* {user ? <>{user.uid}</>:<>n</>} */}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
