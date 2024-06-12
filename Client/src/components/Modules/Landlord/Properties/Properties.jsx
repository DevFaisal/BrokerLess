import React from "react";
import { CirclePlus, School } from "lucide-react";
import { Link } from "react-router-dom";
import PropCard from "../../PropCard";
import { useRecoilStateLoadable } from "recoil";
import { GetAllProperties } from "../../../../store/PropertyAtom";
import Loading from "../../Loading";

function Properties() {
  const [properties, setProperties] =
    useRecoilStateLoadable(GetAllProperties());

  if (properties.state === "loading") return <Loading />;
  else if (properties.state === "hasError") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold text-red-500">
          Error Fetching Properties
        </h1>
      </div>
    );
  } else if (properties.state === "hasValue") {
    const ElementCard = ({ element }) => (
      <div className="flex flex-col overflow-hidden items-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 w-full h-[50rem] pb-10 shadow-lg overflow-y-scroll">
          {element?.map((property, index) => (
            <PropCard
              key={index}
              property={properties.contents[index]}
              to={`/landlord/properties/${property.id}`}
            />
          ))}
        </div>
      </div>
    );

    return (
      <>
        {properties.contents.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <Link to="/landlord/properties/add">
              <CirclePlus size={70} />
            </Link>
            <h1 className="text-4xl font-bold text-black">
              No Properties Found
            </h1>
          </div>
        ) : (
          <div className="w-full p-2">
            <div className="flex justify-between my-2  p-4 rounded-md ring-1 ring-violet-100">
              <div className="flex">
                <School className="w-6 h-6 inline-block" />
                <h1 className=" font-bold text-black ml-2">Properties</h1>
              </div>
              <Link to="/landlord/properties/add">
                <CirclePlus />
              </Link>
            </div>
            <ElementCard element={properties.contents} />
          </div>
        )}
      </>
    );
  }
}
export default Properties;
