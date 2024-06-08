import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LandLordSelector } from "../../store/LandLordAtom";
import LandLordNavBar from "./Landlord/LandLordNavBar";

function LandLordPrivateRoute() {
  const landlord = useRecoilValue(LandLordSelector);

  return (
    <>
      {landlord?.isVerified ? (
        <>
          <LandLordNavBar />
          <Outlet />
        </>
      ) : (
        <Navigate
          to={
            landlord?.isVerified
              ? "/auth/register-landlord"
              : "/auth/login-landlord"
          }
          replace={true}
        />
      )}
    </>
  );
}

export default LandLordPrivateRoute;
