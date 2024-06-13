import React, { useEffect, useState } from "react";
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
  const [edit, setEdit] = useState(false);
  const [deleteProperty, setDeleteProperty] = useState(false);

  const [property, setProperty] = useRecoilStateLoadable(
    PropertyAtomFamily(propertyId)
  );

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
      window.location.href = "/landlord/properties";
      if (response.status === 201) {
        setDeleteProperty(false);
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
        window.location.href = `/landlord/properties/${propertyId}`;
        setEdit(false);
      }
    } catch (error) {
      toast.error("Error updating property");
      console.error("Error updating property", error);
    }
  };

  const editInputs = [
    {
      label: "Name",
      type: "text",
      placeholder: "Name",
      defaultValue: property.contents?.name,
    },
    {
      label: "Description",
      type: "text",
      placeholder: "Description",
      defaultValue: property.contents?.description,
    },
    {
      label: "Rent",
      type: "number",
      placeholder: "Rent",
      defaultValue: property.contents?.rent,
    },
  ];
  const editProperty = () => {
    setEdit(!edit);
  };

  if (property.state === "loading") {
    return <Loading />;
  } else if (property.state === "hasError") {
    return (
      <div>
        <ContentError
          heading={"Error Fetching Property"}
          message={" Error fetching property. Please try again later."}
        />
      </div>
    );
  } else if (property.state === "hasValue") {
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
          <div className="overflow-hidden h-1/2 w-1/2 rounded-lg shadow-lg">
            <img
              className="object-contain w-[700px] h-[500px] rounded-lg"
              src={property.contents?.imageUrl}
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
                    defaultValue={property.contents?.name}
                  />
                  <input
                    {...register("description")}
                    className="text-base font-semibold text-gray-400 outline-none "
                    type="text"
                    defaultValue={property.contents?.description}
                  />
                  <div className="flex">
                    <h2 className="text-xl text-gray-700"> Rent: ₹</h2>
                    <input
                      {...register("rent")}
                      className="text-lg font-bold text-gray-700 outline-none"
                      type="number"
                      defaultValue={property.contents.rent}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <h2 className="text-md font-semibold text-gray-700">
                      Tenant:{"  "}
                    </h2>
                    <input
                      className="text-lg font-bold text-gray-700"
                      type="text"
                      defaultValue={property.contents.tenant?.name}
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
                    {property.contents?.name}
                  </h2>
                  <h2 className="text-base font-semibold text-gray-400">
                    {property.contents?.description}
                  </h2>
                  <h2 className="text-xl text-gray-700">
                    Rent:{" "}
                    <span className="text-lg font-bold text-gray-700">
                      ₹{property.contents?.rent}
                    </span>
                  </h2>

                  <h2 className="text-md font-semibold text-gray-700">
                    Tenant:{" "}
                    <span className="text-lg font-bold text-gray-700">
                      {property.contents.tenant?.name}
                    </span>
                  </h2>
                  <span>
                    Since{" "}
                    {new Date(
                      property.contents?.createdAt
                    ).toLocaleDateString()}
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
                    {property.contents?.status}
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
}
export default Property;
