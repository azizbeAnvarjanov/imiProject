"use client";
import useDocument from "@/components/useDocument";
import { useParams } from "next/navigation";
import React from "react";

import EquipmentDetails from "@/components/EquipmentDetails";
import Loader from "@/components/Loader";

const EquipmentPage = () => {
  const params = useParams();
  const equipmentId = params.equipmentId;
  const equipment = useDocument("equipments", equipmentId);

  if (!equipment) {
    return <Loader />;
  }

  return (
    <div>
      <EquipmentDetails equipmentId={equipmentId} />
    </div>
  );
};

export default EquipmentPage;
