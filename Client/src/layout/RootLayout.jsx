import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div className="h-[50rem] w-full  bg-white bg-grid-black/[0.2] relative flex flex-col">
      <div className="absolute pointer-events-none inset-0 flex bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="top-0 z-50">
        <NavBar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
