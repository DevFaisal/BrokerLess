import React from "react";

function P({ children, className }) {
  return (
    <p
      className={` text-gray-800 md:text-xl font-normal leading-6 ${className}`}
    >
      {children}
    </p>
  );
}

export default P;
