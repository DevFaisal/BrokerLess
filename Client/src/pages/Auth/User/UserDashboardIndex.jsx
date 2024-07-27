import React from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../../store/UserAtom";

const UserDashboardIndex = () => {
  const user = useRecoilValue(UserSelector);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h2 className="text-6xl font-bold text-gray-800 text-center">
          Welcome <span className="text-blue-500 font-bold">{user?.name}</span>
        </h2>
        <p className="text-gray-600 text-center">Rent your next home with us</p>
      </div>
    </div>
  );
};

export default UserDashboardIndex;
