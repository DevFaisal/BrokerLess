import React from "react";
import DashboardWrapper from "../DashboardWrapper";
import { Outlet } from "react-router-dom";
import { UserSelector } from "../../../store/UserAtom";
import { useRecoilValue } from "recoil";
import {
  School,
  HandCoins,
  Construction,
  UserRound,
  Inbox,
} from "lucide-react";

function UserDashboard() {
  const user = useRecoilValue(UserSelector);

  const links = [
    {
      name: "Properties",
      path: "/user/properties",
      icon: <School />,
    },
    {
      name: "Requests",
      path: "/user/requests",
      icon: <Inbox />,
    },
    // {
    //   name: "Maintenance",
    //   path: "/user/maintenance",
    //   icon: <Construction />,
    // },
    {
      name: "Profile",
      path: "/user/profile",
      icon: <UserRound />,
    },
  ];

  return (
    <>
      <DashboardWrapper
        username={user?.name}
        links={links}
        heading={"User"}
        credentials={"user"}
      >
        <Outlet />
      </DashboardWrapper>
    </>
  );
}

export default UserDashboard;
