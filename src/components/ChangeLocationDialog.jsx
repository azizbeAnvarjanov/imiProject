import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import toast from "react-hot-toast";

const ChangeLocationDialog = ({ equipmentId, currentBranchId }) => {
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(currentBranchId);
  const [locationType, setLocationType] = useState("");
  const db = getFirestore();

  // Filiallarni olish
  useEffect(() => {
    const fetchBranches = async () => {
      const branchesSnapshot = await getDocs(collection(db, "branches"));
      setBranches(
        branchesSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    };

    fetchBranches();
  }, [db]);

  // Xonalar yoki omborlarni olish
  useEffect(() => {
    const fetchLocations = async () => {
      if (!locationType || !selectedBranch) return;

      const locationCollection =
        locationType === "room" ? "rooms" : "wareHouses";
      const q = query(
        collection(db, locationCollection),
        where("branchId", "==", selectedBranch)
      );

      const locationsSnapshot = await getDocs(q);
      setLocations(
        locationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    };

    fetchLocations();
  }, [db, locationType, selectedBranch]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!selectedLocation || !selectedBranch) {
      setLoading(false);
      toast.error("Please select both a location and a branch.");
      return;
    }

    try {
      // Filial nomini olish
      const branchName = branches.find((branch) => branch.id === selectedBranch)
        ?.name;

      // Joylashuv nomini olish
      const locationName = locations.find(
        (location) => location.id === selectedLocation
      )?.name;

      // Jihozni yangilash
      const docRef = doc(db, "equipments", equipmentId);
      await updateDoc(docRef, {
        location: selectedLocation, // Tanlangan joylashuv ID'si
        branchId: selectedBranch, // Tanlangan filial ID'si
        branchName: branchName, // Filial nomi
        roomName: locationType === "room" ? locationName : "", // Xona nomi
        wareHouseName: locationType === "wareHouses" ? locationName : "", // Ombor nomi
      });

      toast.success("Location and branch updated successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error updating location and branch:", error);
      toast.error("Error updating location and branch");
      setLoading(false);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <Button onClick={() => setIsOpen(true)}>Change Location</Button>
      <DialogContent>
        <DialogTitle>Change Location and Branch</DialogTitle>
        <div className="space-y-4">
          {/* Filial tanlash */}
          <Label className="my-2">Filialni tanlang:</Label>
          <Select
            value={selectedBranch}
            onValueChange={(value) => {
              setSelectedBranch(value);
              setLocationType(""); // Filial o'zgarganda joylashuv turini reset qilish
              setSelectedLocation(""); // Filial o'zgarganda joylashuvni reset qilish
            }}
            required
          >
            <SelectTrigger className="w-full">
              {branches.find((branch) => branch.id === selectedBranch)?.name ||
                "Filialni tanlang"}
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Joylashuv turi tanlash */}
          <Label className="my-2">Joylashuv turini tanlang:</Label>
          <Select
            value={locationType}
            onValueChange={(value) => {
              setLocationType(value);
              setSelectedLocation(""); // Joylashuv turini o'zgartirganda joylashuvni reset qilish
            }}
            required
          >
            <SelectTrigger className="w-full">
              {locationType || "Joylashuv turini tanlang"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="room">Xona</SelectItem>
              <SelectItem value="wareHouses">Sklad</SelectItem>
            </SelectContent>
          </Select>

          {/* Joylashuv tanlash */}
          {locationType && (
            <>
              <Label className="my-2">
                {locationType === "room"
                  ? "Xonani tanlang:"
                  : "Omborni tanlang:"}
              </Label>
              <Select
                value={selectedLocation}
                onValueChange={(value) => setSelectedLocation(value)}
                required
              >
                <SelectTrigger className="w-full">
                  {locations.find(
                    (location) => location.id === selectedLocation
                  )?.name || "Joylashuvni tanlang"}
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}

          <div className="flex gap-3">
            {/* Saqlash tugmasi */}
            <Button disabled={loading} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={() => setIsOpen(false)}
            >
              Bekor qilish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeLocationDialog;
