import {
  BookUser,
  Construction,
  HandCoins,
  Mailbox,
  School,
  UserRound,
} from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardWrapper from "../DashboardWrapper";
import { useRecoilValue } from "recoil";
import { LandLordSelector } from "../../../store/LandLordAtom";

function LandLordDashboard() {
  const links = [
    {
      name: "Properties",
      path: "/landlord/properties",
      icon: <School />,
    },
    {
      name: "Tenants",
      path: "/landlord/tenants",
      icon: <BookUser />,
    },
    {
      name: "Applications",
      path: "/landlord/applications",
      icon: <Mailbox />,
    },
    // {
    //   name: "Maintenance",
    //   path: "/landlord/maintenance",
    //   icon: <Construction />,
    // },
    {
      name: "Profile",
      path: "/landlord/profile",
      icon: <UserRound />,
    },
  ];

  const landlord = useRecoilValue(LandLordSelector);

  return (
    <>
      {
        <DashboardWrapper
          username={landlord?.name}
          links={links}
          heading={"Landlord"}
          credentials={"landlord"}
        >
          <Outlet />
        </DashboardWrapper>
      }
    </>
  );
}

export default LandLordDashboard;
