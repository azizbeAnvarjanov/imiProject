import GetUserFS from "@/components/GetUserFS";
import React from "react";
import CreatePlanModal from "@/components/marketing-components/createPlanModal";

const PlansPage = async () => {
  const user = await GetUserFS();

  return (
    <div className="p-5">
      <CreatePlanModal userId={user?.id} />
    </div>
  );
};

export default PlansPage;
