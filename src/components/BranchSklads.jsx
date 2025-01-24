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

const BranchSklads = ({ branchId }) => {
  const [wareHouses, setWareHouses] = useState([]);
  const db = getFirestore(); // Initialize Firestore
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "wareHouses"),
      where("branchId", "==", branchId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const wareHousesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWareHouses(wareHousesData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [branchId, db]);

  // Filtrlash funksiyasi
  const filteredSklads = wareHouses.filter((item) =>
    ["name"].some((key) =>
      item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full">
      <h2 className="text-xl mb-2">Skladlar</h2>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by name..."
      />
      <br />
      <ul className="flex gap-4">
        {filteredSklads.map((wareHouse) => (
          <Link
            href={`/branches/${branchId}/sklad/${wareHouse.id}`}
            className="border py-2 px-5 rounded-xl shadow-md"
            key={wareHouse.id}
          >
            {wareHouse.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BranchSklads;
