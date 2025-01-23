import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const QRCodeManager = ({ equipmentId, equipmentName }) => {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(); // Firebase Firestore'ni oling
  const storage = getStorage(); // Firebase Storage'ni oling

  // Jihoz ma'lumotini olish
  const fetchEquipmentData = async () => {
    if (!equipmentId) {
      toast.error("Jihoz ID mavjud emas!");
      return;
    }

    try {
      const equipmentRef = doc(db, "equipments", equipmentId);
      const equipmentSnap = await getDoc(equipmentRef);

      if (equipmentSnap.exists()) {
        const data = equipmentSnap.data();
        setQrUrl(data.qrCode || null);
      } else {
        toast.error("Jihoz ma'lumoti topilmadi!");
      }
    } catch (error) {
      console.error("Jihoz ma'lumotini olishda xatolik:", error);
      toast.error("Ma'lumotni olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    fetchEquipmentData();
  }, [equipmentId]);

  // QR kod yaratish funksiyasi
  const generateQRCode = async () => {
    if (!equipmentId) {
      toast.error("Jihoz ID mavjud emas!");
      return;
    }

    setLoading(true);

    try {
      // QR kodni yaratish
      const qrCodeData = await QRCode.toDataURL(equipmentId);

      // Firebase Storage'ga yuklash
      const storageRef = ref(storage, `qrcodes/${equipmentId}.png`);
      await uploadString(storageRef, qrCodeData, "data_url");

      // QR kod URL'sini olish
      const downloadUrl = await getDownloadURL(storageRef);

      // QR kodni Firestore'da saqlash
      const equipmentRef = doc(db, "equipments", equipmentId);
      await updateDoc(equipmentRef, { qrCode: downloadUrl });

      // QR kod URL'sini state ga o'rnatish
      setQrUrl(downloadUrl);
      toast.success("QR kod muvaffaqiyatli yaratildi!");
    } catch (error) {
      console.error("QR kod yaratishda xatolik:", error);
      toast.error("Xatolik yuz berdi, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qr-code-manager">
      <h2 className="text-lg font-semibold mb-4">
        {equipmentName} uchun QR kod
      </h2>

      {qrUrl ? (
        <div className="mt-4">
          <img src={qrUrl} alt="QR Code" className="border rounded" />
          <p className="text-sm mt-2 text-gray-600">QR kod URL: {qrUrl}</p>
        </div>
      ) : (
        <button
          onClick={generateQRCode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Yaratilmoqda..." : "QR kod yaratish"}
        </button>
      )}

      {loading && (
        <div className="mt-4 text-gray-500">
          <p>Yuklanmoqda...</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeManager;
