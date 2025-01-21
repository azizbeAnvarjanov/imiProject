"use client";
import { useParams } from "next/navigation";
import React from "react";
import useDocument from "@/components/useDocument";
import AddEquipmentDialog from "@/components/AddEquipmentDialog";
import useCollection from "@/components/useCollection";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const RoomDetails = () => {
  const params = useParams();
  const roomId = params.roomId;
  const branchId = params.branchId;
  const currentRoom = useDocument("rooms", roomId);
  const branch = useDocument("branches", branchId);
  const equipments = useCollection("equipments");
  return (
    <div className="p-5">
      RoomDetails - {currentRoom?.name}
      <AddEquipmentDialog
        branchId={branchId}
        roomId={roomId}
        roomName={currentRoom?.name}
        branchName={branch?.name}
      />
      <div>
        {equipments.length === 0 ? (
          <>no equipments</>
        ) : (
          <Table className="w-full border-collapse border border-gray-200 overflow-x-scroll min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableCell className="bg-gray-500 text-white font-bold">
                  №
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Joylashuvi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Invertar raqami
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Jihoz nomi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Turi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Dona narxi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Ja'mi narxi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Holati
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  O'lchov birligi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Sana
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Topshirdi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Qabul qildi
                </TableCell>

                <TableCell className="bg-gray-500 text-white font-bold">
                  Amallar
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipments.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="border p-2 text-center">
                    {index + 1}
                  </TableCell>
                  
                  <TableCell className="border p-2">
                    {user.inventoryNumber || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.name || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.type || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.quantity || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.unitPrice?.toLocaleString() || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.totalPrice?.toLocaleString() || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.status || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.measures || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.createdAt?.toDate().toLocaleString() ||
                      "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.deliverer || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.receiver || "Ma'lumot yo'q"}
                  </TableCell>

                  <TableCell className="border p-2 text-center">
                    <Link
                      href={`/equipment/${user.id}`}
                      className="text-blue-500 underline hover:text-blue-700 ml-2"
                    >
                      Batafsil
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
