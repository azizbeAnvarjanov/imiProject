import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import useCollection from "../components/useCollection";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, GalleryHorizontalEnd } from "lucide-react";
import Link from "next/link";

const TotalPriceCalculator = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const equipments = useCollection("equipments");

  console.log(equipments);

  useEffect(() => {
    if (equipments && equipments.length > 0) {
      let total = 0;
      equipments.forEach((doc) => {
        if (doc.totalPrice) {
          total += parseFloat(doc.totalPrice);
        }
      });
      setTotalPrice(total);
    }
  }, [equipments]); // Jihozlar o'zgarishini kuzatish

  return (
    <div className="total-price-calculator">
      <div className="card sweeperCard o-hidden">
        <div className="p-5 border shadow-lg rounded-lg">
          <div className="font-bold mb-3">Umumiy summa</div>
          <div className="text-3xl font-bold">
            {totalPrice?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPriceCalculator;
