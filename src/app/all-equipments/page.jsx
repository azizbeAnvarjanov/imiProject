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
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  SquareArrowOutUpRight,
} from "lucide-react";
import SearchInput from "@/components/SearchInput";
import TableTotalPrice from "@/components/TableTotalPrice";
import TableExportToExcel from "@/components/TableExportToExcel";
import TablePrint from "@/components/TablePrint";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InvertoryEquipmentsFunction from "./InvertoryEquipmentsFunction";
const AllEquipments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination uchun sahifa
  const [rowsPerPage, setRowsPerPage] = useState("20"); // Har bir sahifadagi qatorlar soni (default: 20)
  const [loading, setLoading] = useState(false); // Har bir sahifadagi qatorlar soni (default: 20)

  const equipments = useCollection("equipments");

  // Filtrlash funksiyasi
  const filteredData = equipments.filter((item) =>
    ["name", "branchName", "status", "roomName", "tag", "type"].some((key) =>
      item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination uchun hisob-kitob
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  console.log(filteredData);

  return (
    <div className="p-5 overflow-x-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All equipments</h1>
        <div className="flex gap-3">
          <TablePrint tableId="equipmentTable" />
          <TableExportToExcel data={filteredData} fileName="Barcha Jihozlar" />
        </div>
      </div>
      <TableTotalPrice data={filteredData} />
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by name..."
      />
      {paginatedData.length === 0 ? (
        <>no equipments</>
      ) : (
        <>
          <Table
            id="equipmentTable"
            className="w-[2000px] border-collapse border border-gray-200 mt-4"
          >
            <TableHeader>
              <TableRow>
                <TableCell className="bg-gray-500 text-white font-bold">
                  №
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  C
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
              {paginatedData.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="border p-2 text-center">
                    {index + 1 + (currentPage - 1) * rowsPerPage}
                  </TableCell>
                  <TableCell className="border">
                    {/* {user.qrCode ? (
                      <>
                        <ViewQrCode url={user.qrCode} />
                      </>
                    ) : (
                      <>-</>
                    )} */}
                    <Button
                      onClick={() =>
                        InvertoryEquipmentsFunction(user, setLoading)
                      }
                    >
                      {loading ? (
                        <div className="loader">
                          <div className="bar1"></div>
                          <div className="bar2"></div>
                          <div className="bar3"></div>
                          <div className="bar4"></div>
                          <div className="bar5"></div>
                          <div className="bar6"></div>
                          <div className="bar7"></div>
                          <div className="bar8"></div>
                          <div className="bar9"></div>
                          <div className="bar10"></div>
                          <div className="bar11"></div>
                          <div className="bar12"></div>
                        </div>
                      ) : (
                        <>Add</>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="border p-2 hover:underline hover:text-blue-600">
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
                    {user.createdAt?.toDate().toLocaleString() ||
                      "Ma'lumot yo'q"}
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
          {/* Pagination Controls */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <Select defaultValue={rowsPerPage} onValueChange={setRowsPerPage}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="20" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="60">60</SelectItem>
                <SelectItem value="70">70</SelectItem>
                <SelectItem value="80">80</SelectItem>
                <SelectItem value="90">90</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="300">300</SelectItem>
                <SelectItem value="400">400</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="2000">2000</SelectItem>
                <SelectItem value="10000">10000</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-black text-gray-500 cursor-not-allowed"
                  : " text-white"
              }`}
            >
              <ChevronLeft />
            </Button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-black text-gray-500 cursor-not-allowed"
                  : "bg-black text-white"
              }`}
            >
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllEquipments;
