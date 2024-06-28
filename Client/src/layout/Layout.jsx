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
    if (user?.isVerified || landlord?.isVerified) {
      setAuthState(true);
    }
  }, [user, landlord]);

  return (
    <>
      <main className="bg-white  ">
        <div
          aria-hidden="true"
          class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none"
        >
          <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        {!authState ? (
          <>
            <NavBar />
            <div className="space-y-40 mb-40">
              <Outlet />
            </div>
            <PageFooter />
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
