import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button, DisabledDatePicker } from "../../../../components/Index";

const RentRequestForm = ({ property, agreementDate, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState({});

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const GenerateAgreement = async (data) => {
    
    data.startDate = selectedDate.startDate;
    data.endDate = selectedDate.endDate;

    if (!data.startDate || !data.endDate || !data.aadharCard || !data.panCard) {
      return toast.error("Please fill all the fields");
    }

    const minAgreementPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    if (
      new Date(data.endDate) - new Date(data.startDate) <
      minAgreementPeriod
    ) {
      return toast.error("Minimum agreement period should be 30 days");
    }

    onSubmit(data);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Request to Rent
      </h1>
      <form onSubmit={handleSubmit(GenerateAgreement)} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <DisabledDatePicker
              id="startDate"
              onChange={(date) =>
                setSelectedDate({ ...selectedDate, startDate: date })
              }
              selected={selectedDate.startDate}
              dateRanges={agreementDate.contents.data}
              className="w-full mt-1"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <DisabledDatePicker
              id="endDate"
              onChange={(date) =>
                setSelectedDate({ ...selectedDate, endDate: date })
              }
              selected={selectedDate.endDate}
              dateRanges={agreementDate.contents.data}
              className="w-full mt-1"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="aadharCard"
            className="block text-sm font-medium text-gray-700"
          >
            Aadhar Card <span className="text-red-500">*</span>
          </label>
          <input
            {...register("aadharCard", { required: "Aadhar Card is required" })}
            id="aadharCard"
            type="file"
            className={`border-gray-300 rounded-lg mt-1 ${errors.aadharCard && "border-red-500"}`}
          />
          {errors.aadharCard && (
            <span className="text-red-500 text-sm">
              {errors.aadharCard.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="panCard"
            className="block text-sm font-medium text-gray-700"
          >
            PAN Card <span className="text-red-500">*</span>
          </label>
          <input
            {...register("panCard", { required: "PAN Card is required" })}
            id="panCard"
            type="file"
            className={`border-gray-300 rounded-lg mt-1 ${errors.panCard && "border-red-500"}`}
          />
          {errors.panCard && (
            <span className="text-red-500 text-sm">
              {errors.panCard.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default RentRequestForm;
