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
        <img src={logo} alt="Logo" />
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
        <Link to="/auth/register-user">
          <OutlineButton>Connect</OutlineButton>
        </Link>
        <Link to="/auth/login-user">
          <Button className="bg-secondary">User Login</Button>
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
