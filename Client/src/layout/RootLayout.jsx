import React from "react";
import { NavBar } from "../components/Index";
import { Navigate, Outlet } from "react-router-dom";
import { PageFooter } from "../components/Index";

function RootLayout({ user }) {
  return (
    <div className="h-[50rem] w-full  bg-white bg-grid-black/[0.2] relative flex flex-col">
      <div className="absolute pointer-events-none inset-0 flex bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="top-0 z-50">
        <NavBar />
      </div>
      <>
        {!user?.isVerified ? (
          <>
            <Outlet />
            <PageFooter />
          </>
        ) : (
          <Navigate to="/auth/login-user" replace />
        )}
      </>
    </div>
  );
}

export default RootLayout;
