import React from "react";
import { logo } from "../../../assets/Index";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function PageFooter() {
  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
    { name: "FAQ", url: "/faq" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      icon: <Facebook />,
    },
    { name: "Twitter", url: "https://www.twitter.com", icon: <Twitter /> },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      icon: <Linkedin />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      icon: <Instagram />,
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center gap-8 py-12 px-4 text-center text-slate-900 bg-white z-10">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:w-full md:px-10">
        <div className="flex items-center gap-4">
          <div className="flex justify-center h-24 w-24 md:h-32 md:w-32 items-center pl-12 rounded-full self-center bg-white p-1">
            <img
              src={logo}
              alt="Brokerless Logo"
              className="h-24 w-24 md:h-32 md:w-32"
            />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold">Brokerless</h1>
        </div>
        <p className="font-light sm:text-lg max-w-xl">
          Brokerless room rental platform that connects landlords and tenants
          directly. We are dedicated to providing a seamless and efficient
          rental experience. Our platform is user-friendly, making the rental
          process simple and transparent.
        </p>
      </div>

      <nav
        className="flex flex-wrap justify-center gap-6 mt-4"
        aria-label="Footer navigation"
      >
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.url}
            className=" transition-colors duration-300"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="flex justify-center gap-6 mt-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className=" transition-colors duration-300"
          >
            {link.icon}
          </a>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 mt-6">
        <p className="text-gray-400">
          © {year} Brokerless. All rights reserved.
        </p>
        <p className="text-gray-400">
          <Link
            to="/privacy-policy"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Privacy Policy
          </Link>{" "}
          |
          <Link
            to="/terms-of-service"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default PageFooter;
