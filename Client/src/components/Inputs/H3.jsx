import React from "react";

function H3({ children, className = "", ...rest }) {
  return (
    <h2
      className={`${className} text-tertiary font-bold  text-2xl md:text-3xl`}
    >
      {children}
    </h2>
  );
}
export default H3;
