import React, { useEffect, useState } from "react";
import PropCard from "../PropCard";
import axios from "axios";

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
    <div>
      <h1>All Properties</h1>
      <div className="flex flex-col overflow-hidden items-center">
        <div className="grid grid-flow-row-dense grid-cols-4 gap-1 w-full h-[50rem] pb-10 shadow-lg overflow-y-scroll">
          {properties?.map((property, index) => (
            <PropCard key={index} property={property} />
          ))}
        </div>
      </div>
      {/* <h1>All Properties</h1>
      <PropCard property={properties} /> */}
    </div>
  );
}

export default AllProperties;
