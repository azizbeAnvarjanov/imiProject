"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Talabnomalar({ user, status }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTalabnoma, setSelectedTalabnoma] = useState(null);
  const [reason, setReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [talabnomalar, setTalabnomalar] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  console.log(selectedUser);

  useEffect(() => {
    if (!user) return;

    const talabnomaQuery = query(
      collection(db, "talabnomalar"),
      where("status", "==", status)
    );
    const unsubscribeTalabnoma = onSnapshot(
      talabnomaQuery,
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

    const usersQuery = query(collection(db, "users"));
    const unsubscribeUsers = onSnapshot(
      usersQuery,
      (snapshot) => {
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      },
      (error) => {
        console.error("Foydalanuvchilarni yuklashda xatolik:", error);
      }
    );

    return () => {
      unsubscribeTalabnoma();
      unsubscribeUsers();
    };
  }, [user]);

  const handleTasdiqlash = async (talabnoma) => {
    const selectedUserId = selectedUser[talabnoma.id];
    const selectedUserObj = users.find((u) => u.id === selectedUserId);

    if (!selectedUserId || !selectedUserObj) {
      toast.error("Yetkazuvchi xodimni tanlashingiz kerak!");
      return;
    }

    try {
      const talabnomaRef = doc(db, "talabnomalar", talabnoma.id);

      await updateDoc(talabnomaRef, {
        status: "Tasdiqlangan",
        yetkazuvchi: `${selectedUserObj.name} ${selectedUserObj.surname}`,
        yetkazuvchiId: selectedUserId,
        unitPrice: 0,
        totalPrice: 0,
      });

      toast.success("Talabnoma muvaffaqiyatli tasdiqlandi!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Tasdiqlashda xatolik:", error);
      toast.error("Tasdiqlashda xatolik yuz berdi.");
    }
  };

  const handleBekorQilish = async (talabnoma) => {
    if (!reason.trim()) {
      toast.error("Bekor qilish sababini kiriting.");
      return;
    }

    try {
      const talabnomaRef = doc(db, "talabnomalar", talabnoma.id);

      await updateDoc(talabnomaRef, {
        status: "Bekor qilindi",
        reason: reason.trim(),
      });

      toast.success("Talabnoma muvaffaqiyatli bekor qilindi!");
      setOpenDialog(false);
      setReason("");
      setShowReasonInput(false);
    } catch (error) {
      console.error("Bekor qilishda xatolik:", error);
      toast.error("Bekor qilishda xatolik yuz berdi.");
    }
  };

  const openTalabnomaDialog = (talabnoma) => {
    setSelectedTalabnoma(talabnoma);
    setOpenDialog(true);
    updateDoc(doc(db, "talabnomalar", talabnoma.id), { view: true });
  };

  if (loading) {
    return <div className="text-center mt-10">Yuklanmoqda...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Tasdiqlovchi Sahifasi</h1>

      {talabnomalar.length === 0 ? (
        <p className="text-gray-600">Hozircha talabnomalar mavjud emas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {talabnomalar.map((talabnoma) => (
            <div
              key={talabnoma.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">{talabnoma.jihozNomi}</h2>
              <p className="text-sm text-gray-600">
                Muhimlik: {talabnoma.muhimlikDarajasi}
              </p>
              <p className="text-sm text-gray-600">
                Kerak Sana: {new Date(talabnoma.kerakSana).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Soni: {talabnoma.soni}</p>
              <Button
                variant="secondary"
                className="mt-4 w-full"
                onClick={() => openTalabnomaDialog(talabnoma)}
              >
                Batafsil
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedTalabnoma && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Talabnoma Batafsil</DialogTitle>
            </DialogHeader>
            <div className="scrollth space-y-2 py-2 w-[450px] max-h-[50vh] overflow-y-scroll">
              <p className="flex items-start justify-between border-b p-2 flex-wrap text-wrap">
                <strong>Jihoz Nomi:</strong>
                <span className="flex-wrap break-words max-w-[250px]">
                  {selectedTalabnoma.jihozNomi}
                </span>
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Muhimlik:</strong> {selectedTalabnoma.muhimlikDarajasi}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Kerak Sana:</strong>{" "}
                {new Date(selectedTalabnoma.kerakSana).toLocaleDateString()}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Soni:</strong> {selectedTalabnoma.soni}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Bo'lim:</strong>{" "}
                {selectedTalabnoma.yuborganXodim.department}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Yuborgan Xodim:</strong>{" "}
                {selectedTalabnoma.yuborganXodim.ism}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Dona narxi:</strong> {selectedTalabnoma.unitPrice || 0}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Umumiy narxi:</strong>{" "}
                {selectedTalabnoma.totalPrice || 0}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Talabnomatavsifi:</strong>{" "}
                <span className="flex-wrap break-words max-w-[250px]">
                  {selectedTalabnoma.jihozTavsifi}
                </span>
              </p>
              {selectedTalabnoma.status !== "Ko'rib chiqilmoqda" ? (
                <></>
              ) : (
                <>
                  <select
                    className="border border-gray-300 p-2 rounded w-full"
                    onChange={(e) =>
                      setSelectedUser((prev) => ({
                        ...prev,
                        [selectedTalabnoma.id]: e.target.value,
                      }))
                    }
                    value={selectedUser[selectedTalabnoma.id] || ""}
                  >
                    <option value="">Yetkazuvchini tanlang</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name + " " + user.surname}
                      </option>
                    ))}
                  </select>

                  {showReasonInput && (
                    <div className="mt-4">
                      <Textarea
                        placeholder="Bekor qilish sababini yozing..."
                        className="w-full"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <Button
                        className="mt-2"
                        onClick={() => handleBekorQilish(selectedTalabnoma)}
                      >
                        Yuborish
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <DialogFooter>
              {selectedTalabnoma.status !== "Ko'rib chiqilmoqda" ? (
                <></>
              ) : (
                <>
                  {!showReasonInput && (
                    <Button
                      variant="destructive"
                      onClick={() => setShowReasonInput(true)}
                    >
                      Bekor qilish
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => handleTasdiqlash(selectedTalabnoma)}
                  >
                    Tasdiqlash
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
