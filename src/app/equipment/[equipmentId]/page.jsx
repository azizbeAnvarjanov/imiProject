"use client";
import useDocument from "@/components/useDocument";
import { useParams } from "next/navigation";
import React from "react";

import EquipmentDetails from "@/components/EquipmentDetails";

const EquipmentPage = () => {
  const params = useParams();
  const equipmentId = params.equipmentId;
  const equipment = useDocument("equipments", equipmentId);

  if (!equipment) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <EquipmentDetails equipmentId={equipmentId} />
    </div>
  );
};

export default EquipmentPage;
