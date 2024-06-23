import React, { useState } from "react";
import { logo } from "../../assets/Index";
import Button from "../Buttons/Button";
import { Link, NavLink, Navigate } from "react-router-dom";
import OutlineButton from "../Buttons/OutlineButton";
import { AlignJustify } from "lucide-react";

const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
  { path: "/services", text: "Services" },
  { path: "/contact", text: "Contact" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const renderLinks = (links) => {
    return (
      <div
        className={`md:flex md:gap-10 justify-between items-center w-full ${
          isOpen
            ? `flex flex-col gap-3 px-10  self-center bg-white py-5 items-center absolute top-16 left-0 w-full z-50`
            : "hidden"
        }`}
      >
        <div></div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-5">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${isActive ? "text-blue-500" : "text-black"} sm:border-1 sm:p-0 p-3 sm:mx-0 mx-10 ring-1 sm:ring-1 sm:ring-white ring-gray-400 rounded-md w-full `
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div className="flex gap-3">
          <Link onClick={() => setIsOpen(false)} to="/auth/login-user">
            <OutlineButton>User Login</OutlineButton>
          </Link>
          <Link to="/auth/login-landlord">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-backgroundTwo hover:bg-slate-800"
            >
              Landlord Login
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <nav className="flex justify-between items-center  px-5 py-3  w-full  top-0 z-50">
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
    </nav>
  );
}

export default NavBar;
