import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Fuse from "fuse.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "../app/firebase";
import { Label } from "./ui/label";
import useCollection from "./useCollection";
import toast from "react-hot-toast";
import { CircleFadingPlus } from "lucide-react";
import TagsSelect from "@/components/TagsSelect";

const AddEquipmentDialog = ({ branchId, roomId, roomName, branchName }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [inventoryNumber, setInventoryNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measure, setMeasure] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [deliverer, setDeliverer] = useState("");
  const [receiver, setReceiver] = useState("");

  const [suggestion, setSuggestion] = useState("");
  const [equipmentNames, setEquipmentNames] = useState([]);

  const users = useCollection("users");
  const measures = useCollection("measures");
  const types = useCollection("types");
  const statuses = useCollection("statuses");
  const tags = useCollection("tags");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !name ||
      !quantity ||
      !measure ||
      !type ||
      !status ||
      !unitPrice ||
      !deliverer ||
      !receiver
    ) {
      toast.error("Iltimos majburiy maydonlarni to'ldiring !");
      return;
    }

    const totalPrice = parseFloat(unitPrice) * parseInt(quantity, 10);

    try {
      await addDoc(collection(db, "equipments"), {
        name,
        type,
        quantity: parseInt(quantity, 10),
        branchId,
        branchName,
        location: roomId,
        roomName,
        createdAt: serverTimestamp(),
        inventoryNumber: inventoryNumber || "-",
        measure,
        qrCode: null,
        tag: tag || "-",
        status,
        unitPrice: parseFloat(unitPrice),
        totalPrice,
        deliverer,
        receiver,
      });

      toast.success("Equipment added successfully!");
      setQuantity("");
      setIsOpen(false);
      setLoading(false);
      setName("");
      setInventoryNumber("");
      setMeasure("");
      setType("");
      setTag("");
      setStatus("");
      setUnitPrice("");
      setDeliverer("");
      setReceiver("");
    } catch (error) {
      console.error("Error adding equipment:", error);
      toast.error("Error adding equipment");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      const querySnapshot = await getDocs(collection(db, "equipments"));
      const names = querySnapshot.docs.map((doc) => doc.data().name);
      setEquipmentNames(names);
    };
    fetchEquipments();
  }, []);

  useEffect(() => {
    if (name.length > 0) {
      const fuse = new Fuse(equipmentNames, { threshold: 0.3 });
      const result = fuse.search(name);
      setSuggestion(result.length > 0 ? result[0].item : "");
    } else {
      setSuggestion("");
    }
  }, [name, equipmentNames]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setName(suggestion);
      setSuggestion("");
    }
  };



  return (
    <Dialog open={isOpen}>
      <Button onClick={() => setIsOpen(true)}>
        <CircleFadingPlus />
      </Button>
      <DialogContent>
        <DialogTitle>Add New Equipment</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div>
            <Label className="my-2 flex">Jihoz nomi:</Label>
            <div className="relative">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter equipment name"
                required
              />
              {suggestion && name && suggestion !== name && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">
                  {suggestion}
                </div>
              )}
            </div>
          </div>
          <div>
            <Label className="my-2 flex">Invertar raqami:</Label>
            <Input
              value={inventoryNumber}
              onChange={(e) => setInventoryNumber(e.target.value)}
              placeholder="Invertar raqamini kiriting"
            />
          </div>

          <div>
            <Label className="my-2 flex">Jihoz soni:</Label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Sonini kiriting"
              required
              type="number"
            />
          </div>
          <div>
            <Label className="my-2 flex">Jihoz dona narxi:</Label>
            <Input
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              placeholder="Jihoz dona narxi"
              type="number"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="my-2 flex">Jihoz turi:</Label>
              <Select onValueChange={setType} value={type}>
                <SelectTrigger className="w-full">{type}</SelectTrigger>
                <SelectContent>
                  {types?.map((type, idx) => (
                    <SelectItem key={idx} value={type?.name}>
                      {type?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="my-2 flex">Jihoz o'lchov birligi:</Label>
              <Select onValueChange={setMeasure} value={measure}>
                <SelectTrigger className="w-full">{measure}</SelectTrigger>
                <SelectContent>
                  {measures?.map((measure, idx) => (
                    <SelectItem key={idx} value={measure?.name}>
                      {measure?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="my-2 flex">Jihoz holati:</Label>
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger className="w-full">{status}</SelectTrigger>
                <SelectContent>
                  {statuses?.map((status, idx) => (
                    <SelectItem key={idx} value={status?.name}>
                      {status?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <TagsSelect setTag={setTag} tag={tag} tags={tags} />
            </div>
            <div>
              <Label className="my-2 flex">Topshiruvchi:</Label>
              <Select onValueChange={setDeliverer} value={deliverer}>
                <SelectTrigger className="w-full">{deliverer}</SelectTrigger>
                <SelectContent>
                  {users?.map((user, idx) => (
                    <SelectItem
                      key={idx}
                      value={user?.name + " " + user?.surname}
                    >
                      {user?.name} {user?.surname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="my-2 flex">Qabul qiluvchi:</Label>
              <Select onValueChange={setReceiver} value={receiver}>
                <SelectTrigger className="w-full">{receiver}</SelectTrigger>
                <SelectContent>
                  {users?.map((user, idx) => (
                    <SelectItem key={idx} value={user?.name}>
                      {user?.name} {user?.surname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <br />

          <Button type="submit" className="mr-2">
            Qo'shish
          </Button>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Bekor qilish
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentDialog;
