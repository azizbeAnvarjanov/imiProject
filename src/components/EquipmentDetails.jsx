import React, { useEffect, useState } from "react";
import useDocument from "./useDocument";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase"; // Firebase konfiguratsiyasi eksport qilingan joy
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import useCollection from "./useCollection";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import ChangeLocationDialog from "./ChangeLocationDialog";
import QRCodeGenerator from "./QRCodeGenerator";

const EquipmentDetails = ({ equipmentId }) => {
  const equipment = useDocument("equipments", equipmentId); // Jihozni olish uchun hook
  const [formData, setFormData] = useState({
    name: "",
    inventoryNumber: "",
    type: "",
    tag: "",
    measure: "",
    status: "",
    branchId: "",
    location: "",
    unitPrice: 0,
    quantity: 0,
    totalPrice: 0,
  });

  const types = useCollection("types");
  const tags = useCollection("tags");
  const statuses = useCollection("statuses");
  const measures = useCollection("measures");
  const branches = useCollection("branches");

  useEffect(() => {
    if (equipment) {
      setFormData({
        ...equipment,
        price: equipment.unitPrice || 0,
        quantity: equipment.quantity || 0,
        totalPrice: equipment.unitPrice * equipment.quantity || 0,
      });
    }
  }, [equipment]);

  const handleInputChange = async (key, value) => {
    const updatedData = { ...formData, [key]: value };

    if (key === "unitPrice" || key === "quantity") {
      updatedData.totalPrice = updatedData.unitPrice * updatedData.quantity; // Total price ni hisoblash
    }

    setFormData(updatedData);

    try {
      const equipmentRef = doc(db, "equipments", equipmentId);
      await updateDoc(equipmentRef, {
        [key]: value,
        totalPrice: updatedData.totalPrice,
      }); // Firebase’da yangilash
      toast.success("Yangilandi!");
    } catch (error) {
      console.error("Yangilashda xatolik yuz berdi:", error);
      toast.error("Yangilashda xatolik yuz berdi");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-4">Equipment Details</h1>
        <ChangeLocationDialog equipmentId={equipmentId} />
      </div>
      <QRCodeGenerator
        equipmentId={equipmentId}
        equipmentName={formData.name}
      />

      <div className="grid grid-cols-4 items-start gap-3 mt-3">
        <div className="mb-4">
          <Label
            htmlFor="equipmentName"
            className="block text-sm font-medium text-gray-700"
          >
            Jihoz Nomi
          </Label>
          <Input
            type="text"
            id="equipmentName"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <Label
            htmlFor="inventoryNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Jihoz Inventar Raqami
          </Label>
          <Input
            type="text"
            id="inventoryNumber"
            value={formData.inventoryNumber}
            onChange={(e) =>
              handleInputChange("inventoryNumber", e.target.value)
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <Label className="my-2 flex">Jihoz turi:</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleInputChange("type", value)}
          >
            <SelectTrigger className="w-full">
              {formData.type || "Tanlang"}
            </SelectTrigger>
            <SelectContent>
              {types?.map((type, idx) => (
                <SelectItem key={idx} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="my-2 flex">Jihoz tag:</Label>
          <Select
            value={formData.tag}
            onValueChange={(value) => handleInputChange("tag", value)}
          >
            <SelectTrigger className="w-full">
              {formData.tag || "Tanlang"}
            </SelectTrigger>
            <SelectContent>
              {tags?.map((tag, idx) => (
                <SelectItem key={idx} value={tag.name}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="my-2 flex">Jihoz status:</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleInputChange("status", value)}
          >
            <SelectTrigger className="w-full">
              {formData.status || "Tanlang"}
            </SelectTrigger>
            <SelectContent>
              {statuses?.map((status, idx) => (
                <SelectItem key={idx} value={status.name}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="my-2 flex">Jihoz o'lchov birligi:</Label>
          <Select
            value={formData.measure}
            onValueChange={(value) => handleInputChange("measure", value)}
          >
            <SelectTrigger className="w-full">
              {formData.measure || "Tanlang"}
            </SelectTrigger>
            <SelectContent>
              {measures?.map((measure, idx) => (
                <SelectItem key={idx} value={measure.name}>
                  {measure.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="my-2 flex">Narxi (1 dona):</Label>
          <Input
            type="number"
            value={formData.unitPrice}
            onChange={(e) =>
              handleInputChange("unitPrice", parseFloat(e.target.value) || 0)
            }
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label className="my-2 flex">Soni:</Label>
          <Input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              handleInputChange("quantity", parseInt(e.target.value) || 0)
            }
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label className="my-2 flex">Umumiy narxi:</Label>
          <Input
            type="text"
            value={formData.totalPrice?.toLocaleString()} // Faqat o'qish uchun
            disabled
            className="mt-1 block w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
