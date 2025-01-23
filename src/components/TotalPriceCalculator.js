import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import useCollection from "../components/useCollection";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>Umimiy jihozlar summasi</CardTitle>
        </CardHeader>
        <CardContent>{totalPrice?.toLocaleString()}</CardContent>
      </Card>
    </div>
  );
};

export default TotalPriceCalculator;
