import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Loading, Button } from "../../../components/Index";
import { useRecoilStateLoadable } from "recoil";
import { UserSelector } from "../../../store/UserAtom";
import toast from "react-hot-toast";

function UserProfilePage() {
  const { register, handleSubmit } = useForm();
  const [profile, setProfile] = useRecoilStateLoadable(UserSelector);
  const [loading, setLoading] = useState(false);

  console.log("Profile:", profile);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      // Example API call to update profile (replace with your actual endpoint)
      const response = await axios.put(
        `${import.meta.env.VITE_LOCALHOST}/auth/user/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // Assuming profile update is successful, you might want to update state or show a success message
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile", error);
    } finally {
      setLoading(false);
    }
  };

  if (profile.state === "loading") {
    return <Loading />;
  }

  if (profile.state === "hasError") {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Error Fetching Profile
        </h1>
        <p className="text-lg text-gray-600">
          An error occurred while fetching landlord profile. Please try again
          later.
        </p>
      </div>
    );
  }

  const inputs = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      disabled: true,
      defaultValue: profile.contents?.name,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      disabled: true,
      defaultValue: profile.contents?.email,
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      required: true,
      disabled: true,
      defaultValue: profile.contents?.phone,
    },
    {
      label: "Street",
      name: "street",
      type: "text",
      required: true,
      defaultValue: profile.contents?.UserAddress[0]?.street,
    },
    {
      label: "City",
      name: "city",
      type: "text",
      required: true,
      defaultValue: profile.contents?.UserAddress[0]?.city,
    },
    {
      label: "State",
      name: "state",
      type: "text",
      required: true,
      defaultValue: profile.contents?.UserAddress[0]?.state,
    },
    {
      label: "Zip",
      name: "zip",
      type: "text",
      required: true,
      defaultValue: profile.contents?.UserAddress[0]?.zip,
    },
    {
      label: "Country",
      name: "country",
      type: "text",
      required: true,
      defaultValue: profile.contents?.UserAddress[0]?.country,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-2">
          {inputs?.map((input, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={input.name}
                className="block text-lg font-medium text-gray-700"
              >
                {input.label}
              </label>
              <input
                {...register(input.name)}
                id={input.name}
                type={input.type}
                defaultValue={input.defaultValue}
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                required={input.required}
                disabled={input.disabled}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserProfilePage;
