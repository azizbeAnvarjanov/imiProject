import GetUserFS from "@/components/GetUserFS";
import React from "react";

import Yetkazuvchi from "@/components/talabnoma-yaratish/Yetkazuvchi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TasdiqlanganTalabnomalarPage = async () => {
  const user = await GetUserFS();
  return (
    <div>
      <Tabs defaultValue="tasdiqlanganlar" className="p-5">
        <TabsList>
          <TabsTrigger value="tasdiqlanganlar">Tasdiqlanganlar</TabsTrigger>
          <TabsTrigger value="yetkazilgan">Yetkazilganlar</TabsTrigger>
        </TabsList>
        <TabsContent value="tasdiqlanganlar">
          <Yetkazuvchi user={user} status="Tasdiqlangan" />
        </TabsContent>
        <TabsContent value="yetkazilgan">
          <Yetkazuvchi user={user} status="Yetkazildi" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasdiqlanganTalabnomalarPage;
