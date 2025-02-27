import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card"; // Shadcn UI Card

const DynamicStatusCounter = ({ collectionName }) => {
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const db = getFirestore();
      setLoading(true);

      try {
        const itemsCollection = collection(db, collectionName);
        const querySnapshot = await getDocs(itemsCollection);

        // Hamma `tag`larni yig'ish
        const tags = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status) {
            tags.push(data.status); // Har bir jihozning `tag` qiymati
          }
        });

        // Unikal `tag`lar
        const uniqueTags = [...new Set(tags)];

        // Har bir `tag` uchun jihozlarni sanash
        const tagCountsPromises = uniqueTags.map(async (tag) => {
          const filteredQuery = query(
            itemsCollection,
            where("status", "==", tag)
          );
          const filteredSnapshot = await getDocs(filteredQuery);

          return { tag, count: filteredSnapshot.docs.length };
        });

        const tagsData = await Promise.all(tagCountsPromises);
        setTagsData(tagsData);
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [collectionName]);

  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mb-3">
        Jihoz statuslari boyicha statistika
      </h1>
      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tagsData.map(({ tag, count }) => (
            <div
              key={tag}
              className="p-2 border shadow-lg rounded-lg flex items-center justify-between"
            >
              <h3 className="font-medium ml-2">{tag}</h3>
              <p className="text-xl font-bold w-[50px] h-[50px] border grid place-content-center rounded-md">
                {count}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicStatusCounter;
