// useCollection.js
import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const docsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(docsData);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [collectionName]);

  return documents;
};

export default useCollection;
