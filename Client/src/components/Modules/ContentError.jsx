import React from "react";

function ContentError({ heading, message }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen  text-gray-900">
      <h1 className="text-4xl text-red-600 font-bold">{heading}</h1>
      <p className="text-xl text-gray-500 font-semibold">{message}</p>
    </div>
  );
}

export default ContentError;
