import React from "react";
import { Link } from "react-router-dom";

function PropCard({ property, to }) {
  return (
    <Link
      to={to}
      className="max-w-80 max-h-80 flex flex-col justify-center ring-1 ring-gray-300 items-start m-3  rounded-md shadow-lg 
      hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="overflow-hidden flex justify-center items-center bg-red-400 w-full h-96 rounded-t-md">
        <img
          className=" object-cover w-full h-full rounded-t-md"
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
          {INRformat(parseInt(property.rent))}
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

//Function for comma in Indian Currency
export function INRformat(number) {
  return number
    .toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(/\.00$/, "");
}
