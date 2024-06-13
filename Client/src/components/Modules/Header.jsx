import React from "react";

function Header({ name }) {
  return (
    <div className="w-full p-2">
      <div className="flex justify-between my-2  p-4 rounded-md ring-1 ring-violet-100">
        <div className="flex">
          <h1 className=" font-bold text-black ml-2">{name}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
