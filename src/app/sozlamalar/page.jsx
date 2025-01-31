"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCollection from "../../components/useCollection";
import addElementToFirebase from "../../components/addElementToFirebase";
import toast from "react-hot-toast";

const Sozlamalar = () => {
  const types = useCollection("types");
  const statuses = useCollection("statuses");
  const measures = useCollection("measures");
  const tags = useCollection("tags");
  const [elementName, setElementName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddElement = async (path) => {
    setLoading(true);
    if (elementName) {
      await addElementToFirebase(elementName, path);
      setElementName("");
      setIsOpen(false);
      setLoading(false);
      toast.success("Muvafaqiyatli qo'shildi");
    } else {
      toast.error("Iltimos element nomini kiriting");
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          Jihoz turlari
          <div className="flex my-2 items-center justify-center gap-3">
            <Input
              type="text"
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              className="col-span-3"
              placeholder="Enter element name"
            />{" "}
            <Button
              disabled={loading}
              onClick={() => handleAddElement("types")}
            >
              {loading ? (
                <div className="loader">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
              ) : (
                <>Add</>
              )}
            </Button>
          </div>
          {types.length === 0 ? (
            <>No elements</>
          ) : (
            <>
              {types.map((element, idx) => (
                <div key={idx}>{element.name}</div>
              ))}
            </>
          )}
        </div>
        <div>
          Jihoz statuslari
          <div className="flex my-2 items-center justify-center gap-3">
            <Input
              type="text"
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              className="col-span-3"
              placeholder="Enter element name"
            />{" "}
            <Button
              disabled={loading}
              onClick={() => handleAddElement("statuses")}
            >
              {loading ? (
                <div className="loader">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
              ) : (
                <>Add</>
              )}
            </Button>
          </div>
          {statuses.length === 0 ? (
            <>No elements</>
          ) : (
            <>
              {statuses.map((element, idx) => (
                <div key={idx}>{element.name}</div>
              ))}
            </>
          )}
        </div>
        <div>
          Jihoz o'lchov birliklari
          <div className="flex my-2 items-center justify-center gap-3">
            <Input
              type="text"
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              className="col-span-3"
              placeholder="Enter element name"
            />{" "}
            <Button
              disabled={loading}
              onClick={() => handleAddElement("measures")}
            >
              {loading ? (
                <div className="loader">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
              ) : (
                <>Add</>
              )}
            </Button>
          </div>
          {measures.length === 0 ? (
            <>No elements</>
          ) : (
            <>
              {measures.map((element, idx) => (
                <div key={idx}>{element.name}</div>
              ))}
            </>
          )}
        </div>
        <div>
          Jihoz taglari
          <div className="flex my-2 items-center justify-center gap-3">
            <Input
              type="text"
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              className="col-span-3"
              placeholder="Enter element name"
            />{" "}
            <Button disabled={loading} onClick={() => handleAddElement("tags")}>
              {loading ? (
                <div className="loader">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
              ) : (
                <>Add</>
              )}
            </Button>
          </div>
          {tags.length === 0 ? (
            <>No elements</>
          ) : (
            <div className="max-h-[500px] overflow-y-scroll space-y-2">
              {tags.map((element, idx) => (
                <div className="border rounded-md p-2" key={idx}>{element.name}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sozlamalar;
