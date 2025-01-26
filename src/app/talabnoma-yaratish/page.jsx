import React from "react";

import TalabnomaYaratish from "@/components/talabnoma-yaratish/TalabnomaYaratish";
import GetUserFS from "@/components/GetUserFS";

const TalabnomaYaratishPage = async () => {
  const user = await GetUserFS();
  console.log(user);

  return (
    <div className="p-5">
      <TalabnomaYaratish user={user} />
    </div>
  );
};

export default TalabnomaYaratishPage;
