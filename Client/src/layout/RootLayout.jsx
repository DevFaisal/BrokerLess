import React from "react";
import { NavBar } from "../components/Index";
import { Navigate, Outlet } from "react-router-dom";
import { PageFooter } from "../components/Index";

function RootLayout({ user }) {
  return (
    <div className="h-[50rem] w-full  bg-white bg-grid-black/[0.2] relative flex flex-col">
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

export default RootLayout;
