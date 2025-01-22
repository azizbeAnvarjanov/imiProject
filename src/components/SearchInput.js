import React from "react";

import { Input } from "./ui/input";

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
