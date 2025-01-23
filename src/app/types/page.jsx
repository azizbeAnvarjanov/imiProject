"use client"
import DynamicTypeCounter from "@/components/DynamicTypeCounter";
import React from "react";

const TypesPage = () => {
  return (
    <div className="p-5">
      <DynamicTypeCounter collectionName="equipments" />
    </div>
  );
};

export default TypesPage;
