import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar, PageFooter } from "../components/Index";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../store/UserAtom";

function AuthLayout() {
  const user = useRecoilValue(UserSelector);

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
        <Navigate to="/user/dashboard" replace />
      )}
    </div>
  );
}

export default AuthLayout;
