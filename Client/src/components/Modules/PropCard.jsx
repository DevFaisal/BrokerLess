import React from "react";
import { Link } from "react-router-dom";

function PropCard({ property }) {
  return (
    <Link
      to={`/landlord/properties/${property.id}`}
      className="max-w-80 max-h-80 flex flex-col justify-center ring-1 ring-gray-300 items-start m-3  rounded-md shadow-lg 
      hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          className=" object-cover h-48 w-96"
          src={property.imageUrl}
          alt="Property"
        />
      </div>
      <div className="flex flex-col gap-1 px-4 p-3">
        <h1 className="text-base font-bold text-black">{property.name}</h1>
        <p className="text-xs font-light text-gray-500">
          {property.description}
        </p>
        <p className="text-sm font-semibold text-black">
          ₹{property.rent}
          <span className="text-xs font-light text-gray-700">/ Month</span>
        </p>
        <p
          className={`px-1.5 py-0.5 text-2xs rounded-md w-max ${
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
    </Link>
  );
}

export default PropCard;
