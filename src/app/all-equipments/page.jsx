"use client";
import React, { useState } from "react";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCollection from "@/components/useCollection";
import ViewQrCode from "@/components/ViewQrCode";
import { SquareArrowOutUpRight } from "lucide-react";
import SearchInput from "@/components/SearchInput";

const AllEquipments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const equipments = useCollection("equipments");
  // Filtrlash funksiyasi
  const filteredData = equipments.filter((item) =>
    [
      "name",
      "branchName",
      "status",
      "roomName",
      "inventoryNumber",
      "tag",
    ].some((key) => item[key]?.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return (
    <div className="p-5 overflow-x-auto">
      <div>
        <h1>All equipments</h1>
        <div></div>
      </div>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by name..."
      />
      {filteredData.length === 0 ? (
        <>no equipments</>
      ) : (
        <Table className="w-[2000px] border-collapse border border-gray-200 mt-4">
          <TableHeader>
            <TableRow>
              <TableCell className="bg-gray-500 text-white font-bold">
                №
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                QR
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Filial
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Xona
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Jihoz nomi
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Invertar raqami
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Turi
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Soni
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
                Tag
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
            {filteredData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="border p-2 text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="border">
                  {user.qrCode ? (
                    <>
                      <ViewQrCode url={user.qrCode} />
                    </>
                  ) : (
                    <>-</>
                  )}
                </TableCell>

                <TableCell className="border p-2 hover:underline hover:text-blue-600">
                  {/* {user.branchName || "Ma'lumot yo'q"} */}
                  <Link href={`/branches/${user.branchId}`} target="_blank">
                    {user.branchName || "Ma'lumot yo'q"}
                  </Link>
                </TableCell>

                <TableCell className="border p-2 hover:underline hover:text-blue-600">
                  <Link
                    target="_blank"
                    href={`/branches/${user.branchId}/${
                      user.roomName ? "room" : "sklad"
                    }/${user.location}`}
                  >
                    {user.roomName || user.wareHouseName || "Ma'lumot yo'q"}
                  </Link>
                </TableCell>
                <TableCell className="border p-2 hover:underline hover:text-blue-600">
                  <Link href={`/equipment/${user.id}`} target="_blank">
                    {user.name || "Ma'lumot yo'q"}
                  </Link>
                </TableCell>
                <TableCell className="border p-2">
                  {user.inventoryNumber || "Ma'lumot yo'q"}
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
                  {user.measure || "Ma'lumot yo'q"}
                </TableCell>
                <TableCell className="border p-2">
                  {user.tag || "Ma'lumot yo'q"}
                </TableCell>
                <TableCell className="border p-2">
                  {user.createdAt?.toDate().toLocaleString() || "Ma'lumot yo'q"}
                </TableCell>
                <TableCell className="border p-2">
                  {user.deliverer || "Ma'lumot yo'q"}
                </TableCell>
                <TableCell className="border p-2">
                  {user.receiver || "Ma'lumot yo'q"}
                </TableCell>

                <TableCell className="border text-center flex items-center justify-center border-none">
                  <Link
                    target="_blank"
                    href={`/equipment/${user.id}`}
                    className="text-blue-500 underline hover:text-blue-700 ml-2"
                  >
                    <SquareArrowOutUpRight size="18px" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllEquipments;
