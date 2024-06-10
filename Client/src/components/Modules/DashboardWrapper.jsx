import React from "react";
import { Container } from "../Index";
import { NavLink } from "react-router-dom";

function DashboardWrapper({ heading, username, children, links }) {
  return (
    <>
      <div className="w-full h-screen flex justify-start items-center ">
        <aside className="w-1/5 h-screen bg-backgroundThree flex flex-col justify-start items-start p-4 shadow-l-lg">
          <h1 className="text-md md:text-3xl font-bold text-white my-2 text-center  w-full p-2">
            {heading}
          </h1>
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => {
                return `w-full p-3 my-2 text-white hover:text-black hover:bg-white rounded-lg ${isActive ? "bg-white text-red-800" : ""}`;
              }}
            >
              <p className="flex gap-2">
                {link.icon ? link.icon : <icons />}
                {link.name}
              </p>
            </NavLink>
          ))}
        </aside>
        <Container>
          <aside className="w-full h-screen flex flex-col p-4">
            <div className="flex my-2 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg shadow-lg">
              <h1 className="text-xl font-bold text-black ml-2">
                Welcome <span className="text-violet-500">{username}</span>
              </h1>
            </div>
            <div className="ring-1 ring-violet-200 rounded-lg overflow-hidden">
              <div className="flex w-full flex-col overflow-hidden items-center">
                {children}
              </div>
            </div>
          </aside>
        </Container>
      </div>
    </>
  );
}

export default DashboardWrapper;
