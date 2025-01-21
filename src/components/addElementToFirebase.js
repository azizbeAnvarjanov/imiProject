// addRoom.js
import { db } from "../app/firebase";
import { collection, addDoc } from "firebase/firestore";

const addElementToFirebase = async (elementName, path) => {
  try {
    const docRef = await addDoc(collection(db, path), {
      name: elementName,
      createdAt: new Date(),
    });
    console.log("Mufvafaqiyatli qo'shildi: ", docRef.id);
  } catch (e) {
    console.error("Error adding branch: ", e);
  }
};

export default addElementToFirebase;
