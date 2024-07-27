import React from "react";
import { useRecoilValue } from "recoil";
import { LandLordSelector } from "../../../store/LandLordAtom";

const LandLordDashboardIndex = () => {
  const landlord = useRecoilValue(LandLordSelector);
  console.log(landlord);
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <div>
        <h2 className="md:text-6xl text-2xl font-bold text-gray-800 text-center">
          Welcome{" "}
          <span className="text-blue-500 font-bold">{landlord?.name}</span>
        </h2>
        <p className="text-gray-600 text-center">
          Manage your properties with us
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {Card("Properties", landlord?.properties)}
        {Card("Requests", landlord?.agreement)}
        {Card("Maintenance", 0)}
      </div>
    </div>
  );
};

export default LandLordDashboardIndex;

export function Card(name, value) {
  return (
    <div className="flex flex-col items-center justify-center p-4 shadow-md rounded-md">
      <h2 className="md:text-3xl text-xl font-bold text-gray-800 text-center">
        {name} <span className="text-blue-500 font-bold">{value}</span>
      </h2>
    </div>
  );
}
