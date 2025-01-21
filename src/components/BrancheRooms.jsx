import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Link from "next/link";

const BranchRooms = ({ branchId }) => {
  const [rooms, setRooms] = useState([]);
  const db = getFirestore(); // Initialize Firestore

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

  return (
    <div>
      <h2>Rooms for Branch: {branchId}</h2>
      <ul className="flex gap-4 my-5">
        {rooms.map((room) => (
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
