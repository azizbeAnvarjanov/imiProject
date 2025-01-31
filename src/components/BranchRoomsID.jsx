import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditEquipmentDialog from "@/components/EditEquipmentDialog";
import ChangeLocationDialog from "@/components/ChangeLocationDialog";
import TableTotalPrice from "@/components/TableTotalPrice";
import SearchInput from "@/components/SearchInput";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  SquareArrowOutUpRight,
} from "lucide-react";
import ViewQrCode from "./ViewQrCode";
import TableExportToExcel from "./TableExportToExcel";
import TablePrint from "./TablePrint";
import DeleteDialog from "./DeleteDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BranchRoomsID = ({ roomId, branchId }) => {
  const [equipments, setEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("20"); // Default number of items per page
  const db = getFirestore(); // Initialize Firestore
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "equipments"),
      where("location", "==", roomId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEquipments(roomsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [roomId, db]);

  // Filtrlash funksiyasi
  const filteredData = equipments.filter((item) =>
    ["name", "branchName", "status"].some((key) =>
      item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination uchun hisoblash
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by name..."
      />
      <div className="flex gap-2">
        <TablePrint tableId="equipmentTable" />
        <TableExportToExcel
          data={filteredData}
          fileName={`${roomId} - jihozlari`}
        />
      </div>
      <TableTotalPrice data={filteredData} />
      {currentData.length === 0 ? (
        <>no equipments</>
      ) : (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2 items-center">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ChevronLeft />
              </Button>
              {currentPage} / {totalPages}
              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </Button>
            </div>
            <div>
              <Select
                id="itemsPerPage"
                defaultValue={itemsPerPage}
                onValueChange={handleItemsPerPageChange}
                className="border p-2 rounded"
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
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
                </SelectContent>
              </Select>
            </div>
          </div>
          <div id="equipmentTable">
            <Table className="w-full border-collapse border border-gray-200 overflow-x-scroll min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableCell className="bg-gray-500 text-white font-bold">
                    №
                  </TableCell>
                  <TableCell className="bg-gray-500 text-white font-bold">
                    QR
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
                    Tag
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
                {currentData.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="border p-2 text-center">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="border p-2 text-center">
                      {user.qrCode ? <ViewQrCode url={user.qrCode} /> : <>-</>}
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
                      {user.tag || "Ma'lumot yo'q"}
                    </TableCell>
                    <TableCell className="border p-2">
                      {user.measure || "Ma'lumot yo'q"}
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
                    <TableCell className="border p-2 text-center flex gap-1 border-none">
                      <EditEquipmentDialog equipmentId={user.id} />
                      <ChangeLocationDialog
                        equipmentId={user.id}
                        currentBranchId={branchId}
                      />
                      <Link target="_blank" href={`/equipment/${user.id}`}>
                        <Button>
                          <SquareArrowOutUpRight />
                        </Button>
                      </Link>
                      <DeleteDialog id={user.id} name={user.name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchRoomsID;
