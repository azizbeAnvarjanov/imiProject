import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-2";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const ViewQrCode = ({ url }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-black py-2 px-3 text-white hover:bg-opacity-70 transition-all rounded-sm">
        <Eye size="18px" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">QR code</DialogTitle>
          <div className=" h-[500px] relative">
            <Image src={url} fill alt="qr code" className="object-contain" />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewQrCode;
