// addRoom.js
import { db } from "../app/firebase";
import { collection, addDoc } from "firebase/firestore";

const addNewBranch = async (brancheName) => {
  try {
    const docRef = await addDoc(collection(db, "branches"), {
      name: brancheName,
      createdAt: new Date(),
    });
    console.log("Branch added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding branch: ", e);
  }
};

export default addNewBranch;
