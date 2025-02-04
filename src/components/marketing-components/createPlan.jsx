import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

async function createPlan(title, description, userId) {
  const department = user?.department; // Userning bo‘limi

  if (!department) {
    console.error("Bo'lim aniqlanmadi");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "plans"), {
      title: title,
      description: description,
      department: department,
      createdAt: new Date(),
      createdBy: user?.id,
      tasks: [],
      progress: 0, // Boshlang‘ich progress
    });

    console.log("Reja yaratildi, ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Reja yaratishda xatolik:", error);
  }
}

export default createPlan
