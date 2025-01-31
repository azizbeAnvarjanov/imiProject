import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import TagsSelect from "@/components/TagsSelect";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Button } from "./ui/button";
import useCollection from "./useCollection";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import { ClipboardPen } from "lucide-react";

const EditEquipmentDialog = ({ equipmentId }) => {
  const [equipmentData, setEquipmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [changedTag, setChangedTag] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const db = getFirestore();
  const users = useCollection("users");
  const measures = useCollection("measures");
  const types = useCollection("types");
  const statuses = useCollection("statuses");
  const tags = useCollection("tags");

  useEffect(() => {
    const fetchEquipment = async () => {
      const docRef = doc(db, "equipments", equipmentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEquipmentData(docSnap.data());
        setChangedTag(docSnap.data().tag); // Tagni to'g'ridan-to'g'ri olish
        setCreatedAt(docSnap.data().createdAt); // Sana o'zgarmasligi uchun saqlash
      }
    };

    fetchEquipment();
  }, [db, equipmentId]);

  const handleInputChange = (field, value) => {
    setEquipmentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const unitPrice = Number(equipmentData.unitPrice);
    const quantity = Number(equipmentData.quantity);

    if (isNaN(unitPrice) || isNaN(quantity)) {
      alert("Unit Price and Quantity must be valid numbers");
      return;
    }

    const totalPrice = unitPrice * quantity;

    try {
      const docRef = doc(db, "equipments", equipmentId);
      await updateDoc(docRef, {
        name: equipmentData.name,
        inventoryNumber: equipmentData.inventoryNumber || "",
        quantity,
        unitPrice,
        totalPrice,
        type: equipmentData.type,
        measure: equipmentData.measure,
        status: equipmentData.status,
        deliverer: equipmentData.deliverer,
        receiver: equipmentData.receiver,
        qrCode: equipmentData?.qrCode,
        tag: changedTag, // Yangilangan tagni saqlash
      });

      toast.success("Equipment updated successfully!");
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating equipment:", error);
      toast.error("Error updating equipment");
    }
  };

  if (!equipmentData) {
    return null;
  }

  return (
    <Dialog open={isOpen}>
      <Button onClick={() => setIsOpen(true)}>
        <ClipboardPen size="15px" />
      </Button>
      <DialogContent>
        <DialogTitle>Edit Equipment</DialogTitle>

        <div>
          <Label className="my-2 flex">Jihoz nomi:</Label>
          <Input
            value={equipmentData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter equipment name"
            required
          />
        </div>
        <div>
          <Label className="my-2 flex">Invertar raqami:</Label>
          <Input
            value={equipmentData.inventoryNumber || ""}
            onChange={(e) =>
              handleInputChange("inventoryNumber", e.target.value)
            }
            placeholder="Invertar raqamini kiriting"
          />
        </div>

        <div>
          <Label className="my-2 flex">Jihoz soni:</Label>
          <Input
            placeholder="Sonini kiriting"
            value={equipmentData.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            required
            type="number"
          />
        </div>
        <div>
          <Label className="my-2 flex">Jihoz dona narxi:</Label>
          <Input
            value={equipmentData.unitPrice}
            onChange={(e) => handleInputChange("unitPrice", e.target.value)}
            placeholder="Jihoz dona narxi"
            type="number"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="my-2 flex">Jihoz turi:</Label>
            <Select
              onValueChange={(value) => handleInputChange("type", value)}
              value={equipmentData.type}
            >
              <SelectTrigger className="w-full">
                {equipmentData.type}
              </SelectTrigger>
              <SelectContent>
                {types?.map((type, idx) => (
                  <SelectItem key={idx} value={type?.name}>
                    {type?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="my-2 flex">Jihoz o'lchov birligi:</Label>
            <Select
              onValueChange={(value) => handleInputChange("measure", value)}
              value={equipmentData.measure}
            >
              <SelectTrigger className="w-full">
                {equipmentData.measure}
              </SelectTrigger>
              <SelectContent>
                {measures?.map((measure, idx) => (
                  <SelectItem key={idx} value={measure?.name}>
                    {measure?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="my-2 flex">Holati:</Label>
            <Select
              onValueChange={(value) => handleInputChange("status", value)}
              value={equipmentData.status}
            >
              <SelectTrigger className="w-full">
                {equipmentData.status}
              </SelectTrigger>
              <SelectContent>
                {statuses?.map((status, idx) => (
                  <SelectItem key={idx} value={status?.name}>
                    {status?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <TagsSelect tags={tags} setTag={setChangedTag} />
          </div>
          <div>
            <Label className="my-2 flex">Topshiruvchi:</Label>
            <Select
              onValueChange={(value) => handleInputChange("deliverer", value)}
              value={equipmentData.deliverer}
            >
              <SelectTrigger className="w-full">
                {equipmentData.deliverer}
              </SelectTrigger>
              <SelectContent>
                {users?.map((user, idx) => (
                  <SelectItem
                    key={idx}
                    value={user?.name + " " + user?.surname}
                  >
                    {user?.name} {user?.surname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="my-2 flex">Qabul qiluvchi:</Label>
            <Select
              onValueChange={(value) => handleInputChange("receiver", value)}
              value={equipmentData.receiver}
            >
              <SelectTrigger className="w-full">
                {equipmentData.receiver}
              </SelectTrigger>
              <SelectContent>
                {users?.map((user, idx) => (
                  <SelectItem
                    key={idx}
                    value={user?.name + " " + user?.surname}
                  >
                    {user?.name} {user?.surname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex">
          <Button
            type="button"
            disabled={loading}
            className="mr-2"
            onClick={handleSubmit}
          >
            Saqlash
          </Button>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => setIsOpen(false)}
          >
            Bekor qilish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEquipmentDialog;
