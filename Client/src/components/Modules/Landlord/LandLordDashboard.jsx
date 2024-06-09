import {
  BookUser,
  Construction,
  HandCoins,
  School,
  UserRound,
  icons,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
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
      name: "Payments",
      path: "/landlord/payments",
      icon: <HandCoins />,
    },
    {
      name: "Maintenance",
      path: "/landlord/maintenance",
      icon: <Construction />,
    },
    {
      name: "Profile",
      path: "/landlord/profile",
      icon: <UserRound />,
    },
  ];

  const landlord = useRecoilValue(LandLordSelector);
  console.log(landlord.name);

  return (
    <main className="w-full h-screen flex justify-start items-center bg-backgroundOne">
      <aside className="w-1/5 h-screen bg-backgroundTwo flex flex-col justify-start items-start p-4 shadow-l-lg">
        <h1 className="text-md md:text-3xl font-bold text-white my-2 text-center  w-full p-2">
          Landlord
        </h1>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) => {
              return `w-full p-3 my-2 text-white hover:text-black hover:bg-white rounded-lg ${isActive ? "bg-white text-slate-900" : ""}`;
            }}
          >
            <p className="flex gap-2">
              {link.icon ? link.icon : <icons />}
              {link.name}
            </p>
          </NavLink>
        ))}
      </aside>
      <aside className="w-full bg-white flex flex-col justify-start items-start">
        {
          <DashboardWrapper name={landlord?.name}>
            <Outlet />
          </DashboardWrapper>
        }
      </aside>
    </main>
  );
}

export default LandLordDashboard;
