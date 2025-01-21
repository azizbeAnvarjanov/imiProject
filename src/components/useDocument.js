// useDocument.js
import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import { doc, getDoc } from "firebase/firestore";

const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (docId) {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such document!");
        }
      }
    };

    fetchDocument();
  }, [collectionName, docId]);

  return document;
};

export default useDocument;
