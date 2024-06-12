import React, { useEffect, useState } from "react";
import axios from "axios";
import { CirclePlus, School } from "lucide-react";
import { Link } from "react-router-dom";
import PropCard from "../../PropCard";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/property/landlord`,
          {
            withCredentials: true,
          }
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, []);

  const ElementCard = ({ element }) => (
    <div className="flex flex-col overflow-hidden items-center">
      <div className="grid grid-flow-row-dense grid-cols-4 gap-1 w-full h-[50rem] pb-10 shadow-lg overflow-y-scroll">
        {element?.map((property, index) => (
          <PropCard
            key={index}
            property={property}
            to={`/landlord/properties/${property.id}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {properties.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          <Link to="/landlord/properties/add">
            <CirclePlus size={70} />
          </Link>
          <h1 className="text-4xl font-bold text-black">No Properties Found</h1>
        </div>
      ) : (
        <div className="w-full p-2">
          <div className="flex justify-between my-2  p-4 rounded-md ring-1 ring-violet-100">
            <div className="flex">
              <School className="w-6 h-6 inline-block" />
              <h1 className=" font-bold text-black ml-2">Properties</h1>
            </div>
            <Link to="/landlord/properties/add">
              <CirclePlus />
            </Link>
          </div>
          <ElementCard element={properties} />
        </div>
      )}
    </>
  );
}

export default Properties;
