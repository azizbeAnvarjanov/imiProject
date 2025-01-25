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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sheet } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DynamicTypeCounter = ({ collectionName }) => {
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(""); // Filtr uchun state
  const [filteredData, setFilteredData] = useState([]);

  console.log(tagsData);

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
  const total = filteredData.reduce((sum, { count }) => sum + count, 0);
  const chartData = {
    labels: filteredData.map(({ tag }) => tag),
    datasets: [
      {
        label: "Count",
        data: filteredData.map(({ count }) => count),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const count = context.raw;
            const percentage = ((count / total) * 100).toFixed(2); // Foizni hisoblash
            return `${context.label}: ${count} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        anchor: "center",
        align: "end",
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        font: {
          size: 14,
        },
      },
    },
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
    <div className="flex gap-3">
      <div className="w-[50%]">
        {/* Filtr qismi */}
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Type bo'yicha qidiring..."
            value={search}
            className="w-[400px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleExport}>
            {" "}
            Export <Sheet />
          </Button>
        </div>

        {/* Yumaloq diagramma */}
        <div className="h-[500px] p-10">
          <h2 className="text-center text-xl font-bold mb-4">
            Jihozlar turlari bo'yicha statistikasi
          </h2>
          {filteredData.length > 0 ? (
            <Pie updateMode="resize" data={chartData} options={options} />
          ) : (
            <p className="text-center">Ma'lumotlar topilmadi</p>
          )}
        </div>
      </div>

      {/* Karta ko'rinishi */}
      <div className="w-[50%] space-y-4">
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          filteredData.map(({ tag, count }) => (
            <div
              key={tag}
              className="p-2 border shadow-lg rounded-lg flex items-center justify-between"
            >
              <h3 className="font-medium ml-2">{tag}</h3>
              <p className="text-xl font-bold w-[50px] h-[50px] border grid place-content-center rounded-md">
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
