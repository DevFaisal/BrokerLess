import React from "react";

function Button({ children, onClick, className, disabled, type, ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-primary rounded-md hover:bg-backgroundTwo
            border border-neutral-600 text-white transition duration-200 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
