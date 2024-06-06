import React from "react";
import { logo } from "../../assets/Index";
import Button from "../Buttons/Button";
import { Link, NavLink } from "react-router-dom";
import OutlineButton from "../Buttons/OutlineButton";
import { AlignJustify } from "lucide-react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../store/UserAtom";
import axios from "axios";

const links = [
  { path: "/", text: "Home" },
  { path: "/about", text: "About" },
  { path: "/services", text: "Services" },
  { path: "/contact", text: "Contact" },
];

const authLinks = [
  { path: "/user/dashboard", text: "Dashboard" },
  { path: "/user/profile", text: "Profile" },
  { path: "/user/settings", text: "Settings" },
];

function NavBar() {
  const user = useRecoilValue(UserSelector);
  const logOutUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_LOCALHOST}/auth/user/logout`,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status === 200) {
      window.location.reload("/auth/login-user");
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav className=" text-black flex  justify-between items-center p-3 px-10">
      <div>
        <img src={logo} alt="Logo" />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`block text-black focus:outline-none transform transition-all ease-out duration-500 ${isOpen ? "rotate-90 duration-500" : ""}`}
        >
          <AlignJustify size={30} strokeWidth={3} />
        </button>
      </div>
      {/* {user?.isVerified ? (
        <RenderLinks links={authLinks} isOpen={isOpen} />
      ) : (
        <RenderLinks links={links} isOpen={isOpen} />
      )} */}
      {user?.isVerified ? (
        <div
          className={`md:flex md:gap-10 ${isOpen ? `flex flex-col h-1/2 self-center bg-white py-5 items-center absolute top-16 left-0 w-full z-50` : "hidden"}`}
        >
          {authLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-black text-lg font-semibold py-2"
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      ) : (
        <div
          className={`md:flex md:gap-10 ${isOpen ? `flex flex-col h-1/2 self-center bg-white py-5 items-center absolute top-16 left-0 w-full z-50` : "hidden"}`}
        >
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-black text-lg font-semibold py-2"
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      )}

      {!user?.isVerified ? (
        <div className="md:flex gap-3 hidden">
          <OutlineButton>
            <Link to="/auth/register-user"> Connect</Link>
          </OutlineButton>
          <Button className={"bg-secondary"}>
            <Link to="/auth/login-user">Login</Link>
          </Button>
        </div>
      ) : (
        <div className="md:flex gap-3 hidden">
          <Button className={"bg-secondary"} onClick={logOutUser}>
            <Link to="/auth/login-user">Logout</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
