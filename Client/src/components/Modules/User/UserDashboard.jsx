import React from "react";
import DashboardWrapper from "../DashboardWrapper";
import { Outlet } from "react-router-dom";
import { UserSelector } from "../../../store/UserAtom";
import { useRecoilValue } from "recoil";
import { School, HandCoins, Construction, UserRound } from "lucide-react";

function UserDashboard() {
  const user = useRecoilValue(UserSelector);

  const links = [
    {
      name: "Properties",
      path: "/user/properties",
      icon: <School />,
    },
    {
      name: "Payments",
      path: "/user/payments",
      icon: <HandCoins />,
    },
    {
      name: "Maintenance",
      path: "/user/maintenance",
      icon: <Construction />,
    },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <UserRound />,
    },
  ];

  return (
    <>
      <DashboardWrapper username={user?.name} links={links} heading={"User"}>
        <Outlet />
      </DashboardWrapper>
    </>
  );
}

export default UserDashboard;
