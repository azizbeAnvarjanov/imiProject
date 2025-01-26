import React from "react";

import Talabnomalar from "@/components/talabnoma-yaratish/Talabnomalar";
import GetUserFS from "@/components/GetUserFS";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const TalabnomalarPage = async () => {
  const user = await GetUserFS();
  return (
    <div>
      <Tabs defaultValue="talabnomalarim" className="p-5">
        <TabsList>
          <TabsTrigger value="talabnomalarim">Talabnomalarim</TabsTrigger>
          <TabsTrigger value="tasdiqlangan">Tasdiqlangan</TabsTrigger>
          <TabsTrigger value="bekor_qilingan">Bekor qilingan</TabsTrigger>
        </TabsList>
        <TabsContent value="talabnomalarim">
          <Talabnomalar user={user} status="Ko'rib chiqilmoqda" />
        </TabsContent>
        <TabsContent value="tasdiqlangan">
          <Talabnomalar user={user} status="Tasdiqlangan" />
        </TabsContent>
        <TabsContent value="bekor_qilingan">
          <Talabnomalar user={user} status="Bekor qilindi" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalabnomalarPage;
