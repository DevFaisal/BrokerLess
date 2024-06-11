import React from "react";
import { Outlet, Link } from "react-router-dom";

function PropertiesWrapper() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default PropertiesWrapper;
