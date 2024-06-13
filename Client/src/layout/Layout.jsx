import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar, PageFooter } from "../components/Index";
import { useRecoilValue } from "recoil";
import { UserSelector } from "../store/UserAtom";
import { LandLordSelector } from "../store/LandLordAtom";

const Layout = () => {
  const user = useRecoilValue(UserSelector);
  const landlord = useRecoilValue(LandLordSelector);

  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (user?.isVerified) {
      setAuthState(true);
    }
    if (landlord?.isVerified) {
      setAuthState(true);
    }
  }, [user, landlord]);
  return (
    <>
      <main
        className="h-[50rem] w-full bg-white bg-grid-black/[0.2] relative
        flex flex-col"
      >
        {!authState ? (
          <>
            <NavBar />
            <Outlet />
            {/* <PageFooter /> */}
          </>
        ) : (
          <Navigate
            to={
              user?.isVerified
                ? "/user/dashboard"
                : landlord?.isVerified
                  ? "/landlord/dashboard"
                  : "/"
            }
            replace={true}
          />
        )}
      </main>
    </>
  );
};

export default Layout;
