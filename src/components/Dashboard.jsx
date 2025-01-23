"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCollection from "../components/useCollection";
const Dashboard = () => {
  const equipments = useCollection("equipments");
  const types = useCollection("types");
  const statuses = useCollection("statuses");
  const measures = useCollection("measures");
  const users = useCollection("users");
  const rooms = useCollection("rooms");
  const sklads = useCollection("wareHouses");
  const branches = useCollection("branches");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Umumiy Jihozlar</CardTitle>
        </CardHeader>
        <CardContent>
          {equipments.length === 0 ? <>loading...</> : <>{equipments.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Umumiy Jihozlar Summasi</CardTitle>
        </CardHeader>
        <CardContent>
          {equipments.length === 0 ? <>loading...</> : <>{equipments.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jihoz Turlari</CardTitle>
        </CardHeader>
        <CardContent>
          {types.length === 0 ? <>loading...</> : <>{types.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jihoz Statuslari</CardTitle>
        </CardHeader>
        <CardContent>
          {statuses.length === 0 ? <>loading...</> : <>{statuses.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Jihoz O'lchov Birliklari</CardTitle>
        </CardHeader>
        <CardContent>
          {measures.length === 0 ? <>loading...</> : <>{measures.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bo'limlar</CardTitle>
        </CardHeader>
        <CardContent>
          {equipments.length === 0 ? <>loading...</> : <>{equipments.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Foydalanuvchilar</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? <>loading...</> : <>{users.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Xonalar</CardTitle>
        </CardHeader>
        <CardContent>
          {rooms.length === 0 ? <>loading...</> : <>{rooms.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Skladlar</CardTitle>
        </CardHeader>
        <CardContent>
          {sklads.length === 0 ? <>loading...</> : <>{sklads.length}</>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Filiallar</CardTitle>
        </CardHeader>
        <CardContent>
          {branches.length === 0 ? <>loading...</> : <>{branches.length}</>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
