import React from "react";
import TotalPriceCalculator from "./TotalPriceCalculator";
import CardNew from "./Card";
import useCollection from "./useCollection";
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
import Loader from "./Loader";
import Diagram from "./Diagram";
import useStatusData from "./useStatusData";
const Statistics = () => {
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
          {equipments.length === 0 ? (
            <>
              <Loader />
            </>
          ) : (
            <>{equipments.length}</>
          )}
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
      result: <>{types.length === 0 ? <Loader /> : <>{types.length}</>}</>,
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
        <>
          {statuses.length === 0 ? (
            <>
              <Loader />
            </>
          ) : (
            <>{statuses.length}</>
          )}
        </>
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
        <>
          {measures.length === 0 ? (
            <>
              <Loader />
            </>
          ) : (
            <>{measures.length}</>
          )}
        </>
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
      result: (
        <>
          {rooms.length === 0 ? (
            <>
              <Loader />
            </>
          ) : (
            <>{rooms.length}</>
          )}
        </>
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
          <DoorOpen color="green" />
        </>
      ),
      text: <>Skladlar</>,
      result: (
        <>
          {sklads.length === 0 ? (
            <>
              <Loader />
            </>
          ) : (
            <>{sklads.length}</>
          )}
        </>
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
        <>
          {branches.length === 0 ? (
            <>
              <Loader />
            </>
          ) : (
            <>{branches.length}</>
          )}
        </>
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
  const typesData = useStatusData({
    element: "equipments",
    field: "type",
  });
  const statusesData = useStatusData({
    element: "equipments",
    field: "status",
  });
  const measuresData = useStatusData({
    element: "equipments",
    field: "measure",
  });
  const tagsData = useStatusData({
    element: "equipments",
    field: "tag",
  });

  return (
    <div className="flex flex-wrap items-start justify-start rounded-md h-fit gap-3">
      <Diagram data={typesData} text="Jihoz turlari" />
      <Diagram data={statusesData}  text="Jihoz statuslar"/>
      <Diagram data={measuresData}  text="Jihoz o'lchovbirliglari"/>
      <Diagram data={tagsData}  text="Jihoz taglari"/>
      <div className="flex flex-wrap items-start justify-start rounded-md h-fit gap-3">
        <TotalPriceCalculator />
        {/* {cards.map((item, idx) => (
          <div key={idx}>
            <CardNew item={item} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Statistics;
