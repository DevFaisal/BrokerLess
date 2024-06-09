import React from "react";
import { Container } from "../Index";

function DashboardWrapper({ name, children }) {
  return (
    <Container>
      <main className="w-full h-screen flex flex-col p-4">
        <div className="flex my-2 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-black ml-2">
            Welcome <span className="text-violet-500">{name}</span>
          </h1>
        </div>
        <div className="ring-1 ring-violet-200 rounded-lg overflow-hidden">
          <div className="flex w-full flex-col overflow-hidden items-center">
            {children}
          </div>
        </div>
      </main>
    </Container>
  );
}

export default DashboardWrapper;
