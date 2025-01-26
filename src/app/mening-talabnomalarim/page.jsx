import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MeningTalabnomalarim from "@/components/talabnoma-yaratish/MeningTalabnomalarim";

import GetUserFS from "@/components/GetUserFS";

const MeningTalabnomalarimPage = async () => {
  const user = await GetUserFS();
  console.log(user);

  return (
    <div>
      <Tabs defaultValue="talabnomalarim" className="p-5">
        <TabsList>
          <TabsTrigger value="talabnomalarim">Talabnomalarim</TabsTrigger>
          <TabsTrigger value="tasdiqlangan">Tasdiqlangan</TabsTrigger>
          <TabsTrigger value="tasdiqlanmaganlar">Tasdiqlanmaganlar</TabsTrigger>
          <TabsTrigger value="yetkazilganlar">Yetkazilganlar</TabsTrigger>
        </TabsList>
        <TabsContent value="talabnomalarim">
          <MeningTalabnomalarim
            user={user}
            text="Mening talabnomalarim"
            status="Ko'rib chiqilmoqda"
          />
        </TabsContent>
        <TabsContent value="tasdiqlangan">
          <MeningTalabnomalarim
            user={user}
            text="Mening tasdiqlangan talabnomalarim"
            status="Tasdiqlangan"
          />
        </TabsContent>
        <TabsContent value="tasdiqlanmaganlar">
          <MeningTalabnomalarim
            user={user}
            text="Mening tasdiqlangamagan talabnomalarim"
            status="Bekor qilindi"
          />
        </TabsContent>
        <TabsContent value="yetkazilganlar">
          <MeningTalabnomalarim
            user={user}
            text="Yetib kelgan jihozlar"
            status="Yetkazildi"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeningTalabnomalarimPage;
