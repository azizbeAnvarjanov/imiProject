"use client";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
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
