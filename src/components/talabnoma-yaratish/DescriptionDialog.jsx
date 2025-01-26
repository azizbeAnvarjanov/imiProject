import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Expand } from "lucide-react";

const DescriptionDialog = ({ description }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Expand />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tlabnoma tavsifi</DialogTitle>
          <DialogDescription className="pt-3 text-black">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DescriptionDialog;
