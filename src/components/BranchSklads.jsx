import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Link from "next/link";

const BranchSklads = ({ branchId }) => {
  const [wareHouses, setWareHouses] = useState([]);
  const db = getFirestore(); // Initialize Firestore

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

  return (
    <div className="p-3">
      <h2>Sklads for Branch: {branchId}</h2>
      <br />
      <ul className="flex gap-4">
        {wareHouses.map((wareHouse) => (
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
