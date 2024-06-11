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

  // const PropCard = ({ property }) => (
  //   <Link
  //     to={`/landlord/properties/${property.id}`}
  //     className="max-w-80 max-h-80 flex flex-col justify-center ring-1 ring-gray-300 items-start m-3  rounded-md shadow-lg
  //     hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
  //   >
  //     <div className="overflow-hidden rounded-t-lg">
  //       <img
  //         className=" object-cover h-48 w-96"
  //         src={property.imageUrl}
  //         alt="Property"
  //       />
  //     </div>
  //     <div className="flex flex-col gap-1 px-4 p-3">
  //       <h1 className="text-base font-bold text-black">{property.name}</h1>
  //       <p className="text-xs font-light text-gray-500">
  //         {property.description}
  //       </p>
  //       <p className="text-sm font-semibold text-black">
  //         ₹{property.rent}
  //         <span className="text-xs font-light text-gray-700">/ Month</span>
  //       </p>
  //       <p
  //         className={`px-1.5 py-0.5 text-2xs rounded-md w-max ${
  //           property.status === "AVAILABLE"
  //             ? "bg-green-500 text-white"
  //             : property.status === "RENTED"
  //               ? "bg-yellow-500 text-black"
  //               : "bg-red-500 text-white"
  //         }`}
  //       >
  //         {property.status}
  //       </p>
  //     </div>
  //   </Link>
  // );
  <PropCard property={properties} />;
  return (
    <>
      {properties.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
          <Link to={`/landlord/properties/add`}>
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
            <Link to={`/landlord/properties/add`}>
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
