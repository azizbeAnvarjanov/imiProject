// useDocument.js
import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useRoomEquipments = (roomId) => {
    const [document,setDocument] = useState(null);
  useEffect(() => {
    const q = query(
      collection(db, "equipments"),
      where("location", "==", roomId),
      orderBy("createdAt", "desc") // Yangi qo'shilganlarni tepaga chiqarish
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocument(roomsData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [roomId]);
  return document;
};

export default useRoomEquipments;
