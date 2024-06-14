import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, DisabledDatePicker, Loading } from "../../../components/Index";
import { useRecoilStateLoadable } from "recoil";
import { GetAgreementDate, GetPropertyInfo } from "../../../store/PropertyAtom";
import ContentError from "../../../components/Modules/ContentError";

function PropertyInfo() {
  const [selectedDate, setSelectedDate] = useState({});
  const { propertyId } = useParams();
  const [agreementDate, setAgreementDate] = useRecoilStateLoadable(
    GetAgreementDate(propertyId)
  );
  const [property, setProperty] = useRecoilStateLoadable(
    GetPropertyInfo(propertyId)
  );

  useEffect(() => {}, [propertyId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: selectedDate.startDate,
      endDate: selectedDate.endDate,
    },
  });

  const GenerateAgreement = async (data) => {
    data.startDate = selectedDate.startDate;
    data.endDate = selectedDate.endDate;

    if (!data.startDate || !data.endDate) {
      return toast.error("Please fill all the fields");
    }

    const minAgreementPeriod = 29 * 24 * 60 * 60 * 1000;
    if (
      new Date(data.endDate) - new Date(data.startDate) <=
      minAgreementPeriod
    ) {
      return toast.error("Minimum Agreement period should be 30 days");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement/generate`,
        {
          propertyId,
          startDate: data.startDate,
          endDate: data.endDate,
          rent: parseInt(property.contents.rent),
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Agreement Request Sent Successfully");
        window.location.href = "/user/requests";
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

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
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md bg-white">
            <img
              className="w-full h-80 object-cover rounded-lg"
              src={property.contents?.imageUrl}
              alt={property.contents?.name}
            />
          </div>
          <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md bg-white">
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {property.contents?.name}
              </p>
              <p className="text-lg font-semibold text-gray-600">
                {property.contents?.description}
              </p>
              <p className="text-xl font-semibold text-gray-900">
                ₹{property.contents?.rent}
              </p>
              <p className="text-md text-gray-700">{property.contents?.type}</p>
              <p
                className={`px-3 py-1 text-sm rounded-lg w-max ${
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
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-gray-900">
                Landlord Details
              </h1>
              <span className="h-px w-full bg-gray-300 my-2"></span>
              <p className="text-base font-semibold text-gray-700">
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
          <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md bg-white">
            {property.contents?.PropertyAddress.map((address, index) => (
              <div key={index}>
                <h1 className="text-lg font-semibold text-gray-900">Address</h1>
                <span className="h-px bg-gray-300 my-2"></span>
                <p className="text-base font-semibold text-gray-700">
                  {address.street}
                </p>
                <p className="text-sm text-gray-700">{address.city}</p>
                <p className="text-sm text-gray-700">{address.state}</p>
                <p className="text-sm text-gray-700">{address.zip}</p>
                <p className="text-sm text-gray-700">{address.country}</p>
              </div>
            ))}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Request to Rent
              </h1>
              <span className="h-px bg-gray-300 my-2"></span>
              <form
                onSubmit={handleSubmit(GenerateAgreement)}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <label className="text-base font-semibold text-gray-900">
                      Start Date
                    </label>
                    <DisabledDatePicker
                      onChange={(date) =>
                        setSelectedDate({ ...selectedDate, startDate: date })
                      }
                      selected={selectedDate.startDate}
                      dateRanges={agreementDate.contents}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-base font-semibold text-gray-900">
                      End Date
                    </label>
                    <DisabledDatePicker
                      onChange={(date) =>
                        setSelectedDate({ ...selectedDate, endDate: date })
                      }
                      selected={selectedDate.endDate}
                      dateRanges={agreementDate.contents}
                    />
                  </div>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default PropertyInfo;
