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
import GetUserFS from "./GetUserFS";
import SidebarLinks from "@/components/SidebarLinks";

const AdminSidebar = async () => {
  const user = await GetUserFS();

  


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
        <SidebarLinks user={user} />
      </div>
    </div>
  );
};

export default AdminSidebar;
