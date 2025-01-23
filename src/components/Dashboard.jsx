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
import DynamicTagCounter from "@/components/DynamicTagCounter";
import DynamicTypeCounter from "@/components/DynamicTypeCounter";
import DynamicStatusCounter from "@/components/DynamicStatusCounter";
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
      link: "/all-equipments",
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
      link: "/types",
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
      link: "/all-equipment",

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
      link: "/all-equipment",

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
      link: "/all-equipment",

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
      link: "/all-equipment",
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
      link: "/branches",

    },
  ];

  return (
    <div>
      <div className="flex gap-3 p-5">
        <div className="border flex flex-wrap items-start justify-start p-4 shadow-lg rounded-md w-[80%] h-fit gap-3">
          <TotalPriceCalculator />
          {cards.map((item, idx) => (
            <div key={idx}>
              <CardNew item={item} />
            </div>
          ))}
        </div>
        <DynamicTagCounter collectionName="equipments" />
      </div>
      <div className="p-5">
        <br />
        <DynamicTypeCounter collectionName="equipments" />
        <br />
        <DynamicStatusCounter collectionName="equipments" />
      </div>
    </div>
  );
};

export default Dashboard;
