import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar, PageFooter } from "../components/Index";

function AuthLayout({ user }) {
  return (
    <div className=" flex-col bg-white bg-grid-small-black/[0.2] flex">
      <div className="top-0 z-50"></div>
      {!user?.isVerified ? (
        <>
          <NavBar />
          <Outlet />
          <PageFooter />
        </>
      ) : (
        <Navigate to="/user/dashboard" replace={true} />
      )}
    </div>
  );
}

export default AuthLayout;
