import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const generateColorForValue = (value) => {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  const mixedR = (r + value.length * 37) % 256;
  const mixedG = (g + value.length * 59) % 256;
  const mixedB = (b + value.length * 23) % 256;

  return (
    "#" +
    mixedR.toString(16).padStart(2, "0") +
    mixedG.toString(16).padStart(2, "0") +
    mixedB.toString(16).padStart(2, "0")
  );
};

const useStatusData = ({ element, field, countField }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemsCollection = collection(db, element);

    const fetchQuery = query(itemsCollection);

    const unsubscribe = onSnapshot(fetchQuery, async (querySnapshot) => {
      const valuesMap = new Map();

      for (const doc of querySnapshot.docs) {
        const docData = doc.data();
        if (docData[field] && docData[countField]) {
          const tag = docData[field];
          const count = docData[countField];

          if (valuesMap.has(tag)) {
            valuesMap.set(tag, valuesMap.get(tag) + count);
          } else {
            valuesMap.set(tag, count);
          }
        }
      }

      const fieldData = Array.from(valuesMap.entries()).map(([value, count]) => ({
        value,
        count,
        fill: generateColorForValue(value),
      }));

      setData(fieldData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [element, field, countField]);

  return data;
};

export default useStatusData;
