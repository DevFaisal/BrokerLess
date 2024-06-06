import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../store/UserAtom";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Index";

function UserAuth() {
  const navigate = useNavigate();
  const user = useRecoilValue(UserSelector);
  useEffect(() => {
    if (!user?.isVerified) {
      navigate("/auth/login-user");
    }
  }, [user]);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default UserAuth;
