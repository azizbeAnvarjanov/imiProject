import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase";

// Function to generate a random color (this will now be deterministic for a given tag)
const generateColorForTag = (tag) => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color =
    "#" +
    ((hash >> 24) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
    ((hash >> 8) & 0xff).toString(16).padStart(2, "0");
  return color;
};

const useTagsData = () => {
  const collectionName = "equipments";
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true

  useEffect(() => {
    const itemsCollection = collection(db, collectionName);

    // Create a query to fetch all documents from the collection
    const fetchQuery = query(itemsCollection);

    // Set up a real-time listener on the collection
    const unsubscribe = onSnapshot(fetchQuery, (querySnapshot) => {
      // Collect all `type` values from the snapshot
      const tags = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type) {
          tags.push(data.type);
        }
      });

      // Get unique `type` values
      const uniqueTags = [...new Set(tags)];

      // Map tags to consistent colors (deterministic based on the tag name)
      const tagCountsPromises = uniqueTags.map(async (tag) => {
        const filteredQuery = query(itemsCollection, where("type", "==", tag));
        const filteredSnapshot = await getDocs(filteredQuery);

        return {
          tag,
          count: filteredSnapshot.docs.length,
          fill: generateColorForTag(tag), // Generate consistent color for the tag
        };
      });

      Promise.all(tagCountsPromises).then((tagsData) => {
        setTagsData(tagsData);
        setLoading(false); // Set loading to false once data is fetched
      });
    });

    // Clean up the listener when the component unmounts or the query changes
    return () => unsubscribe();
  }, [collectionName]);

  return { tagsData, loading };
};

export default useTagsData;
