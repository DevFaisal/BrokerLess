import React from "react";
import { Container, H1, H3, H4 } from "../Index";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";
import logo from "../../assets/logos/logowhite.svg";

function DashboardWrapper({ heading, username, children, links, credentials }) {
  const logOut = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_LOCALHOST}/auth/${credentials}/logout`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status === 200) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-start items-center ">
        <aside className="w-1/5 h-screen bg-backgroundThree flex flex-col justify-start items-start p-4 shadow-l-lg">
          <div className="flex flex-col  p-2 w-full">
            <div className="flex">
              <h1 className="text-md md:text-3xl font-bold text-white">
                Brokerless
              </h1>
            </div>
            <p className="text-2xs  text-white">Room rental made easy</p>
            {/* <h1 className="text-md md:text-3xl font-bold self-start text-white my-2 text-center  w-full p-2">
              {heading}
            </h1> */}
          </div>
          <div className="flex flex-col gap-2 w-full h-full overflow-y-auto">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) => {
                  return `w-full text-base p-3 my-2 text-white hover:text-black hover:bg-white rounded-lg ${isActive ? "bg-black" : ""}`;
                }}
              >
                <p className="flex gap-2">
                  {link.icon ? link.icon : <icons />}
                  {link.name}
                </p>
              </NavLink>
            ))}
          </div>
          <button className="flex gap-2" onClick={logOut}>
            <LogOut className="text-white" />
            <p className="text-white">Logout</p>
          </button>
        </aside>

        <aside className="w-full h-screen flex flex-col p-4">
          {/* <div className="flex my-2 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg shadow-lg">
              <h1 className="text-base font-bold text-black ml-2">
                Welcome <span className="text-violet-500">{username}</span>
              </h1>
            </div> */}
          <div className="ring-1 ring-violet-200 rounded-lg overflow-hidden">
            <div className="flex w-full flex-col overflow-hidden items-center">
              {children}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default DashboardWrapper;
