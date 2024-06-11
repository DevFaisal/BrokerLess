import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Property() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/property/prop/?id=${propertyId}`,
          {
            withCredentials: true,
          }
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property", error);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const editInputs = [
    {
      label: "Name",
      type: "text",
      placeholder: "Name",
      defaultValue: property?.name,
    },
    {
      label: "Description",
      type: "text",
      placeholder: "Description",
      defaultValue: property?.description,
    },
    {
      label: "Rent",
      type: "number",
      placeholder: "Rent",
      defaultValue: property?.rent,
    },
  ];
  const editProperty = () => {
    setEdit(!edit);
  };
  return (
    <>
      <div className="flex flex-col my-4 p-3  gap-4 items-center justify-center w-full h-full">
        <div className="overflow-hidden w-1/2 rounded-lg shadow-lg">
          <img
            className="object-cover w-fit rounded-lg"
            src={property?.imageUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col items-start gap-3 justify-center w-full h-full p-5 bg-gray-100 rounded-lg shadow-lg">
          {edit ? (
            <div>
              {editInputs.map((input, index) => (
                <div key={index}>
                  <label className="text-md font-semibold text-gray-700">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    defaultValue={input.defaultValue}
                    className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>
              ))}
              <button
                onClick={editProperty}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-bold text-blue-800">
                {property?.name}
              </h2>
              <h2 className="text-md font-semibold text-gray-700">
                {property?.description}
              </h2>
              <h2 className="text-xl text-gray-700">
                Rent:{" "}
                <span className="text-lg font-bold text-gray-700">
                  ₹{property?.rent}
                </span>
              </h2>

              <h2 className="text-md font-semibold text-gray-700">
                Tenant:{" "}
                <span className="text-lg font-bold text-gray-700">
                  {property?.tenant?.name}
                </span>
              </h2>
              <span>
                Since {new Date(property?.createdAt).toLocaleDateString()}
              </span>
              <h2
                className={`
            px-2 py-1 text-sm rounded-lg w-max ${
              property?.status === "AVAILABLE"
                ? "bg-green-500 text-white"
                : property?.status === "RENTED"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500 text-white"
            }
            `}
              >
                {property?.status}
              </h2>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center justify-center w-full h-full p-5 bg-gray-100 rounded-lg shadow-lg">
        <button
          onClick={editProperty}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </>
  );
}

export default Property;
