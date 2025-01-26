import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const FetchUser = (kindeId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!kindeId) {
        console.error("Kinde ID is required.");
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const userRef = doc(db, "users", kindeId); // Firebase'dagi "users" kollektsiyasidan foydalanuvchini topish
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          setUser(userSnapshot.data());
        } else {
          console.error("User not found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [kindeId]);

  if (loading) return null; // Yuklanayotgan vaqt hech narsa qaytarmaydi
  return user; // Foydalanuvchi ma'lumotlarini qaytaradi
};

export default FetchUser;
