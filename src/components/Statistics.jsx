import React from "react";
import TotalPriceCalculator from "./TotalPriceCalculator";

import useStatusData from "./useStatusData";
import Diagram from "./Diagram";
import TagsDiagram from "./Diagram-2";
const Statistics = () => {
  const typesData = useStatusData({
    element: "equipments",
    field: "type",
    countField: "quantity",
  });
  const statusesData = useStatusData({
    element: "equipments",
    field: "status",
    countField: "quantity",
  });
  const measuresData = useStatusData({
    element: "equipments",
    field: "measure",
    countField: "quantity",
  });
  const tagsData = useStatusData({
    element: "equipments",
    field: "tag",
    countField: "quantity",
  });

  return (
    <div className="">
      <div className="flex flex-wrap items-start justify-start rounded-md h-fit gap-3">
        <TotalPriceCalculator />
      </div>
      <div className="grid grid-cols-3 gap-3 my-3">
        <Diagram data={typesData} text="Jihoz turlari" />
        <Diagram data={statusesData} text="Jihoz statuslar" />
        <Diagram data={measuresData} text="Jihoz o'lchovbirliglari" />
        {/* <Diagram data={tagsData} text="Jihoz taglari" /> */}
      </div>
        <TagsDiagram data={tagsData} text="Jihoz taglari" />
    </div>
  );
};

export default Statistics;
