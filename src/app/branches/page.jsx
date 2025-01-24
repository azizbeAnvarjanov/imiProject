"use client";
import React, { useState } from "react";

import AddBranchModal from "../../components/AddBranchModal";
import BranchesLists from "../../components/BranchesList";
import useCollection from "@/components/useCollection";
import SearchInput from "@/components/SearchInput";

const Branches = () => {
  const branches = useCollection("branches");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrlash funksiyasi
  const filteredBranches = branches.filter((item) =>
    ["name"].some((key) =>
      item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div className="p-5">
      <div className="flex items-center gap-4">
        <AddBranchModal />
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Nom bo'yicha qidirish..."
        />
      </div>
      <div>
        <BranchesLists branches={filteredBranches} />
      </div>
    </div>
  );
};

export default Branches;
