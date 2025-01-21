"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import addWareHaouse from "../components/addWareHaouse";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
function AddWarehouseModal({ branchId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wareHouseName, setWareHouseName] = useState("");

  const handleAddRoom = async () => {
    setLoading(true);
    if (wareHouseName) {
      await addWareHaouse(wareHouseName, branchId);
      setWareHouseName("");
      setIsOpen(false);
      setLoading(false);
      toast.success("Yangi sklad qo'shildi");
    } else {
      toast.error("Iltimos sklad nomini kiriting");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add sklad</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add new warehouse to - {branchId ? branchId : <></>}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              value={wareHouseName}
              onChange={(e) => setWareHouseName(e.target.value)}
              id="name"
              className="col-span-3"
              placeholder="Enter room name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={handleAddRoom}
            className="felx items-center justify-center"
          >
            {loading ? (
              <div className="loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
                <div className="bar6"></div>
                <div className="bar7"></div>
                <div className="bar8"></div>
                <div className="bar9"></div>
                <div className="bar10"></div>
                <div className="bar11"></div>
                <div className="bar12"></div>
              </div>
            ) : (
              <>Add</>
            )}
          </Button>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Bekor qilish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddWarehouseModal;
