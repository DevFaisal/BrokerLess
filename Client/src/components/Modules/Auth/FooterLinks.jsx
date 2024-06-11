import React from "react";
import { Link } from "react-router-dom";

function FooterLinks({ Links }) {
  return (
    <div className="text-center text-sm py-4 md:text-md font-semibold text-black pt-5">
      {Links.map((link, index) => (
        <p key={index}>
          {" "}
          {link.text}
          <Link
            key={index}
            to={link.link}
            className="text-green-600 pl-2 hover:text-green-500"
          >
            {link.linkText}
          </Link>
        </p>
      ))}
    </div>
  );
}

export default FooterLinks;
