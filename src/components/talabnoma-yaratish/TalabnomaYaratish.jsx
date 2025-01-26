"use client";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "@/app/firebase";
import FetchUser from "@/components/talabnoma-yaratish/FetchUser";

export default function TalabnomaYaratish({ user }) {
  const userId = user?.id;

  const userData = FetchUser(userId);

  const [formData, setFormData] = useState({
    jihozNomi: "",
    jihozTavsifi: "",
    muhimlikDarajasi: "O'rta",
    kerakSana: "",
    soni: "",
    view: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Talabnomani Firebase'ga yozish
      const docRef = await addDoc(collection(db, "talabnomalar"), {
        ...formData,
        yuborganXodim: {
          id: userData?.kindeId,
          ism: userData?.name + " " + userData?.surname,
          department: userData?.department || "Noma'lum",
        },
        status: "Ko'rib chiqilmoqda",
        createdAt: serverTimestamp(),
      });

      toast.success("Talabnoma muvaffaqiyatli yuborildi!");
      setFormData({
        jihozNomi: "",
        jihozTavsifi: "",
        muhimlikDarajasi: "O'rta",
        kerakSana: "",
        soni: "",
      });
    } catch (error) {
      console.error("Talabnoma jo'natishda xatolik:", error);
      toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Talabnoma Yaratish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Jihoz Nomi</label>
          <input
            type="text"
            name="jihozNomi"
            value={formData.jihozNomi}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Jihoz Tavsifi</label>
          <textarea
            name="jihozTavsifi"
            value={formData.jihozTavsifi}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Muhimlik Darajasi</label>
          <select
            name="muhimlikDarajasi"
            value={formData.muhimlikDarajasi}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Yuqori">Yuqori</option>
            <option value="O'rta">O'rta</option>
            <option value="Past">Past</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Qachonga Kerak</label>
          <input
            type="date"
            name="kerakSana"
            value={formData.kerakSana}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Soni</label>
          <input
            type="number"
            name="soni"
            value={formData.soni}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </form>
    </div>
  );
}
