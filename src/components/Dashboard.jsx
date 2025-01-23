"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCollection from "../components/useCollection";
import TotalPriceCalculator from "@/components/TotalPriceCalculator";
import CardNew from "@/components/Card";
import {
  Building,
  DoorClosed,
  DoorOpen,
  FlipVertical,
  GalleryHorizontalEnd,
  SquareArrowUpRight,
  SquarePilcrow,
  TrendingUp,
  UsersRound,
} from "lucide-react";
const Dashboard = () => {
  const equipments = useCollection("equipments");
  const types = useCollection("types");
  const statuses = useCollection("statuses");
  const measures = useCollection("measures");
  const users = useCollection("users");
  const rooms = useCollection("rooms");
  const sklads = useCollection("wareHouses");
  const branches = useCollection("branches");

  const cards = [
    {
      icon: (
        <>
          <GalleryHorizontalEnd color="green" />
        </>
      ),
      text: <>Umumiy Jihozlar</>,
      result: (
        <>
          {equipments.length === 0 ? <>loading...</> : <>{equipments.length}</>}
        </>
      ),
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <SquarePilcrow color="green" />
        </>
      ),
      text: <>Turlari</>,
      result: <>{types.length === 0 ? <>loading...</> : <>{types.length}</>}</>,
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <TrendingUp color="green" />
        </>
      ),
      text: <>Statuslari</>,
      result: (
        <>{statuses.length === 0 ? <>loading...</> : <>{statuses.length}</>}</>
      ),
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <FlipVertical color="green" />
        </>
      ),
      text: <>O'lchov Birliklari</>,
      result: (
        <>{measures.length === 0 ? <>loading...</> : <>{measures.length}</>}</>
      ),
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <UsersRound color="green" />
        </>
      ),
      text: <>Foydalanuvchilar</>,
      result: <>{users.length === 0 ? <>loading...</> : <>{users.length}</>}</>,
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <DoorClosed color="green" />
        </>
      ),
      text: <>Xonalar</>,
      result: <>{rooms.length === 0 ? <>loading...</> : <>{rooms.length}</>}</>,
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <DoorOpen color="green" />
        </>
      ),
      text: <>Skladlar</>,
      result: (
        <>{sklads.length === 0 ? <>loading...</> : <>{sklads.length}</>}</>
      ),
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
    {
      icon: (
        <>
          <Building color="green" />
        </>
      ),
      text: <>Filiallar</>,
      result: (
        <>{branches.length === 0 ? <>loading...</> : <>{branches.length}</>}</>
      ),
      button_icon: (
        <>
          <SquareArrowUpRight size="15px" />
        </>
      ),
      button_text: <>More....</>,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-[#e1e6ed1d]">
      <TotalPriceCalculator />
      {cards.map((item, idx) => (
        <div key={idx}>
          <CardNew item={item} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
