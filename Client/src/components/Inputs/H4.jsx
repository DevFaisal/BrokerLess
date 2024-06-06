import React from "react";

function H4({ children, className = "", ...rest }) {
  return (
    <h4 className={`${className} text-secondary text-xl md:text-2xl`}>
      {children}
    </h4>
  );
}
export default H4;
