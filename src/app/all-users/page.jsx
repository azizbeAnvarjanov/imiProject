"use client";
import React from "react";

import useCollection from "@/components/useCollection";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const AllUsers = () => {
  const users = useCollection("users");

  return (
    <div className="p-5">
      AllUsers
      <div>
        {users.length === 0 ? (
          <>no users</>
        ) : (
          <Table className="w-full border-collapse border border-gray-200 overflow-x-scroll min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableCell className="bg-gray-500 text-white font-bold">
                  №
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Ismi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Familiyasi
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Email
                </TableCell>
                <TableCell className="bg-gray-500 text-white font-bold">
                  Ro'li
                </TableCell>

                <TableCell className="bg-gray-500 text-white font-bold">
                  Amallar
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="border p-2 text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.name || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.surname || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.email || "Ma'lumot yo'q"}
                  </TableCell>
                  <TableCell className="border p-2">
                    {user.role || "Ma'lumot yo'q"}
                  </TableCell>

                  <TableCell className="border p-2 text-center">
                    <Link
                      href={`/user/${user.id}`}
                      className="text-blue-500 underline hover:text-blue-700 ml-2"
                    >
                      Batafsil
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
