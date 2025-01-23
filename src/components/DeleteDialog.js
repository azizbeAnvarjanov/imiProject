import React from "react";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Shadcn UI dialog komponentlari
import { Button } from "@/components/ui/button"; // Shadcn UI button komponenti
import { Trash } from "lucide-react";

const DeleteDialog = ({ id, name }) => {
  const db = getFirestore(); // Firestore ulanishi

  const handleDelete = async () => {
    if (!id) return;

    try {
      const equipmentRef = doc(db, "equipments", id);
      await deleteDoc(equipmentRef); // Jihozni Firestore'dan o'chirish
      toast.success(`Muvaffaqiyatli o'chirildi!`);
    } catch (error) {
      console.error("Jihozni o'chirishda xatolik:", error);
      toast.error("Xatolik yuz berdi, qayta urinib ko'ring.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Jihozni o'chirish</DialogTitle>
          <DialogDescription>
            Siz <strong>{name}</strong> jihozini o‘chirmoqchimisiz? Ushbu amalni
            bekor qilish imkonsiz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            O'chirish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
