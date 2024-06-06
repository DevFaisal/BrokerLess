import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar, PageFooter } from "../components/Index";

function AuthLayout() {
  return (
    <div className=" flex-col bg-white bg-grid-small-black/[0.2] flex">
      <div className="top-0 z-50">
        <NavBar />
      </div>
      <Outlet />
      <PageFooter />
    </div>
  );
}

export default AuthLayout;
