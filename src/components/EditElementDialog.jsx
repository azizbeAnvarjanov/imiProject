"use client";
import { useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleFadingPlus, FolderPen, Pen } from "lucide-react";
import { toast } from "react-hot-toast";

const EditNameDialog = ({
  id,
  currentName,
  collectionName,
  open,
  onClose,
  onOpen,
}) => {
  console.log(id);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { name: newName });

      // 2. Equipments collectionidan ushbu xonaga tegishli jihozlarni olish
      const equipmentsRef = collection(db, "equipments");
      const q = query(equipmentsRef, where("location", "==", id));
      const querySnapshot = await getDocs(q);

      // 3. Jihozlarning roomName qiymatini yangilash
      const updatePromises = querySnapshot.docs.map(async (docSnap) => {
        const equipmentRef = doc(db, "equipments", docSnap.id);
        return updateDoc(equipmentRef, { roomName: newName });
      });

      await Promise.all(updatePromises);
      toast.success("Muvafaqiyatli yangilandi");

      onClose();
    } catch (error) {
      console.error("Error updating name: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Button onClick={onOpen}>
        <FolderPen />
      </Button>
      <DialogContent>
        <DialogTitle>Nomni o'zgartirish - {id}</DialogTitle>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Yangi nomni kiriting"
        />
        <div>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={loading || newName === currentName}
          >
            {loading ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditNameDialog;
