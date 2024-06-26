import React, { useEffect, useState } from "react";
import PropCard from "../PropCard";
import axios from "axios";
import { School } from "lucide-react";
import { useRecoilStateLoadable } from "recoil";
import { GetAllPropertiesForUser } from "../../../store/PropertyAtom";
import Loading from "../Loading";
import ContentError from "../ContentError";
import { LayoutGrid } from "../../../utils/layout-grid";

function AllProperties() {
  const [properties, setProperties] = useRecoilStateLoadable(
    GetAllPropertiesForUser()
  );

  if (properties.state === "loading") {
    return <Loading />;
  } else if (properties.state === "hasError") {
    <ContentError
      heading={"Error"}
      message={"An error occurred while fetching properties"}
    />;
  } else if (properties.state === "hasValue") {
    return (
      <div className="w-full p-2">
        <div className="flex justify-between my-2 p-4 rounded-md ring-1 ring-violet-100">
          <div className="flex">
            <School className="w-6 h-6 inline-block" />
            <h1 className=" font-bold text-black ml-2">
              All Properties Available
            </h1>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden items-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-full pb-10 shadow-lg overflow-y-scroll">
            {properties.contents?.map((property, index) => (
              <PropCard
                key={index}
                property={property}
                to={`/user/properties/${property.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default AllProperties;
