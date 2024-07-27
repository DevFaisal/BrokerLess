import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Loading, Button } from "../../../components/Index";
import { useRecoilStateLoadable } from "recoil";
import { LandLordSelector } from "../../../store/LandLordAtom";
import toast from "react-hot-toast";

function LandLordProfilePage() {
  const { register, handleSubmit } = useForm();
  const [profile, setProfile] = useRecoilStateLoadable(LandLordSelector);
  const [loading, setLoading] = useState(false);

  console.log("Profile:", profile);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Example API call to update profile (replace with your actual endpoint)
      const response = await axios.put(
        `${import.meta.env.VITE_LOCALHOST}/auth/landlord/update`,
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Landlord Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            defaultValue={profile.contents?.name}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            disabled={true}
            defaultValue={profile.contents?.email}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-lg font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            defaultValue={profile.contents?.phone}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
          />
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

export default LandLordProfilePage;
