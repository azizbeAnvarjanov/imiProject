"use client";
import { useParams } from "next/navigation";
import React from "react";
import useDocument from "@/components/useDocument";

const RoomDetails = () => {
  const params = useParams();
  const roomId = params.roomId;
  const currentRoom = useDocument("rooms", roomId);
  return <div className="p-5">RoomDetails - {currentRoom?.name}</div>;
};

export default RoomDetails;
