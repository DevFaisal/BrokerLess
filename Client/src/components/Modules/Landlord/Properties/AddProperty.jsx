import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addProperty } from "../../../../api/PropertyApi";

function AddProperty() {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Image: "",
      name: "",
      description: "",
      rent: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const Inputs = [
    {
      label: "Name",
      type: "text",
      placeholder: "Name",
      name: "name",
    },
    {
      label: "Description",
      type: "text",
      placeholder: "Description",
      name: "description",
    },
    {
      label: "Rent",
      type: "number",
      placeholder: "Rent",
      name: "rent",
    },
    {
      label: "Street",
      type: "text",
      placeholder: "Street",
      name: "street",
    },
    {
      label: "City",
      type: "text",
      placeholder: "City",
      name: "city",
    },
    {
      label: "State",
      type: "text",
      placeholder: "State",
      name: "state",
    },
    {
      label: "Zip",
      type: "text",
      placeholder: "Zip",
      name: "zip",
    },
    {
      label: "Country",
      type: "text",
      placeholder: "Country",
      name: "country",
    },
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    const newData = new FormData();
    newData.append("Image", data.Image[0]);
    newData.append("name", data.name);
    newData.append("description", data.description);
    newData.append("rent", data.rent);
    newData.append("street", data.street);
    newData.append("city", data.city);
    newData.append("state", data.state);
    newData.append("zip", data.zip);
    newData.append("country", data.country);

    try {
      const res = await addProperty(newData);
      if (res.status === 200) {
        toast.success("Property Added Successfully");
        navigate("/landlord/properties");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("Image", e.target.files);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-white">Add Property</h1>
      <form
        className="flex flex-col gap-4 overflow-scroll h-screen"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {imagePreview ? (
              <div className="overflow-hidden rounded-lg">
                <img
                  src={imagePreview}
                  alt="Property"
                  className="h-auto max-w-full"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Upload a property image
                </p>
              </div>
            )}

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {errors.Image && (
            <p className="text-red-500 text-sm mt-1">{errors.Image.message}</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 items-start p-2 gap-4 w-full">
          {Inputs.map((input, index) => (
            <div key={index}>
              <label className="text-md font-semibold text-black">
                {input.label}
              </label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                {...register(input.name, {
                  required: `${input.label} is required`,
                })}
                className="p-2 w-full ring-1 ring-gray-400 rounded-md text-black"
              />
              {errors[input.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[input.name]?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between h-full gap-4">
          <Button
            className="flex justify-center w-1/2 self-center mt-5"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle size={20} className="text-white animate-spin" />
            ) : (
              "Add Property"
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default AddProperty;
