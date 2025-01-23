import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DynamicTypeCounter = ({ collectionName }) => {
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(""); // Filtr uchun state
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);

      try {
        const itemsCollection = collection(db, collectionName);
        const querySnapshot = await getDocs(itemsCollection);

        // Hamma `type`larni yig'ish
        const tags = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.type) {
            tags.push(data.type); // Har bir jihozning `type` qiymati
          }
        });

        // Unikal `type`lar
        const uniqueTags = [...new Set(tags)];

        // Har bir `type` uchun jihozlarni sanash
        const tagCountsPromises = uniqueTags.map(async (tag) => {
          const filteredQuery = query(
            itemsCollection,
            where("type", "==", tag)
          );
          const filteredSnapshot = await getDocs(filteredQuery);

          return { tag, count: filteredSnapshot.docs.length };
        });

        const tagsData = await Promise.all(tagCountsPromises);
        setTagsData(tagsData);
        setFilteredData(tagsData); // Dastlabki filtrlangan ma'lumotlar
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [collectionName]);

  // Filtrni yangilash
  useEffect(() => {
    const result = tagsData.filter(({ tag }) =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, tagsData]);

  // Diagramma uchun maʼlumotlar
  const chartData = {
    labels: filteredData.map(({ tag }) => tag),
    datasets: [
      {
        label: "Count",
        data: filteredData.map(({ count }) => count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const handleExport = () => {
    const csvData = [
      ["Type", "Count"],
      ...tagsData.map(({ tag, count }) => [tag, count]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "equipment_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Filtr qismi */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type bo'yicha qidiring..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <button
          onClick={handleExport}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          CSV-ni eksport qilish
        </button>
      </div>

      {/* Yumaloq diagramma */}
      <div className="border h-[500px] p-10">
        <h2 className="text-center text-xl font-bold mb-4">
          Jihozlar soni bo'yicha statistikasi
        </h2>
        {filteredData.length > 0 ? (
          <Pie updateMode="resize" data={chartData}/>
        ) : (
          <p className="text-center">Ma'lumotlar topilmadi</p>
        )}
      </div>

      {/* Karta ko'rinishi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          filteredData.map(({ tag, count }) => (
            <div
              key={tag}
              className="p-5 border shadow-lg rounded-lg flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold">{tag}</h3>
              <p className="text-xl font-bold w-[50px] h-[50px] border grid place-content-center rounded-md shadow-lg">
                {count}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DynamicTypeCounter;
