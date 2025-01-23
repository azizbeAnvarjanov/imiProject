import React from "react";
import * as XLSX from "xlsx"; // Excel fayl yaratish uchun kutubxona
import { Button } from "./ui/button"; // Tugma uchun UI komponent (agar mavjud bo'lmasa, oddiy <button> ni ishlating)
import { Sheet } from "lucide-react";

const TableExportToExcel = ({ data, fileName }) => {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("Eksport qilish uchun ma'lumot mavjud emas!");
      return;
    }

    // Ma'lumotlarni Excel formatiga o‘tkazish
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Faylni yuklab olish
    XLSX.writeFile(workbook, `${fileName || "table-data"}.xlsx`);
  };

  return (
    <Button onClick={exportToExcel} className="mt-4">
      Export <Sheet />
    </Button>
  );
};

export default TableExportToExcel;
