import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../store/UserAtom";

function Protected({ children }) {
  const navigate = useNavigate();
  const user = useRecoilValue(UserSelector);
  useEffect(() => {
    if (!user?.isVerified) {
      return navigate("/auth/login-user");
    }
  }, []);
  return <>{children}</>;
}

export default Protected;
