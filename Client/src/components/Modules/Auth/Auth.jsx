import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../../../store/UserAtom";
import { useNavigate } from "react-router-dom";

function Auth({ children }) {
  const navigate = useNavigate();
  const user = useRecoilValue(UserSelector);

  useEffect(() => {
    if (user?.isVerified) {
      return navigate("/user/dashboard");
    }
  }, []);
  return <>{children}</>;
}

export default Auth;
