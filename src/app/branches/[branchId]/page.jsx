"use client";
import React from "react";
import useDocument from "../../../components/useDocument";
import { useParams } from "next/navigation";
import BranchRooms from "../../../components/BrancheRooms";
import BranchSklads from "../../../components/BranchSklads";
import AddRoomDialog from "../../../components/AddRoomDialog";
import AddWarehouseModal from "../../../components/AddWarehouseModal";
import useCollection from "@/components/useCollection";

const BranchDetails = () => {
  const params = useParams();
  const branchId = params.branchId;
  const branch = useDocument("branches", branchId);
  const rooms = useCollection("rooms");
  const wareHouses = useCollection("wareHouses");
  // const BranchRooms = branchRooms("wareHouses", branchId);

  return (
    <div>
      {branch ? (
        <div className="p-5">
          <p>{branch.name}</p>
          <br />
          <AddRoomDialog branchId={branchId} />
          <AddWarehouseModal branchId={branchId} />
          <br />
          <br />
          <BranchRooms branchId={branchId} />
          <br />
          <hr />
          <br />
          <BranchSklads branchId={branchId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BranchDetails;
