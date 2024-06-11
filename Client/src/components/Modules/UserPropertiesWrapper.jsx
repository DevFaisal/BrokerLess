import React from "react";
import { Outlet } from "react-router-dom";

function UserPropertiesWrapper() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default UserPropertiesWrapper;
