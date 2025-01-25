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

  // Generate a hash from the value string
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use the hash to generate RGB values
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  // Add some extra randomness by combining the hash with the length of the value
  const mixedR = (r + value.length * 37) % 256;
  const mixedG = (g + value.length * 59) % 256;
  const mixedB = (b + value.length * 23) % 256;

  // Convert to a hex color string
  const color =
    "#" +
    mixedR.toString(16).padStart(2, "0") +
    mixedG.toString(16).padStart(2, "0") +
    mixedB.toString(16).padStart(2, "0");

  return color;
};


const useStatusData = ({ element, field }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true

  useEffect(() => {
    const itemsCollection = collection(db, element); // Use the dynamic 'element' prop

    // Create a query to fetch all documents from the collection
    const fetchQuery = query(itemsCollection);

    // Set up a real-time listener on the collection
    const unsubscribe = onSnapshot(fetchQuery, (querySnapshot) => {
      // Collect all `field` values from the snapshot
      const values = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data[field]) {
          values.push(data[field]);
        }
      });

      // Get unique field values
      const uniqueValues = [...new Set(values)];

      // Map values to consistent colors (deterministic based on the field value)
      const valueCountsPromises = uniqueValues.map(async (value) => {
        const filteredQuery = query(itemsCollection, where(field, "==", value));
        const filteredSnapshot = await getDocs(filteredQuery);

        return {
          value,
          count: filteredSnapshot.docs.length,
          fill: generateColorForValue(value), // Generate consistent color for the field value
        };
      });

      Promise.all(valueCountsPromises).then((fieldData) => {
        setData(fieldData);
        setLoading(false); // Set loading to false once data is fetched
      });
    });

    // Clean up the listener when the component unmounts or the query changes
    return () => unsubscribe();
  }, [element, field]); // Now the hook re-runs when the 'element' or 'field' prop changes

  return data;
};

export default useStatusData;
