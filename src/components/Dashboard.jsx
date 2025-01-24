"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCollection from "../components/useCollection";
import TotalPriceCalculator from "@/components/TotalPriceCalculator";
import CardNew from "@/components/Card";

import DynamicTagCounter from "@/components/DynamicTagCounter";
import DynamicTypeCounter from "@/components/DynamicTypeCounter";
import DynamicStatusCounter from "@/components/DynamicStatusCounter";
import Statistics from "@/components/Statistics";
const Dashboard = () => {
  return (
    <div className="p-5">
      <Statistics />
      <br />
      <div className="flex gap-3">
        <DynamicTagCounter collectionName="equipments" />
        <DynamicStatusCounter collectionName="equipments" />
      </div>
      <br />
      <DynamicTypeCounter collectionName="equipments" />
    </div>
  );
};

export default Dashboard;
