import React, { useEffect, useState } from "react";
import axios from "axios";
import { School } from "lucide-react";
import DashboardWrapper from "../DashboardWrapper";

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

  const ThisIcon = () => <School />;

  const ElementCard = ({ element }) => (
    <div className="flex flex-col overflow-hidden items-center">
      <div className="grid grid-flow-row-dense grid-cols-4 gap-1 w-full h-[50rem] pb-10 shadow-lg overflow-y-scroll">
        {element?.map((property, index) => (
          <PropCard key={index} property={property} />
        ))}
      </div>
    </div>
  );

  const PropCard = ({ property }) => (
    <div
      className="w-fit h-80 flex flex-col justify-center ring-1 gap-1 ring-gray-300 items-start bg-gradient-to-br from-slate-50 to-slate-100 m-4 p-4 rounded-lg shadow-lg 
      hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          className=" object-cover h-48 w-96 rounded-lg"
          src={property.imageUrl}
          alt="Property"
        />
      </div>
      <h1 className="text-2xl font-bold text-black">{property.name}</h1>
      <p className="font-light text-gray-500">{property.description}</p>
      <p className="font-semibold text-black">₹{property.rent}</p>
      <p
        className={`px-2 py-1 text-sm rounded-lg w-max ${
          property.status === "AVAILABLE"
            ? "bg-green-500 text-white"
            : property.status === "RENTED"
              ? "bg-yellow-500 text-black"
              : "bg-red-500 text-white"
        }`}
      >
        {property.status}
      </p>
    </div>
  );

  return (
    <>
      {properties.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-black">No Properties Found</h1>
        </div>
      ) : (
        <div className="w-full p-2">
          <div className="flex  my-2  p-4 rounded-md ring-1 ring-violet-100">
            <School className="w-6 h-6 inline-block" />
            <h1 className=" font-bold text-black ml-2">Properties</h1>
          </div>
          <ElementCard element={properties} />
        </div>
      )}
    </>
  );
}

export default Properties;
