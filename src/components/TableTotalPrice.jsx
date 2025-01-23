import React from "react";

// TotalPrice hisoblovchi komponent
const TableTotalPrice = ({ data }) => {
  // `data` - tablitsangiz uchun massiv ko'rinishida
  const totalPrice = data.reduce((sum, item) => {
    return sum + (item.totalPrice ? parseFloat(item.totalPrice) : 0);
  }, 0);

  return (
    <div className="text-right font-bold mt-4">
      Umumiy summa: {totalPrice.toLocaleString()} so'm
    </div>
  );
};

export default TableTotalPrice;
