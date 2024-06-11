import React from "react";
import { Outlet } from "react-router-dom";

function LandLordPropertiesWrapper() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default LandLordPropertiesWrapper;
