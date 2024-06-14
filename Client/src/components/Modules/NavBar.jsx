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
        className={`md:flex md:gap-10 ${
          isOpen
            ? `flex flex-col gap-3 px-10  self-center bg-white py-5 items-center absolute top-16 left-0 w-full z-50`
            : "hidden"
        }`}
      >
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-black"} border-1 p-3 mx-10 ring-1 ring-gray-400 rounded-md w-full `
            }
          >
            {link.text}
          </NavLink>
        ))}
        <div className="flex gap-3">
          <Link to="/auth/login-user">
            <OutlineButton onClick={() => setIsOpen(false)}>
              User Login
            </OutlineButton>
          </Link>
          <Link to="/auth/login-landlord">
            <OutlineButton onClick={() => setIsOpen(false)}>
              Landlord Login
            </OutlineButton>
          </Link>
        </div>
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
        <Link to="/auth/login-user">
          <OutlineButton>User Login</OutlineButton>
        </Link>
        <Link to="/auth/login-landlord">
          <Button className="bg-backgroundTwo hover:bg-slate-800">
            Landlord Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
