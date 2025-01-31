"use client";
import React, { useState } from "react";
import useStatusData from "./useStatusData"; // Diagramma uchun hook
import { db, collection, query, where, getDocs } from "../app/firebase";

const Home = () => {
  const [status, setStatus] = useState("");

  // Diagramma uchun ma'lumotlarni olish (Misol: "devices" kolleksiyasidan "tag" maydoni bo‘yicha)
  const data = useStatusData({ element: "devices", field: "tag" });

  // Telegramga diagrammadan kelgan ma'lumotlarni yuborish
  const sendMessage = async (e) => {
    e.preventDefault();

    if (data.length === 0) {
      setStatus("Diagrammada hech qanday ma'lumot yo‘q!");
      return;
    }

    // 📊 Diagramma uchun JSON formatdagi ma'lumotni tayyorlash
    let message = "📊 *Jihozlar statistikasi* 📊\n\n";
    data.forEach((item) => {
      message += `*Jihoz:* ${item.value}\n *Umumiy soni:* ${item.count} ta`;
    });

    // Telegram bot sozlamalari
    let token = "7856961403:AAG2SrxsZsbBY2yjiGHjwkUeghJJNL8GSd4";
    let chat_id = "-4657741011";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chat_id,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        setStatus("✅ Diagramma statistikasi muvaffaqiyatli yuborildi!");
      } else {
        throw new Error("Telegram API xatosi");
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setStatus("❌ Xatolik yuz berdi.");
    }
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <button type="submit">
          Diagramma statistikani Telegramga jo'natish
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default Home;
