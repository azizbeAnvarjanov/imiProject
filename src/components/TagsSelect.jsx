import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TagSelector = ({ tags, setTag }) => {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredTags = tags?.filter((t) =>
    t?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectTag = (selectedTag) => {
    setTag(selectedTag);
    setSearch(selectedTag);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <Label className="my-2 flex">Jihoz tag:</Label>
      <Input
        placeholder="Tagni qidiring..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full"
      />
      {showDropdown && filteredTags.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-10 max-h-[300px] overflow-scroll">
          {filteredTags.map((t, idx) => (
            <div
              key={idx}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectTag(t.name)}
            >
              {t.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
