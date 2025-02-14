import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../app/firebase";
import { Button } from "./ui/button";
import { ClipboardCopy } from "lucide-react";

const IssuedEqipments = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

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

    await updateDoc(doc(db, "storage", item.id), {
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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {" "}
          <Button variant="destructive">
            <ClipboardCopy />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.name} chiqarish</DialogTitle>
            <DialogDescription>Mavjud soni: {item.quantity}</DialogDescription>
            <h3>{item.name}</h3>
            <p>Mavjud soni: {item.quantity}</p>
            <p>Umumiy narxi: {item.totalPrice} so'm</p>
          </DialogHeader>
          <Input
            type="number"
            placeholder="Nechta chiqariladi?"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Select onValueChange={(value) => setSelectedDepartment(value)}>
            <SelectTrigger>Bo'lim tanlang</SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleTransfer}>Berish</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssuedEqipments;
