"use client";
// addRoom.js
import { db } from "../app/firebase";
import { collection, addDoc } from "firebase/firestore";

const addWareHaouse = async (wareHouseName, branchId) => {
  try {
    const wareHouseCollection = collection(db, "wareHouses");
    const newWareHouse = {
      name: wareHouseName,
      branchId: branchId,
      createdAt: new Date(),
    };
    const docRef = await addDoc(wareHouseCollection, newWareHouse);
    console.log("warehouse added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding warehouse: ", error);
  }
};

export default addWareHaouse;
