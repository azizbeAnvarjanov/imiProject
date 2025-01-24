import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Link from "next/link";
import SearchInput from "./SearchInput";

const BranchRooms = ({ branchId }) => {
  const [rooms, setRooms] = useState([]);
  const db = getFirestore(); // Initialize Firestore
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "rooms"), where("branchId", "==", branchId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [branchId, db]);

  // Filtrlash funksiyasi
  const filteredRooms = rooms.filter((item) =>
    ["name"].some((key) =>
      item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full">
      <h2 className="text-xl mb-2">Xonalar</h2>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by name..."
      />
      <ul className="flex gap-4 my-5">
        {filteredRooms.map((room) => (
          <Link
            href={`/branches/${branchId}/room/${room.id}`}
            className="border py-2 px-5 rounded-xl shadow-md"
            key={room.id}
          >
            {room.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BranchRooms;
