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

const BranchRoomsID = ({ roomId }) => {
  const [equipments, setEquipments] = useState([]);
  const db = getFirestore(); // Initialize Firestore

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

  return (
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
                Filial
              </TableCell>
              <TableCell className="bg-gray-500 text-white font-bold">
                Xona
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
            {equipments.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="border p-2 text-center">
                  {index + 1}
                </TableCell>

                <TableCell className="border p-2">
                  {user.branchName || "Ma'lumot yo'q"}
                </TableCell>
                <TableCell className="border p-2">
                  {user.roomName || "Ma'lumot yo'q"}
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
  );
};

export default BranchRoomsID;
