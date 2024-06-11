import React, { useEffect, useState } from "react";
import PropCard from "../PropCard";
import axios from "axios";
import { School } from "lucide-react";

function AllProperties() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/property`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="flex justify-between my-2  p-4 rounded-md ring-1 ring-violet-100">
        <div className="flex">
          <School className="w-6 h-6 inline-block" />
          <h1 className=" font-bold text-black ml-2">
            All Properties Available
          </h1>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden items-center">
        <div className="grid grid-flow-row-dense grid-cols-4 gap-1 w-full h-[50rem] pb-10 shadow-lg overflow-y-scroll">
          {properties?.map((property, index) => (
            <PropCard key={index} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProperties;
