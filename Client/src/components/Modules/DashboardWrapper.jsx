import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AlignJustify, LogOut } from "lucide-react";
import axios from "axios";
import { Container } from "../Index";
import logo from "../../assets/logos/logowhite.svg";
import { logOutfromInside } from "../../api/GeneralApi";

function DashboardWrapper({ heading, username, children, links, credentials }) {
  const logOut = async () => {
    try {
      const response = await logOutfromInside(credentials);
      console.log(response);
      if (response.status === 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [menu, setMenu] = useState(false);

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`w-1/5 h-full bg-[#006d77] flex flex-col p-4 shadow-lg ${
          menu ? "hidden" : "flex"
        }`}
      >
        <div className="flex flex-col p-2">
          <img src={logo} alt="Brokerless Logo" className="w-20 h-auto" />
          <p className="text-xs text-white mt-2">Room rental made easy</p>
        </div>
        <div className="flex flex-col gap-2 flex-grow overflow-y-auto">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => {
                return `w-4/2 text-base p-3 my-2 text-white hover:text-black hover:bg-white mx-2 rounded-lg ${isActive ? "mix-blend-difference " : ""} `;
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
          className="flex items-center text-white hover:text-black"
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

        <div className="ring-1 ring-violet-200 rounded-lg overflow-hidden">
          <Container>{children}</Container>
        </div>
      </main>
    </div>
  );
}

export default DashboardWrapper;
