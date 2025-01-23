import React from "react";
import { Button } from "./ui/button"; // Tugma uchun UI komponent (agar mavjud bo'lmasa, oddiy <button> ishlating)
import { Printer } from "lucide-react";

const TablePrint = ({ tableId }) => {
  const handlePrint = () => {
    if (!tableId) {
      alert("Table ID mavjud emas!");
      return;
    }

    const table = document.getElementById(tableId); // Tablitsani ID orqali olish
    if (!table) {
      alert("Table topilmadi!");
      return;
    }

    // Print oynasini yaratish
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: left;
              }
              th, td {
                border: 1px solid #dddddd;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
            </style>
          </head>
          <body>
            <h1>Table Print</h1>
            ${table.outerHTML} <!-- Tablitsani HTML formatida qo'shish -->
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print(); // Print oynasini ochish
      printWindow.close(); // Printdan keyin oynani yopish
    }
  };

  return (
    <Button onClick={handlePrint} className="mt-4">
      Print <Printer />
    </Button>
  );
};

export default TablePrint;
