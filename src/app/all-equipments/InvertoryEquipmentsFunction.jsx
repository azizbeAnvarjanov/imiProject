import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

const InvertoryEquipmentsFunction = async (item, setLoading) => {
  try {
    const inventoryCollection = collection(db, "inventoryItems");
    setLoading(true);

    for (let i = 0; i < item.quantity; i++) {
      await addDoc(inventoryCollection, {
        name: item.name,
        type: item.type,
        branchId: item.branchId,
        branchName: item.branchName,
        location: item.location,
        roomName: item.roomName,
        createdAt: serverTimestamp(),
        inventoryNumber: "",
        measure: item.measure,
        qrCode: item.qrCode,
        tag: item.tag,
        status: item.status,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice, // Har bir nusxaning narxi
        deliverer: item.deliverer,
        receiver: item.receiver,
      });
    }
    console.log(item.quantity);
    toast.success("Jihozlar muvaffaqiyatli ko'chirildi");
    setLoading(false);
  } catch (error) {
    toast.error("Xatolik yuz berdi: ", error);
    setLoading(false);
  }
};

export default InvertoryEquipmentsFunction;
