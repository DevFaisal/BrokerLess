import React, { useEffect } from "react";
import PropCard from "../PropCard";
import axios from "axios";

const RecentlyAddedProp = () => {
  const [properties, setProperties] = React.useState([]);

  useEffect(() => {
    const getRecentlyAddedProperties = async () => {
      const res = await axios.get(
        import.meta.env.VITE_LOCALHOST + "/api/property/recent"
      );
      setProperties(res.data);
    };
    getRecentlyAddedProperties();
  }, []);
  return (
    <div className="flex flex-col justify-center gap-5 items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Recently Added Properties
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-full  px-28 overflow-y-scroll">
        {properties.map((property, index) => (
          <PropCard
            key={index}
            property={property}
            to={`/landlord/properties/${property.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedProp;
