import React from "react";

function H4({ children, className = "", ...rest }) {
  return (
    <h4 className={` text-secondary font-normal text-sm md:text-md ${className}`}>
      {children}
    </h4>
  );
}
export default H4;
