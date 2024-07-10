import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FilePenLine, Trash2 } from "lucide-react";
import { Button } from "../../../Index";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AlertDialog from "../../../ui/AlertDialog";
import { useRecoilStateLoadable } from "recoil";
import { PropertyAtomFamily } from "../../../../store/PropertyAtom";
import { Loading } from "../../../Index";
import ContentError from "../../ContentError";

function Property() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const [propertyLoadable, setPropertyLoadable] = useRecoilStateLoadable(
    PropertyAtomFamily(propertyId)
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: propertyLoadable.contents?.name,
      description: propertyLoadable.contents?.description,
      rent: propertyLoadable.contents?.rent,
    },
  });

  const handleDeleteProperty = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/api/property/?id=${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Property deleted successfully");
      navigate("/landlord/properties");
    } catch (error) {
      console.error("Error deleting property", error);
      toast.error("Error deleting property");
    }
  };

  const handleUpdateProperty = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_LOCALHOST}/api/property/update`,
        { ...data, id: propertyId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Property updated successfully");
        setEditMode(false);
        // Reload property data after update
        setPropertyLoadable(PropertyAtomFamily(propertyId));
      }
    } catch (error) {
      console.error("Error updating property", error);
      toast.error("Error updating property");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const property =
    propertyLoadable.state === "hasValue" ? propertyLoadable.contents : null;

  if (propertyLoadable.state === "loading") {
    return <Loading />;
  }

  if (propertyLoadable.state === "hasError") {
    return (
      <ContentError
        heading="Error Fetching Property"
        message="Error fetching property. Please try again later."
      />
    );
  }

  return (
    <>
      {deleteConfirmation && (
        <AlertDialog
          title="Delete Property"
          message="Are you sure you want to delete this property?"
          onConfirm={handleDeleteProperty}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
      <div className="flex flex-col my-4 p-3 gap-4 items-center justify-center w-full h-full">
        <div className="overflow-hidden max-w-full max-h-[500px] w-full rounded-lg shadow-lg">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={property?.imageUrl}
            alt="Property"
          />
        </div>
        <div className="flex flex-col items-start gap-3 justify-center w-full max-w-screen p-5 ring-1 ring-gray-300 rounded-lg shadow-lg">
          {editMode ? (
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(handleUpdateProperty)}
            >
              <input
                {...register("name")}
                className="text-4xl font-bold text-blue-800 outline-none"
                placeholder="Name"
                type="text"
                defaultValue={propertyLoadable.contents?.name}
                autoFocus={true}
              />
              <input
                {...register("description")}
                className="text-base font-semibold text-gray-400 outline-none"
                type="text"
                defaultValue={propertyLoadable.contents?.description}
                placeholder="Description"
              />
              <div className="flex items-center gap-1">
                <h2 className="text-xl text-gray-700"> Rent: ₹</h2>
                <input
                  {...register("rent")}
                  defaultValue={propertyLoadable.contents?.rent}
                  className="text-lg font-bold text-gray-700 outline-none"
                  type="number"
                />
              </div>
              <div className="flex gap-1">
                <Button type="submit">
                  <span>Save</span>
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={toggleEditMode}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
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
                  className={`px-2 py-1 text-sm rounded-lg w-max ${
                    property?.status === "AVAILABLE"
                      ? "bg-green-500 text-white"
                      : property?.status === "RENTED"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                  }`}
                >
                  {property?.status}
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={toggleEditMode}>
                  <FilePenLine />
                </button>
                <button onClick={() => setDeleteConfirmation(true)}>
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
