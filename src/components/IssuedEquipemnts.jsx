import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
} from "firebase/firestore";
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
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { db } from "@/app/firebase";

const IssuedEqipments = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  console.log(selectedDepartment);

  useEffect(() => {
    // Fetch departments for the select dropdown
    const fetchDepartments = async () => {
      const deptSnapshot = await getDocs(collection(db, "departments"));
      setDepartments(
        deptSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchDepartments();
  }, []);

  const handleTransfer = async () => {
    if (quantity > item.quantity) {
      toast.error("Mavjud sonidan ko‘proq chiqarilmaydi!");
      return;
    }
    const remaining = item.quantity - quantity;
    const updatedPrice = remaining * item.unitPrice;

    await updateDoc(doc(db, "equipments", item.id), {
      quantity: remaining,
      totalPrice: updatedPrice,
    });

    await addDoc(collection(db, "issuedItems"), {
      itemName: item.name,
      issuedDate: new Date().toISOString().split("T")[0],
      issuedMonth: new Date().toISOString().split("T")[0].slice(0, 7),
      quantity,
      totalPrice: quantity * item.unitPrice,
      unitPrice: item.unitPrice,
      departmentId: selectedDepartment,
      issuedAt: new Date().toISOString(),
    });

    toast.success("Jihoz muvaffaqiyatli chiqarildi!");
    setOpen(false);
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
          <DialogTitle>{item.name} chiqarish</DialogTitle>
          <DialogDescription>Mavjud soni: {item.quantity}</DialogDescription>
          <h3>{item.name}</h3>
          <p>Mavjud soni: {item.quantity}</p>
          <p>Umumiy narxi: {item.totalPrice?.toLocaleString()} so'm</p>
        </DialogHeader>
        <Input
          type="number"
          placeholder="Nechta chiqariladi?"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Select
          defaultValue={selectedDepartment || "-"}
          onValueChange={(value) => setSelectedDepartment(value)}
        >
          <SelectTrigger>{selectedDepartment || "-"}</SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleTransfer}>Berish</Button>
      </DialogContent>
    </Dialog>
  );
};

export default IssuedEqipments;
