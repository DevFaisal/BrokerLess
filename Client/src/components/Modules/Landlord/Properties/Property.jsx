import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import { Button } from "../../../Index";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AlertDialog from "../../../ui/AlertDialog";

function Property() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleteProperty, setDeleteProperty] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: property?.name,
      description: property?.description,
      rent: property?.rent,
    },
  });
  const DeleteProperty = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/api/property/?id=${propertyId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setDeleteProperty(false);
        navigate("/landlord/properties");
      }
    } catch (error) {
      console.error("Error deleting property", error);
    }
  };

  const UpdateProperty = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_LOCALHOST}/api/property/update`,
        {
          ...data,
          id: propertyId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Property Updated Successfully");
        setEdit(false);
      }
    } catch (error) {
      toast.error("Error updating property");
      console.error("Error updating property", error);
    }
  };
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
        if (error.response.status >= 401) {
          navigate("/");
        }
        console.error("Error fetching property", error);
      }
    };
    fetchProperty();
  }, [propertyId, UpdateProperty]);

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
      {deleteProperty && (
        <AlertDialog
          title={"Delete Property"}
          message={"Are you sure you want to delete this property?"}
          onConfirm={DeleteProperty}
          onCancel={() => setDeleteProperty(false)}
        />
      )}
      <div className="flex flex-col my-4 p-3 gap-4 items-center justify-center w-full h-full">
        <div className="overflow-hidden w-1/2 rounded-lg shadow-lg">
          <img
            className="object-cover w-fit rounded-lg"
            src={property?.imageUrl}
            alt="Image"
          />
        </div>
        <div className="flex flex-col items-start gap-3 justify-center w-1/2 h-full p-5 ring-1 ring-gray-300 rounded-lg shadow-lg">
          {edit ? (
            <div>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(UpdateProperty)}
              >
                <input
                  {...register("name")}
                  className="text-4xl font-bold text-blue-800 outline-none"
                  placeholder="Name"
                  type="text"
                  autoFocus={true}
                  defaultValue={property.name}
                />
                <input
                  {...register("description")}
                  className="text-base font-semibold text-gray-400 outline-none "
                  type="text"
                  defaultValue={property?.description}
                />
                <div className="flex">
                  <h2 className="text-xl text-gray-700"> Rent: ₹</h2>
                  <input
                    {...register("rent")}
                    className="text-lg font-bold text-gray-700 outline-none"
                    type="number"
                    defaultValue={property?.rent}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <h2 className="text-md font-semibold text-gray-700">
                    Tenant:{"  "}
                  </h2>
                  <input
                    className="text-lg font-bold text-gray-700"
                    type="text"
                    defaultValue={property?.tenant?.name}
                  />
                </div>
                <div className="flex gap-1">
                  <Button type={"submit"}>
                    <span>Save</span>
                  </Button>
                  <Button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                    onClick={editProperty}
                  >
                    <span>Cancel</span>
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-3">
                <h2 className="text-4xl font-bold text-blue-800">
                  {property?.name}
                </h2>
                <h2 className="text-base font-semibold text-gray-400">
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
              <div
                className="
              flex flex-col h-50 items-between justify-between
              "
              >
                <button onClick={editProperty}>
                  <FilePenLine />
                </button>
                <button onClick={() => setDeleteProperty(true)}>
                  <Trash2 color="red" strokeWidth={2} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Property;
