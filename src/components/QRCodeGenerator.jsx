import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Trash } from "lucide-react";
import Link from "next/link";

const QRCodeManager = ({ equipmentId, equipmentName }) => {
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = getFirestore(); // Firebase Firestore
  const storage = getStorage(); // Firebase Storage

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
      const qrCodeData = await QRCode.toDataURL(
        `https://imi-project.vercel.app/equipment/${equipmentId}`,
        {
          width: 1000,
          margin: 2,
        }
      );

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

  // QR kodni yuklab olish funksiyasi
  const downloadQRCode = () => {
    if (!qrUrl) return;

    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `${equipmentName || "qrcode"}.png`;
    link.click();
    toast.success("QR kod yuklab olindi!");
  };

  // QR kodni o'chirish funksiyasi
  const deleteQRCode = async () => {
    if (!qrUrl) {
      toast.error("QR kod mavjud emas!");
      return;
    }

    setLoading(true);

    try {
      // Firebase Storage'dan rasmni o'chirish
      const storageRef = ref(storage, `qrcodes/${equipmentId}.png`);
      await deleteObject(storageRef);

      // Firestore'da QR kod URL'sini o'chirish
      const equipmentRef = doc(db, "equipments", equipmentId);
      await updateDoc(equipmentRef, { qrCode: null });

      // State ni yangilash
      setQrUrl(null);
      toast.success("QR kod muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("QR kodni o'chirishda xatolik:", error);
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
        <div className="my-4 relative border w-[200px] h-[200px] rounded-md">
          <Image fill src={qrUrl} alt="QR Code" />
          <div className="flex flex-col gap-2 absolute left-[104%] top-0">
            <Button>
              <Link href={qrUrl} target="_blank" download={qrUrl}>
                <Download />
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={deleteQRCode}
              disabled={loading}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={generateQRCode} disabled={loading}>
          {loading ? "Yaratilmoqda..." : "QR kod yaratish"}
        </Button>
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
