"use client";
import { useParams } from "next/navigation";
import React from "react";
import useDocument from "@/components/useDocument";
import AddEquipmentDialog from "@/components/AddEquipmentDialog";
import useCollection from "@/components/useCollection";

import BranchRoomsID from "@/components/BranchRoomsID";

const SkladDetails = () => {
  const params = useParams();
  const skladId = params.skladId;
  const branchId = params.branchId;
  const currentRoom = useDocument("wareHouses", skladId);
  const branch = useDocument("branches", branchId);
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-2xl">
          {branch?.name} - {currentRoom?.name}
        </h1>
        <AddEquipmentDialog
          branchId={branchId}
          roomId={skladId}
          roomName={currentRoom?.name}
          branchName={branch?.name}
        />
      </div>

      <div>
        <BranchRoomsID branchId={branchId} roomId={skladId} />
      </div>
    </div>
  );
};

export default SkladDetails;
