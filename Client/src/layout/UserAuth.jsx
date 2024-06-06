import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NavBar, PageFooter } from "../components/Index";

function UserAuth({ user }) {
  return (
    <>
      <NavBar />
      {user?.isVerified ? (
        <>
          <Outlet />
          <PageFooter />
        </>
      ) : (
        <Navigate to="/auth/login-user" replace={true} />
      )}
    </>
  );
}

export default UserAuth;
