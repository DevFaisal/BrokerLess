import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AlignJustify, LogOut } from "lucide-react";
import axios from "axios";
import { Container } from "../Index";
import logo from "../../assets/logos/logo.svg";
import { logOutfromInside } from "../../api/GeneralApi";

function DashboardWrapper({ heading, username, children, links, credentials }) {
  const logOut = async () => {
    const token = localStorage.getItem("token");
    localStorage.clear();
    window.location.reload();
  };

  const [menu, setMenu] = useState(false);

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <div className="flex max-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`w-1/6 h-screen flex flex-col p-4 shadow-lg ${
          menu ? "hidden" : "flex"
        }`}
      >
        <div className="flex flex-col p-2">
          <img src={logo} alt="Brokerless Logo" className="w-20 h-auto" />
          <p className="text-xs text-black mt-2">Room rental made easy</p>
        </div>
        <div className="flex flex-col gap-2  flex-grow overflow-y-auto">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => {
                return `w-4/2 text-base p-3 my-2 text-black hover:text-white hover:bg-black mx-2 rounded-lg ${isActive ? "bg-black text-white" : "bg-white"} `;
              }}
            >
              <div className="flex items-center gap-2">
                {link.icon ? link.icon : <span />}
                <span>{link.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
        <button
          className="flex items-center text-black hover:text-blue-500 mt-auto"
          onClick={logOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="text-2xl" onClick={toggleMenu}>
            <AlignJustify />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{heading}</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Welcome</span>
            <span className="text-violet-500">{username}</span>
          </div>
        </div>

        <div className="ring-1 h-[55rem] container mx-auto max-h-screen ring-purple-200 rounded-lg overflow-y-scroll">
          <Container>{children}</Container>
        </div>
      </main>
    </div>
  );
}

export default DashboardWrapper;
