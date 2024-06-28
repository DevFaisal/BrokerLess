import React from "react";
import { MapPin } from "lucide-react";

const AddressDetails = ({ addresses }) => {
  return (
    <div className="bg-white p-4">
      {addresses.map((address, index) => (
        <div key={index} className="mb-4">
          <h1 className="flex items-center text-lg font-semibold text-gray-900">
            <span className="mr-2">
              <MapPin size={20} />
            </span>
            Address
          </h1>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <p className="text-sm text-gray-900">{address.street}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <p className="text-sm text-gray-900">{address.city}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <p className="text-sm text-gray-900">{address.state}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <p className="text-sm text-gray-900">{address.zip}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressDetails;
