"use client";
// addRoom.js
import { db } from "../app/firebase";
import { collection, addDoc } from "firebase/firestore";

const addRoom = async (roomName, branchId) => {
  try {
    const roomsCollection = collection(db, "rooms");
    const newRoom = {
      name: roomName,
      branchId: branchId,
      createdAt: new Date(),
    };
    const docRef = await addDoc(roomsCollection, newRoom);
    console.log("Room added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding room: ", error);
  }
};

export default addRoom;
