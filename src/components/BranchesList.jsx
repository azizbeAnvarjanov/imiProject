"use client";
// branchesList.js
import React from "react";
import Link from "next/link";
import useCollection from "./useCollection";

const BranchesLists = () => {
  const branches = useCollection("branches");

  return (
    <div>
      {branches.length === 0 ? (
        <p>No branches available</p>
      ) : (
        <ul className="flex gap-4 my-5">
          {branches.map((branch, idx) => (
            <Link
              className="border py-2 px-5 rounded-xl shadow-md"
              href={`/branches/${branch.id}`}
              key={idx}
            >
              {branch.name}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BranchesLists;
