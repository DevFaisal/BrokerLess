import React from "react";
import { Loading, ContentError } from "../../../../components/Index";
import { MapPin } from "lucide-react";

const PropertyDetails = ({ property }) => {
  if (property.state === "loading") {
    return <Loading />;
  } else if (property.state === "hasError") {
    return (
      <ContentError
        heading={"Error"}
        message={"An error occurred while fetching property"}
      />
    );
  } else if (property.state === "hasValue") {
    return (
      <div className="bg-white p-4">
        <img
          className="w-full h-80 object-cover rounded-lg mb-4"
          src={property.contents?.imageUrl}
          alt={property.contents?.name}
        />
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {property.contents?.name}
            </h2>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Description:</p>
            <p className="text-lg text-gray-700">
              {property.contents?.description}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rent:</p>
            <p className="text-xl text-gray-900">₹{property.contents?.rent}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Type:</p>
            <p className="text-md text-gray-700">{property.contents?.type}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status:</p>
            <p
              className={`inline-block px-3 py-1 text-sm rounded-lg ${
                property.contents?.status === "AVAILABLE"
                  ? "bg-green-500 text-white"
                  : property.contents?.status === "RENTED"
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500 text-white"
              }`}
            >
              {property.contents?.status}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Landlord Details
          </h2>
          <hr className="border-gray-300" />
          <p className="text-base font-medium text-gray-700">
            {property.contents?.landlord.name}
          </p>
          <p className="text-sm text-gray-700">
            {property.contents?.landlord.email}
          </p>
          <p className="text-sm text-gray-700">
            {property.contents?.landlord.phone}
          </p>
        </div>
      </div>
    );
  }
};

export default PropertyDetails;
