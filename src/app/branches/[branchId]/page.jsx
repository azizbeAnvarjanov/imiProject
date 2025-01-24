"use client";
import React, { useState } from "react";
import useDocument from "../../../components/useDocument";
import { useParams } from "next/navigation";
import BranchRooms from "../../../components/BrancheRooms";
import BranchSklads from "../../../components/BranchSklads";
import AddRoomDialog from "../../../components/AddRoomDialog";
import AddWarehouseModal from "../../../components/AddWarehouseModal";
import useCollection from "@/components/useCollection";
import Loader from "@/components/Loader";

const BranchDetails = () => {
  const params = useParams();
  const branchId = params.branchId;
  const branch = useDocument("branches", branchId);
  const wareHouses = useCollection("wareHouses");
  const rooms = useCollection("rooms");

  return (
    <div>
      {branch ? (
        <div className="p-5">
          <p className="font-bold text-2xl">{branch.name}</p>
          <div className="flex items-center gap-3">
            <AddRoomDialog branchId={branchId} />
            <AddWarehouseModal branchId={branchId} />
          </div>
          <div className="flex items-start gap-5 mt-3">
            <BranchRooms branchId={branchId} />
            <BranchSklads branchId={branchId} />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen grid place-content-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default BranchDetails;
