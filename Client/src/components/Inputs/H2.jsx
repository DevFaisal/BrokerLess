import React from "react";

function H2({ children, className = "", ...rest }) {
  return (
    <h1
      className={`${className} text-secondary font-bold text-4xl md:text-5xl lg:text-7xl 2xl:text-9`}
    >
      {children}
    </h1>
  );
}

export default H2;
