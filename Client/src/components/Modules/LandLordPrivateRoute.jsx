import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LandLordSelector } from "../../store/LandLordAtom";
import { PageFooter } from "../Index";

function LandLordPrivateRoute() {
  const landlord = useRecoilValue(LandLordSelector);

  return (
    <>
      {landlord?.isVerified ? (
        <>
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
      <PageFooter />
    </>
  );
}

export default LandLordPrivateRoute;
