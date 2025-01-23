import React, { useRef, useState } from "react";
import * as XLSX from "xlsx"; // Excel fayllarni o‘qish uchun
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";
import { FileDown, Sheet } from "lucide-react";

const ImportingEquipmentExcel = ({
  branchId,
  roomId,
  roomName,
  branchName,
}) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Fayl tanlash oynasini boshqarish uchun
  const db = getFirestore(); // Firestore ni olish

  // Fayl tanlash oynasini ochish uchun
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Excel faylini o'qish va kolleksiyaga yuklash
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Fayl tanlanmadi!");
      return;
    }

    setLoading(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data); // Excel faylni o‘qish
      const sheetName = workbook.SheetNames[0]; // Birinchi varaqqa murojaat
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet); // Excelni JSON ga aylantirish

      // Jihozlarni Firestore'ga yuklash
      const equipmentsCollection = collection(db, "equipments");
      const uploadPromises = jsonData.map(async (item) => {
        // `item` Excel faylidagi har bir satrni anglatadi
        const equipment = {
          name: item.Name || "Noma’lum",
          inventoryNumber: item.InventoryNumber || "-",
          quantity: parseInt(item.Quantity || "Noma’lum", 10),
          location: roomId,
          branchId,
          roomName,
          branchName,
          qrCode: null,
          measure: item.Measure || "Noma’lum",
          type: item.Type || "Noma’lum",
          tag: item.Tag || "Noma’lum",
          status: item.Status || "Noma’lum",
          unitPrice: parseFloat(item.UnitPrice || "Noma’lum"),
          totalPrice: item.TotalPrice || "Noma’lum",
          createdAt: serverTimestamp(),
          deliverer: item.Deliverer || "Noma’lum",
          receiver: item.Receiver || "Noma’lum",
        };

        // Jihozni Firestore'ga yuklash
        await addDoc(equipmentsCollection, equipment);
      });

      await Promise.all(uploadPromises); // Yuklashni yakunlash
      toast.success("Jihozlar muvaffaqiyatli yuklandi!");
    } catch (error) {
      console.error("Faylni yuklashda xatolik:", error);
      toast.error("Xatolik yuz berdi, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="excel-import">
      <Button onClick={handleButtonClick} disabled={loading}>
        Import <Sheet />
      </Button>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }} // Fayl tanlash oynasi yashirin bo‘ladi
      />
      {loading && <p>Yuklanmoqda...</p>}
    </div>
  );
};

export default ImportingEquipmentExcel;
