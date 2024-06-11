import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { NavLink, Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import logo from "../../../assets/Images/logo.png";
import Button from "../../Buttons/Button";
import axios from "axios";
import { UserSelector } from "../../../store/UserAtom";

function UserNavBar() {
  const user = useRecoilValue(UserSelector);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/user/dashboard", text: "Dashboard" },
    { path: "/user/profile", text: "Profile" },
    { path: "/user/settings", text: "Settings" },
  ];

  const logOutUser = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_LOCALHOST}/auth/user/logout`, {
        withCredentials: true,
      });
      window.location.reload("/auth/login-user");
    } catch (error) {
      console.log(error);
    }
  };

  const renderLinks = (links) => {
    return (
      <div
        className={`md:flex md:gap-10 ${
          isOpen
            ? `flex flex-col h-1/2 self-center bg-white py-5 items-center absolute top-16 left-0 w-full z-50`
            : "hidden"
        }`}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-black"
            }
          >
            {link.text}
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <nav className="text-black flex justify-between items-center p-3 px-10">
      <div>
        <img width={100} src={logo} alt="Logo" />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`block text-black focus:outline-none transform transition-all ease-out duration-500 ${
            isOpen ? "rotate-90 duration-500" : ""
          }`}
        >
          <AlignJustify size={30} strokeWidth={3} />
        </button>
      </div>

      {renderLinks(links)}

      <div className="md:flex gap-3 hidden">
        <Link>
          <Button className="bg-slate-700" onClick={logOutUser}>
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default UserNavBar;
