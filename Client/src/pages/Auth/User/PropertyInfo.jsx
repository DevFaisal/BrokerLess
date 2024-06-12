import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/Index";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function PropertyInfo() {
  const { propertyId } = useParams();
  const [property, setProperty] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const GenerateAgreement = async (data) => {
    if (!data.startDate || !data.endDate) {
      return toast.error("Please fill all the fields");
    }
    if (
      new Date(data.endDate) - new Date(data.startDate) <=
      30 * 24 * 60 * 60 * 1000
    ) {
      return toast.error("Minimum Agreement period should be 30 days");
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement/generate`,
        {
          propertyId: propertyId,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          rent: parseInt(property.rent),
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Agreement Request Sent Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/property/info?id=${propertyId}`,
          {
            withCredentials: true,
          }
        );
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperty();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            className="w-full h-full object-cover object-center rounded-md"
            src={property?.imageUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4 p-4 justify-between rounded-md shadow-md">
          <div>
            <p className="text-4xl font-bold rounded-md text-gray-800">
              {property?.name}
            </p>
            <p className="text-xl font-semibold rounded-md text-gray-300">
              {property?.description}
            </p>
            <p className="text-2xl font-semibold rounded-md text-black">
              ₹{property?.rent}
            </p>
            <p>{property?.type}</p>
            <p
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
            </p>
          </div>
          <div className="flex flex-col h-50 items-between justify-between">
            <h1 className="text-2xl font-semibold rounded-md text-gray-900">
              Landlord Details
            </h1>
            <span className="h-[1px] w-full bg-success my-2"></span>
            <p className="text-xl font-semibold rounded-md text-gray-900">
              {property?.landlord.name}
            </p>
            <p className="text-sm font-semibold rounded-md text-gray-900">
              {property?.landlord.email}
            </p>
            <p className="text-sm font-semibold rounded-md text-gray-900">
              {property?.landlord.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 justify-between rounded-md shadow-md">
          {property?.PropertyAddress.map((address) => (
            <div key={address.id}>
              <h1 className="text-2xl font-semibold rounded-md text-gray-900">
                Address
              </h1>
              <span className="h-[1px] bg-success my-2"></span>
              <p className="text-xl font-semibold rounded-md text-gray-900">
                {address.street}
              </p>
              <p className="text-sm font-semibold rounded-md text-gray-900">
                {address.city}
              </p>
              <p className="text-sm font-semibold rounded-md text-gray-900">
                {address.state}
              </p>
              <p className="text-sm font-semibold rounded-md text-gray-900">
                {address.zip}
              </p>
              <p className="text-sm font-semibold rounded-md text-gray-900">
                {address.country}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 p-4 justify-between rounded-md shadow-md">
          <h1>Request to Rent</h1>
          <span className="h-[1px] bg-success my-2"></span>
          <form
            onSubmit={handleSubmit(GenerateAgreement)}
            className="flex flex-col gap-4 p-4 justify-between rounded-md shadow-md"
          >
            <label className="text-xl font-semibold rounded-md text-gray-900">
              Start Date
            </label>
            <input
              {...register("startDate", { required: true })}
              className="p-2 rounded-md"
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
            <label className="text-xl font-semibold rounded-md text-gray-900">
              End Date
            </label>
            <input
              {...register("endDate", { required: true })}
              className="p-2 rounded-md"
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />

            <Button>Submit Request</Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default PropertyInfo;
