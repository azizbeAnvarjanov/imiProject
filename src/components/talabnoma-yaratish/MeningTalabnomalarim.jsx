"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase"; // Firebase konfiguratsiyasi
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const MeningTalabnomalarim = ({ user, text, status }) => {
  const [talabnomalar, setTalabnomalar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTalabnoma, setSelectedTalabnoma] = useState(null); // Tanlangan talabnoma uchun holat

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "talabnomalar"),
      where("yuborganXodim.id", "==", user?.id), // Foydalanuvchi ID bo'yicha filter
      where("status", "==", status)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const talabnomaData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTalabnomalar(talabnomaData);
        setLoading(false);
      },
      (error) => {
        console.error("Talabnomalarni yuklashda xatolik:", error);
        toast.error("Talabnomalarni yuklashda xatolik yuz berdi.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Yuklanmoqda...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">{text}</h1>

      {talabnomalar.length === 0 ? (
        <p className="text-gray-600">Hozircha talabnomalar mavjud emas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {talabnomalar.map((talabnoma) => (
            <div
              key={talabnoma.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                {talabnoma.jihozNomi}
              </h2>
              <p className="text-sm text-gray-600">
                Muhimlik: {talabnoma.muhimlikDarajasi}
              </p>
              <p className="text-sm text-gray-600">Soni: {talabnoma.soni}</p>
              <p className="text-sm text-gray-600">
                Kerak sana: {new Date(talabnoma.kerakSana).toLocaleDateString()}
              </p>
              <Dialog>
                <DialogTrigger
                  asChild
                  onClick={() => setSelectedTalabnoma(talabnoma)}
                >
                  <button className="mt-4 w-full bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
                    Batafsil
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{talabnoma.jihozNomi}</DialogTitle>
                    <DialogDescription>
                      Quyida talabnoma haqida batafsil ma'lumotlar keltirilgan.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      <strong>Muhimlik:</strong> {talabnoma.muhimlikDarajasi}
                    </p>
                    <p>
                      <strong>Soni:</strong> {talabnoma.soni}
                    </p>
                    <p>
                      <strong>Kerak sana:</strong>{" "}
                      {new Date(talabnoma.kerakSana).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Status:</strong> {talabnoma.status}
                    </p>
                  </div>
                  <DialogFooter>
                    <button
                      onClick={() => setSelectedTalabnoma(null)}
                      className="mt-4 bg-gray-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                      Yopish
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeningTalabnomalarim;
