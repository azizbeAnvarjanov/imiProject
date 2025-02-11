"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import useCollection from "@/components/useCollection";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Fuse from "fuse.js";
import TagsSelect from "@/components/TagsSelect";
import { db } from "@/app/firebase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-3";
import { CircleFadingPlus, PackagePlus } from "lucide-react";
import toast from "react-hot-toast";

const AddMoreEquipmentDialog = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const users = useCollection("users");
  const measures = useCollection("measures");
  const types = useCollection("types");
  const statuses = useCollection("statuses");
  const tags = useCollection("tags");

  const [suggestion, setSuggestion] = useState("");
  const [equipmentNames, setEquipmentNames] = useState([]);
  const [inventoryNumber, setInventoryNumber] = useState("");
  const [measure, setMeasure] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [deliverer, setDeliverer] = useState("");
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      const branchesCollection = await getDocs(collection(db, "branches"));
      const branchData = branchesCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBranches(branchData);
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!selectedBranch) return;
      const roomsCollection = await getDocs(collection(db, "rooms"));
      const filteredRooms = roomsCollection.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((room) => room.branchId === selectedBranch);
      setRooms(filteredRooms);
    };
    fetchRooms();
  }, [selectedBranch]);

  const handleBranchSelection = (branchId) => {
    setSelectedBranch(branchId);
    const branch = branches.find((b) => b.id === branchId);
    setSelectedBranchName(branch ? branch.name : "");
  };

  const handleRoomSelection = (roomId) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      for (const roomId of selectedRooms) {
        const room = rooms.find((r) => r.id === roomId);
        await addDoc(collection(db, "equipments"), {
          name,
          type,
          quantity: parseInt(quantity, 10),
          branchId: selectedBranch,
          branchName: selectedBranchName,
          location: roomId,
          roomName: room.name,
          createdAt: new Date(),
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
      }
      setName("");
      setType("");
      setQuantity("");
      setSelectedRooms([]);
      setLoading(false);
      setInventoryNumber("");
      setMeasure("");
      setTag("");
      setStatus("");
      setUnitPrice("");
      setDeliverer("");
      setReceiver("");
      toast.success("Equipment added successfully!");
    } catch (error) {
      console.error("Error adding equipment: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="border p-3 rounded-xl hover:bg-muted"><CircleFadingPlus /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <h2>Add Equipment</h2>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="w-[40%]">
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
                    <SelectTrigger className="w-full">
                      {deliverer}
                    </SelectTrigger>
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
            </div>
            <div className="w-[60%]">
              <div>
                <Label className="my-2 flex">Filialni tanlang</Label>
                <Select
                  onValueChange={handleBranchSelection}
                  value={selectedBranch}
                >
                  <SelectTrigger className="w-full">
                    {selectedBranchName}
                  </SelectTrigger>
                  <SelectContent>
                    {branches?.map((branch, idx) => (
                      <SelectItem key={idx} value={branch?.id}>
                        {branch?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedBranch && (
                <>
                  <h3>Xonanai tanlang</h3>
                  <div className="flex flex-wrap gap-2">
                    {rooms.length > 0 ? (
                      rooms.map((room) => (
                        <label
                          key={room.id}
                          className="border py-[6px] px-3 rounded-md flex items-center gap-3 cursor-pointer"
                        >
                          <Checkbox
                            value={room.id}
                            checked={selectedRooms.includes(room.id)}
                            onClick={() => handleRoomSelection(room.id)}
                          />
                          {room.name}
                        </label>
                      ))
                    ) : (
                      <p>No rooms available for the selected branch.</p>
                    )}
                  </div>
                </>
              )}
              <br />
            <Button type="submit">Add Equipment</Button>
            </div>

          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoreEquipmentDialog;
