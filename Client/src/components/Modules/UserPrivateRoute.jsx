import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../store/UserAtom";
import Navbar from "../Modules/NavBar";
import UserNavBar from "./User/UserNavBar";

function UserPrivateRoute() {
  const user = useRecoilValue(UserSelector);

  return (
    <>
      {user?.isVerified ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate
          to={user?.isVerified ? "/auth/login-user" : "/auth/register-user"}
          replace={true}
        />
      )}
    </>
  );
}

export default UserPrivateRoute;
