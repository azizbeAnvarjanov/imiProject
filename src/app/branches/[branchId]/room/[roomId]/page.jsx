"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import useDocument from "@/components/useDocument";
import AddEquipmentDialog from "@/components/AddEquipmentDialog";
import ImportingEquipmentExcel from "@/components/ImportingEquipmentExcel";

import BranchRoomsID from "@/components/BranchRoomsID";
import EditNameDialog from "@/components/EditElementDialog";

const RoomDetails = () => {
  const params = useParams();
  const roomId = params.roomId;
  const branchId = params.branchId;
  const currentRoom = useDocument("rooms", roomId);
  const branch = useDocument("branches", branchId);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-2xl flex gap-2">
          {branch?.name} - {currentRoom?.name} 
          <EditNameDialog
            id={roomId}
            currentName={currentRoom?.name}
            collectionName="rooms"
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onOpen={() => setDialogOpen(true)}
          />
        </h1>
        <div className="flex gap-3">
          <AddEquipmentDialog
            branchId={branchId}
            roomId={roomId}
            roomName={currentRoom?.name}
            branchName={branch?.name}
          />
          <ImportingEquipmentExcel
            branchId={branchId}
            roomId={roomId}
            roomName={currentRoom?.name}
            branchName={branch?.name}
          />
        </div>
      </div>

      <div>
        <BranchRoomsID branchId={branchId} roomId={roomId} />
      </div>
    </div>
  );
};

export default RoomDetails;
