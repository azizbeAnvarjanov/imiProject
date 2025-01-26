"use client";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

export default function Yt({ user, status }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const totalPrice = unitPrice * selectedTask?.soni;
  useEffect(() => {
    if (!user) return;

    const taskQuery = query(
      collection(db, "talabnomalar"),
      where("yetkazuvchiId", "==", user?.id),
      where("status", "==", status)
    );

    const unsubscribe = onSnapshot(
      taskQuery,
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskData);
        setLoading(false);
      },
      (error) => {
        console.error("Tasks loading error:", error);
        toast.error("Error loading tasks.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleMarkCompleted = async (taskId) => {
    try {
      const taskRef = doc(db, "talabnomalar", taskId);
      await updateDoc(taskRef, {
        status: "Yetkazildi",
        unitPrice: unitPrice,
        totalPrice,
        completedAt: new Date(),
      });

      toast.success("Jihoz muvafaqiyatli yetkazildi!");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error.");
    }
  };

  const openDialog = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedTask(null);
    setIsDialogOpen(false);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading tasks...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Yetkazuvchi Sahifasi</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks assigned to you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{task.jihozNomi}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Muhimlik:</strong> {task.muhimlikDarajasi}
                </p>
                <p>
                  <strong>Kerak Sana:</strong>{" "}
                  {new Date(task.kerakSana).toLocaleDateString()}
                </p>
                <p>
                  <strong>Soni:</strong> {task.soni}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <Button onClick={() => openDialog(task)} className="mt-4">
                  Batafsil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTask && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Batafsil Ma'lumot</DialogTitle>
            </DialogHeader>
            <div className="scrollth space-y-2 py-2 w-[450px] max-h-[50vh] overflow-y-scroll">
              <p className="flex items-start justify-between border-b p-2 flex-wrap text-wrap">
                <strong>Bo'lim:</strong>
                <span className="flex-wrap break-words max-w-[250px]">
                  {selectedTask.yuborganXodim?.department}
                </span>
              </p>
              <p className="flex items-start justify-between border-b p-2 flex-wrap text-wrap">
                <strong>Jihoz Nomi:</strong>
                <span className="flex-wrap break-words max-w-[250px]">
                  {selectedTask.jihozNomi}
                </span>
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Muhimlik:</strong> {selectedTask.muhimlikDarajasi}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Kerak Sana:</strong>{" "}
                {new Date(selectedTask.kerakSana).toLocaleDateString()}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Soni:</strong> {selectedTask.soni}
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Status:</strong> {selectedTask.status}
              </p>
              {selectedTask.status !== "Yetkazildi" ? (
                <>
                  <p>
                    <strong>Dona narxi kiriting:</strong>
                    <Input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />
                  </p>
                </>
              ) : (
                <></>
              )}

              <p className="flex start justify-between border-b p-2">
                <strong>Talabnoma tavsifi:</strong>{" "}
                <span className="flex-wrap break-words max-w-[250px]">
                  {selectedTask.jihozTavsifi}
                </span>
              </p>
              <p className="flex start justify-between border-b p-2">
                <strong>Umumiy narxi: </strong>
                {selectedTask.status === "Yetkazildi" ? (
                  <>{selectedTask.totalPrice?.toLocaleString() || 0}</>
                ) : (
                  <>{totalPrice?.toLocaleString()}</>
                )}
              </p>
            </div>
            <DialogFooter>
              <Button
                disabled={selectedTask.status === "Yetkazildi"}
                onClick={() => handleMarkCompleted(selectedTask.id)}
              >
                {selectedTask.status === "Yetkazildi"
                  ? "Yetkazildi"
                  : "Yetkazildi deb belgilash"}
              </Button>
              <Button variant="secondary" onClick={closeDialog}>
                Yopish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
