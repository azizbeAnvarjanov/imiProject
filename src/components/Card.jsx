import Link from "next/link";
import React from "react";

const Card = ({ item }) => {
  return (
    <div className="border shadow-lg p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="font-bold">{item.text}</div>
        <div className="text-3xl font-bold">{item.result}</div>
      </div>
      <Link href="#" className="mt-3 flex items-center gap-4">
        {item.button_text}
        {item.button_icon}
      </Link>
    </div>
  );
};

export default Card;
