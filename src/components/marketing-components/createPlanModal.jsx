"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "@/app/firebase";
import FetchUser from "../talabnoma-yaratish/FetchUser";

function CreatePlanModal({ userId }) {
  const user = FetchUser(userId);
  console.log("User data:", user); // Debug uchun foydalanuvchi ma'lumotlarini ko‘rish

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createPlan() {
    if (!title || !description) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (!user) {
      toast.error("Foydalanuvchi ma'lumotlari yuklanmadi!");
      return;
    }

    const departmentId = user?.department; // `departmentId` bo‘lishi kerak!
    const createdBy = user?.kindeId; // `id` mavjudligini tekshirish

    if (!departmentId) {
      toast.error("Bo‘lim aniqlanmadi!");
      return;
    }

    if (!createdBy) {
      toast.error("Foydalanuvchi identifikatori topilmadi!");
      return;
    }

    try {
      await addDoc(collection(db, "plans"), {
        title,
        description,
        departmentId,
        createdAt: new Date(),
        createdBy,
        tasks: [],
        progress: 0,
      });

      toast.success("Reja yaratildi!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Reja yaratishda xatolik:", error);
      toast.error("Xatolik yuz berdi, qayta urinib ko‘ring.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="mr-2" />
          Yangi reja
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yangi reja yaratish</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nomi
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Reja nomini kiriting"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Tavsif
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Reja tavsifini kiriting"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={createPlan}>Qo‘shish</Button>
          <Button variant="destructive">Bekor qilish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePlanModal;
