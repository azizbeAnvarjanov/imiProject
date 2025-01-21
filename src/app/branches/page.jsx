import React from "react";

import AddBranchModal from "../../components/AddBranchModal";
import BranchesLists from "../../components/BranchesList";

const Branches = () => {
  return (
    <div className="p-5">
      <AddBranchModal />
      <div>
        <BranchesLists />
      </div>
    </div>
  );
};

export default Branches;
